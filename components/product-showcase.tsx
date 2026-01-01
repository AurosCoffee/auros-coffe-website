"use client"

import ProductCard from "./product-card"

const products = [
  // {
  //   id: 1,
  //   name: "Nocte",
  //   roast: "Dark Roast",
  //   origin: "",
  //   altitude: "",
  //   process: "",
  //   acidity: 3,
  //   body: 5,
  //   sweetness: 4,
  //   image: "/images/nocte.png",
  //   available: false, // Set to true when stock is ready
  //   sizes: [
  //     { size: "250g", price: 155.00 },
  //     { size: "500g", price: 290.00 },
  //     { size: "1kg", price: 540.00 },
  //   ],
  // },
  {
    id: 2,
    name: "Umbra",
    roast: "Medium Roast",
    origin: "Huatusco Veracruz, Mexico",
    altitude: "1,200 - 1,400 MASL",
    process: "Lavado",
    acidity: 3,
    body: 4,
    sweetness: 5,
    image: "/images/umbra.png",
    available: true, // Set to true when stock is ready
    sizes: [
      { size: "250g", price: 155.00 },
      { size: "500g", price: 290.00 },
      { size: "1kg", price: 540.00 },
    ],
  },
  // {
  //   id: 3,
  //   name: "Luma",
  //   roast: "Light Roast",
  //   origin: "",
  //   altitude: "",
  //   process: "",
  //   acidity: 5,
  //   body: 3,
  //   sweetness: 4,
  //   image: "/images/luma.png",
  //   sizes: [
  //     { size: "250g", price: 15.99 },
  //     { size: "500g", price: 28.99 },
  //     { size: "1kg", price: 52.99 },
  //   ],
  // },
]

export default function ProductShowcase({ t }: { t: any }) {
  return (
    <section id="shop" className="py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-6xl lg:text-7xl text-foreground">{t.products.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.products.headline}</p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
