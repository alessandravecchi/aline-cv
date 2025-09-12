"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Download,
  Instagram,
  Linkedin,
  Sparkles,
  ShieldCheck,
  Cpu,
  Rocket,
  TrendingUp,
  BookOpen,
  Award,
  FileDown,
  MessageCircle,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

/* ============================================================================
   CONFIG (links, cores, dados)
   ========================================================================== */
const SOCIAL = {
  instagram: "https://www.instagram.com/profe.alinepascale?igsh=bjRla2VzaWdudXFl",
  linkedin:
    "https://www.linkedin.com/in/aline-pascale-palma-068a082b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
};

const LINKS = {
  cvPdf: "/cv/aline-cv.pdf",
};

const WHATSAPP = {
  phone: "5548988257788",
  message: "Olá, vi seu portfólio e gostaria de falar com você! 😊",
};

// paleta Aline (indigo/violet/rose)
const COLORS = {
  grad: "from-indigo-600 via-violet-600 to-rose-600",
  ring: "ring-white/60 dark:ring-white/10",
};

/* Dados da página */
const HIGHLIGHTS = [
  { label: "Projetos geridos", value: "80+" },
  { label: "Captação viabilizada", value: "R$ 5M+" },
  { label: "Parcerias ativas", value: "30+" },
  { label: "Anos de experiência", value: "10+" },
] as const;

const TOOLS = [
  {
    title: "Gestão de Projetos",
    desc: "Planejamento, execução e prestação de contas com indicadores claros.",
    icon: ShieldCheck,
  },
  {
    title: "CRM de Parcerias",
    desc: "Organização de contatos, funis e editais para previsibilidade.",
    icon: Cpu,
  },
  {
    title: "Captação & Incentivos",
    desc: "Mapeamento de empresas, leis de incentivo e condução até o aporte.",
    icon: Rocket,
  },
  {
    title: "Transparência & Score OSC",
    desc: "Métricas e evidências para reduzir risco e acelerar decisões.",
    icon: TrendingUp,
  },
] as const;

const EXPERIENCES = [
  {
    role: "Gestão & Parcerias",
    org: "Cuidatoria",
    period: "2024 — atual • Florianópolis/SC",
    bullets: [
      "Gestão de funil de captação e relacionamento com parceiros.",
      "Materiais e processos para transparência e prestação de contas.",
    ],
  },
  {
    role: "Coordenação de Projetos",
    org: "Instituições do 3º Setor",
    period: "2018 — 2024 • SC / PR",
    bullets: [
      "Coordenação de equipes e metas em projetos sociais e culturais.",
      "Elaboração de relatórios e indicadores de impacto.",
    ],
  },
] as const;

const PARTNERS = [
  { name: "Cuidatoria", src: "/aline/images/cuidatoria.png" },
  { name: "Instituto Parceiro", src: "/aline/images/ong1.png" },
  { name: "Projeto Cultural", src: "/aline/images/ong2.png" },
  { name: "Rede Social", src: "/aline/images/ong3.png" },
] as const;

const CERTS = [
  { title: "Gestão de Projetos (certificação)", file: "/certificados/aline-gestao-projetos.pdf" },
  { title: "Captação de Recursos", file: "/certificados/aline-captacao.pdf" },
  { title: "Prestação de Contas & MROSC", file: "/certificados/aline-mrosc.pdf" },
] as const;

const TESTIMONIALS = [
  {
    name: "Aline Pascale",
    role: "Gestora e Facilitadora",
    photo: "/aline/images/aline.jpg",
    text:
      "“Acredito em processos simples, indicadores úteis e relações de confiança. Transparência e execução caminhando juntas.”",
  },
] as const;

/* Helpers */
const fade = (i = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: i * 0.05 },
  viewport: { once: true, margin: "-80px" },
});

const NAV = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "experiencia", label: "Experiência" },
  { id: "parceiros", label: "Parceiros" },
  { id: "certificados", label: "Certificados" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "contato", label: "Contato" },
] as const;

/* ============================================================================
   PÁGINA
   ========================================================================== */
