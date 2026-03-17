"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/effects/MagneticButton";

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

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder=" "
        disabled={disabled}
        aria-invalid={touched && !!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="floating-input peer w-full px-4 pt-5 pb-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-transparent focus:outline-none transition-all duration-300 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/20 disabled:opacity-50"
      />
      <label
        htmlFor={id}
        className="floating-label absolute left-4 top-3.5 text-sm text-zinc-400 dark:text-zinc-500 transition-all duration-200 pointer-events-none origin-left peer-focus:translate-y-[-0.9rem] peer-focus:scale-[0.85] peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:translate-y-[-0.9rem] peer-[:not(:placeholder-shown)]:scale-[0.85]"
      >
        {label}
      </label>
      <AnimatePresence>
        {touched && error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            id={`${id}-error`}
            className="mt-1 text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        >
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 mx-auto">
            <CheckCircle size={32} className="text-green-500" aria-hidden="true" />
          </div>
        </motion.div>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          Message Sent
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
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={status === "sending"}>
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 flex items-start gap-2"
            role="alert"
          >
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-sm text-red-700 dark:text-red-400">Something went wrong. Please try again.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FloatingInput
            id="name"
            label="Your name"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            onBlur={() => handleBlur("name")}
            error={errors.name}
            touched={touched.name}
            disabled={status === "sending"}
          />
          <FloatingInput
            id="email"
            label="Email address"
            type="email"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
            onBlur={() => handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            disabled={status === "sending"}
          />
        </div>
        <div className="relative">
          <textarea
            id="message"
            required
            rows={5}
            value={form.message}
            placeholder=" "
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            disabled={status === "sending"}
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="floating-input peer w-full px-4 pt-5 pb-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-transparent focus:outline-none transition-all duration-300 resize-none aria-[invalid=true]:border-red-400 disabled:opacity-50"
          />
          <label
            htmlFor="message"
            className="floating-label absolute left-4 top-3.5 text-sm text-zinc-400 dark:text-zinc-500 transition-all duration-200 pointer-events-none origin-left peer-focus:translate-y-[-0.9rem] peer-focus:scale-[0.85] peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:translate-y-[-0.9rem] peer-[:not(:placeholder-shown)]:scale-[0.85]"
          >
            Tell me about your AI problem...
          </label>
          <AnimatePresence>
            {touched.message && errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                id="message-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <MagneticButton className="inline-block">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 transition-all active:scale-[0.98] disabled:opacity-50"
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
        </MagneticButton>
      </div>
    </form>
  );
}
