export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-display text-foreground text-balance">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Auros Coffee was born from a simple belief: exceptional coffee should be accessible to everyone who
            appreciates quality. We work directly with farmers across the globe to ensure every bean meets our rigorous
            standards for flavor and sustainability.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Each blend represents a journey—from the mountains where our beans grow to the moment of perfection in your
            cup. We're committed to transparency, fairness, and the art of specialty coffee.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <p className="text-3xl font-serif font-semibold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Ethical Sourcing</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-semibold text-primary">12+</p>
              <p className="text-sm text-muted-foreground">Origins</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-semibold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Partner Farms</p>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="h-96 rounded-lg overflow-hidden">
          <img src="/coffee-farm-workers-harvesting-beans.jpg" alt="Coffee farming" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}
