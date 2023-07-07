export type ContextProps = {
  cart: CartProps
  setCart: React.Dispatch<React.SetStateAction<CartProps>>
}

export type ProductsProps = {
  notify?: () => void,
  products: Array<ProductProps>,
  promotions: Array<PromotionProps>
}

export type ProductProps = {
  id: number
  price: number
  name: string
  addToCart: (id: number) => void
}

export type PromotionProps = {
  id: number
  definition: string
  type: string
  name: string
}

export type PromotionsProps = {
  promotions: Array<PromotionProps>
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
