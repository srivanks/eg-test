export type ContextProps = {
  cart: CartProps
  setCart: React.Dispatch<React.SetStateAction<CartProps>>
}

export type ProductsProps = {
  notify: () => void
}

export type ProductProps = {
  id: number
  price: number
  name: string
  addToCart: (product: ProductProps) => void
}

export type ItemProps = {
  id: number
  name: string
  price: number
  quantity: number
}

export type CartProps = {
  items: Array<ItemProps>
  totalNumberOfProducts: number
  totalPrice: number
}
