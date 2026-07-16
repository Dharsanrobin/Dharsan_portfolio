import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import Lenis from "lenis";

import portrait from "@/assets/portrait.jpeg";
import projectNutrade from "@/assets/martoz.jpeg";
import projectAuction from "@/assets/project-auction.jpg";
import projectBakebuddy from "@/assets/project-bakebuddy.jpg";
import projectNucamp from "@/assets/project-nucamp.jpeg";

/* ---------------- Data ---------------- */

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#craft" },
  { label: "Tech Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const EXPERIENCES = [
  {
    company: "Numota Technology",
    role: "React Frontend Developer",
    subtitle: "Promoted from Intern",
    period: "Oct 2023 — Aug 2025",
    location: " Full-time",
    chapter: "01",
    projects: [
      {
        name: "Nu Trade",
        tagline: "Real-time trading dashboard",
        bullets: [
          "Built a responsive real-time trading dashboard in React with Axios and Fetch, wired to live REST APIs for streaming market data.",
          "Authored a reusable component library that lifted rendering speed by 25% and reclaimed roughly four days of engineering time per sprint.",
          "Partnered with Python & MySQL backend engineers on technical specs, debugging, and integration for latency-sensitive flows.",
          "Owned code testability — manual UI verification, edge-case regression, and pre-deployment sign-off.",
        ],
        tags: ["React", "Axios", "REST", "MySQL", "Python API"],
      },
      {
        name: "NuCamp",
        tagline: "Camp management platform",
        bullets: [
          "Shipped React modules for scheduling, registrations, and real-time data handling used by operational staff.",
          "Delivered responsive interfaces that streamlined organisational workflows across daily operations.",
          "Scoped requirements and delivered features inside disciplined Agile sprint cycles.",
        ],
        tags: ["React", "Agile", "Real-time"],
      },
    ],
  },
  {
    company: "Independent Studio",
    role: "React Frontend Developer",
    subtitle: "Freelance · Team Project",
    period: "Sep 2025 — Mar 2026",
    location: "Remote",
    chapter: "02",
    projects: [
      {
        name: "Commercial Trading Web App",
        tagline: "Modular frontend architecture",
        bullets: [
          "Architected modular frontend interfaces for a live commercial trading platform in production use.",
          "Built responsive dashboards and dynamic data visualization components against real-time REST APIs.",
          "Optimized frontend performance, resolved bugs surfaced by clients, and iteratively shipped requested features.",
        ],
        tags: ["React", "TypeScript", "REST", "Charts"],
      },
    ],
  },
  {
    company: "Independent Studio",
    role: "React Frontend Developer",
    subtitle: "Freelance · Team Project",
    period: "Apr 2026 — Present",
    location: "Remote",
    chapter: "03",
    projects: [
      {
        name: "Online Grocery & Ice Cream Booking",
        tagline: "React storefront with SEO-first catalog",
        bullets: [
          "Built the React frontend for an online booking app for grocery and ice-cream orders.",
          "Handled inventory data entry, product listings, and SEO-friendly product copywriting to improve organic reach.",
        ],
        tags: ["React", "SEO", "Catalog"],
      },
    ],
  },
];

