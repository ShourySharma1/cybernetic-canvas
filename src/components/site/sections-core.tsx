import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import { Counter, MagneticLink, Reveal, Section, SectionHeading } from "./primitives";
import { agenda, images, stats, timeline } from "./data";

/* ------------------------- SECTION 02 — ABOUT ------------------------- */
export function About() {
  return (
    <Section id="about" className="border-t border-border/60">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <SectionHeading
            index="02"
            eyebrow="The Society"
            title="A decade of defending what matters."
            description="We are a member-run collective of security researchers, engineers and students. We publish original research, run open training, and build the pipeline of practitioners the industry keeps hiring from."
          />
          <Reveal delay={0.2} className="mt-12">
            <div className="flex flex-wrap gap-3">
              {["Research", "Training", "CTF", "Disclosure", "Mentorship", "Policy"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground transition-colors duration-500 hover:border-primary/60 hover:text-foreground"
                >
                  {t.toUpperCase()}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-full opacity-40 blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab,var(--violet) 30%,transparent), transparent 70%)",
            }}
          />
          <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
            {stats.map((s, i) => (
              <li
                key={s.label}
                className="group relative bg-background p-8 transition-colors duration-700 hover:bg-surface/70"
              >
                <Reveal delay={i * 0.07}>
                  <p className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-none font-medium tracking-[-0.05em] text-foreground">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                    {s.label.toUpperCase()}
                  </p>
                </Reveal>
                <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-[var(--gradient-line)] transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-x-100" />
              </li>
            ))}
            <li className="relative hidden bg-background p-8 sm:block">
              <Sparkles className="h-5 w-5 animate-floaty text-accent" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Independent. Non-profit. Member funded.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* --------------------- SECTION 03 — CONFERENCE ------------------------ */
const TARGET = new Date("2027-03-12T09:00:00Z").getTime();

function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(TARGET - Date.now(), 0);
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells: Array<[string, number]> = [
    ["Days", t.d],
    ["Hours", t.h],
    ["Minutes", t.m],
    ["Seconds", t.s],
  ];

  return (
    <div className="grid grid-cols-4 gap-px overflow-hidden rounded-sm border border-border bg-border">
      {cells.map(([label, v]) => (
        <div key={label} className="bg-surface/70 px-2 py-5 text-center backdrop-blur-xl">
          <p className="font-display text-[clamp(1.4rem,3.2vw,2.4rem)] leading-none font-medium tabular-nums text-foreground">
            {String(v).padStart(2, "0")}
          </p>
          <p className="mt-2 font-mono text-[9px] tracking-[0.22em] text-muted-foreground">
            {label.toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Conference() {
  return (
    <section id="conference" className="relative overflow-hidden border-y border-border/60">
      <div className="absolute inset-0">
        <img
          src={images.confStage}
          alt="Sentinel Summit main stage"
          loading="lazy"
          width={1600}
          height={1000}
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_8%,color-mix(in_oklab,var(--background)_55%,transparent)_60%,var(--background))]" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 py-28 md:px-10 md:py-40 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionHeading
            index="03"
            eyebrow="Annual Conference"
            title="SENTINEL SUMMIT 2027"
            description="Three days of original research, adversarial simulation and hands-on training — under one roof, with the people actually doing the work."
          />

          <Reveal delay={0.2} className="mt-12">
            <dl className="grid gap-8 sm:grid-cols-3">
              {[
                { icon: CalendarDays, label: "Date", value: "March 12–14, 2027" },
                { icon: MapPin, label: "Venue", value: "Aurora Convention Centre" },
                { icon: Sparkles, label: "Theme", value: "Trust, Rebuilt" },
              ].map((d) => (
                <div key={d.label}>
                  <dt className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                    <d.icon className="h-3.5 w-3.5 text-primary" />
                    {d.label.toUpperCase()}
                  </dt>
                  <dd className="mt-3 font-display text-lg leading-snug tracking-tight">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass relative rounded-sm p-7 shadow-[var(--shadow-elevate)] md:p-9">
            <div
              aria-hidden
              className="absolute inset-x-8 -top-px h-px bg-[var(--gradient-line)]"
            />
            <p className="eyebrow">Doors open in</p>
            <div className="mt-5">
              <Countdown />
            </div>

            <div className="mt-9">
              <p className="eyebrow">Agenda preview</p>
              <ul className="mt-4">
                {agenda.map((a, i) => (
                  <motion.li
                    key={a.time}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                    className="group flex items-start gap-4 border-b border-border/70 py-3.5 last:border-0"
                  >
                    <span className="mt-0.5 font-mono text-[11px] text-primary">{a.time}</span>
                    <span className="flex-1 text-sm leading-snug text-foreground/90 transition-colors group-hover:text-foreground">
                      {a.title}
                    </span>
                    <span className="hidden font-mono text-[10px] tracking-[0.18em] text-muted-foreground sm:block">
                      {a.tag.toUpperCase()}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <MagneticLink href="#join" variant="accent" className="mt-9 w-full justify-center">
              Register for the Conference
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------- SECTION 07 — TIMELINE ------------------------- */
export function Timeline() {
  const reduced = useReducedMotion();
  return (
    <Section id="timeline">
      <SectionHeading
        index="07"
        eyebrow="Trajectory"
        title="Twelve years, one obsession."
      />
      <div className="relative mt-20 pl-8 md:pl-0">
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-0 w-px bg-border md:left-1/2"
        />
        <motion.div
          aria-hidden
          initial={reduced ? {} : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute top-0 bottom-0 left-0 w-px origin-top bg-[linear-gradient(to_bottom,var(--primary),var(--accent),var(--violet))] md:left-1/2"
        />
        <ul className="flex flex-col gap-16">
          {timeline.map((item, i) => (
            <li
              key={item.year}
              className={`relative md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}
            >
              <span
                aria-hidden
                className={`absolute top-2 -left-[calc(2rem+4px)] h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_var(--primary)] md:left-auto ${
                  i % 2 ? "md:-left-1" : "md:-right-1"
                }`}
              />
              <Reveal delay={i * 0.05}>
                <p className="font-mono text-[11px] tracking-[0.28em] text-primary">{item.year}</p>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:inline-block">
                  {item.desc}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
