import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

/* ─── Types ───────────────────────────────────────────────── */

interface FieldErrors {
  name?: string[];
  email?: string[];
  message?: string[];
}

type FormStatus = "idle" | "submitting" | "success" | "error";

/* ─── Animation Variants ──────────────────────────────────── */

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const inputFocus =
  "focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/60 focus:bg-white/[0.04]";

/* ─── Component ───────────────────────────────────────────── */

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setFieldErrors({});
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else if (data.errors) {
        // Zod validation errors (422)
        setFieldErrors(data.errors);
        setStatus("error");
      } else {
        setServerError(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please check your connection.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      {/* Ambient glow behind the card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="max-w-xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-copy-primary tracking-tight">
            Get in{" "}
            <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
              touch
            </span>
          </h2>
          <p className="mt-4 text-lg text-copy-secondary">
            Have a question or want to see FlowState in action? Drop us a line
            and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="max-w-lg mx-auto"
        >
          {/* ── Glass Card ───────────────────────────────── */}
          <div className="rounded-2xl lg:rounded-3xl border border-surface-border bg-white/[0.03] backdrop-blur-glass p-8 lg:p-10">
            {status === "success" ? (
              /* ── Success State ──────────────────────────── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-400"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-copy-primary mb-2">
                  Message sent!
                </h3>
                <p className="text-copy-secondary">
                  Thanks for reaching out. We'll be in touch soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              /* ── Form ──────────────────────────────────── */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-copy-secondary mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-surface-border text-copy-primary placeholder:text-copy-secondary/40 outline-none transition-all duration-200 ${inputFocus} ${
                      fieldErrors.name ? "border-red-500/50 ring-1 ring-red-500/20" : ""
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {fieldErrors.name[0]}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-copy-secondary mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-surface-border text-copy-primary placeholder:text-copy-secondary/40 outline-none transition-all duration-200 ${inputFocus} ${
                      fieldErrors.email ? "border-red-500/50 ring-1 ring-red-500/20" : ""
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {fieldErrors.email[0]}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-copy-secondary mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your workflow challenges..."
                    rows={5}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-surface-border text-copy-primary placeholder:text-copy-secondary/40 outline-none transition-all duration-200 resize-none ${inputFocus} ${
                      fieldErrors.message ? "border-red-500/50 ring-1 ring-red-500/20" : ""
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {fieldErrors.message[0]}
                    </p>
                  )}
                </div>

                {/* Server Error */}
                {serverError && (
                  <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                    {serverError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative w-full px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-brand-500 to-purple-500 rounded-2xl shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg transition-all duration-300"
                >
                  <span
                    className={`flex items-center justify-center gap-2 ${
                      status === "submitting" ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    Send Message
                    <span className="inline-block group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </span>

                  {/* Loading Spinner */}
                  {status === "submitting" && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
