import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script'
import { ThemeProvider } from "@/components/shared/theme-toggle/provider/theme-provider";


export const metadata: Metadata = {
  title: "Michel de Freitas - Desenvolvedor Full-Stack",
  description: "Olá! Me chamo Michel de Freitas, um desenvolvedor full-stack com uma paixão por programação desde os 12 anos. Com experiência em JavaScript, React, Next.js, Flutter, e Nest.js, ofereço soluções digitais personalizadas para atender às suas necessidades tecnológicas. Explore meus projetos mais recentes e descubra como posso ajudar a transformar suas ideias em realidade. Disponível para oportunidades de emprego e trabalho freelance. Vamos conversar e fazer seu próximo projeto acontecer!",
  keywords: [
    "Michel de Freitas",
    "desenvolvedor full-stack",
    "programador",
    "desenvolvimento web",
    "JavaScript",
    "React",
    "Next.js",
    "Flutter",
    "Nest.js",
    "portfólio",
    "freelance",
    "trabalho remoto",
    "soluções digitais",
    "Michel",
    "Freitas",
    "Michel Freitas"
  ],
  authors: [{ name: "Michel de Freitas Herrero Luis", url: "https://michelfreitas.com" }],
  robots: "index, follow",
  openGraph: {
    title: "Michel de Freitas - Desenvolvedor Full-Stack",
    description: "Olá! Me chamo Michel de Freitas, um desenvolvedor full-stack com uma paixão por programação desde os 12 anos. Com experiência em JavaScript, React, Next.js, Flutter, e Nest.js, ofereço soluções digitais personalizadas para atender às suas necessidades tecnológicas. Explore meus projetos mais recentes e descubra como posso ajudar a transformar suas ideias em realidade. Disponível para oportunidades de emprego e trabalho freelance. Vamos conversar e fazer seu próximo projeto acontecer!",
    url: "https://michelfreitas.com",
    images: "https://michelfreitas.com/images/logo-resources/logo-light-192x192.png", // imagem de perfil
    siteName: "Michel de Freitas Portfólio & Blog",
    type: "profile"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-row justify-center w-full h-full dark bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            strategy="lazyOnload"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