const PROJECTS = [
  {
    id: "01",
    name: "eTournament Auction Manager",
    kicker: "Independent · Full-stack",
    tagline: "A live IPL-style auction platform where budgets move in real time.",
    image: projectAuction,
    stack: ["React.js", "Java Spring Boot", "REST API", "SQL"],
    role: "Full-stack engineer",
    challenge:
      "Auctions demand millisecond-tight state — a bid needs to reflect on every screen before the next bid is placed.",
    solution:
      "Engineered a Spring Boot backend with dedicated endpoints for player bidding, dynamic team-budget tracking, and instant roster updates, all driving a responsive React interface.",
    impact:
      "Runs live tournaments end to end with synchronized rosters, tight budget enforcement, and no drift between organisers and teams.",
  },
  
  {
    id: "02",
    name: "Martoz",
    kicker: "Freelance / Team Project · Booking platform",
    tagline: "An online ordering app for grocery and ice cream, built for real shop workflows.",
    image: projectNutrade,
    stack: ["React.js", "REST", "SEO"],
    role: "Frontend developer",
    challenge:
      "A local shop needed a simple ordering experience for customers, plus a way to manage inventory and product listings without a dev team on standby.",
    solution:
      "Built the full React.js frontend for browsing and ordering, and owned inventory data entry — writing SEO-friendly product descriptions to improve discoverability.",
    impact:
      "Gave the shop a working storefront and searchable product catalog, with content built to rank rather than just list.",
  },
  
  {
    id: "03",
    name: "BakeBuddy",
    kicker: "Independent · E-commerce",
    tagline: "A mobile-first cake booking storefront with a calm checkout.",
    image: projectBakebuddy,
    stack: ["React.js", "JavaScript", "CSS"],
    role: "Frontend engineer",
    challenge:
      "Small bakeries needed a booking flow their customers could complete on a phone, one thumb, one hand.",
    solution:
      "Designed a mobile-responsive React storefront with a product catalog and a multi-step order form that removes friction from checkout.",
    impact:
      "Streamlined ordering into a guided sequence with clear steps, saving customers time and reducing drop-off.",
  },
  {
    id: "04",
    name: "Trading Interface Rebuild",
    kicker: "Freelance / Team Project · Commercial trading app",
    tagline: "A modular frontend for a live commercial trading platform.",
    image: projectNucamp,
    stack: ["React.js", "REST", "Data Visualization"],
    role: "Frontend developer",
    challenge:
      "A live trading product needed dashboards that could visualize real-time data clearly while shipping client-requested features on an ongoing basis.",
    solution:
      "Architected modular frontend interfaces and built dynamic data visualization components wired to real-time REST APIs.",
    impact:
      "Kept the product moving with iterative bug fixes and feature delivery, while the interface stayed responsive under continuous change.",
  },
];

const SKILL_GROUPS = [
  {
    title: "Frontend & Architecture",
    items: ["React.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "React Ecosystem & State",
    items: ["React Hooks", "Context API", "React Router", "Reusable Component Architecture"],
  },
  {
    title: "Backend & Data",
    items: ["Java", "Spring Boot", "REST API Design", "Axios", "Fetch API", "SQL", "MySQL", "JSON"],
  },
  {
    title: "Tools & Testing",
    items: ["GitHub", "Postman", "Swagger", "VS Code", "Debugging", "API / UI Testing"],
  },
];

const STACK_FLOW = [
  { label: "React", note: "Component-first UI" },
  { label: "TypeScript", note: "Type-safe contracts" },
  { label: "REST APIs", note: "Data boundary" },
  { label: "Axios / Fetch", note: "Transport" },
  { label: "Spring Boot", note: "Service layer" },
  { label: "Java", note: "Business logic" },
  { label: "MySQL", note: "Persistence" },
  { label: "GitHub", note: "Ship & collaborate" },
];

/* ---------------- Hooks ---------------- */

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

/* ---------------- Building blocks ---------------- */

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,[data-magnetic]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full mix-blend-multiply"
        animate={{
          width: hover ? 56 : 14,
          height: hover ? 56 : 14,
          x: hover ? -28 : -7,
          y: hover ? -28 : -7,
          backgroundColor: hover ? "rgba(184,147,95,0.35)" : "rgba(36,33,29,0.85)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 0.9, 0.28, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ chapter, title }: { chapter: string; title: string }) {
  return (
    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">
      <span className="font-mono-editorial">{chapter}</span>
      <span className="h-px w-10 bg-[color:var(--foreground)]/30" />
      <span>{title}</span>
    </div>
  );
}

function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 });
  const sy = useSpring(y, { stiffness: 220, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={
        "group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium transition-colors " +
        (variant === "primary"
          ? "bg-[color:var(--foreground)] text-[color:var(--background)] hover:bg-[color:var(--bronze)]"
          : "border border-[color:var(--foreground)]/25 text-[color:var(--foreground)] hover:border-[color:var(--foreground)]/60")
      }
    >
      {children}
      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
    </motion.a>
  );
}

/* ---------------- Sections ---------------- */

