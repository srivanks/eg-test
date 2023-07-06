import { Link } from "react-router-dom";
import { CartProps } from "../types/types";

function CartDetails({ items, totalNumberOfProducts, totalPrice }: CartProps) {
  console.log(items);
  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">
              {`${totalNumberOfProducts} ${
                totalNumberOfProducts === 0 || totalNumberOfProducts === 1
                  ? "item"
                  : "items"
              }`}
            </h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {items.map((c) => {
            return (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{c.name}</span>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <span className="mx-2 text-center w-8">{c.quantity}</span>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${c.price.toFixed(2)}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${(c.quantity * c.price).toFixed(2)}
                </span>
              </div>
            );
          })}
          <Link to={"/"} className="flex font-semibold text-indigo-600 mt-10">
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white border rounded-full py-3 hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
