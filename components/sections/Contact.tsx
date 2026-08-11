"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Toast from "@/components/ui/Toast";
import { ContactSchema, type ContactInput } from "@/lib/validation";

export default function Contact() {
  const [toast, setToast] = useState<
    null | { kind: "success" | "error"; message: string }
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Server error");
      }

      setToast({
        kind: "success",
        message: "Message sent — thanks! I'll be in touch soon.",
      });

      reset();
    } catch (e) {
      setToast({
        kind: "error",
        message:
          e instanceof Error ? e.message : "Failed to send message",
      });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-cyan">
            Contact
          </p>

          <h2
            id="contact-title"
            className="font-display text-4xl sm:text-5xl mt-2"
          >
            <span className="text-gradient">Let's Connect</span>
          </h2>

          <p className="mt-4 text-muted max-w-2xl">
            Reach out to discuss AI/ML projects, internships, technical
            collaborations, or opportunities.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Contact Details */}
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md">
              <p className="text-sm uppercase tracking-widest text-cyan">
                Contact details
              </p>

              <dl className="mt-6 space-y-6 text-sm text-ink/80">
                {/* Email */}
                <div>
                  <dt className="font-display text-xs uppercase tracking-widest text-muted">
                    Email
                  </dt>

                  <dd className="mt-1">
                    <a
                      href="mailto:ppadmasree35@gmail.com"
                      className="break-all hover:text-cyan transition"
                    >
                      ppadmasree35@gmail.com
                    </a>
                  </dd>
                </div>

                {/* LinkedIn */}
                <div>
                  <dt className="font-display text-xs uppercase tracking-widest text-muted">
                    LinkedIn
                  </dt>

                  <dd className="mt-1">
                    <a
                      href="https://www.linkedin.com/in/padmashree-m-p/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all hover:text-cyan transition"
                    >
                      linkedin.com/in/padmashree-m-p
                    </a>
                  </dd>
                </div>

                {/* GitHub */}
                <div>
                  <dt className="font-display text-xs uppercase tracking-widest text-muted">
                    GitHub
                  </dt>

                  <dd className="mt-1">
                    <a
                      href="https://github.com/PadmashreeMP13/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all hover:text-cyan transition"
                    >
                      github.com/PadmashreeMP13
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" error={errors.name?.message}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className={inputCls(!!errors.name)}
                    {...register("name")}
                  />
                </Field>

                <Field label="Email" error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className={inputCls(!!errors.email)}
                    {...register("email")}
                  />
                </Field>
              </div>

              <Field label="Subject" error={errors.subject?.message}>
                <input
                  id="subject"
                  type="text"
                  aria-invalid={!!errors.subject}
                  className={inputCls(!!errors.subject)}
                  {...register("subject")}
                />
              </Field>

              <Field label="Message" error={errors.message?.message}>
                <textarea
                  id="message"
                  rows={6}
                  aria-invalid={!!errors.message}
                  className={inputCls(!!errors.message, true)}
                  {...register("message")}
                />
              </Field>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-xs text-muted">
                  By submitting you agree to be contacted about your message.
                  We never share your data.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-md font-display uppercase tracking-widest text-sm border border-magenta/60 bg-magenta/10 hover:bg-magenta/20 hover:shadow-glow disabled:opacity-60 transition"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-acid animate-pulse-glow" />
                      Sending…
                    </>
                  ) : (
                    <>Send message →</>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block mb-1 text-xs uppercase tracking-widest text-muted">
        {label}
      </span>

      {children}

      {error && (
        <span role="alert" className="mt-1 block text-xs text-magenta">
          {error}
        </span>
      )}
    </label>
  );
}

function inputCls(invalid?: boolean, multi?: boolean) {
  return `w-full rounded-md bg-black/40 border ${
    invalid ? "border-magenta" : "border-white/10"
  } focus:border-cyan focus:shadow-glow-cyan ${
    multi ? "resize-y min-h-32" : "h-11"
  } px-3 py-2 text-ink placeholder:text-muted/60 outline-none transition`;
}