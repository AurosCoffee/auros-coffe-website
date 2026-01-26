export interface CartItem {
  productId: number
  productName: string
  roast: string
  size: string
  grindType: 'whole-bean' | 'ground'
  price: number
  quantity: number
  image: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: number, size: string, grindType: 'whole-bean' | 'ground') => void
  updateQuantity: (productId: number, size: string, grindType: 'whole-bean' | 'ground', quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}
