/**
 * POST /api/contact
 * ─────────────────────────────────────────────
 * Server-side API route (Astro SSR / Vercel serverless).
 * 1. Parses + validates the JSON body with Zod
 * 2. Sends the email via Resend
 * 3. Returns a JSON response
 *
 * Architecture: heavy logic stays server-side (per ARCHITECTURE_RULES.md).
 */

import type { APIRoute } from "astro";
import { Resend } from "resend";
import { contactSchema } from "../../lib/contactSchema";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

/** The inbox that receives all contact form emails. */
const RECIPIENT = "billy@puzzles.consulting";

/**
 * Resend requires a verified sender domain. Until your domain is verified,
 * use their shared sandbox: "onboarding@resend.dev".
 * Once verified, swap this to e.g. "noreply@flowstate.ai".
 */
const SENDER = "FlowState Contact <onboarding@resend.dev>";

export const POST: APIRoute = async ({ request }) => {
  try {
    // ── 1. Parse the request body ──────────────────────────────
    const body = await request.json().catch(() => null);

    if (!body) {
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid JSON body." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── 2. Validate with Zod ───────────────────────────────────
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return new Response(
        JSON.stringify({ ok: false, errors: fieldErrors }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
    }

    const { name, email, message } = result.data;

    // ── 3. Send via Resend ─────────────────────────────────────
    const { error } = await resend.emails.send({
      from: SENDER,
      to: RECIPIENT,
      replyTo: email,
      subject: `FlowState Contact: ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px;">
          <h2 style="color: #6366F1;">New Contact Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return new Response(
        JSON.stringify({ ok: false, error: "Failed to send email. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── 4. Success ─────────────────────────────────────────────
    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

/** Prevent XSS in the HTML email body. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
