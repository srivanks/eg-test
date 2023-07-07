import "./App.css"
import Header from "./Header/Header"
import Products from "./Products/Products"
import { CartContext } from "./CartContext"
import { CartProps, ProductProps, PromotionProps } from "./types/types"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cart from "./Cart/Cart"
import useFetch from "./hooks/fetch"
import Loader from "./Loader/Loader"

function App() {
  const [cart, setCart] = useState<CartProps>({
    items: [],
    totalNumberOfProducts: 0,
  })

  let {
    isLoading: isProductLoading,
    error: productError,
    data: products,
  } = useFetch<ProductProps>(import.meta.env.VITE_PRODUCTS_API_URL)

  let {
    isLoading: isPromotionLoading,
    error: promotionError,
    data: promotions,
  } = useFetch<PromotionProps>(import.meta.env.VITE_PROMOTIONS_API_URL)

  if (productError || promotionError) {
    return <div>some error</div>
  }
  if (isProductLoading || isPromotionLoading) return <Loader />

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart, setCart }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Products products={products} promotions={promotions} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App
