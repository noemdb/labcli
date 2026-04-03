import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LAB } from "@/lib/constants/lab";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://laboratorio-sco.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${LAB.name} | Laboratorio clínico de confianza`,
    template: `%s | ${LAB.name}`,
  },
  description: `${LAB.tagline} Análisis clínicos con precisión en La Guaira y alrededores. Hematología, química clínica, microbiología y más.`,
  keywords: [
    "laboratorio clínico",
    "análisis de sangre",
    "La Guaira",
    "bioanálisis",
    "exámenes médicos",
    "SCO",
  ],
  openGraph: {
    title: LAB.name,
    description: LAB.tagline,
    type: "website",
    locale: "es_VE",
    siteName: LAB.name,
  },
  twitter: {
    card: "summary_large_image",
    title: LAB.name,
    description: LAB.tagline,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
