import { z } from "zod";

/**
 * Zod schema for contact form submissions.
 * Runs server-side inside the API route — never trust client input.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be under 100 characters.")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(320, "Email is too long.")
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be under 5,000 characters.")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
