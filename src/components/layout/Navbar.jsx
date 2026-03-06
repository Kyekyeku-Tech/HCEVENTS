import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);

  /* ESC KEY SUPPORT */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
        setMobileSub(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-8 md:px-20 py-8 flex justify-between items-center text-[10px] uppercase tracking-widest font-light">
          {/* LOGO */}
          <Link
            to="/"
            className="font-serif text-[14px] tracking-[0.2em] font-normal"
          >
            HC Events
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex gap-10 relative">
              <Link className="hover:opacity-50 transition-opacity" to="/about">
                About
              </Link>

              {/* SERVICES */}
              <div
                className="relative group"
                onMouseEnter={() => setOpenMenu("services")}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={openMenu === "services"}
                  onFocus={() => setOpenMenu("services")}
                  className="hover:opacity-50 transition-opacity"
                >
                  Services
                </button>

                {openMenu === "services" && (
                  <div
                    role="menu"
                    className="absolute left-0 mt-1 pt-4 pb-3 flex flex-col items-start gap-1 text-[9px] tracking-[0.3em] leading-relaxed whitespace-nowrap text-black/70"
                    onMouseEnter={() => setOpenMenu("services")}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <Link role="menuitem" to="/services/wedding" className="px-2 py-2 hover:text-black transition-colors w-full" onClick={() => setOpenMenu(null)}>
                      Full Service Wedding Design
                    </Link>
                    <Link role="menuitem" to="/services/virtual" className="px-2 py-2 hover:text-black transition-colors w-full" onClick={() => setOpenMenu(null)}>
                      Virtual Design Advice
                    </Link>
                    <Link role="menuitem" to="/services/styling" className="px-2 py-2 hover:text-black transition-colors w-full" onClick={() => setOpenMenu(null)}>
                      Photo Styling
                    </Link>
                    <Link role="menuitem" to="/services/creative" className="px-2 py-2 hover:text-black transition-colors w-full" onClick={() => setOpenMenu(null)}>
                      Creative Direction
                    </Link>
                  </div>
                )}
              </div>

              {/* PORTFOLIO */}
              <div
                className="relative group"
                onMouseEnter={() => setOpenMenu("portfolio")}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={openMenu === "portfolio"}
                  onFocus={() => setOpenMenu("portfolio")}
                  className="hover:opacity-50 transition-opacity"
                >
                  Portfolio
                </button>

                {openMenu === "portfolio" && (
                  <div
                    role="menu"
                    className="absolute left-0 mt-1 pt-4 pb-3 flex flex-col items-start gap-1 text-[9px] tracking-[0.3em] leading-relaxed whitespace-nowrap text-black/70"
                    onMouseEnter={() => setOpenMenu("portfolio")}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <Link role="menuitem" to="/portfolio/wedding" className="px-2 py-2 hover:text-black transition-colors w-full" onClick={() => setOpenMenu(null)}>
                      Wedding
                    </Link>
                    <Link role="menuitem" to="/portfolio/fashion" className="px-2 py-2 hover:text-black transition-colors w-full" onClick={() => setOpenMenu(null)}>
                      Fashion Styling
                    </Link>
                    <Link role="menuitem" to="/portfolio/products" className="px-2 py-2 hover:text-black transition-colors w-full" onClick={() => setOpenMenu(null)}>
                      Products
                    </Link>
                    <Link role="menuitem" to="/portfolio/creative" className="px-2 py-2 hover:text-black transition-colors w-full" onClick={() => setOpenMenu(null)}>
                      Creative
                    </Link>
                  </div>
                )}
              </div>

              <Link className="hover:opacity-50 transition-opacity" to="/blog">Blog</Link>
              <Link className="hover:opacity-50 transition-opacity" to="/contact">Contact</Link>
              <Link className="hover:opacity-50 transition-opacity" to="/book">Book</Link>
            </div>

            {/* SOCIAL ICONS (DESKTOP) */}
            <div className="flex gap-6 ml-12 opacity-60">
              <SocialIcons />
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden font-serif text-[12px] tracking-[0.2em]"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
          >
            Menu
          </button>
        </nav>
      </header>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className="fixed inset-0 z-50 bg-white flex flex-col justify-between px-8 py-12"
        >
          {/* CLOSE */}
          <button
            onClick={() => {
              setMobileOpen(false);
              setMobileSub(null);
            }}
            className="self-end font-serif tracking-[0.2em] text-[12px] uppercase"
          >
            Close
          </button>

          {/* LINKS */}
          <nav className="space-y-6 font-serif text-[16px] flex-1 flex flex-col">
            <div className="space-y-4">
              <Link onClick={() => setMobileOpen(false)} to="/about" className="block py-2 hover:opacity-60 transition-opacity">
                About
              </Link>

              {/* MOBILE SERVICES */}
              <div className="border-b border-black/10 pb-4">
                <button
                  aria-expanded={mobileSub === "services"}
                  aria-controls="mobile-services"
                  onClick={() =>
                    setMobileSub(mobileSub === "services" ? null : "services")
                  }
                  className="w-full text-left py-2 hover:opacity-60 transition-opacity flex justify-between items-center"
                >
                  <span>Services</span>
                  <span className="text-[12px]">{mobileSub === "services" ? "−" : "+"}</span>
                </button>

                {mobileSub === "services" && (
                  <div
                    id="mobile-services"
                    role="menu"
                    className="mt-3 ml-4 flex flex-col gap-2 text-[13px] text-black/70"
                  >
                    <Link onClick={() => setMobileOpen(false)} to="/services/wedding" className="py-1.5 hover:text-black transition-colors">
                      Full Service Wedding Design
                    </Link>
                    <Link onClick={() => setMobileOpen(false)} to="/services/virtual" className="py-1.5 hover:text-black transition-colors">
                      Virtual Design Advice
                    </Link>
                    <Link onClick={() => setMobileOpen(false)} to="/services/styling" className="py-1.5 hover:text-black transition-colors">
                      Photo Styling
                    </Link>
                    <Link onClick={() => setMobileOpen(false)} to="/services/creative" className="py-1.5 hover:text-black transition-colors">
                      Creative Direction
                    </Link>
                  </div>
                )}
              </div>

              {/* MOBILE PORTFOLIO */}
              <div className="border-b border-black/10 pb-4">
                <button
                  aria-expanded={mobileSub === "portfolio"}
                  aria-controls="mobile-portfolio"
                  onClick={() =>
                    setMobileSub(mobileSub === "portfolio" ? null : "portfolio")
                  }
                  className="w-full text-left py-2 hover:opacity-60 transition-opacity flex justify-between items-center"
                >
                  <span>Portfolio</span>
                  <span className="text-[12px]">{mobileSub === "portfolio" ? "−" : "+"}</span>
                </button>

                {mobileSub === "portfolio" && (
                  <div
                    id="mobile-portfolio"
                    role="menu"
                    className="mt-3 ml-4 flex flex-col gap-2 text-[13px] text-black/70"
                  >
                    <Link onClick={() => setMobileOpen(false)} to="/portfolio/wedding" className="py-1.5 hover:text-black transition-colors">
                      Wedding
                    </Link>
                    <Link onClick={() => setMobileOpen(false)} to="/portfolio/fashion" className="py-1.5 hover:text-black transition-colors">
                      Fashion Styling
                    </Link>
                    <Link onClick={() => setMobileOpen(false)} to="/portfolio/products" className="py-1.5 hover:text-black transition-colors">
                      Products
                    </Link>
                    <Link onClick={() => setMobileOpen(false)} to="/portfolio/creative" className="py-1.5 hover:text-black transition-colors">
                      Creative
                    </Link>
                  </div>
                )}
              </div>

              <Link onClick={() => setMobileOpen(false)} to="/blog" className="block py-2 hover:opacity-60 transition-opacity">
                Blog
              </Link>
              <Link onClick={() => setMobileOpen(false)} to="/contact" className="block py-2 hover:opacity-60 transition-opacity">
                Contact
              </Link>
              <Link onClick={() => setMobileOpen(false)} to="/book" className="block py-2 hover:opacity-60 transition-opacity font-semibold">
                Book
              </Link>
            </div>
          </nav>

          {/* SOCIAL ICONS (MOBILE) */}
          <div className="flex gap-6 opacity-60">
            <SocialIcons />
          </div>
        </div>
      )}
    </>
  );
}

/* SOCIAL ICONS */
function SocialIcons() {
  return (
    <>
      <a href="https://instagram.com" aria-label="Instagram">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" />
        </svg>
      </a>

      <a href="https://stevsphotography7.pixieset.com/ch/" aria-label="Pinterest">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M8 21c-1-4 2-6 2-9 0-2-1-3-2-3-2 0-3 2-3 4 0 2 1 3 1 3" />
          <path d="M15 8c0-2-1-4-4-4-4 0-6 3-6 6 0 2 1 4 3 4 1 0 2-1 2-2" />
        </svg>
      </a>

      <a href="mailto:hello@hcevents.com" aria-label="Email">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      </a>
    </>
  );
}
