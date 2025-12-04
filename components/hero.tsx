"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Hero({ t }: { t: any }) {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="font-dripdrop text-6xl lg:text-7xl text-foreground leading-tight">{t.hero.headline}</h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">{t.hero.description}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="#shop"
              className="px-8 py-3 bg-primary text-primary-foreground font-syne-mono text-sm uppercase tracking-wide rounded-lg hover:opacity-90 transition inline-block text-center"
            >
              {t.hero.shopNow}
            </Link>
            <Link
              href="#subscribe"
              className="px-8 py-3 border-2 border-primary text-primary font-syne-mono text-sm uppercase tracking-wide rounded-lg hover:bg-primary hover:text-primary-foreground transition inline-block text-center"
            >
              {t.hero.subscribe}
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative h-96 md:h-full flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/image.png"
              alt="Auros Coffee Cups"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}
