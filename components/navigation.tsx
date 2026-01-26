"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/hooks/use-cart"

export default function Navigation({
  language,
  setLanguage,
  t,
}: {
  language: "en" | "es"
  setLanguage: (lang: "en" | "es") => void
  t: any
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount, openCart } = useCart()

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" className="flex-shrink-0">
            <Image src="/images/03.png" alt="AUROS Coffee" width={60} height={40} className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="font-syne-mono hidden md:flex items-center gap-8">
            <Link href="#home" className="text-sm font-medium hover:text-primary transition">
              {t.nav.home}
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition">
              {t.nav.about}
            </Link>
            <Link href="#shop" className="text-sm font-medium hover:text-primary transition">
              {t.nav.shop}
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition">
              {t.nav.contact}
            </Link>
          </div>

          {/* Right side - Language & Cart */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="text-xs font-syne-mono uppercase px-3 py-1 rounded border border-border hover:bg-secondary transition"
            >
              {language === "en" ? "ES" : "EN"}
            </button>

            <button
              onClick={openCart}
              className="relative p-2 hover:bg-secondary rounded-lg transition"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="font-syne-mono md:hidden pb-4 space-y-2">
            <Link href="#home" className="block text-sm font-medium hover:text-primary py-2">
              {t.nav.home}
            </Link>
            <Link href="#about" className="block text-sm font-medium hover:text-primary py-2">
              {t.nav.about}
            </Link>
            <Link href="#shop" className="block text-sm font-medium hover:text-primary py-2">
              {t.nav.shop}
            </Link>
            <Link href="#contact" className="block text-sm font-medium hover:text-primary py-2">
              {t.nav.contact}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
