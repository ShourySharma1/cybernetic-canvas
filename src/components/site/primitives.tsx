import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const EASE = [0.19, 1, 0.22, 1] as const;

/* ---------------- Reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Split text reveal ---------------- */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden py-[0.08em]">
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={reduced ? false : { y: "40%", opacity: 0.001, filter: "blur(6px)" }}
            whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );

}


/* ---------------- Magnetic button ---------------- */
type MagneticProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "ghost" | "accent";
  children: ReactNode;
};

export function MagneticLink({
  variant = "primary",
  className,
  children,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * 0.28,
      y: (e.clientY - (r.top + r.height / 2)) * 0.34,
    });
  };

  const styles = {
    primary:
      "bg-primary text-primary-foreground shadow-[var(--glow-primary)] hover:brightness-110",
    accent: "bg-accent text-accent-foreground shadow-[var(--glow-accent)] hover:brightness-110",
    ghost:
      "text-foreground border border-border bg-[color-mix(in_oklab,oklch(1_0_0)_70%,transparent)] backdrop-blur-xl hover:border-primary/50",
  }[variant];

  return (
    <motion.a
      ref={ref}
      data-cursor="hover"
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 font-sans text-sm font-medium tracking-tight transition-[filter,border-color] duration-500",
        styles,
        className,
      )}
      {...(props as object)}
    >
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)] transition-transform duration-[1100ms] ease-[var(--ease-luxe)] group-hover:translate-x-full" />
    </motion.a>
  );
}

/* ---------------- Section shell ---------------- */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative w-full px-6 py-28 md:px-10 md:py-40", className)}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
      )}
    >
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-primary">{index}</span>
          <span className="h-px w-10 bg-primary/40" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <h2 className="max-w-4xl text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[0.95] font-medium">
        <SplitWords text={title} />
      </h2>
      {description ? (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---------------- Counter ---------------- */
export function Counter({
  value,
  suffix = "",
  duration = 1800,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- Tilt card ---------------- */
export function Tilt({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setT({ rx: -py * intensity, ry: px * intensity });
        ref.current.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
        ref.current.style.setProperty("--my", `${(py + 0.5) * 100}%`);
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transition: "transform 600ms var(--ease-luxe)",
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </div>
  );
}
