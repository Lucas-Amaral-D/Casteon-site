import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

import logoAsset from "@/assets/casteon-logo.png";
import heroImg from "@/assets/hero-residence.jpg";
import stoneMacro from "@/assets/stone-macro.jpg";
import manifestoImg from "@/assets/manifesto-wall.jpg";
import beforeFacade from "@/assets/before-facade.jpg";
import afterFacade from "@/assets/after-facade.jpg";
import stoneWall1 from "@/assets/stone-wall-1.png";
import stoneWater from "@/assets/stone-water.png";
import stoneStairs from "@/assets/stone-stairs.png";
import stoneGourmet from "@/assets/stone-gourmet.png";
import stonePool from "@/assets/stone-pool.png";
import stoneBathroom from "@/assets/stone-bathroom.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CASTEON | Pedra Atacama, Travertino e Pedras Naturais em Palmas - TO" },
      {
        name: "description",
        content:
          "A CASTEON transforma fachadas, revestimentos e paisagismo com Pedra Atacama, Travertino e pedras naturais selecionadas para projetos residenciais e comerciais de alto padrão em Palmas e região.",
      },
      {
        property: "og:title",
        content: "CASTEON | Arquitetura em Pedra Natural",
      },
      {
        property: "og:description",
        content:
          "Pedra Atacama, Travertino e Pedras Naturais para projetos de alto padrão em Palmas - TO.",
      },
    ],
  }),
  component: Index,
});

