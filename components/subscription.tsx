"use client"

import { Check } from "lucide-react"

const plans = [
  {
    name: "Weekly",
    discount: "10% off",
    basePrice: 13,
    discountedPrice: 11.69,
    description: "Fresh coffee every week",
  },
  {
    name: "Bi-Weekly",
    discount: "15% off",
    basePrice: 13,
    discountedPrice: 11.04,
    description: "Every two weeks",
    featured: true,
  },
  {
    name: "Monthly",
    discount: "20% off",
    basePrice: 13,
    discountedPrice: 10.39,
    description: "Monthly deliveries",
  },
]

export default function Subscription() {
  return (
    <section id="subscribe" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-display text-foreground text-balance">Subscribe & Save</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your favorite coffee delivered on your schedule with exclusive discounts
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-8 transition ${
                plan.featured
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card border border-border hover:shadow-lg"
              }`}
            >
              <div className="space-y-6">
                {/* Plan Name & Discount */}
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-2">{plan.name}</h3>
                  <div className={`text-sm font-mono ${plan.featured ? "text-primary-foreground" : "text-primary"}`}>
                    {plan.discount}
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <p className={`text-sm ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    ${plan.basePrice}/bag
                  </p>
                  <p className="text-3xl font-serif font-semibold">${plan.discountedPrice}</p>
                  <p className={`text-sm ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 border-t border-current border-opacity-20 pt-6">
                  {["Free shipping", "Cancel anytime", "Skip a delivery"].map((feature, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    plan.featured
                      ? "bg-primary-foreground text-primary hover:opacity-90"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
