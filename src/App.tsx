import "./App.css"
import Header from "./Header/Header"
import Products from "./Products/Products"
import { CartContext } from "./CartContext"
import { CartProps } from "./types/types"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cart from "./Cart/Cart"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [cart, setCart] = useState<CartProps>({
    items: [],
    totalNumberOfProducts: 0,
    totalPrice: 0,
  })
  const notify = () => toast("Item added to you cart.")

  console.log("=========", cart)
  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart, setCart }}>
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar
          newestOnTop
          closeOnClick={false}
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
        <Header />
        <Routes>
          <Route path="/" element={<Products notify={notify} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App
