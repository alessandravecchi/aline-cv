// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Aline Pascale — Gestão, Impacto & Cultura",
  description:
    "Currículo e portfólio de Aline Pascale. Gestão de projetos, captação, parcerias e transparência para o 3º setor e cultura.",
  metadataBase: new URL("https://aline-cv.vercel.app"), // troque se publicar em outro domínio
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aline Pascale — Gestão, Impacto & Cultura",
    description:
      "Projetos, resultados e materiais aplicáveis para acelerar impacto social e cultural.",
    url: "https://aline-cv.vercel.app",
    siteName: "Aline Pascale",
    images: [{ url: "/og/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aline Pascale — Gestão, Impacto & Cultura",
    description:
      "Projetos, resultados e materiais aplicáveis para acelerar impacto social e cultural.",
    images: ["/og/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

