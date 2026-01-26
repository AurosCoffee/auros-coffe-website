"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import type { CartItem as CartItemType } from "@/lib/types/cart"

interface CartItemProps {
  item: CartItemType
  t: any
}

export default function CartItem({ item, t }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleDecrease = () => {
    updateQuantity(item.productId, item.size, item.grindType, item.quantity - 1)
  }

  const handleIncrease = () => {
    updateQuantity(item.productId, item.size, item.grindType, item.quantity + 1)
  }

  const handleRemove = () => {
    removeItem(item.productId, item.size, item.grindType)
  }

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      {/* Product Image */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.productName}
          width={64}
          height={64}
          className="object-cover rounded-sm"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-space-mono text-sm font-bold text-foreground truncate">
          {item.productName}
        </h4>
        <p className="text-xs font-syne-mono text-muted-foreground">{item.roast}</p>
        <div className="mt-1 flex gap-2">
          <span className="inline-block px-2 py-0.5 bg-secondary rounded text-xs font-syne-mono">
            {item.size}
          </span>
          <span className="inline-block px-2 py-0.5 bg-secondary rounded text-xs font-syne-mono">
            {item.grindType === 'whole-bean' ? t.products.wholeBean : t.products.ground}
          </span>
        </div>
        <p className="mt-2 text-sm font-space-mono text-foreground">{formatPrice(item.price)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={handleRemove}
          className="p-1 hover:text-destructive transition"
          aria-label={t.cart.remove}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="p-1 hover:bg-secondary rounded transition"
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-space-mono text-sm w-8 text-center">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="p-1 hover:bg-secondary rounded transition"
            disabled={item.quantity >= 99}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
