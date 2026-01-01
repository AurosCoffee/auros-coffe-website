"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/hooks/use-cart"

interface ProductCardProps {
  product: {
    id: number
    name: string
    roast: string
    origin: string
    altitude: string
    process: string
    acidity: number
    body: number
    sweetness: number
    image: string
    available: boolean
    sizes: Array<{ size: string; price: number }>
  }
  t: any
}

export default function ProductCard({ product, t }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(0)
  const [grindType, setGrindType] = useState<'whole-bean' | 'ground'>('whole-bean')
  const { addItem } = useCart()

  const handleAddToCart = () => {
    const selectedSizeData = product.sizes[selectedSize]
    addItem({
      productId: product.id,
      productName: product.name,
      roast: product.roast,
      size: selectedSizeData.size,
      grindType: grindType,
      price: selectedSizeData.price,
      image: product.image,
    })
  }

  const renderDots = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <div key={i} className={`w-2.5 h-2.5 rounded-full transition ${i < count ? "bg-primary" : "bg-muted"}`} />
      ))
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-background h-96 rounded-sm mb-6">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={500}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Availability Badge */}
        {!product.available && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-muted/90 backdrop-blur-sm rounded-sm">
            <span className="text-xs font-syne-mono uppercase tracking-wide text-foreground">
              {t.products.comingSoon}
            </span>
          </div>
        )}
        {/* Overlay accent */}
        <div className="absolute top-4 right-4 w-12 h-12 border-2 border-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Product Info */}
      <div className="space-y-5">
        <div>
          <h3 className="font-space-mono-bold text-5xl text-primary mb-2">{product.name}</h3>
          <p className="text-xs font-syne-mono uppercase tracking-widest text-muted-foreground">{product.roast}</p>
        </div>

        {/* Origin Details */}
        <div className="space-y-2 border-t border-border pt-4">
          <p className="text-sm font-space-mono text-foreground">{product.origin}</p>
          <p className="text-xs font-space-mono text-muted-foreground">
            {t.products.altitude}: {product.altitude} • {t.products.process}: {product.process}
          </p>
        </div>

        {/* Taste Profile */}
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-syne-mono uppercase tracking-widest text-muted-foreground">
              {t.products.acidity}
            </span>
            <div className="flex gap-1.5">{renderDots(product.acidity)}</div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-syne-mono uppercase tracking-widest text-muted-foreground">
              {t.products.body}
            </span>
            <div className="flex gap-1.5">{renderDots(product.body)}</div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-syne-mono uppercase tracking-widest text-muted-foreground">
              {t.products.sweetness}
            </span>
            <div className="flex gap-1.5">{renderDots(product.sweetness)}</div>
          </div>
        </div>

        {/* Grind Type Selection */}
        <div className="space-y-3 pt-4 border-t border-border">
          <label className="text-xs font-syne-mono uppercase tracking-widest text-muted-foreground">
            {t.products.grindType}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setGrindType('whole-bean')}
              className={`py-2 px-3 rounded-sm text-xs font-syne-mono uppercase tracking-wide transition ${
                grindType === 'whole-bean'
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground border border-border hover:border-primary"
              }`}
            >
              {t.products.wholeBean}
            </button>
            <button
              onClick={() => setGrindType('ground')}
              className={`py-2 px-3 rounded-sm text-xs font-syne-mono uppercase tracking-wide transition ${
                grindType === 'ground'
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground border border-border hover:border-primary"
              }`}
            >
              {t.products.ground}
            </button>
          </div>
        </div>

        {/* Size & Price Selection */}
        <div className="space-y-4 pt-4 border-t border-border">
          <label className="text-xs font-syne-mono uppercase tracking-widest text-muted-foreground">
            {t.products.size}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {product.sizes.map((size, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSize(idx)}
                className={`py-2 px-3 rounded-sm text-xs font-syne-mono uppercase tracking-wide transition ${
                  selectedSize === idx
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground border border-border hover:border-primary"
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-space-mono text-foreground">
              ${product.sizes[selectedSize].price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={!product.available}
              className="p-3 bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t.products.addToCart}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
