import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShieldHalf } from "lucide-react";
import { MagneticLink } from "./primitives";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "Society" },
  { href: "#conference", label: "Conference" },
  { href: "#speakers", label: "Speakers" },
  { href: "#workshops", label: "Workshops" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#join", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-700 ease-[var(--ease-luxe)]",
        scrolled ? "py-3" : "py-6",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex w-[min(94vw,80rem)] items-center justify-between rounded-full px-5 py-3 transition-all duration-700 ease-[var(--ease-luxe)]",
          scrolled ? "glass shadow-[var(--shadow-elevate)]" : "border border-transparent",
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Home">
          <ShieldHalf className="h-5 w-5 text-primary transition-transform duration-500 group-hover:rotate-[18deg]" />
          <span className="font-display text-sm font-medium tracking-[-0.02em]">
            Cyber Security Society
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-[13px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-primary/70 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticLink
            href="#conference"
            className="hidden px-5 py-2.5 text-[13px] sm:inline-flex"
          >
            Register
          </MagneticLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className="glass mx-auto mt-3 w-[min(94vw,80rem)] rounded-3xl p-5 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/60 py-3.5 font-display text-lg tracking-tight last:border-0"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
