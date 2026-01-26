"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { translations } from "@/lib/translations"

export default function CheckoutSuccess() {
  const [language] = useState<"en" | "es">("es")
  const t = translations[language]

  useEffect(() => {
    // Clear cart from localStorage after successful checkout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auros-cart')
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8 py-12">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="font-space-mono-bold text-4xl text-foreground">
            {t.checkout.success.title}
          </h1>
          <p className="font-space-mono text-muted-foreground text-lg">
            {t.checkout.success.message}
          </p>
        </div>

        {/* Return to Shop Button */}
        <div className="pt-6">
          <Link
            href="/#shop"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-syne-mono text-sm uppercase tracking-wide rounded-sm hover:opacity-90 transition"
          >
            {t.checkout.success.returnToShop}
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-sm font-syne-mono text-muted-foreground pt-8">
          {language === "en"
            ? "A confirmation email will be sent to your inbox shortly."
            : "Recibirás un correo de confirmación en tu bandeja en breve."}
        </p>
      </div>
    </div>
  )
}
