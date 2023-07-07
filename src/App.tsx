import "./App.css"
import Header from "./Header/Header"
import Products from "./Products/Products"
import { CartContext } from "./CartContext"
import { CartProps, ProductProps, PromotionProps, PromotionsProps } from "./types/types"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cart from "./Cart/Cart"
import useFetch from "./hooks/fetch"
import Loader from "./Loader/Loader"

function App() {
  const [cart, setCart] = useState<CartProps>({
    items: [],
    totalNumberOfProducts: 0,
    totalPrice: 0,
  })

  let {
    isLoading: isProductLoading,
    error: productError,
    data: products
  } = useFetch<ProductProps>(import.meta.env.VITE_PRODUCTS_API_URL)

  let {
    isLoading: isCartPromotionLoading,
    error: cartPromotionError,
    data: cartPromotions,
  } = useFetch<PromotionProps>(import.meta.env.VITE_CART_PROMOTIONS_API_URL)

  if (productError || cartPromotionError) {
    return <div>some error</div>
  }
  if (isProductLoading || isCartPromotionLoading) return <Loader />

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart, setCart }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Products
                products={products}
                promotions={cartPromotions}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App
