import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MineBit Store",
  description: "ร้านขายแอดออน แมพ รีซอสแพ็ค คอมมานด์ และแอพเสริม Minecraft Bedrock คุณภาพสูงราคาดี พร้อมบริการหลังการขายที่ดีเยี่ยม",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/minebit-store-logo-new.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/minebit-store-logo-new.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/minebit-store-logo-new.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut:
      "/minebit-store-logo-new.png",
    apple: [
      {
        url: "/minebit-store-logo-new.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/minebit-store-logo-new.png",
        color: "#000000",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MineBit Store",
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://minebit-store.vercel.app"),
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
  openGraph: {
    type: "website",
    url: "https://minebit-store.vercel.app",
    title: "MineBit Store",
    description: "ร้านขายแอดออน แมพ รีซอสแพ็ค คอมมานด์ และแอพเสริม Minecraft Bedrock คุณภาพสูงราคาดี พร้อมบริการหลังการขายที่ดีเยี่ยม",
    images: [
      {
        url: "/minebit-store-logo-new.png",
        width: 512,
        height: 512,
        alt: "MineBit Store Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MineBit Store",
    description: "ร้านขายแอดออน แมพ รีซอสแพ็ค คอมมานด์ และแอพเสริม Minecraft Bedrock คุณภาพสูงราคาดี พร้อมบริการหลังการขายที่ดีเยี่ยม",
    images: [
      "/minebit-store-logo-new.png",
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        {/* Apple Touch Icons สำหรับ iPad และ iPhone */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/minebit-store-logo-new.png"
        />

        {/* Apple Web App Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MineBit Store" />

        {/* Apple Startup Images สำหรับ iPad */}
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/minebit-store-logo-new.png"
        />

        {/* Mask Icon สำหรับ Safari */}
        <link
          rel="mask-icon"
          href="/minebit-store-logo-new.png"
          color="#dc2626"
        />

        {/* Favicon Links */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/minebit-store-logo-new.png"
        />
        <link
          rel="shortcut icon"
          href="/minebit-store-logo-new.png"
        />

        {/* Font Preloading */}
        <link
          href="https://mlxka7pjj3egyodk.public.blob.vercel-storage.com/fonts/THSarabunNew-4BKaK.ttf"
          rel="preload"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/minebit-store-logo-new.png"
          as="image"
          type="image/png"
        />

        {/* DNS Prefetch */}
        <link rel="preconnect" href="https://mlxka7pjj3egyodk.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://mlxka7pjj3egyodk.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />

        {/* Microsoft Tile Configuration */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-TileImage"
          content="/minebit-store-logo-new.png"
        />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="MineBit Store" />
        <meta
          name="keywords"
          content="MineBit Store, MineBit, MineBitStore, BarryAroy, Minecraft, แอดออน, คอมมานด์, NBT, แมพ, Minecraft Bedrock, ขายแอดออน, ร้านขายแอดออน, แอดออนเกม Minecraft"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://minebit-store.vercel.app" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  )
}
