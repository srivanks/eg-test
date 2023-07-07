import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../CartContext"
import CartDetails from "./CartDetails"
import Loader from "../Loader/Loader"

const Cart = () => {
  const { cart } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState<boolean>()
  const [cartPromotion, setCartPromotion] = useState()
  async function fetchData(url: string) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setCartPromotion(data)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData(import.meta.env.VITE_CART_PROMOTIONS_API_URL)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto border bg-gray-200 rounded px-4 m-4 py-5">
        Cart is empty! Please explore our selection of wines{" "}
        <Link
          to={"/"}
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          here.
        </Link>
      </div>
    )
  }

  return <CartDetails {...cart} />
}

export default Cart
