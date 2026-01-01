"use client"

import { useState } from "react"
import { XCircle } from "lucide-react"
import Link from "next/link"
import { translations } from "@/lib/translations"

export default function CheckoutCancel() {
  const [language] = useState<"en" | "es">("es")
  const t = translations[language]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8 py-12">
        {/* Cancel Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <XCircle className="w-16 h-16 text-muted-foreground" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="font-space-mono-bold text-4xl text-foreground">
            {t.checkout.cancel.title}
          </h1>
          <p className="font-space-mono text-muted-foreground text-lg">
            {t.checkout.cancel.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Link
            href="/#shop"
            className="flex-1 px-6 py-4 bg-primary text-primary-foreground font-syne-mono text-sm uppercase tracking-wide rounded-sm hover:opacity-90 transition text-center"
          >
            {t.checkout.cancel.continueShopping}
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-sm font-syne-mono text-muted-foreground pt-8">
          {language === "en"
            ? "Your cart items have been saved and are waiting for you."
            : "Los artículos de tu carrito han sido guardados y te están esperando."}
        </p>
      </div>
    </div>
  )
}
