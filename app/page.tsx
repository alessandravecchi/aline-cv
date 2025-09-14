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
  FileDown,
  MessageCircle,
  Menu,
  X,
  Sun,
  Moon,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =============================================================================
   CONFIG (links, cores, dados)
   ========================================================================== */
// Suba estes arquivos em /public/cv e /public/certificados (ajuste nomes se quiser)
const LINKS = {
  cvPdf: "/cv/aline-cv.pdf",
  premioPdf: "/certificados/aline-sebrae-2025.pdf", // opcional
  scibizPdf: "/certificados/aline-scibiz-2025.pdf", // opcional
};

const SOCIAL = {
  instagram: "https://www.instagram.com/profe.alinepascale?igsh=bjRla2VzaWdudXFl",
  linkedin:
    "https://www.linkedin.com/in/aline-pascale-palma-068a082b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
};

const WHATSAPP = {
  phone: "5548999832081",
  message: "Olá, vi seu portfólio e gostaria de falar com você! 😊",
};

// paleta Aline (indigo/violet/rose)
const COLORS = {
  grad: "from-indigo-600 via-violet-600 to-rose-600",
  ring: "ring-white/60 dark:ring-white/10",
};

/* =============================================================================
   DADOS
   ========================================================================== */
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

// Suba estes arquivos em /public/images/ (ou troque pelos seus)
const PARTNERS = [
  { name: "Cuidatoria", src: "/images/cuidatoria.png" },
  { name: "Instituto Parceiro 1", src: "/images/ong1.png" },
  { name: "Instituto Parceiro 2", src: "/images/ong2.png" },
  { name: "Instituto Parceiro 2", src: "/images/ong3.png" },
] as const;

const CERTS = [
  { title: "Prêmio Sebrae Mulher de Negócios 2025 (1º lugar — Ciência & Tecnologia/SC)", file: LINKS.premioPdf },
  { title: "SciBiz 2025", file: LINKS.scibizPdf },
  { title: "Gestão de Projetos (certificação)", file: "/certificados/aline-gestao-projetos.pdf" },
  { title: "Captação de Recursos", file: "/certificados/aline-captacao.pdf" },
  { title: "Prestação de Contas & MROSC", file: "/certificados/aline-mrosc.pdf" },
] as const;