function Nav() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sectionIds = NAV.map((item) => item.href.replace("#", ""));

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140;
      let current = "top";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 0.9, 0.28, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center "
    >
      <div
        className={
          "flex w-full items-center justify-between px-6 py-4 transition-all bg-[color:var(--secondary-bg)]/95"
        }
      >
        <a href="#top" className="flex items-center gap-3 font-display text-3xl font-medium tracking-tight px-5 ">
          Dharsan.R
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => {
            const id = n.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={n.href}
                href={n.href}
                className={
                  "relative pb-1 text-base transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[color:var(--foreground)] after:transition-all " +
                  (isActive
                    ? "text-[color:var(--foreground)] after:w-full"
                    : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] hover:after:w-full")
                }
              >
                {n.label}
              </a>
            );
          })}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-[color:var(--foreground)] px-6 py-3 text-sm uppercase tracking-widest text-[color:var(--background)] transition-colors hover:bg-[color:var(--bronze)]"
        >
          Get in touch
        </a>
      </div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const cardWrap = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroZ = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const heroRotX = useTransform(scrollYProgress, [0, 1], [0, 6]);

  // pointer-driven 3D tilt for portrait card
  const rx = useMotionValue(14);
  const ry = useMotionValue(-22);
  const srx = useSpring(rx, { stiffness: 90, damping: 14 });
  const sry = useSpring(ry, { stiffness: 90, damping: 14 });

  const onCardMove = (e: React.MouseEvent) => {
    const el = cardWrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(-22 + px * 22);
    rx.set(14 - py * 20);
  };
  const onCardLeave = () => {
    rx.set(14);
    ry.set(-22);
  };

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-32">
      {/* 3D grid floor */}
      <div aria-hidden className="grid-floor animate-grid-drift" />

      {/* ambient chrome glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-[-15%] h-[560px] w-[560px] rounded-full opacity-40 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, rgba(180,180,190,0.35), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-25%] right-[-10%] h-[680px] w-[680px] rounded-full opacity-40 blur-3xl animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgba(90,90,100,0.45), transparent 60%)",
          animationDelay: "-6s",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(255,255,255,0.06), transparent 70%), linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      <motion.div
        style={{ z: heroZ, rotateX: heroRotX }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 perspective-hero preserve-3d md:grid-cols-12 md:gap-16 md:pb-40"
      >
        {/* Left copy */}
        <motion.div style={{ opacity }} className="relative md:col-span-7 md:pt-6">
          <Reveal>
            <div className="inline-flex items-center gap-4">
              <span className="h-px w-10 bg-[color:var(--foreground)]/15" />
              <span className="font-mono-editorial text-[10px] uppercase tracking-[0.4em] text-[color:var(--muted-foreground)]">
                Portfolio · Dharsan R - React.js Developer
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative mt-8">
              <h1 className="relative z-10 font-display text-[clamp(3.2rem,8.6vw,7.5rem)] font-black leading-[0.9] tracking-tighter text-[color:var(--foreground)]">
                RE
                <span className="text-chrome font-serif-editorial italic">ACT</span>
                <br />
                <span className="relative inline-block">
                  DEVELOPER
                </span>
              </h1>
              {/* Ghost layer for depth */}
              <h1
                aria-hidden
                className="pointer-events-none absolute left-[3px] top-[3px] z-0 font-display text-[clamp(3.2rem,8.6vw,7.5rem)] font-black leading-[0.9] tracking-tighter text-[color:var(--foreground)]/[0.08] blur-[2px]"
              >
                REACT
                <br />
                ARCHITECT
              </h1>
              <h1
                aria-hidden
                className="pointer-events-none absolute left-[8px] top-[8px] z-0 font-display text-[clamp(3.2rem,8.6vw,7.5rem)] font-black leading-[0.9] tracking-tighter text-[color:var(--foreground)]/[0.04] blur-[6px]"
              >
                REACT
                <br />
                ARCHITECT
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-[color:var(--muted-foreground)]">
              I&apos;m <span className="text-[color:var(--foreground)]">Dharsan R</span>, a React.js developer with two years
              of production experience — crafting high-performance dashboards, reusable component systems,
              and full-stack features backed by <span className="text-[color:var(--foreground)]">Java &amp; Spring Boot</span>.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <MagneticButton href="#work">View Projects</MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Contact
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-[color:var(--foreground)]/10 pt-8">
              {[
                { k: "2+", v: "Years in production React" },
                { k: "10+", v: "PROJECTS DELIVERED" },
                { k: "20+", v: "TECHNOLOGIES MASTERED" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-3xl text-[color:var(--foreground)]">{s.k}</dt>
                  <dd className="mt-1 font-mono-editorial text-[10px] uppercase tracking-[0.25em] text-[color:var(--muted-foreground)]">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </motion.div>

        {/* 3D Portrait stack */}
        <div className="md:col-span-5">
          <motion.div
            style={{ y: yPortrait }}
            className="perspective-hero relative mx-auto flex h-[560px] w-full max-w-md items-center justify-center"
          >
            {/* Orbit ring — rotates on the floor plane */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] rounded-full border border-[color:var(--foreground)]/10 animate-orbit"
              style={{ transform: "translate(-50%, -50%) rotateX(72deg)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] rounded-full border border-[color:var(--foreground)]/[0.06]"
              style={{ transform: "translate(-50%, -50%) rotateX(72deg)" }}
            />

            {/* Tilted card */}
            <motion.div
              ref={cardWrap}
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
              style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
              className="relative h-[480px] w-[340px] preserve-3d"
            >
              {/* deep shadow layer */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-sm bg-[color:var(--secondary-bg)]/70 blur-3xl"
                style={{ transform: "translateZ(-80px)" }}
              />

              {/* card body */}
              <div
                className="absolute inset-0 overflow-hidden rounded-sm border border-[color:var(--foreground)]/12 bg-[color:var(--background)] p-1 shadow-2xl"
                style={{ transform: "translateZ(0px)" }}
              >
                <div className="relative h-full w-full overflow-hidden bg-[color:var(--secondary-bg)]">
                  <img
                    src={portrait}
                    alt="Portrait of Dharsan R"
                    width={1024}
                    height={1280}
                    className="h-full w-full scale-110 object-cover grayscale contrast-[1.05] transition-all duration-1000 hover:scale-100 hover:grayscale-0"
                    data-replaceable-portrait="Replace this with your own photo"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <div className="font-mono-editorial text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
                        React Developer
                      </div>
                      <div className="mt-2 font-serif-editorial text-2xl italic text-[color:var(--foreground)]">
                        Dharsan R
                      </div>
                    </div>
                    <div className="text-right font-mono-editorial text-[10px] uppercase tracking-[0.25em] text-[color:var(--muted-foreground)]">
                      Chennai 
                    </div>
                  </div>
                </div>
              </div>

              {/* corner frame accents (in front) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 border-r border-t border-[color:var(--foreground)]/20"
                style={{ transform: "translateZ(60px)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16 border-b border-l border-[color:var(--foreground)]/20"
                style={{ transform: "translateZ(60px)" }}
              />

              {/* Floating glass tag — front */}
              <div
                className="glass absolute -bottom-10 -right-16 hidden w-64 rounded-sm p-5 md:block"
                style={{ transform: "translateZ(80px)" }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-mono-editorial text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
                      SPECIALIZED IN
                    </div>
                    <div className="mt-1 font-serif-editorial text-xl italic text-[color:var(--foreground)]">
                      React Ecosystem
                    </div>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--foreground)]/15">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary floating chip — back */}
              <div
                className="glass absolute -left-10 top-10 hidden rounded-sm px-4 py-3 md:block"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="font-mono-editorial text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
                  EXPERTISE
                </div>
                <div className="mt-1 font-serif-editorial text-sm italic text-[color:var(--foreground)]">
                  React • Java • Spring Boot
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* marquee */}
      <div className="relative border-y border-[color:var(--foreground)]/10 bg-[color:var(--secondary-bg)]/40 py-6 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14 font-display text-2xl italic text-[color:var(--muted-foreground)] md:text-3xl">
            {Array.from({ length: 2 }).flatMap((_, i) =>
              ["React.js", "TypeScript", "Spring Boot", "REST APIs", "Tailwind", "MySQL", "Reusable Systems", "Real-time UIs"].map(
                (t) => (
                  <span key={`${i}-${t}`} className="flex items-center gap-14">
                    <span>{t}</span>
                    <span className="text-[color:var(--foreground)]/35">◆</span>
                  </span>
                ),
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <SectionLabel chapter="00" title="Philosophy" />

      <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-8">
          <Reveal>
            <p className="font-display text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.15] text-balance">
              I build{" "}
              <span className="font-serif-editorial text-[color:var(--bronze)]">
                scalable, production-ready
              </span>{" "}
              web applications with clean architecture and intuitive user
              experiences. From responsive React interfaces to Spring Boot APIs,
              I focus on writing software that's maintainable, performant, and
              built to solve real business problems.
            </p>
          </Reveal>
        </div>

        <div className="space-y-8 md:col-span-4">
          {[
            {
              k: "React.js",
              v: "Building reusable, responsive, and high-performance user interfaces.",
            },
            {
              k: "Full-Stack",
              v: "Developing end-to-end applications with Spring Boot and MySQL.",
            },
            {
              k: "Collaboration",
              v: "Delivering quality software through Agile teamwork and clean code.",
            },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.1}>
              <div>
                <div className="font-display text-lg">{c.k}</div>
                <div className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                  {c.v}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionLabel chapter="01" title="Journey · Experience" />
      <Reveal>
        <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-tight">
          Years of growth, not just experience
        </h2>
      </Reveal>

      <div className="relative mt-24">
        <div
          aria-hidden
          className="absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-transparent via-[color:var(--foreground)]/30 to-transparent md:left-1/2"
        />
        <div className="space-y-24">
          {EXPERIENCES.map((exp, idx) => (
            <Reveal key={exp.company + exp.period} delay={idx * 0.05}>
              <article className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
                <span
                  aria-hidden
                  className="absolute left-[10px] top-2 h-4 w-4 rounded-full border-4 border-[color:var(--background)] bg-[color:var(--gold)] shadow-[0_0_0_2px_rgba(184,147,95,0.4)] md:left-1/2 md:-translate-x-1/2"
                />
                <div className={idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"}>
                  <div className="pl-10 md:pl-0">
                    <div className="font-mono-editorial text-xs uppercase tracking-[0.28em] text-[color:var(--gold)]">
                      Chapter {exp.chapter}
                    </div>
                    <h3 className="mt-3 font-display text-3xl md:text-4xl">{exp.company}</h3>
                    <div className="mt-2 text-sm text-[color:var(--muted-foreground)]">
                      {exp.role} · {exp.subtitle}
                    </div>
                    <div className="mt-1 font-mono-editorial text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">
                      {exp.period} · {exp.location}
                    </div>
                  </div>
                </div>
                <div className={idx % 2 === 0 ? "" : "md:order-1"}>
                  <div className="space-y-6 pl-10 md:pl-0">
                    {exp.projects.map((p) => (
                      <div key={p.name} className="glass grain rounded-2xl p-6">
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="font-display text-xl">{p.name}</h4>
                          <span className="font-mono-editorial text-[10px] uppercase tracking-widest text-[color:var(--muted-foreground)]">
                            {p.tagline}
                          </span>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                          {p.bullets.map((b) => (
                            <li key={b} className="flex gap-3">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--gold)]" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-[color:var(--foreground)]/15 bg-[color:var(--foreground)]/10 px-3 py-1 text-[11px] uppercase tracking-widest text-[color:var(--foreground)]/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const reverse = index % 2 === 1;
  return (
    <Reveal>
      <article className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ perspective: 1000 }}
          className={"md:col-span-7 " + (reverse ? "md:order-2" : "")}
        >
          <motion.div
            style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
            className="group relative overflow-hidden rounded-3xl border border-[color:var(--foreground)]/35 shadow-[var(--shadow-elegant)]"
          >
            <img
              src={project.image}
              alt={project.name}
              width={1600}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "linear-gradient(180deg, transparent 40%, rgba(36,33,29,0.35))" }}
            />
            <div className="absolute left-4 top-4 rounded-full bg-[color:var(--foreground)]/10 px-3 py-1 font-mono-editorial text-[10px] uppercase tracking-widest text-[color:var(--foreground)] backdrop-blur">
              {project.id} / {project.kicker}
            </div>
          </motion.div>
        </motion.div>

        <div className={"md:col-span-5 " + (reverse ? "md:order-1" : "")}>
          <h3 className="font-display text-4xl leading-[1.05] md:text-5xl">{project.name}</h3>
          <p className="mt-4 font-serif-editorial text-lg text-[color:var(--bronze)]">{project.tagline}</p>

          <div className="mt-8 space-y-6 border-t border-[color:var(--foreground)]/15 pt-6 text-sm">
            <div>
              <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">
                Role
              </div>
              <div className="mt-1">{project.role}</div>
            </div>
            <div>
              <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">
                Challenge
              </div>
              <p className="mt-1 leading-relaxed text-[color:var(--muted-foreground)]">{project.challenge}</p>
            </div>
            <div>
              <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">
                Solution
              </div>
              <p className="mt-1 leading-relaxed text-[color:var(--muted-foreground)]">{project.solution}</p>
            </div>
            <div>
              <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">
                Business value
              </div>
              <p className="mt-1 leading-relaxed text-[color:var(--muted-foreground)]">{project.impact}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[color:var(--foreground)]/20 px-3 py-1 text-[11px] uppercase tracking-widest"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="relative bg-[color:var(--secondary-bg)]/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel chapter="02" title="Selected Work" />
        <div className="mt-8 flex items-end justify-between gap-8">
          <Reveal>
            <h2 className="max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
              Four projects. Each one solved a real problem.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="hidden max-w-sm text-sm text-[color:var(--muted-foreground)] md:block">
              A closer look at the platforms and dashboards I&apos;ve shipped — the challenges they posed,
              the decisions behind them, and the impact they carried.
            </div>
          </Reveal>
        </div>

        <div className="mt-24 space-y-32 ">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Craft() {
  const [active, setActive] = useState(0);
  return (
    <section id="craft" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionLabel chapter="03" title="Craft · Skills" />
      <Reveal>
        <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
          The toolkit — organised the way I actually work.
        </h2>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="sticky top-32 space-y-2">
            {SKILL_GROUPS.map((g, i) => (
              <button
                key={g.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={
                  "group flex w-full items-baseline justify-between rounded-2xl border px-5 py-4 text-left transition-all " +
                  (active === i
                    ? "border-[color:var(--foreground)]/30 bg-white/60 shadow-[var(--shadow-soft)]"
                    : "border-transparent hover:border-[color:var(--foreground)]/15")
                }
              >
                <span className="font-display text-lg">{g.title}</span>
                <span className="font-mono-editorial text-[10px] uppercase tracking-widest text-[color:var(--muted-foreground)]">
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 0.9, 0.28, 1] }}
              className="glass grain rounded-3xl p-8 md:p-12"
            >
              <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
                {String(active + 1).padStart(2, "0")} · Category
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">{SKILL_GROUPS[active].title}</h3>
              <div className="mt-8 flex flex-wrap gap-3">
                {SKILL_GROUPS[active].items.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4 }}
                    className="cursor-default rounded-full border border-[color:var(--foreground)]/20 bg-white/60 px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-[color:var(--gold)] hover:text-[color:var(--bronze)]"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="relative py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(36,33,29,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionLabel chapter="04" title="Ecosystem · Tech Stack" />
        <Reveal>
          <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
            One developer, the whole stack.
          </h2>
        </Reveal>

        <div className="relative mt-24">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STACK_FLOW.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="glass grain relative rounded-2xl p-6">
                  <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-3 font-display text-2xl">{s.label}</div>
                  <div className="mt-2 text-xs text-[color:var(--muted-foreground)]">{s.note}</div>
                  {i < STACK_FLOW.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-[color:var(--foreground)]/40 md:block"
                    >
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-16 max-w-2xl text-center text-sm text-[color:var(--muted-foreground)]">
              No handoffs required — one engineer who can build the frontend, own the backend, and ship without waiting on someone else.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <SectionLabel chapter="05" title="Foundations · Education" />
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <Reveal>
          <div className="glass grain h-full rounded-2xl p-8">
            <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
              Degree
            </div>
            <h3 className="mt-3 font-display text-2xl">B.Sc. Computer Science</h3>
            <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">
              Manonmaniam Sundaranar University · Graduated 2022 · 72% CGPA.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass grain h-full rounded-2xl p-8">
            <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
              Certification
            </div>
            <h3 className="mt-3 font-display text-2xl">Frontend &amp; Full Stack Development</h3>
            <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">
              QSpiders, Chennai · Jul 2022 — Dec 2022. Intensive certified training that shaped the way I
              write full-stack code.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="glass grain h-full rounded-2xl p-8">
            <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
              Languages
            </div>
            <h3 className="mt-3 font-display text-2xl">English · Tamil · Malayalam</h3>
            <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">
              Fluent across three languages — comfortable working with distributed and multilingual teams.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[color:var(--foreground)] py-32 text-[color:var(--background)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(184,147,95,0.7), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(146,116,87,0.8), transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-[color:var(--background)]/60">
          <span className="font-mono-editorial">06</span>
          <span className="h-px w-10 bg-[color:var(--background)]/40" />
          <span>Contact</span>
        </div>

        <Reveal>
          <h2 className="mt-10 max-w-4xl font-display text-[clamp(3rem,7vw,6rem)] leading-[0.98] tracking-tight">
            Looking for a React developer <br />
            who <span className="font-serif-editorial text-[color:var(--gold)]">ships, not just codes</span>?
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl text-lg text-[color:var(--background)]/70">
            Full-time roles, freelance engagements, or a quick call to see if there&apos;s a fit —
            I reply fast and I&apos;m ready to start.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <a
              href="mailto:dharsan2710@gmail.com"
              data-magnetic
              className="group block rounded-3xl border border-[color:var(--background)]/15 p-8 transition-colors hover:border-[color:var(--gold)]"
            >
              <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--background)]/50">
                Email
              </div>
              <div className="mt-3 font-display text-2xl md:text-3xl">dharsan2710@gmail.com</div>
              <div className="mt-4 text-sm text-[color:var(--background)]/60">
                Best for role details, JDs, and next-step conversations.
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--gold)]">
                Write to me
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href="tel:+918489260162"
              data-magnetic
              className="group block rounded-3xl border border-[color:var(--background)]/15 p-8 transition-colors hover:border-[color:var(--gold)]"
            >
              <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--background)]/50">
                Phone · Chennai, TN
              </div>
              <div className="mt-3 font-display text-2xl md:text-3xl">+91 84892 60162</div>
              <div className="mt-4 text-sm text-[color:var(--background)]/60">
                Available for calls during Indian business hours.
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--gold)]">
                Call now
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href="https://github.com/Dharsanrobin"
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="group block rounded-3xl border border-[color:var(--background)]/15 p-8 transition-colors hover:border-[color:var(--gold)]"
            >
              <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--background)]/50">
                GitHub
              </div>
              <div className="mt-3 font-display text-2xl md:text-3xl">Dharsanrobin</div>
              <div className="mt-4 text-sm text-[color:var(--background)]/60">
                Code, commits, and the projects behind this portfolio.
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--gold)]">
                View profile
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.3}>
            <a
              href="https://www.linkedin.com/in/dharsan-r-999930280/"
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="group block rounded-3xl border border-[color:var(--background)]/15 p-8 transition-colors hover:border-[color:var(--gold)]"
            >
              <div className="font-mono-editorial text-[10px] uppercase tracking-[0.28em] text-[color:var(--background)]/50">
                LinkedIn
              </div>
              <div className="mt-3 font-display text-2xl md:text-3xl">Dharsan R</div>
              <div className="mt-4 text-sm text-[color:var(--background)]/60">
                Full work history, recommendations, and career updates.
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--gold)]">
                Connect
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </div>
            </a>
          </Reveal>
        </div>

        <div className="mt-16 flex items-center justify-center border-t border-[color:var(--background)]/15 pt-8 text-sm text-[color:var(--background)]/60">
          <span className="font-mono-editorial text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Dharsan R
          </span>
        </div>
      </div>
    </section>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div
      style={{ width: w }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--bronze)]"
    />
  );
}

/* ---------------- Page ---------------- */

export default function App() {
  useLenis();
  return (
    <div className="relative overflow-x-hidden">
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Journey />
        <Work />
        <Craft />
        <Stack />
        <EducationSection />
        <Contact />
      </main>
    </div>
  );
}
