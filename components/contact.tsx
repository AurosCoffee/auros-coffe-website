"use client"

import { Mail, Phone } from "lucide-react"

export default function Contact({ t }: { t: any }) {
  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="font-dripdrop-alt text-6xl lg:text-7xl text-foreground">{t.contact.title}</h2>
          <p className="text-lg text-muted-foreground">{t.contact.description}</p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Email - Updated to contacto@tradepass.com */}
          <a
            href="mailto:contacto@tradepass.com"
            className="flex gap-4 items-start p-6 rounded-sm border border-border hover:bg-secondary transition group"
          >
            <Mail className="w-6 h-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-syne-mono font-semibold text-foreground mb-1 uppercase text-sm tracking-wide">
                {t.contact.email}
              </h3>
              <p className="text-muted-foreground font-space-mono text-sm">contacto@tradepass.com</p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:#"
            className="flex gap-4 items-start p-6 rounded-sm border border-border hover:bg-secondary transition group"
          >
            <Phone className="w-6 h-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-syne-mono font-semibold text-foreground mb-1 uppercase text-sm tracking-wide">
                {t.contact.phone}
              </h3>
              <p className="text-muted-foreground font-space-mono text-sm">{t.contact.phoneValue}</p>
            </div>
          </a>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t.contact.yourName}
              className="px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-space-mono text-sm"
            />
            <input
              type="email"
              placeholder={t.contact.yourEmail}
              className="px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-space-mono text-sm"
            />
          </div>
          <textarea
            placeholder={t.contact.yourMessage}
            rows={4}
            className="w-full px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none font-space-mono text-sm"
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-sm font-syne-mono text-sm uppercase tracking-wide hover:opacity-90 transition"
          >
            {t.contact.sendMessage}
          </button>
        </form>
      </div>
    </section>
  )
}
