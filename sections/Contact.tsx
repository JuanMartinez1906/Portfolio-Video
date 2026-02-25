"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const INPUT_CLASS =
  "w-full bg-[#161616] border border-[#2a2a2a] px-4 py-3 text-white text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-accent transition-colors duration-200";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only: no backend
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* ── Left: headline + direct contacts ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-xs tracking-[0.35em] uppercase">
                Contact
              </span>
            </div>

            <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide leading-none mb-6">
              LET&apos;S CREATE<br />
              <span className="text-accent">TOGETHER</span>
            </h2>

            <p className="text-muted mb-12 leading-relaxed text-sm md:text-base">
              Got a project in mind? I&apos;d love to hear about it.
            </p>

            {/* Direct contact links */}
            <div className="space-y-4">
              {[
                {
                  label: "@",
                  value: "hola@juanmartinez.com",
                  href: "mailto:hola@juanmartinez.com",
                },
                {
                  label: "IG",
                  value: "@juanedits",
                  href: "https://instagram.com",
                },
                {
                  label: "TK",
                  value: "@juanedits",
                  href: "https://tiktok.com",
                },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    contact.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 border border-[#2a2a2a] flex items-center justify-center text-accent text-xs font-bold group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-200 shrink-0">
                    {contact.label}
                  </div>
                  <span className="text-muted text-sm group-hover:text-white transition-colors duration-200">
                    {contact.value}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center mb-6 text-accent text-2xl">
                  ✓
                </div>
                <h3 className="font-bebas text-3xl text-white tracking-wide mb-3">
                  MESSAGE SENT
                </h3>
                <p className="text-muted text-sm">
                  I&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-muted-2 text-[10px] tracking-[0.3em] uppercase mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={update("name")}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="text-muted-2 text-[10px] tracking-[0.3em] uppercase mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={update("email")}
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                {/* Project type */}
                <div>
                  <label className="text-muted-2 text-[10px] tracking-[0.3em] uppercase mb-2 block">
                    Project Type
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={form.projectType}
                      onChange={update("projectType")}
                      className={`${INPUT_CLASS} appearance-none pr-10`}
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="" disabled>
                        Select a type…
                      </option>
                      <option value="creator">Creator Content</option>
                      <option value="ads">Meta Ads</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-2 text-xs">
                      ▾
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-muted-2 text-[10px] tracking-[0.3em] uppercase mb-2 block">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project…"
                    value={form.message}
                    onChange={update("message")}
                    className={`${INPUT_CLASS} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-accent text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-accent-hover transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
