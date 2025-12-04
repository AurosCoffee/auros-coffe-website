import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dripdrop = localFont({
  src: [
    {
      path: "../public/fonts/dripdrop-alt-solid.ttf",
      weight: "400",
    },
  ],
  variable: "--font-dripdrop",
})

const syneMono = localFont({
  src: [
    {
      path: "../public/fonts/syne-mono-regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-syne-mono",
})

const spaceMono = localFont({
  src: [
    {
      path: "../public/fonts/space-mono-regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "Auros Coffee | Premium Specialty Coffee",
  description:
    "Experience ethically sourced, premium specialty coffee from around the world. Auros Coffee delivers excellence in every cup.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dripdrop.variable} ${syneMono.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
