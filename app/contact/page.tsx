"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CutoutText } from "@/components/ui/CutoutText";
import { staggerContainer, fadeInUp } from "@/components/animations/variants";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

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
                {!isSubmitted ? (
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

                      <div className="pt-4">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message &#x2709;"}
                        </Button>
                      </div>
                    </form>

                    {/* Decorative postmark */}
                    <div className="absolute bottom-4 right-4 postmark">
                      <span className="relative z-10">
                        ROTTERDAM
                        <br />
                        NL
                      </span>
                    </div>
                  </div>
                ) : (
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
                )}
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
                          href="mailto:hello@scrapsociety.nl"
                          className="text-vintage-red hover:underline text-sm"
                        >
                          hello@scrapsociety.nl
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
