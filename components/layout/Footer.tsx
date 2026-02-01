"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-kraft/30">
      {/* Torn paper top edge */}
      <div className="h-4 bg-cream torn-edge-bottom" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div>
            <h3 className="font-[family-name:var(--font-special-elite)] text-lg mb-4 text-charcoal">
              Scrap Society Rotterdam
            </h3>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              Your local craft club bringing people together through collage,
              zine making, and junk journaling.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-special-elite)] text-lg mb-4 text-charcoal">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "Events", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-charcoal/80 hover:text-vintage-red transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-[family-name:var(--font-special-elite)] text-lg mb-4 text-charcoal">
              Connect
            </h3>
            <div className="flex gap-4">
              {/* Instagram */}
              <motion.a
                href="https://instagram.com/scrapsociety.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-vintage-red rounded-full flex items-center justify-center text-white"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:sarasaudrius@gmail.com"
                className="w-10 h-10 bg-mustard rounded-full flex items-center justify-center text-charcoal"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email us"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.a>
            </div>

            <p className="mt-4 text-sm text-charcoal/80">
              Central Library Rotterdam
              <br />
              Hoogstraat 110
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-kraft">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-charcoal/60">
              &copy; {currentYear} Scrap Society Rotterdam. Made with scissors and glue.
            </p>
            <div className="flex gap-4 text-xs text-charcoal/60">
              <span className="stamp text-[0.65rem] py-1 px-2">ROFFA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative tape */}
      <div className="h-3 gingham gingham-sm" />
    </footer>
  );
}