/* ---------- Utility: Reveal on scroll ---------- */
function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay, ease: [0.19, 1, 0.22, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoAsset} alt="Casteon" className="h-12 w-auto md:h-14" />
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {[
            ["Manifesto", "#manifesto"],
            ["Materiais", "#produtos"],
            ["Projetos", "#galeria"],
            ["Contato", "#contato"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[11px] uppercase tracking-[0.3em] text-foreground/70 transition-colors hover:text-gold"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="hidden text-[11px] uppercase tracking-[0.3em] text-gold transition-opacity hover:opacity-70 md:inline-flex"
        >
          Orçamento
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });
  const scale = useTransform(smooth, [0, 1], [1, 1.25]);
  const y = useTransform(smooth, [0, 1], [0, 260]);
  const overlayOpacity = useTransform(smooth, [0, 1], [0.2, 0.85]);
  const opacity = useTransform(smooth, [0, 0.7], [1, 0]);
  const textY = useTransform(smooth, [0, 1], [0, -120]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100dvh] w-full overflow-hidden bg-background"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Residência contemporânea com fachada em Pedra Atacama ao entardecer"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/10 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-background pointer-events-none" />
      </motion.div>

      <motion.div
        style={{ opacity, y: textY }}
        className="absolute inset-0 flex flex-col justify-end px-6 pb-20 sm:pb-24 md:px-16 md:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="text-eyebrow mb-4 sm:mb-6"
        >
          Casteon — desde a matéria
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif max-w-[18ch] text-[11vw] leading-[0.95] text-foreground sm:text-[9vw] md:text-[7.5vw] lg:text-[6.2vw]"
        >
          A arquitetura<br />
          <span className="italic text-gold">começa</span> na pedra.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-8 md:text-base"
        >
          Pedra Atacama, Travertino e pedras naturais selecionadas para
          fachadas, revestimentos e paisagismo de alto padrão.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ---------- Manifesto ---------- */
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  const scale = useTransform(smooth, [0, 1], [1.25, 1]);
  const y = useTransform(smooth, [0, 1], [-160, 160]);

  return (
    <section id="manifesto" ref={ref} className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-28 md:grid-cols-12 md:gap-16 md:px-12 md:py-44">
        <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <Reveal>
            <p className="text-eyebrow mb-8">Manifesto — 01</p>
            <h2 className="font-serif text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
              Nós acreditamos que a arquitetura{" "}
              <span className="italic text-gold">começa na matéria.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-md text-sm leading-loose text-muted-foreground md:text-base">
              Cada pedra carrega o tempo. O relevo, a fissura, a cor que só o
              sol lateral revela. A Casteon seleciona um a um os fragmentos que
              se tornarão parede, muro, piscina, memória.
            </p>
          </Reveal>
        </div>

        <div className="relative md:col-span-7 md:h-[110vh]">
          <div className="relative h-[70vh] overflow-hidden md:sticky md:top-24 md:h-[80vh]">
            <motion.img
              src={manifestoImg}
              alt="Parede inteira em pedra natural iluminada ao entardecer"
              style={{ scale, y }}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Products ---------- */
const products = [
  {
    n: "01",
    name: "Pedra Atacama",
    desc: "Relevo escultural. Textura tátil. A pedra que transforma qualquer fachada em manifesto.",
    img: stoneWall1,
  },
  {
    n: "02",
    name: "Travertino",
    desc: "Naturalidade atemporal. Tons quentes que atravessam décadas sem envelhecer.",
    img: stoneWater,
  },
  {
    n: "03",
    name: "Pedras Naturais",
    desc: "Um repertório curado de materiais selecionados para o alto padrão residencial.",
    img: stoneBathroom,
  },
  {
    n: "04",
    name: "Paisagismo",
    desc: "Pedra como paisagem. Espelhos d’água, muros e áreas de convivência integrados à natureza.",
    img: stonePool,
  },
];

function ProductRow({ p, i }: { p: (typeof products)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.5 });
  const y = useTransform(smooth, [0, 1], [-120, 120]);
  const scale = useTransform(smooth, [0, 1], [1.15, 1]);
  const reverse = i % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-16 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="md:col-span-7">
        <div className="relative aspect-[3/4] overflow-hidden md:aspect-[16/11]">
          <motion.img
            src={p.img}
            alt={p.name}
            style={{ y, scale }}
            className="absolute inset-0 h-[115%] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="md:col-span-5">
        <Reveal>
          <p className="text-eyebrow mb-6">{p.n} — Material</p>
          <h3 className="font-serif text-4xl leading-tight md:text-6xl">{p.name}</h3>
          <p className="mt-6 max-w-md text-sm leading-loose text-muted-foreground md:text-base">
            {p.desc}
          </p>
          <a
            href="#contato"
            className="mt-10 inline-flex items-center gap-3 border-b border-gold/40 pb-2 text-[11px] uppercase tracking-[0.3em] text-gold transition-all hover:gap-5 hover:border-gold"
          >
            Conhecer
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </div>
  );
}

