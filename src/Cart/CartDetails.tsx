import { Link } from "react-router-dom";
import { CartProps } from "../types/types";

function CartDetails({
  items,
  totalNumberOfProducts,
  cartPromotion,
}: CartProps) {
  const showDiscountColumn =
    items.filter(i => typeof i.discountKey === "string").length > 0;

  const totalCostPrice = items.reduce((a, b) => a + b.quantity * b.price, 0);
  const totalDiscountedPrice = items.reduce(
    (a, b) => a + b.quantity * b.discountedPrice,
    0,
  );

  let cartDiscount = 0;
  if (cartPromotion) {
    if (totalCostPrice > cartPromotion.minCost) {
      cartDiscount = cartPromotion.discount;
    }
  }
  return (
    <div className='container mx-auto mt-10'>
      <div className='flex shadow my-10'>
        <div className='w-3/4 bg-white px-10 py-10'>
          <div className='flex justify-between border-b pb-8'>
            <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
            <h2 className='font-semibold text-2xl'>
              {`${totalNumberOfProducts} ${
                totalNumberOfProducts === 0 || totalNumberOfProducts === 1
                  ? "item"
                  : "items"
              }`}
            </h2>
          </div>
          <table className='w-full text-left table-auto'>
            <thead className='bg-gray-50 font-semibold uppercase text-gray-400 h-8'>
              <tr>
                <th>Product Details</th>
                <th>Quantity</th>
                <th>Cost Price</th>
                {showDiscountColumn && (
                  <th className='text-green-700'>Discount</th>
                )}
                <th>Sale price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c, i) => {
                return (
                  <tr key={i} className='text-sm h-8'>
                    <td>{c.name}</td>
                    <td>{c.quantity}</td>
                    <td>${c.price.toFixed(2)}</td>
                    {showDiscountColumn && (
                      <td className='text-green-700'>{c.discountKey}</td>
                    )}
                    <td>${(c.quantity * c.discountedPrice).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div id='summary' className='w-2/5 py-10'>
            <Link to={"/"} className='flex font-semibold text-indigo-600 mt-10'>
              Continue Shopping
            </Link>
          </div>
        </div>
        <div id='summary' className='w-1/4 px-8 py-10'>
          <h1 className='font-semibold text-2xl border-b pb-8'>
            Order Summary
          </h1>
          <div className='my-4'>
            <div className='flex font-semibold justify-between text-sm uppercase'>
              <span>Total cost</span>
              <span>${totalCostPrice.toFixed(2)}</span>
            </div>
          </div>
          {cartPromotion && (
            <div className='my-4'>
              <div className='flex font-semibold justify-between text-sm uppercase text-green-700'>
                <span>Cart discount</span>
                <span>${cartDiscount.toFixed(2)}</span>
              </div>
            </div>
          )}
          <div className='my-4'>
            <div className='flex font-semibold justify-between text-sm uppercase text-green-700'>
              <span>Items discount</span>
              <span>${(totalCostPrice - totalDiscountedPrice).toFixed(2)}</span>
            </div>
          </div>
          <div className='my-4'>
            <div className='flex font-semibold justify-between text-sm uppercase text-green-700'>
              <span>Total Savings</span>
              <span>
                $
                {(totalCostPrice - totalDiscountedPrice + cartDiscount).toFixed(
                  2,
                )}
              </span>
            </div>
          </div>
          <div className='my-4'>
            <div className='flex font-semibold justify-between text-sm uppercase'>
              <span>Your price</span>
              <span>${(totalDiscountedPrice - cartDiscount).toFixed(2)}</span>
            </div>
          </div>
          <button className='w-full bg-blue-600 text-white border rounded-full py-3 hover:bg-blue-700'>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
