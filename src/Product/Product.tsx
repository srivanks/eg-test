import { BsCartPlus } from "react-icons/bs"
import { ProductProps } from "../types/types"

const Product = ({ id, name, price, addToCart }: ProductProps) => {
  return (
    <div className="container m-auto grid grid-cols-3 sm:grid-cols-1">
      <div className="p-4 border">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-black truncate block capitalize">
            Name:
          </p>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {name}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            Price:
          </p>
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            ${price}
          </p>
        </div>
        <button
          onClick={() => addToCart(id)}
          className="w-full bg-blue-600 text-white border rounded-full py-1 hover:bg-blue-700"
        >
          <BsCartPlus className="inline mr-1" />
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default Product