function Products() {
  return (
    <section id="produtos" className="relative bg-graphite">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-44">
        <Reveal>
          <p className="text-eyebrow mb-6">Materiais — Casteon</p>
          <h2 className="font-serif max-w-[16ch] text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
            Uma curadoria de pedras <span className="italic text-gold">excepcionais.</span>
          </h2>
        </Reveal>
        <div className="mt-24 flex flex-col gap-28 md:gap-40">
          {products.map((p, i) => (
            <ProductRow key={p.n} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Premium carousel ---------- */
const slides = [
  {
    img: stoneWater,
    title: "Espelho d’água",
    caption: "Travertino aplicado em cortina de água.",
  },
  { img: stoneGourmet, title: "Área gourmet", caption: "Textura viva sob luz cálida." },
  { img: stoneStairs, title: "Circulação", caption: "Ritmo e relevo em escala arquitetônica." },
  { img: stonePool, title: "Piscina", caption: "Pedra que dialoga com a água." },
  { img: stoneBathroom, title: "Interior", caption: "Contraste entre mármore e pedra bruta." },
  { img: stoneWall1, title: "Painel", caption: "Parede escultural em Pedra Atacama." },
];

function PremiumCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, dragFree: false, align: "center" });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  return (
    <section className="relative overflow-hidden bg-background py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-eyebrow mb-6">Projetos — Portfólio</p>
              <h2 className="font-serif max-w-[18ch] text-4xl leading-[1.05] md:text-6xl">
                Como se folheasse uma <span className="italic text-gold">revista.</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => embla?.scrollPrev()}
                aria-label="Anterior"
                className="grid h-12 w-12 place-items-center rounded-full border border-border text-foreground/70 transition-all hover:border-gold hover:text-gold"
              >
                ←
              </button>
              <button
                onClick={() => embla?.scrollNext()}
                aria-label="Próximo"
                className="grid h-12 w-12 place-items-center rounded-full border border-border text-foreground/70 transition-all hover:border-gold hover:text-gold"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 overflow-hidden md:mt-20" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((s, i) => (
            <div
              key={i}
              className="relative min-w-0 shrink-0 grow-0 basis-[88%] px-3 md:basis-[72%] md:px-6 lg:basis-[62%]"
            >
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-[16/10]">
                <motion.img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover"
                  animate={{ scale: index === i ? 1 : 1.08 }}
                  transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 bg-gradient-to-t from-background/80 to-transparent p-6 md:p-10">
                  <div>
                    <p className="text-eyebrow mb-2">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="font-serif text-2xl md:text-4xl">{s.title}</h3>
                    <p className="mt-2 max-w-xs text-xs text-muted-foreground md:text-sm">
                      {s.caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1600px] items-center gap-2 px-6 md:px-12">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => embla?.scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-px transition-all ${
              index === i ? "w-16 bg-gold" : "w-8 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
function Gallery() {
  const tiles = [
    { img: stoneWall1, span: "md:col-span-8 md:row-span-2 aspect-[4/5] md:aspect-auto" },
    { img: stoneStairs, span: "md:col-span-4 aspect-[3/4]" },
    { img: stoneGourmet, span: "md:col-span-4 aspect-[4/3]" },
    { img: stoneWater, span: "md:col-span-5 aspect-[3/4]" },
    { img: stoneBathroom, span: "md:col-span-7 aspect-[4/3]" },
    { img: stonePool, span: "md:col-span-12 aspect-[16/9]" },
  ];
  return (
    <section id="galeria" className="relative bg-background py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="text-eyebrow mb-6">Galeria — Projetos</p>
          <h2 className="font-serif max-w-[20ch] text-4xl leading-[1.05] md:text-6xl">
            Cada projeto, uma <span className="italic text-gold">obra única.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:gap-6">
          {tiles.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 1.2,
                delay: (i % 3) * 0.12,
                ease: [0.19, 1, 0.22, 1],
              }}
              className={`group relative overflow-hidden ${t.span}`}
            >
              <img
                src={t.img}
                alt=""
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Diferenciais ---------- */
function Diferenciais() {
  const items = [
    { t: "Materiais selecionados", d: "Curadoria pedra a pedra, por lote." },
    { t: "Acabamento premium", d: "Precisão de junta, textura e assentamento." },
    { t: "Atendimento personalizado", d: "Consultoria dedicada a cada projeto." },
    { t: "Projetos exclusivos", d: "Soluções sob medida para arquitetos." },
    { t: "Entrega com excelência", d: "Logística e cronograma respeitados." },
    { t: "Assistência técnica", d: "Acompanhamento em obra quando necessário." },
  ];
  return (
    <section className="relative bg-graphite py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="text-eyebrow mb-6">Diferenciais — Casteon</p>
          <h2 className="font-serif max-w-[18ch] text-4xl leading-[1.05] md:text-6xl">
            Um padrão de <span className="italic text-gold">exceção.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:mt-20 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="h-full bg-background p-8 transition-colors hover:bg-card md:p-12">
                <div className="mb-8 h-px w-10 bg-gold" />
                <h3 className="font-serif text-2xl leading-tight md:text-3xl">{it.t}</h3>
                <p className="mt-4 text-sm leading-loose text-muted-foreground">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Before / After ---------- */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClient = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  };

  useEffect(() => {
    const move = (e: MouseEvent) => dragging.current && setFromClient(e.clientX);
    const touch = (e: TouchEvent) =>
      dragging.current && e.touches[0] && setFromClient(e.touches[0].clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", touch);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", touch);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <section className="relative bg-background py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="text-eyebrow mb-6">Antes / Depois</p>
          <h2 className="font-serif max-w-[20ch] text-4xl leading-[1.05] md:text-6xl">
            A pedra <span className="italic text-gold">transforma</span> o espaço.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={containerRef}
            onMouseDown={(e) => {
              dragging.current = true;
              setFromClient(e.clientX);
            }}
            onTouchStart={(e) => {
              dragging.current = true;
              if (e.touches[0]) setFromClient(e.touches[0].clientX);
            }}
            className="relative mt-16 aspect-[16/10] w-full cursor-ew-resize overflow-hidden select-none md:mt-20"
          >
            <img
              src={afterFacade}
              alt="Depois — fachada em pedra natural"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              loading="lazy"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <img
                src={beforeFacade}
                alt="Antes — fachada sem revestimento em pedra"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ width: `${(100 / pos) * 100}%`, minWidth: "100%" }}
                draggable={false}
                loading="lazy"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-y-0"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-gold" />
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-gold text-background text-xs">
                ⇔
              </div>
            </div>
            <div className="pointer-events-none absolute left-6 top-6 text-eyebrow">
              Antes
            </div>
            <div className="pointer-events-none absolute right-6 top-6 text-eyebrow">
              Depois
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section id="contato" ref={ref} className="relative h-[100dvh] min-h-[640px] overflow-hidden">
      <motion.img
        src={stoneMacro}
        alt=""
        style={{ scale, y }}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <p className="text-eyebrow mb-8">Casteon — Convite</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-serif mx-auto max-w-[16ch] text-5xl leading-[0.95] md:text-8xl">
            Seu projeto merece um{" "}
            <span className="italic text-gold">acabamento atemporal.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <a
            href="https://wa.me/5563984516123"
            target="_blank"
            rel="noreferrer"
            className="mt-14 inline-flex items-center gap-4 border border-gold px-10 py-5 text-[11px] uppercase tracking-[0.35em] text-gold transition-all hover:bg-gold hover:text-background"
          >
            Solicite um orçamento
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-4 md:gap-16 md:px-12">
        <div className="md:col-span-2">
          <img src={logoAsset} alt="Casteon" className="h-20 w-auto" />
          <p className="mt-8 max-w-sm text-sm leading-loose text-muted-foreground">
            Pedra Atacama, Travertino e pedras naturais para arquitetura de alto
            padrão. Palmas, Tocantins.
          </p>
        </div>
        <div>
          <p className="text-eyebrow mb-6">Contato</p>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li>
              <a
                className="transition-colors hover:text-gold"
                href="https://wa.me/5563984516123"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp · (63) 98451-6123
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-gold"
                href="https://wa.me/5563984138597"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp · (63) 98413-8597
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-gold"
                href="https://www.instagram.com/castelonoficial/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram · @castelonoficial
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-eyebrow mb-6">Localização</p>
          <p className="text-sm text-foreground/80">
            Palmas · Tocantins
            <br />
            <span className="text-muted-foreground">Em breve, showroom.</span>
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-3 px-6 py-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:items-center md:px-12">
          <span>© {new Date().getFullYear()} Casteon. Todos os direitos reservados.</span>
          <span>Palmas · TO · Brasil</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function Index() {
  // Smooth scroll for anchor links
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("dark");
    return () => html.classList.remove("dark");
  }, []);

  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <Manifesto />
      <Products />
      <PremiumCarousel />
      <Gallery />
      <Diferenciais />
      <BeforeAfter />
      <CTA />
      <Footer />
    </main>
  );
}
