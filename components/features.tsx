import { Award, Leaf, Globe } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Award-winning blends crafted from the finest beans in the world",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "100% ethically sourced from farmers who share our values",
  },
  {
    icon: Globe,
    title: "Award Winning",
    description: "Recognized globally for excellence in taste and sustainability",
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
