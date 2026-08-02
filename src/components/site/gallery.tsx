import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { MapPin } from "lucide-react";
import "swiper/css";
import "swiper/css/free-mode";
import { gallery } from "./data";

export function CinematicGallery() {
  return (
    <section aria-label="Last year's conference" className="relative py-20 md:py-28">
      <div className="mx-auto mb-10 flex w-[min(94vw,80rem)] items-end justify-between gap-6 px-1">
        <div>
          <p className="eyebrow">Sentinel Summit — Archive</p>
          <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-tight font-medium">
            Last year, in frames.
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground md:block">
          Three days. 1,600 attendees. Drag to explore the archive.
        </p>
      </div>

      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={20}
        loop
        grabCursor
        freeMode={{ enabled: true, momentum: true, momentumRatio: 0.6 }}
        speed={7000}
        autoplay={{ delay: 1, disableOnInteraction: false, pauseOnMouseEnter: true }}
        allowTouchMove
        className="!px-[3vw]"
      >
        {[...gallery, ...gallery].map((item, i) => (
          <SwiperSlide
            key={`${item.title}-${i}`}
            className="!w-[78vw] sm:!w-[46vw] lg:!w-[32vw]"
          >
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-border">
              <img
                src={item.src}
                alt={`${item.title} — ${item.location}, ${item.year}`}
                loading="lazy"
                width={1400}
                height={1000}
                className="h-full w-full scale-[1.04] object-cover brightness-[0.78] saturate-[1.05] transition-[transform,filter] duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-110 group-hover:brightness-100"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--background)_92%,transparent),transparent_55%)]" />
              <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                <div className="glass rounded-sm px-4 py-3">
                  <p className="font-display text-sm font-medium tracking-tight">{item.title}</p>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary" />
                    {item.location.toUpperCase()}
                  </p>
                </div>
                <span className="glass rounded-sm px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-primary">
                  {item.year}
                </span>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
