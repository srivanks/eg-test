import { createContext } from "react";
import { ContextProps } from "./types/types";

export const CartContext = createContext<ContextProps>({
  cart: {
    items: [],
    totalNumberOfProducts: 0,
    discountedPrice: 0,
    cartPromotion: {},
  },
  setCart: () => [],
});
