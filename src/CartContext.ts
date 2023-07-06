import { createContext } from "react"
import { ContextProps } from "./types/types"

export const CartContext = createContext<ContextProps>({
  cart: { items: [], totalNumberOfProducts: 0, totalPrice: 0 },
  setCart: () => [],
})
