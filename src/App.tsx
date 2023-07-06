import "./App.css"
import Header from "./Header/Header"
import Products from "./Products/Products"
import { CartContext } from "./CartContext"
import { CartProps } from "./types/types"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cart from "./Cart/Cart"

function App() {
  const [cart, setCart] = useState<CartProps>({
    items: [],
    totalNumberOfProducts: 0,
    totalPrice: 0,
  })

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart, setCart }}>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App