export default function Page() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState<string>("inicio");
  const [open, setOpen] = useState(false);
  const email = "aline@exemplo.com"; // troque pelo e-mail da Aline

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100">
      <Bg />
      <ScrollProgress />
      <TopNav active={active} open={open} setOpen={setOpen} />

      {/* HERO */}
      <section id="inicio" className="relative">
        <div className="mx-auto max-w-6xl px-6 pt-28 pb-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div {...fade(0)}>
              <p className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-slate-700/85 dark:text-white/90">
                <Sparkles className="h-4 w-4" aria-hidden /> Currículo • Portfólio
              </p>
              <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
                Aline{" "}
                <span className={`bg-gradient-to-r ${COLORS.grad} bg-clip-text text-transparent`}>
                  Pascale
                </span>
              </h1>
              <p className="mt-3 text-lg md:text-xl text-slate-800/90 dark:text-white/90 max-w-2xl">
                Gestão de projetos, captação e parcerias — processos simples, transparência e
                resultados medíveis para organizações sociais e culturais.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 bg-white/85 dark:bg-slate-900/70 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition shadow-sm"
                >
                  <Mail className="h-4 w-4" aria-hidden /> {copied ? "E-mail copiado!" : "Fale comigo"}
                </button>

                <a
                  href={LINKS.cvPdf}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 bg-white/85 dark:bg-slate-900/70 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition shadow-sm"
                >
                  <Download className="h-4 w-4" aria-hidden /> Baixar Currículo (PDF)
                </a>

                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm bg-white/85 dark:bg-slate-900/70 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition"
                >
                  <Instagram className="h-4 w-4" aria-hidden /> Instagram
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm bg-white/85 dark:bg-slate-900/70 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition"
                >
                  <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
                </a>
              </div>

              <Highlights />
            </motion.div>

            <Profile />
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="mx-auto max-w-6xl px-6 py-10">
        <Header
          title="Como posso ajudar"
          subtitle="Soluções para previsibilidade, transparência e execução."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {TOOLS.map(({ title, desc, icon: Icon }, i) => (
            <motion.div key={title} {...fade(i)}>
              <div className={`h-full rounded-2xl border bg-white/70 dark:bg-slate-900/60 ${COLORS.ring} backdrop-blur-md p-4 hover:-translate-y-0.5 hover:shadow-md transition`}>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border p-2 bg-white dark:bg-slate-900 dark:border-white/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-slate-700 dark:text-slate-300 mt-1">{desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section id="experiencia" className="mx-auto max-w-6xl px-6 py-2">
        <Header title="Experiência" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {EXPERIENCES.map((exp, i) => (
            <motion.div key={exp.role} {...fade(i)}>
              <div className={`rounded-2xl border bg-white/70 dark:bg-slate-900/60 ${COLORS.ring} backdrop-blur-md p-4 hover:-translate-y-0.5 hover:shadow-md transition`}>
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-violet-700 dark:text-violet-300 font-medium">{exp.org}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{exp.period}</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700 dark:text-slate-300">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PARCEIROS */}
      <section id="parceiros" className="mx-auto max-w-7xl px-6 py-10">
        <Header title="Instituições parceiras e projetos" />
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {PARTNERS.map((l, i) => (
            <motion.div key={l.name} {...fade(i)} className="flex items-center justify-center">
              <div className={`w-full h-[110px] md:h-[130px] rounded-xl bg-white/75 dark:bg-slate-900/60 ${COLORS.ring} shadow-sm hover:shadow-md transition p-3`}>
                <div className="relative w-full h-full">
                  <SkeletonImg src={l.src} alt={l.name} sizes="260px" />
                </div>
              </div>
              <span className="sr-only">{l.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CERTIFICADOS */}
      <section id="certificados" className="mx-auto max-w-6xl px-6 py-8">
        <Header title="Certificados" subtitle="Baixe os arquivos oficiais." />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {CERTS.map((c, i) => (
            <motion.div key={c.title} {...fade(i)}>
              <div className={`rounded-2xl border bg-white/70 dark:bg-slate-900/60 ${COLORS.ring} backdrop-blur-md p-4 hover:-translate-y-0.5 hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-violet-500/15 dark:bg-violet-400/15 flex items-center justify-center">
                    <FileDown className="h-5 w-5 text-violet-700 dark:text-violet-300" aria-hidden />
                  </div>
                  <h3 className="font-semibold leading-snug flex-1">{c.title}</h3>
                  <a
                    href={c.file}
                    download
                    className="ml-2 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-white/80 dark:bg-slate-900/60 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition whitespace-nowrap"
                  >
                    Baixar <Download className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="mx-auto max-w-6xl px-6 py-12">
        <Header title="Depoimentos" />
        <div className="mt-6 grid md:grid-cols-1 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} {...fade(i)}>
              <div className={`rounded-2xl border bg-white/80 dark:bg-slate-900/60 ${COLORS.ring} backdrop-blur-md p-5 hover:-translate-y-0.5 hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <div className={`relative h-12 w-12 overflow-hidden rounded-full ${COLORS.ring}`}>
                    <SkeletonImg src={t.photo} alt={t.name} sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTATO / RODAPÉ */}
      <footer id="contato" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className={`rounded-3xl border ${COLORS.ring} bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-8 shadow-xl`}>
            <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  Vamos criar{" "}
                  <span className={`bg-gradient-to-r ${COLORS.grad} bg-clip-text text-transparent`}>
                    impacto real
                  </span>{" "}
                  juntos?
                </h3>
                <p className="mt-2 text-slate-700 dark:text-slate-300 max-w-2xl">
                  Processos simples, indicadores úteis e transparência — conte comigo para acelerar seu projeto.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => window.open(`mailto:${email}`)}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 bg-white/85 dark:bg-slate-900/70 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition shadow-sm"
                  >
                    <Mail className="h-4 w-4" aria-hidden /> Enviar e-mail
                  </button>
                  <a
                    href={`https://wa.me/${WHATSAPP.phone}?text=${encodeURIComponent(WHATSAPP.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 bg-white/80 dark:bg-slate-900/60 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition"
                  >
                    Falar no WhatsApp <MessageCircle className="h-5 w-5" aria-hidden />
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={LINKS.cvPdf}
                  download
                  className={`flex items-center justify-between rounded-xl border ${COLORS.ring} bg-white/80 dark:bg-slate-900/60 px-4 py-3 hover:bg-white dark:hover:bg-slate-900 transition`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-violet-500/15 flex items-center justify-center">
                      <Download className="h-5 w-5 text-violet-600" aria-hidden />
                    </div>
                    <div>
                      <p className="font-medium">Baixar Currículo (PDF)</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Atualizado</p>
                    </div>
                  </div>
                  <Download className="h-4 w-4 opacity-60" aria-hidden />
                </a>
              </div>
            </div>

            <div className={`mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t ${COLORS.ring}`}>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} Aline Pascale — Gestão, Impacto & Cultura.
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  className="rounded-lg p-2 border bg-white/80 dark:bg-slate-900/60 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  className="rounded-lg p-2 border bg-white/80 dark:bg-slate-900/60 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
      <Styles />
    </div>
  );
}

/* ============================================================================
   COMPONENTES AUXILIARES
   ========================================================================== */

function SkeletonImg({
  src,
  alt,
  sizes,
  className = "object-contain",
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`absolute inset-0 ${!loaded ? "shimmer bg-slate-200/60 dark:bg-slate-700/40 rounded-xl" : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || "100vw"}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-violet-500" />
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-slate-700 dark:text-slate-300">{subtitle}</p>}
    </div>
  );
}

function Highlights() {
  return (
    <motion.div {...fade(0)} className="mt-7">
      <div className="relative overflow-hidden rounded-2xl border ring-1 ring-white/60 dark:ring-white/10 bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-900/70 dark:to-slate-900/50 backdrop-blur-md p-4 sm:p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.12] mix-blend-multiply"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)",
            backgroundSize: "26px 26px, 26px 26px",
          }}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
          {HIGHLIGHTS.map((it) => (
            <div
              key={it.label}
              className="rounded-xl bg-white/70 dark:bg-slate-900/60 border ring-1 ring-white/60 dark:ring-white/10 p-3 sm:p-4 shadow-sm hover:shadow-md transition"
            >
              <div
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r ${COLORS.grad} bg-clip-text text-transparent`}
              >
                {it.value}
              </div>
              <div className="mt-1 text-[13px] sm:text-sm text-slate-700/90 dark:text-slate-300/90 leading-snug">
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Profile() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
          const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
          setT({ x, y });
        }}
        onMouseLeave={() => setT({ x: 0, y: 0 })}
        className="group relative mx-auto w-[88%] max-w-[430px]"
        style={{ perspective: 900 }}
      >
        <div
          className={`relative rounded-3xl p-[3px] bg-gradient-to-tr ${COLORS.grad}`}
          style={{ transform: `rotateX(${t.y}deg) rotateY(${t.x}deg)` }}
        >
          <div className="relative rounded-3xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md">
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <SkeletonImg
                src="/aline/images/aline.jpg"
                alt="Aline Pascale"
                sizes="430px"
                className="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Bg() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-50 opacity-90"
        style={{
          background:
            "radial-gradient(60% 60% at 10% 10%, rgba(79,70,229,0.12) 0, transparent 60%), radial-gradient(55% 55% at 90% 20%, rgba(168,85,247,0.12) 0, transparent 60%), radial-gradient(60% 60% at 20% 90%, rgba(244,63,94,0.10) 0, transparent 60%), linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #faf5ff 100%)",
        }}
      />
    </>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const s = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? Math.min(1, Math.max(0, s / h)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[70]" aria-hidden>
      <div
        className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500"
        style={{ transform: `scaleX(${p})`, transformOrigin: "0 0" }}
      />
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const nxt = !dark;
    setDark(nxt);
    document.documentElement.classList.toggle("dark", nxt);
    localStorage.setItem("theme", nxt ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      className="rounded-lg p-2 border bg-white/80 dark:bg-slate-900/60 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition"
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      {dark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
    </button>
  );
}

function TopNav({
  active,
  open,
  setOpen,
}: {
  active: string;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <>
      <div className="sticky top-0 z-[60]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-2 mb-3 flex h-14 items-center justify-between rounded-2xl border ring-1 ring-white/60 dark:ring-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm">
            <a href="#inicio" className="ml-3 font-semibold tracking-wide">
              Aline <span className="text-violet-600">Pascale</span>
            </a>

            <nav className="hidden md:flex items-center gap-1 pr-2">
              {NAV.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    active === s.id
                      ? "bg-violet-100/80 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200"
                      : "hover:bg-white dark:hover:bg-slate-900"
                  }`}
                >
                  {s.label}
                </a>
              ))}
              <ThemeToggle />
            </nav>

            <div className="flex items-center gap-1 md:hidden mr-2">
              <ThemeToggle />
              <button
                className="rounded-lg p-2 border bg-white/80 dark:bg-slate-900/60 dark:border-white/10"
                aria-label="Abrir menu"
                onClick={() => setOpen(true)}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[80] bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            className="absolute right-0 top-0 h-full w-[78%] max-w-[360px] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b ring-1 ring-white/60 dark:ring-white/10">
              <span className="font-semibold">Navegação</span>
              <button
                aria-label="Fechar"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 border bg-white/80 dark:bg-slate-900/60 dark:border-white/10"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav className="p-3 flex flex-col gap-1">
              {NAV.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    active === s.id
                      ? "bg-violet-100/80 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200"
                      : "hover:bg-white dark:hover:bg-slate-900"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP.phone}?text=${encodeURIComponent(WHATSAPP.message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute -inset-1 rounded-full bg-green-500/40 blur-md opacity-70 group-hover:opacity-90 animate-pulse" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl ring-1 ring-green-600/40 transition hover:scale-105">
        <MessageCircle className="h-7 w-7" aria-hidden />
      </div>
      <div className="absolute right-16 top-1/2 -translate-y-1/2 translate-x-2 opacity-0 group-hover:opacity-100 transition bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
        Fale no WhatsApp
      </div>
    </a>
  );
}

function Styles() {
  return (
    <style jsx global>{`
      html {
        scroll-behavior: smooth;
      }
      .shimmer::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          100deg,
          transparent 20%,
          rgba(255, 255, 255, 0.35) 50%,
          transparent 80%
        );
        transform: translateX(-100%);
        animation: shimmer 1.5s infinite;
      }
      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
      @media print {
        .whats-float,
        .topnav,
        .scroll-progress,
        button,
        a[href^="http"],
        .border-dashed {
          display: none !important;
        }
        .rounded-xl,
        .shadow-sm,
        .shadow-lg {
          box-shadow: none !important;
        }
        body {
          background: white !important;
        }
      }
    `}</style>
  );
}

