"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { WashiTape } from "../ui/WashiTape";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/logo")
      .then((r) => r.json())
      .then((data) => { if (data.url) setLogoUrl(data.url); });
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      {/* Top decorative tape */}
      <div className="h-3 gingham gingham-sm" />

      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-14 h-14 rounded-full border-4 border-white shadow-md overflow-hidden flex items-center justify-center"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="Scrap Society" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full gingham flex items-center justify-center">
                  <span className="font-[family-name:var(--font-special-elite)] text-charcoal text-xs text-center leading-tight">
                    Scrap<br />Society
                  </span>
                </div>
              )}
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-[family-name:var(--font-special-elite)] text-xl text-charcoal">
                Scrap Society
              </h1>
              <p className="text-xs text-kraft-dark">Rotterdam</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, i) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <WashiTape
                    color={["yellow", "pink", "mint", "yellow"][i] as "yellow" | "pink" | "mint"}
                    rotation={[-2, 1, -1, 2][i]}
                  >
                    {item.label}
                  </WashiTape>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              className="w-6 h-5 flex flex-col justify-between"
              animate={mobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="w-full h-0.5 bg-charcoal origin-left"
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: 45, y: -2 },
                }}
              />
              <motion.span
                className="w-full h-0.5 bg-charcoal"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.span
                className="w-full h-0.5 bg-charcoal origin-left"
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: -45, y: 2 },
                }}
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <WashiTape
                        color={["yellow", "pink", "mint", "yellow"][i] as "yellow" | "pink" | "mint"}
                        rotation={0}
                      >
                        {item.label}
                      </WashiTape>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