/** Galeria — suba 15 imagens em /public/images/galeria/aline-01.jpeg ... -15.jpeg  */
const PHOTOS = Array.from({ length: 15 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/images/galeria/aline-${n}.jpeg`,
    alt: `Aline — foto ${n}`,
  };
}) as { src: string; alt: string }[];

const EDUCATION = [
  {
    inst: "Unisinos",
    course: "Bacharel em Publicidade e Propaganda",
    years: "1998 — 2002",
    details: "Atividades: Vôlei, cinema, projetos sociais.",
  },
  { inst: "ESPM RS", course: "Pós-Graduação em Comunicação Empresarial", years: "2000 — 2002" },
  { inst: "ESPM RS", course: "Pós-Graduação em Marketing", years: "2002 — 2004" },
  { inst: "UDESC — ESAG", course: "MBA em Administração Geral", years: "2005 — 2007" },
  { inst: "Faculdade Estácio de Sá", course: "MBA em Gestão de Negócios", years: "2008 — 2010" },
] as const;

/** Único depoimento (Priscila) */
const TESTIMONIAL = {
  name: "Priscila F.",
  role: "Inovação | Coordenadora de Projetos | Especialista em gestão comercial",
  text:
    "Aline é uma força da natureza, orientada para o sucesso dos negócios. Como embaixadora das chamadas de Impacto no Impact Hub Floripa, usa seu conhecimento a favor das causas, apoiando pequenos e novos empreendedores. Admiro a capacidade de mentorar vários negócios ao mesmo tempo, com entregas consistentes: é excelente profissional, melhora o ambiente e os resultados dos projetos que coordena.",
};

/** “Sobre” — resumo com tom de autoridade/clareza */
const ABOUT = `
Sou gestora de projetos e parcerias com foco em impacto social e cultural. Integro estratégia, execução e transparência no dia a dia: estruturo funis de captação, defino indicadores que realmente importam e faço prestação de contas com rigor técnico. Ao longo de mais de 10 anos, gerenciei 80+ projetos, ativei 30+ parcerias e viabilizei captação acima de R$ 5 milhões — sempre com processos simples, dados objetivos e documentação impecável para dar previsibilidade a organizações e patrocinadores.

Fui reconhecida em 2025 com o 1º lugar no Prêmio Sebrae Mulher de Negócios (Ciência e Tecnologia – SC), um selo do meu compromisso com resultado e inovação com responsabilidade. No campo prático, trabalho com CRM de parcerias, due diligence de OSC, enquadramento em leis de incentivo, métricas de impacto e governança (MROSC/Compliance), garantindo segurança jurídica e financeira em todas as etapas. Também atuo mentorando equipes e empreendedores, transformando metas em rotinas, relatórios e evidências claras.

Minha base acadêmica combina Comunicação, Marketing e Administração/MBA — e sigo me atualizando (ex.: SciBiz 2025). O que me move é construir relações de confiança e entregar resultados sustentáveis: do diagnóstico à execução, da captação à prestação de contas, conecto pessoas, recursos e propósito com transparência e consistência. Se o seu projeto precisa ganhar tração com segurança, eu posso conduzir.
`.trim();

/* Helpers */
const fade = (i = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: i * 0.05 },
  viewport: { once: true, margin: "-80px" },
});

const NAV = [
  { id: "inicio", label: "Início" },
  { id: "premio", label: "Prêmio" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "experiencia", label: "Experiência" },
  { id: "parceiros", label: "Parceiros" },
  { id: "galeria", label: "Galeria" },
  { id: "certificados", label: "Certificados" },
  { id: "formacao", label: "Formação" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "video", label: "Vídeo" },
  { id: "contato", label: "Contato" },
] as const;

/* =============================================================================
   PÁGINA
   ========================================================================== */
export default function Page() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState<string>("inicio");
  const [open, setOpen] = useState(false);
  const email = "aline.pascale@cuidatoria.com.br";

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
                resultados medíveis para organizações do 3º setor e da cultura.
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

      {/* PRÊMIO (DESTAQUE) */}
      <section id="premio" className="mx-auto max-w-6xl px-6 py-8">
        <Header title="Prêmio — 1º lugar" subtitle="Sebrae Mulher de Negócios • Ciência e Tecnologia • 2025 • SC" />
        <motion.div {...fade(0)} className="mt-4">
          <div className={`relative overflow-hidden rounded-2xl border ${COLORS.ring} bg-white/90 dark:bg-slate-900/70 backdrop-blur-md`}>
            <div className="grid md:grid-cols-[1.15fr,0.85fr]">
              {/* Foto do prêmio — MENOR e INTEIRA */}
              <div className="relative h-[300px] md:h-[360px] lg:h-[400px] p-3 md:p-4">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="/images/aline-premio.jpeg" // coloque a foto aqui: /public/images/aline-premio.jpeg
                    alt="Aline recebendo o Prêmio Sebrae Mulher de Negócios 2025"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 dark:bg-slate-900/80 px-3 py-1 text-sm shadow">
                  <Award className="h-4 w-4 text-violet-600" />
                  1º lugar — SC
                </div>
              </div>

              {/* Texto/CTA */}
              <div className="p-5 md:p-7 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-extrabold leading-tight">
                  Reconhecimento ao trabalho em{" "}
                  <span className={`bg-gradient-to-r ${COLORS.grad} bg-clip-text text-transparent`}>
                    Ciência e Tecnologia
                  </span>
                </h3>
                <p className="mt-2 text-slate-700 dark:text-slate-300">
                  Premiada no Sebrae Mulher de Negócios 2025 (categoria Ciência e Tecnologia) pelo protagonismo
                  em gestão, inovação e impacto com transparência.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={LINKS.premioPdf}
                    download
                    className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-white/90 dark:bg-slate-900/60 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 transition"
                  >
                    Ver certificado <Download className="h-4 w-4" />
                  </a>
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-violet-600 text-white hover:bg-violet-700 transition"
                  >
                    Falar com Aline
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="mx-auto max-w-6xl px-6 py-8">
        <Header title="Sobre" />
        <motion.div {...fade(0)} className="mt-4">
          <div className={`rounded-2xl border ${COLORS.ring} bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-5 md:p-6`}>
            <p className="text-[15px] md:text-[16px] leading-relaxed text-slate-800 dark:text-slate-200">
              {ABOUT}
            </p>
          </div>
        </motion.div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="mx-auto max-w-6xl px-6 py-10">
        <Header title="Como posso ajudar" subtitle="Soluções para previsibilidade, transparência e execução." />
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

      {/* GALERIA (CARROSSEL) */}
      <section id="galeria" className="mx-auto max-w-6xl px-6 py-8">
        <Header title="Galeria" subtitle="Alguns registros das minhas entregas e jornadas." />
        <motion.div {...fade(0)} className="mt-5">
          <Carousel photos={PHOTOS} />
        </motion.div>
      </section>

      {/* CERTIFICADOS (sem imagem de fundo) */}
      <section id="certificados" className="mx-auto max-w-6xl px-6 py-8">
        <Header title="Certificados" subtitle="Arquivos oficiais para download." />
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

      {/* FORMAÇÃO */}
      <section id="formacao" className="mx-auto max-w-6xl px-6 py-8">
        <Header title="Formação acadêmica" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <motion.div key={e.inst + e.course} {...fade(i)}>
              <div className={`rounded-2xl border bg-white/75 dark:bg-slate-900/60 ${COLORS.ring} backdrop-blur-md p-4 hover:shadow-md transition`}>
                <h4 className="font-semibold">{e.inst}</h4>
                <p className="text-slate-700 dark:text-slate-300">{e.course}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{e.years}</p>
                {e.details && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{e.details}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTO (único) */}
      <section id="depoimentos" className="mx-auto max-w-6xl px-6 py-12">
        <Header title="Depoimento" />
        <motion.div {...fade(0)} className="mt-6">
          <div className={`rounded-2xl border bg-white/80 dark:bg-slate-900/60 ${COLORS.ring} backdrop-blur-md p-5 hover:shadow-md transition`}>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">“{TESTIMONIAL.text}”</p>
            <div className="mt-3">
              <p className="font-medium">{TESTIMONIAL.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{TESTIMONIAL.role}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* VÍDEO */}
      <section id="video" className="mx-auto max-w-6xl px-6 py-10">
        <Header title="Vídeo" subtitle='PodIn "Mentorando com Elas" — Empreendendo no Terceiro Setor' />
        <motion.div {...fade(0)} className="mt-6">
          <div className={`relative w-full overflow-hidden rounded-2xl shadow-xl bg-black ${COLORS.ring}`} style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/KQvhwvKRjLU"
              title="PodIn Mentorando com Elas — Empreendendo no Terceiro Setor"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </motion.div>
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

            <div className={`mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t ${COLORS.ring}`}>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © 2025 Aline Pascale — Gestão, Impacto & Estratégia
              </p>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
      <Styles />
    </div>
  );
}

/* =============================================================================
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
              {/* Suba /public/images/aline.png */}
              <SkeletonImg
                src="/images/aline.png"
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

function Carousel({ photos }: { photos: { src: string; alt: string }[] }) {
  const [idx, setIdx] = useState(0);
  const total = photos.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const go = (i: number) => setIdx(i);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <div className={`rounded-2xl border ${COLORS.ring} bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-3 md:p-4`}>
      {/* Foto grande (inteira) */}
      <div className="relative w-full h-[42vh] md:h-[56vh] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={photos[idx].src}
          alt={photos[idx].alt}
          fill
          className="object-contain"
          priority={idx === 0}
        />
        <button
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-slate-900/70 p-2 border hover:bg-white dark:hover:bg-slate-900 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Próxima"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-slate-900/70 p-2 border hover:bg-white dark:hover:bg-slate-900 transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-xs px-2 py-0.5 rounded-full bg-black/50 text-white">
          {idx + 1} / {total}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {photos.map((p, i) => (
          <button
            key={p.src}
            onClick={() => go(i)}
            className={`relative shrink-0 h-16 w-24 rounded-lg overflow-hidden border ${i === idx ? "ring-2 ring-violet-500" : "opacity-80 hover:opacity-100"}`}
            aria-label={`Foto ${i + 1}`}
            title={p.alt}
          >
            <Image src={p.src} alt={p.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
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



