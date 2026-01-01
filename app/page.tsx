"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import ProductShowcase from "@/components/product-showcase"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import { CartProvider } from "@/lib/contexts/cart-context"
import { translations } from "@/lib/translations"

export default function Home() {
  const [language, setLanguage] = useState<"en" | "es">("es")
  const t = translations[language]

  return (
    <CartProvider>
      <main className="min-h-screen bg-background">
        <Navigation language={language} setLanguage={setLanguage} t={t} />
        <Hero t={t} />
        <ProductShowcase t={t} />
        <Contact t={t} />
        <Footer t={t} />
        <CartDrawer t={t} language={language} />
      </main>
    </CartProvider>
  )
}
