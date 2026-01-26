"use client"

import React, { createContext, useState, useEffect, ReactNode } from 'react'
import type { CartItem, CartContextType } from '@/lib/types/cart'

export const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'auros-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate cart from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY)
        if (stored) {
          const parsedItems = JSON.parse(stored)
          setItems(parsedItems)
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
      setIsHydrated(true)
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error)
      }
    }
  }, [items, isHydrated])

  // Calculate derived state
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  // Add item to cart
  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.size === newItem.size &&
          item.grindType === newItem.grindType
      )

      if (existingItemIndex > -1) {
        // Item exists, increment quantity
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        }
        return updatedItems
      } else {
        // New item, add with quantity 1
        return [...currentItems, { ...newItem, quantity: 1 }]
      }
    })
    setIsOpen(true) // Open cart drawer when item is added
  }

  // Remove item from cart
  const removeItem = (productId: number, size: string, grindType: 'whole-bean' | 'ground') => {
    setItems((currentItems) =>
      currentItems.filter((item) => !(
        item.productId === productId &&
        item.size === size &&
        item.grindType === grindType
      ))
    )
  }

  // Update item quantity
  const updateQuantity = (productId: number, size: string, grindType: 'whole-bean' | 'ground', quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size, grindType)
      return
    }

    if (quantity > 99) {
      quantity = 99 // Max quantity
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.grindType === grindType
          ? { ...item, quantity }
          : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setItems([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }

  // Open cart drawer
  const openCart = () => setIsOpen(true)

  // Close cart drawer
  const closeCart = () => setIsOpen(false)

  const value: CartContextType = {
    items,
    isOpen,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
