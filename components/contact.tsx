"use client"

import { Mail, Phone } from "lucide-react"
import { useState } from "react"

export default function Contact({ t }: { t: any }) {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contacto@tradepass.mx';

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send message")
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
          <a
            href={`mailto:${contactEmail}`}
            className="flex gap-4 items-start p-6 rounded-sm border border-border hover:bg-secondary transition group"
          >
            <Mail className="w-6 h-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-syne-mono font-semibold text-foreground mb-1 uppercase text-sm tracking-wide">
                {t.contact.email}
              </h3>
              <p className="text-muted-foreground font-space-mono text-sm">{contactEmail}</p>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.contact.yourName}
              required
              disabled={status === "loading"}
              className="px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-space-mono text-sm disabled:opacity-50"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.contact.yourEmail}
              required
              disabled={status === "loading"}
              className="px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-space-mono text-sm disabled:opacity-50"
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.contact.yourMessage}
            rows={4}
            required
            disabled={status === "loading"}
            className="w-full px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none font-space-mono text-sm disabled:opacity-50"
          />

          {/* Status Messages */}
          {status === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-sm text-green-800 font-space-mono text-sm">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-red-800 font-space-mono text-sm">
              {errorMessage || "Failed to send message. Please try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-primary text-primary-foreground rounded-sm font-syne-mono text-sm uppercase tracking-wide hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : t.contact.sendMessage}
          </button>
        </form>
      </div>
    </section>
  )
}
