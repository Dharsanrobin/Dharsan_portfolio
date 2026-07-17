import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import { Home, Briefcase, User, CodeXml, Layers, Mail, Phone, Github, Linkedin, Download, X } from "lucide-react";

import portrait from "@/assets/portrait.jpeg";
import projectNutrade from "@/assets/martoz.jpeg";
import projectAuction from "@/assets/project-auction.png";
import projectBakebuddy from "@/assets/project-bakebuddy.png";
import projectNucamp from "@/assets/project-nucamp.jpeg";
import resumePdf from "@/assets/Dharsan.R-Resume.pdf";

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
    company: "Freelance development",
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
    company: "Freelance development",
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
        "group flex w-full md:w-auto justify-center md:inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium transition-colors " +
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

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-[color:var(--foreground)]"
    >
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl tracking-widest uppercase font-light"
        >
          Dharsan<span className="text-[color:var(--gold)]">.</span>R
        </motion.h2>
      </div>
      <div className="overflow-hidden mt-3">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 0.5 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-[color:var(--muted-foreground)]"
        >
          React Developer
        </motion.div>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
        className="absolute bottom-16 left-16 right-16 h-[1px] bg-[color:var(--gold)]/20 origin-left"
      />
    </motion.div>
  );
}

function Nav() {
  const [activeSection, setActiveSection] = useState("top");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      setScrolled(window.scrollY > 50);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { label: "Home", href: "#top" },
    ...NAV,
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 0.9, 0.28, 1] }}
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? "bg-black/85 backdrop-blur-md border-b border-[color:var(--gold)]/10" : "bg-transparent"
        }`}
    >
      <div className="flex w-full max-w-[1540px] items-center justify-between px-8 py-5 transition-all">
        <a href="#top" className="flex items-center gap-2 font-display text-3xl font-medium tracking-tight">
          Dharsan<span className="text-[color:var(--gold)]">.</span>R
        </a>

        {/* Mobile Hamburger Icon (visible only on mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="flex md:hidden flex-col items-center justify-center gap-[5px] w-10 h-10 z-50 cursor-pointer text-[color:var(--foreground)]"
        >
          <span className={`block w-6 h-[2px] bg-current rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-4 h-[2px] bg-[color:var(--gold)] rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-current rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>

        {/* Unified Nav Menu Panel */}
        <div
          className={`
            fixed md:static inset-y-0 right-0 z-40 md:z-auto
            flex flex-col md:flex-row md:items-center justify-between md:justify-end gap-8 md:gap-10
            w-[75%] md:w-auto h-[100dvh] md:h-auto
            bg-[#f5f0e4] md:bg-transparent
            border-l border-black/10 md:border-none
            px-8 py-16 md:p-0
            backdrop-blur-lg md:backdrop-blur-none
            transition-transform duration-300 ease-in-out
            overflow-y-auto md:overflow-visible
            ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >
          {/* Close button (visible only on mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
          >
            <X size={28} className="stroke-1" />
          </button>

          {/* Core Navigation tree - single map of menuItems */}
          <nav className="flex flex-col md:flex-row gap-6 md:gap-10">
            {menuItems.map((n) => {
              let Icon = Home;
              if (n.label === "Work") Icon = Briefcase;
              else if (n.label === "Journey") Icon = User;
              else if (n.label === "Skills") Icon = CodeXml;
              else if (n.label === "Tech Stack") Icon = Layers;
              else if (n.label === "Contact") Icon = Mail;

              const id = n.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    relative transition-all duration-300
                    /* Desktop Links style */
                    md:pb-1 md:text-[11px] md:tracking-[0.2em] md:uppercase md:font-semibold
                    md:after:absolute md:after:left-0 md:after:bottom-0 md:after:h-[2px] md:after:w-0 md:after:rounded-full md:after:bg-[color:var(--gold)] md:after:transition-all
                    ${isActive 
                      ? "md:text-[color:var(--foreground)] md:after:w-full" 
                      : "md:text-[color:var(--muted-foreground)] md:hover:text-[color:var(--foreground)] md:hover:after:w-full"
                    }

                    /* Mobile Links style */
                    flex items-center gap-4 font-display text-xl font-light tracking-wide
                    ${isActive ? "text-[color:var(--gold)] font-medium" : "text-black/70 hover:text-black"}
                    md:font-sans md:normal-case md:text-sm md:font-normal md:text-inherit
                  `}
                >
                  <Icon size={20} className="stroke-1 md:hidden" />
                  {n.label}
                </a>
              );
            })}
          </nav>

          {/* Action buttons & info */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-4 border-t border-black/10 md:border-none pt-6 md:pt-0">
            {/* Resume button */}
            <div className="flex flex-col md:flex-row gap-1.5 md:gap-0">
              <a
                href={resumePdf}
                download="Dharsan.R-Resume.pdf"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center md:inline-flex gap-4 md:gap-2 rounded-lg md:rounded-full border border-[color:var(--gold)]/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)] transition-all hover:bg-[color:var(--gold)]/10 md:hover:bg-[color:var(--gold)] md:hover:text-black md:hover:border-[color:var(--gold)]"
              >
                <Download size={16} className="stroke-1 md:w-3.5 md:h-3.5" />
                Resume
              </a>
              <div className="md:hidden font-mono text-[9px] uppercase tracking-[0.3em] text-black/45 text-center mt-1">
                DOWNLOAD CV
              </div>
            </div>

            {/* Get in touch / Contact Details on mobile */}
            <div className="flex flex-col gap-6 md:block">
              {/* Desktop-only static Get In Touch button */}
              <a
                href="#contact"
                className="hidden md:inline-block rounded-full bg-[color:var(--foreground)] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-[color:var(--gold)]"
              >
                Get in touch
              </a>

              {/* Mobile-only contact info at bottom of sidebar drawer */}
              <div className="md:hidden flex flex-col gap-6">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--gold)] border-b border-black/10 pb-4">
                  Contact Details
                </div>
                <div className="flex flex-col gap-5 font-sans text-sm">
                  <a href="mailto:dharsan2710@gmail.com" className="flex items-center gap-4 text-black/60 hover:text-black transition-colors">
                    <Mail size={18} className="stroke-1" />
                    dharsan2710@gmail.com
                  </a>
                  <a href="tel:+918489260162" className="flex items-center gap-4 text-black/60 hover:text-black transition-colors">
                    <Phone size={18} className="stroke-1" />
                    +91 84892 60162
                  </a>
                  <a href="https://github.com/Dharsanrobin" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[color:var(--gold)] hover:text-black transition-colors">
                    <Github size={18} className="stroke-1" />
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/dharsan-r-999930280/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[color:var(--gold)] hover:text-black transition-colors">
                    <Linkedin size={18} className="stroke-1" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar backdrop overlay (visible only on mobile) */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-md md:hidden"
          />
        )}
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
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-36">
      {/* 3D grid floor */}
      <div aria-hidden className="grid-floor animate-grid-drift" />

      {/* ambient gold glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-[-15%] h-[560px] w-[560px] rounded-full opacity-35 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, rgba(200,148,50,0.18), transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-25%] right-[-10%] h-[680px] w-[680px] rounded-full opacity-35 blur-3xl animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgba(77,74,36,0.25), transparent 65%)",
          animationDelay: "-6s",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(200,148,50,0.06), transparent 70%), linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      <motion.div
        style={{ z: heroZ, rotateX: heroRotX }}
        className="relative mx-auto grid max-w-[1540px] grid-cols-1 gap-12 px-8 pb-24 perspective-hero preserve-3d md:grid-cols-12 md:gap-10 md:pb-10"
      >
        {/* Unified Title Row/Col */}
        <div className="col-span-1 md:col-span-6 md:col-start-1 md:row-start-1 order-1 md:order-none pb-0 md:pb-0 md:pt-0">
          <Reveal delay={0.06}>
            <div className="relative mt-1 md:mt-1">
              {/* Single responsive h1 */}
              <h1 className="relative z-10 font-iconic md:font-display text-[clamp(2.8rem,12vw,5rem)] md:text-[clamp(3.5rem,8.6vw,7.8rem)] font-black leading-[1] md:leading-[0.88] tracking-wide md:tracking-tighter text-[color:var(--foreground)]">
                {/* On mobile: "REACT". On desktop: "RE" + chrome italic "ACT" */}
                <span className="block md:hidden text-chrome">REACT</span>
                <span className="hidden md:inline">RE</span>
                <span className="hidden md:inline text-chrome font-serif-editorial italic">ACT</span>
                <br className="hidden md:block" />
                <span className="block md:inline-block md:mt-2 text-[color:var(--foreground)] mt-1">
                  DEVELOPER
                </span>
              </h1>
              {/* Subtle underline line visible only on mobile */}
              <div className="md:hidden mt-3 h-px w-16 bg-[color:var(--gold)]/40" />
            </div>
          </Reveal>
        </div>

        {/* Left copy (text, buttons, stats) */}
        <motion.div style={{ opacity }} className="relative order-3 md:order-none md:col-span-6 md:col-start-1 md:row-start-2">
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-[color:var(--muted-foreground)]">
              I&apos;m <span className="text-[color:var(--foreground)]">Dharsan R</span>, a React.js developer with two years
              of production experience — crafting high-performance dashboards, reusable component systems,
              and full-stack features backed by <span className="text-[color:var(--foreground)] font-semibold">Java &amp; Spring Boot</span>.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
              <MagneticButton href="#work">View Projects</MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Contact
              </MagneticButton>
              <a
                href={resumePdf}
                download="Dharsan.R-Resume.pdf"
                className="flex w-full md:w-auto justify-center md:inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--gold)] transition-all hover:bg-[color:var(--gold)] hover:text-black hover:border-[color:var(--gold)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Download Resume
              </a>
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
                  <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[color:var(--muted-foreground)]">
                     {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </motion.div>

        {/* 3D Portrait stack */}
        <div className="order-2 md:order-none md:col-span-6 md:col-start-7 md:row-start-1 md:row-span-2 flex items-center justify-center">
          <motion.div
            style={{ y: yPortrait }}
            className="perspective-hero relative mx-auto flex h-[560px] w-full max-w-md items-center justify-center"
          >
            {/* Orbit ring — rotates on the floor plane */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] rounded-full border border-[color:var(--gold)]/10 animate-orbit"
              style={{ transform: "translate(-50%, -50%) rotateX(72deg)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] rounded-full border border-[color:var(--gold)]/5"
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
                className="absolute inset-0 rounded-sm bg-[color:var(--secondary-bg)]/75 blur-3xl"
                style={{ transform: "translateZ(-80px)" }}
              />

              {/* card body */}
              <div
                className="absolute inset-0 overflow-hidden rounded-sm border border-[color:var(--gold)]/20 bg-[color:var(--background)] p-1 shadow-2xl"
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
                        "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 40%, rgba(0,0,0,0.9) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
                        React Developer
                      </div>
                      <div className="mt-2 font-display text-2xl text-[color:var(--foreground)]">
                        Dharsan R
                      </div>
                    </div>
                    <div className="text-right font-mono text-[9px] uppercase tracking-[0.25em] text-[color:var(--muted-foreground)]">
                      Chennai
                    </div>
                  </div>
                </div>
              </div>

              {/* corner frame accents (in front) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 border-r border-t border-[color:var(--gold)]/20"
                style={{ transform: "translateZ(60px)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16 border-b border-l border-[color:var(--gold)]/20"
                style={{ transform: "translateZ(60px)" }}
              />

              {/* Floating glass tag — front */}
              <div
                className="glass absolute -bottom-10 -right-16 hidden w-64 rounded-sm p-5 md:block"
                style={{ transform: "translateZ(80px)" }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
                      SPECIALIZED IN
                    </div>
                    <div className="mt-1 font-display text-lg text-[color:var(--foreground)]">
                      React Ecosystem
                    </div>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--gold)]/20">
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
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
                  EXPERTISE
                </div>
                <div className="mt-1 font-display text-sm text-[color:var(--foreground)]">
                  React • Java • Spring Boot
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* marquee */}
      <div className="relative border-y border-black/10 bg-gold/50 py-4 shadow-[0_0_30px_rgba(200,161,77,0.25)] mt-17">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14 font-display text-xl italic text- md:text-xl">
            {Array.from({ length: 2 }).flatMap((_, i) =>
              ["React.js", "TypeScript", "Spring Boot", "REST APIs", "Tailwind", "MySQL", "Reusable Systems", "Real-time UIs"].map(
                (t) => (
                  <span key={`${i}-${t}`} className="flex items-center gap-14">
                    <span>{t}</span>
                    <span className="text-black">◆</span>
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
    <section className="mx-auto max-w-[1540px] px-8 md:px-12 py-32">
      <SectionLabel chapter="00" title="Vision" />

      <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-8">
          <Reveal>
            <p className="font-display text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.15] text-balance">
              I build{" "}
              <span className="font-serif-editorial text-[color:var(--gold)] italic">
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
                <div className="font-display text-2xl text-[color:var(--foreground)]">{c.k}</div>
                <div className="mt-2 text-sm text-[color:var(--muted-foreground)] leading-relaxed">
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

export type ModalProjectData = {
  name: string;
  tagline?: string;
  kicker?: string;
  bullets?: string[];
  solution?: string;
  impact?: string;
  tags?: string[];
  stack?: string[];
  challenge?: string;
};

function ProjectModal({ project, onClose }: { project: ModalProjectData | null; onClose: () => void }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-1/2 top-1/2 z-[101] max-h-[85vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-[color:var(--gold)]/30 bg-gradient-to-br from-[#1c1605] to-black p-8 shadow-2xl md:p-12"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-[color:var(--muted-foreground)] transition-colors hover:text-white"
            >
              <X size={24} />
            </button>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[color:var(--gold)]">
              {project.kicker || project.tagline || "Details"}
            </div>
            <h3 className="mt-2 font-display text-3xl md:text-4xl text-[color:var(--foreground)]">{project.name}</h3>

            <div className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 flex flex-wrap gap-2"
              >
                {(project.tags || project.stack || []).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[color:var(--gold)]/20 bg-[color:var(--gold)]/10 px-3 py-1 text-[10px] uppercase tracking-widest text-[color:var(--gold)]"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.bullets ? (
                  <ul className="space-y-4 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                    {project.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--gold)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-6 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                    {project.challenge && (
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--gold)] mb-2">
                          The Challenge
                        </div>
                        <p>{project.challenge}</p>
                      </div>
                    )}
                    {project.solution && (
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--gold)] mb-2">
                          The Solution
                        </div>
                        <p>{project.solution}</p>
                      </div>
                    )}
                    {project.impact && (
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--gold)] mb-2">
                          Impact & Value
                        </div>
                        <p>{project.impact}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Journey() {
  const [selectedProject, setSelectedProject] = useState<ModalProjectData | null>(null);

  return (
    <section id="journey" className="relative mx-auto max-w-[1540px] px-8 md:px-12 py-32">
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <SectionLabel chapter="01" title="Journey · Experience" />
      <Reveal>
        <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-tight">
          Years of growth, not just experience
        </h2>
      </Reveal>

      <div className="relative mt-24">
        <div
          aria-hidden
          className="absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/30 to-transparent md:left-1/2"
        />
        <div className="space-y-24">
          {EXPERIENCES.map((exp, idx) => (
            <Reveal key={exp.company + exp.period} delay={idx * 0.05}>
              <article className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
                <span
                  aria-hidden
                  className="absolute left-[10px] top-2 h-4 w-4 rounded-full border-4 border-[color:var(--background)] bg-[color:var(--gold)] shadow-[0_0_0_4px_rgba(200,148,50,0.25)] md:left-1/2 md:-translate-x-1/2 animate-pulse"
                />
                <div className={idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"}>
                  <div className="pl-10 md:pl-0">
                    <div className="font-mono text-xs uppercase tracking-[0.28em] text-[color:var(--gold)]">
                      Chapter {exp.chapter}
                    </div>
                    <h3 className="mt-3 font-display text-4xl">{exp.company}</h3>
                    <div className="mt-2 text-sm text-[color:var(--muted-foreground)]">
                      {exp.role} · {exp.subtitle}
                    </div>
                    <div className="mt-1 font-mono text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">
                      {exp.period} · {exp.location}
                    </div>
                  </div>
                </div>
                <div className={idx % 2 === 0 ? "" : "md:order-1"}>
                  <div className="space-y-6 pl-10 md:pl-0">
                    {exp.projects.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => setSelectedProject(p)}
                        className="w-full text-left glass grain rounded-2xl p-6 hover:border-[color:var(--gold)]/30 hover:bg-[color:var(--gold)]/5 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div>
                          <h4 className="font-display text-xl text-[color:var(--foreground)]">{p.name}</h4>
                          <div className="text-sm text-[color:var(--muted-foreground)] mt-1">{p.tagline}</div>
                        </div>
                        <div className="shrink-0 rounded-full bg-[color:var(--gold)] text-black border   border-[color:var(--gold)]/20 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[color:var(--gold)] group-hover:bg-[color:var(--gold)] group-hover:text-black transition-colors">
                          View My role
                        </div>
                      </button>
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

function ProjectCard({ project, index, onViewDetails }: { project: (typeof PROJECTS)[number]; index: number; onViewDetails: () => void }) {
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
      <article className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 items-center">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ perspective: 1000 }}
          className={"order-first md:col-span-7 " + (reverse ? "md:order-2" : "")}
        >
          <motion.div
            style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
            className="group relative overflow-hidden rounded-3xl border border-[color:var(--gold)]/10 shadow-[var(--shadow-elegant)] transition-all duration-500 hover:border-[color:var(--gold)]/35"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-950">
              <img
                src={project.image}
                alt={project.name}
                width={1600}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
              />
            </div>

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"
            />

            {/* Top Badge */}
            <div className="absolute left-6 top-6 rounded-full bg-black/60 border border-[color:var(--gold)]/15 px-4 py-1.5 font-mono text-[9px] uppercase tracking-widest text-[color:var(--gold)] backdrop-blur-md">
              {project.id} &bull; {project.kicker}
            </div>

            {/* Hidden Role Badge inside Image */}
            <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--foreground)]/80 bg-black/45 backdrop-blur-md px-3 py-1 rounded border border-white/5">
              Role: {project.role}
            </div>
          </motion.div>
        </motion.div>

        <div className={"order-last md:col-span-5 flex flex-col justify-center " + (reverse ? "md:order-1" : "")}>
          <h3 className="font-display text-4xl leading-[1.05] md:text-5xl text-[color:var(--foreground)] font-medium">
            {project.name}
          </h3>
          <p className="mt-4 font-serif-editorial text-xl italic text-[color:var(--gold)]">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[color:var(--gold)]/10 pt-6">
            <button
              onClick={onViewDetails}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/20 bg-[color:var(--gold)]/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)] transition-all hover:bg-[color:var(--gold)] hover:text-black"
            >
              View Details
            </button>
            {/* <a
              href="https://github.com/Dharsanrobin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--muted-foreground)] transition-all hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              GitHub
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a> */}
            {/* <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--muted-foreground)] transition-all hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              Live Demo
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </a> */}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Work() {
  const [selectedProject, setSelectedProject] = useState<ModalProjectData | null>(null);

  return (
    <section id="work" className="relative bg-[color:var(--secondary-bg)]/60 py-32 border-y border-[color:var(--gold)]/10">
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <div className="mx-auto max-w-[1540px] px-8 md:px-12">
        <SectionLabel chapter="02" title="Selected Work" />
        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[color:var(--gold)]/5 pb-12">
          <Reveal>
            <h2 className="max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
              Four projects. Each one solved a real problem.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="max-w-sm text-sm text-[color:var(--muted-foreground)] leading-relaxed">
              A closer look at the platforms and dashboards I&apos;ve shipped — the challenges they posed,
              the decisions behind them, and the impact they carried.
            </div>
          </Reveal>
        </div>


        <div className="mt-24 space-y-32 ">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onViewDetails={() => setSelectedProject(p)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Craft() {
  const [active, setActive] = useState(0);
  return (
    <section id="craft" className="relative mx-auto max-w-[1540px] px-8 md:px-12 py-32 border-b border-[color:var(--gold)]/10">
      <SectionLabel chapter="03" title="Craft · Skills" />
      <Reveal>
        <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
          The toolkit — organised the way I actually work.
        </h2>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="sticky top-32 space-y-3">
            {SKILL_GROUPS.map((g, i) => (
              <button
                key={g.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={
                  "group flex w-full items-baseline justify-between rounded-2xl border px-6 py-5 text-left transition-all duration-300 cursor-pointer " +
                  (active === i
                    ? "border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 shadow-[var(--shadow-soft)]"
                    : "border-transparent hover:border-[color:var(--gold)]/10 hover:bg-white/[0.01]")
                }
              >
                <span className={`font-display text-xl transition-colors duration-300 ${active === i ? "text-[color:var(--gold)]" : "text-[color:var(--foreground)]"}`}>{g.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--muted-foreground)]">
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
              className="glass grain rounded-3xl p-10 md:p-14"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
                {String(active + 1).padStart(2, "0")} · Category
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-4xl text-[color:var(--foreground)]">{SKILL_GROUPS[active].title}</h3>
              <div className="mt-8 flex flex-wrap gap-3">
                {SKILL_GROUPS[active].items.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4 }}
                    className="cursor-default rounded-full border border-[color:var(--gold)]/15 bg-[color:var(--gold)]/5 px-4 py-2.5 text-xs font-medium tracking-wide uppercase text-[color:var(--muted-foreground)] hover:text-white hover:border-[color:var(--gold)]/40 hover:-translate-y-0.5 transition-all duration-300"
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
    <section id="stack" className="relative py-32 border-b border-[color:var(--gold)]/10">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(200,148,50,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-[1540px] px-8 md:px-12">
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
                <div className="glass grain relative rounded-2xl p-8 hover:border-[color:var(--gold)]/35 transition-all duration-300">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-4 font-display text-2xl text-[color:var(--foreground)]">{s.label}</div>
                  <div className="mt-2 text-xs text-[color:var(--muted-foreground)] leading-relaxed">{s.note}</div>
                  {i < STACK_FLOW.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-[color:var(--gold)]/40 md:block font-light text-xl"
                    >
                      &rarr;
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-16 max-w-2xl text-center text-sm text-[color:var(--muted-foreground)] leading-relaxed">
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
    <section className="mx-auto max-w-[1540px] px-8 md:px-12 py-32 border-b border-[color:var(--gold)]/10">
      <SectionLabel chapter="05" title="Foundations · Education" />
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <Reveal>
          <div className="glass grain h-full rounded-2xl p-8 hover:border-[color:var(--gold)]/30 transition-all duration-300">
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
              Degree
            </div>
            <h3 className="mt-3 font-display text-2xl text-[color:var(--foreground)]">B.Sc. Computer Science</h3>
            <p className="mt-4 text-sm text-[color:var(--muted-foreground)] leading-relaxed">
              Manonmaniam Sundaranar University &bull; Graduated 2022 &bull; 72% CGPA.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass grain h-full rounded-2xl p-8 hover:border-[color:var(--gold)]/30 transition-all duration-300">
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
              Certification
            </div>
            <h3 className="mt-3 font-display text-2xl text-[color:var(--foreground)]">Frontend &amp; Full Stack Development</h3>
            <p className="mt-4 text-sm text-[color:var(--muted-foreground)] leading-relaxed">
              QSpiders, Chennai &bull; Jul 2022 — Dec 2022. Intensive certified training that shaped the way I
              write full-stack code.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="glass grain h-full rounded-2xl p-8 hover:border-[color:var(--gold)]/30 transition-all duration-300">
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
              Languages
            </div>
            <h3 className="mt-3 font-display text-2xl text-[color:var(--foreground)]">English &bull; Tamil &bull; Malayalam</h3>
            <p className="mt-4 text-sm text-[color:var(--muted-foreground)] leading-relaxed">
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
    <section id="contact" className="relative overflow-hidden bg-[color:var(--foreground)] py-10 text-black">
      {/* ambient gold glows for white background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(200,148,50,0.6), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(77,74,36,0.5), transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-[1540px] px-8 md:px-12">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-black/60">
          <span className="font-mono">06</span>
          <span className="h-px w-10 bg-black/40" />
          <span>Contact</span>
        </div>

        <Reveal>
          <h2 className="mt-10 max-w-4xl font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.98] tracking-tight">
            Looking for a Software Developer <br />
            who <span className="font-serif-editorial text-[color:var(--gold)] italic">ships, not just codes</span>?
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl text-lg text-black/70 leading-relaxed font-medium">
            Full-time roles, freelance engagements, or a quick call to see if there&apos;s a fit —
            I reply fast and I&apos;m ready to start.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <a
              href="mailto:dharsan2710@gmail.com"
              data-magnetic
              className="group block rounded-3xl border border-black/10 p-5 bg-black/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--gold)]/40 hover:bg-black/[0.04]"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/50">
                Email
              </div>
              <div className="mt-4 font-display text-lg md:text-xl text-black font-semibold break-all">dharsan2710@gmail.com</div>
              <div className="mt-4 text-sm text-black/60 leading-relaxed">
                Best for role details, JDs, and next-step conversations.
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--gold)] font-bold">
                Write to me
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href="tel:+918489260162"
              data-magnetic
              className="group block rounded-3xl border border-black/10 p-5 bg-black/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--gold)]/40 hover:bg-black/[0.04]"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/50">
                Phone &bull; Chennai, TN
              </div>
              <div className="mt-4 font-display text-xl md:text-2xl text-black font-semibold">+91 84892 60162</div>
              <div className="mt-4 text-sm text-black/60 leading-relaxed">
                Available for calls during Indian business hours.
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--gold)] font-bold">
                Call now
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href="https://github.com/Dharsanrobin"
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="group block rounded-3xl border border-black/10 p-5 bg-black/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--gold)]/40 hover:bg-black/[0.04]"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/50">
                GitHub
              </div>
              <div className="mt-4 font-display text-xl md:text-2xl text-black font-semibold">Dharsanrobin</div>
              <div className="mt-4 text-sm text-black/60 leading-relaxed">
                Code, commits, and the projects behind this portfolio.
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--gold)] font-bold">
                View profile
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.3}>
            <a
              href="https://www.linkedin.com/in/dharsan-r-999930280/"
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="group block rounded-3xl border border-black/10 p-5 bg-black/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--gold)]/40 hover:bg-black/[0.04]"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/50">
                LinkedIn
              </div>
              <div className="mt-4 font-display text-xl md:text-2xl text-black font-semibold">Dharsan R</div>
              <div className="mt-4 text-sm text-black/60 leading-relaxed">
                Full work history, recommendations, and career updates.
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--gold)] font-bold">
                Connect
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </a>
          </Reveal>
        </div>

        <div className="mt-16 flex items-center justify-center border-t border-black/10 pt-8 text-sm text-black/45">
          <span className="font-mono text-xs uppercase tracking-widest">
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

export default function App() {
  useLenis();
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative overflow-x-hidden">
      <AnimatePresence>
        {!introFinished && <IntroOverlay onComplete={() => setIntroFinished(true)} />}
      </AnimatePresence>
      <ScrollProgress />

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

