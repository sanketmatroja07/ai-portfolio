"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: { name: string; email: string; message: string }): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleBlur = (field: keyof typeof form) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const updated = { ...form, [field]: value };
      const fieldErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validate(form);
    setErrors(allErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(allErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" role="status" aria-live="polite">
        <CheckCircle size={48} className="text-green-500 mb-4" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          Got it.
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-2">
          I&apos;ll get back to you within 24 hours.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
          In the meantime, check out my projects or connect on LinkedIn.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", message: "" });
            setErrors({});
            setTouched({});
          }}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={status === "sending"}>
      {status === "error" && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 flex items-start gap-2" role="alert">
          <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-700 dark:text-red-400">Something went wrong. Please try again.</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/20"
              placeholder="Your name"
              disabled={status === "sending"}
            />
            {touched.name && errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/20"
              placeholder="you@example.com"
              disabled={status === "sending"}
            />
            {touched.email && errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/20"
            placeholder="Tell me about your AI problem or project..."
            disabled={status === "sending"}
          />
          {touched.message && errors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-500">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
