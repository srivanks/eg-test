import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../CartContext"
import CartDetails from "./CartDetails"

const Cart = () => {
  const { cart } = useContext(CartContext)
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
