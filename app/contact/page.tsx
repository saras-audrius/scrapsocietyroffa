"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CutoutText } from "@/components/ui/CutoutText";
import { staggerContainer, fadeInUp } from "@/components/animations/variants";
// Formspree endpoint - create your free form at https://formspree.io
// Replace with your actual form ID after signing up
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mojleeoa";

function ContactForm() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");
  const tikkieUrl = searchParams.get("tikkie");

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill form when coming from event registration
  useEffect(() => {
    if (!eventId) return;
    fetch("/api/events")
      .then((r) => r.json())
      .then((events: { id: string; title: string; date: string }[]) => {
        const event = events.find((e) => e.id === eventId);
        if (event) {
          setFormState((prev) => ({
            ...prev,
            subject: "register",
            message: `Hi! I'd like to register for "${event.title}" on ${event.date}.\n\nPlease let me know if spots are still available!`,
          }));
        }
      });
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          _subject: `[Scrap Society] ${formState.subject} from ${formState.name}`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("Something went wrong. Please try emailing us directly.");
      }
    } catch {
      setError("Something went wrong. Please try emailing us directly.");
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Card variant="paper" className="text-center py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-6xl mb-6 block">&#x2709;&#xFE0F;</span>
          <h2 className="font-[family-name:var(--font-special-elite)] text-2xl mb-4 text-charcoal">
            Message Sent!
          </h2>
          <p className="text-charcoal/70 mb-6">
            Thanks for reaching out! We&apos;ll get back to you soon.
          </p>

          {tikkieUrl && (
            <div className="mb-8 mx-auto max-w-sm p-5 bg-[#009FE3]/10 border border-[#009FE3]/30 rounded-xl">
              <p className="font-[family-name:var(--font-special-elite)] text-charcoal mb-1">
                Want to contribute?
              </p>
              <p className="text-sm text-charcoal/70 mb-4">
                Our sessions are free but any contribution helps keep the materials flowing!
              </p>
              <a
                href={tikkieUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#009FE3] hover:bg-[#007FC0] text-white font-[family-name:var(--font-special-elite)] px-5 py-2.5 rounded-full transition"
              >
                💙 Pay via Tikkie
              </a>
            </div>
          )}

          <Button
            variant="secondary"
            onClick={() => {
              setIsSubmitted(false);
              setFormState({
                name: "",
                email: "",
                subject: "general",
                message: "",
              });
            }}
          >
            Send Another Message
          </Button>
        </motion.div>
      </Card>
    );
  }

  return (
    <div
      className="bg-[#FFFEF5] p-8 shadow-lg relative"
      style={{
        transform: "rotate(-1deg)",
        backgroundImage: `
          linear-gradient(transparent 27px, #E8E8E8 28px),
          linear-gradient(90deg, transparent 97%, #F8B4B4 98%, #F8B4B4 100%)
        `,
        backgroundSize: "100% 28px, 100% 100%",
      }}
    >
      {/* Stamp decoration */}
      <div className="absolute top-4 right-4 w-16 h-20 border-2 border-dashed border-vintage-red/50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-2xl">&#x2702;</span>
          <p className="text-[0.5rem] text-vintage-red font-[family-name:var(--font-special-elite)]">
            SCRAP
            <br />
            SOCIETY
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pr-20">
        <div>
          <label className="block font-[family-name:var(--font-special-elite)] text-charcoal mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
            className="w-full bg-transparent border-b-2 border-kraft focus:border-vintage-red outline-none py-2 font-[family-name:var(--font-karla)] transition-colors"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block font-[family-name:var(--font-special-elite)] text-charcoal mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            className="w-full bg-transparent border-b-2 border-kraft focus:border-vintage-red outline-none py-2 font-[family-name:var(--font-karla)] transition-colors"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label className="block font-[family-name:var(--font-special-elite)] text-charcoal mb-2">
            Subject
          </label>
          <select
            value={formState.subject}
            onChange={(e) =>
              setFormState({ ...formState, subject: e.target.value })
            }
            className="w-full bg-transparent border-b-2 border-kraft focus:border-vintage-red outline-none py-2 font-[family-name:var(--font-karla)] transition-colors cursor-pointer"
          >
            <option value="general">General Inquiry</option>
            <option value="register">Event Registration</option>
            <option value="collaborate">Collaboration</option>
            <option value="press">Press / Media</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-[family-name:var(--font-special-elite)] text-charcoal mb-2">
            Your Message
          </label>
          <textarea
            required
            rows={5}
            value={formState.message}
            onChange={(e) =>
              setFormState({ ...formState, message: e.target.value })
            }
            className="w-full bg-transparent border-2 border-kraft focus:border-vintage-red outline-none p-3 font-[family-name:var(--font-karla)] transition-colors resize-none"
            placeholder="Write your message here..."
          />
        </div>

        {tikkieUrl && (
          <div className="p-4 bg-[#009FE3]/10 border border-[#009FE3]/30 rounded-xl">
            <p className="font-[family-name:var(--font-special-elite)] text-charcoal text-sm mb-1">
              Want to contribute?
            </p>
            <p className="text-xs text-charcoal/70 mb-3">
              Our sessions are free but a small contribution helps keep the materials flowing!
            </p>
            <a
              href={tikkieUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#009FE3] hover:bg-[#007FC0] text-white font-[family-name:var(--font-special-elite)] text-sm px-4 py-2 rounded-full transition"
            >
              💙 Pay via Tikkie
            </a>
          </div>
        )}

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message ✉️"}
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-vintage-red/10 border border-vintage-red/30 text-sm text-charcoal">
            {error}{" "}
            <a
              href={`mailto:sarasaudrius@gmail.com?subject=${encodeURIComponent(
                formState.subject
              )}&body=${encodeURIComponent(
                `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
              )}`}
              className="text-vintage-red underline"
            >
              Click here to email directly
            </a>
          </div>
        )}
      </form>

    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-kraft/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <span className="washi-tape washi-tape-pink text-sm mb-6 inline-block">
                  Say hello
                </span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="mb-6">
                <CutoutText text="Get in Touch" as="span" className="text-3xl" />
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-charcoal/80 max-w-2xl mx-auto"
              >
                Questions about an event? Want to collaborate? Just want to say
                hi? Drop us a line!
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid lg:grid-cols-5 gap-8"
            >
              {/* Postcard Form */}
              <motion.div variants={fadeInUp} className="lg:col-span-3">
                <Suspense fallback={<div className="h-96 bg-cream animate-pulse" />}>
                  <ContactForm />
                </Suspense>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
                <Card variant="kraft" rotation={2}>
                  <h3 className="font-[family-name:var(--font-special-elite)] text-lg mb-4 text-charcoal">
                    Other Ways to Reach Us
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">&#x1F4E7;</span>
                      <div>
                        <p className="font-[family-name:var(--font-special-elite)] text-sm">
                          Email
                        </p>
                        <a
                          href="mailto:sarasaudrius@gmail.com"
                          className="text-vintage-red hover:underline text-sm"
                        >
                          sarasaudrius@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">&#x1F4F8;</span>
                      <div>
                        <p className="font-[family-name:var(--font-special-elite)] text-sm">
                          Instagram
                        </p>
                        <a
                          href="https://instagram.com/scrapsociety.nl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-vintage-red hover:underline text-sm"
                        >
                          @scrapsociety.nl
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">&#x1F4CD;</span>
                      <div>
                        <p className="font-[family-name:var(--font-special-elite)] text-sm">
                          Location
                        </p>
                        <p className="text-sm text-charcoal/80">
                          Central Library Rotterdam
                          <br />
                          Hoogstraat 110
                          <br />
                          3011 PV Rotterdam
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className="w-6 h-6 flex-shrink-0 mt-0.5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <div>
                        <p className="font-[family-name:var(--font-special-elite)] text-sm">
                          WhatsApp Community
                        </p>
                        <a
                          href="https://chat.whatsapp.com/CBElgt8k8W3Au6t9nKijIx?mode=gi_t"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-vintage-red hover:underline text-sm"
                        >
                          Join our group
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card variant="paper" rotation={-1}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">&#x1F4AC;</span>
                    <h3 className="font-[family-name:var(--font-special-elite)] text-lg text-charcoal">
                      Quick Question?
                    </h3>
                  </div>
                  <p className="text-sm text-charcoal/80">
                    DM us on Instagram for the fastest response! We&apos;re usually
                    pretty quick to reply there.
                  </p>
                </Card>

                {/* Decorative tape */}
                <div className="washi-tape washi-tape-mint text-center text-xs">
                  We love hearing from you!
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
