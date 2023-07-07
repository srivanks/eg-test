import { useContext } from "react"
import { CartContext } from "../CartContext"
import Product from "../Product/Product"
import Promotions from "../Promotions"
import { ItemProps, ProductProps, ProductsProps } from "../types/types"

const Products = ({ products, promotions }: ProductsProps) => {
  const { cart, setCart } = useContext(CartContext)

  function processPromotionsRules(discount, quantity) {
    //This logic is based on 3 conditions (this logic should be redone as we add more discount rules)
    //For a product, there could be a discount in price, a discount in number or items or no discount
    let discountValue =
      discount === undefined
        ? { logicalOperation: "-", ordinal: 0 }
        : discount === "bogo"
        ? { logicalOperation: "/", ordinal: quantity % 2 === 0 ? 2 : 1 }
        : { logicalOperation: "-", ordinal: parseInt(discount as string) }

    return discountValue
  }

  function getDiscountPrice(
    price: number,
    discount: { logicalOperation: string; ordinal: number },
  ) {
    let discountedPrice = 0
    if (discount.logicalOperation === "/") {
      discountedPrice = price / discount.ordinal
    } else if (discount.logicalOperation === "-") {
      discountedPrice = price - discount.ordinal
    } else if (discount.logicalOperation === "*") {
      discountedPrice = price * discount.ordinal
    }
    return discountedPrice
  }

  function addItemToEmptyCart(id: number, selectedProduct?: ProductProps) {
    let discount = processPromotionsRules(selectedProduct?.discountValue, 1)
    const item: ItemProps = {
      id,
      name: selectedProduct?.name as string,
      price: selectedProduct?.price as number,
      discountKey: selectedProduct?.discountKey as string,
      discountValue: selectedProduct?.discountValue as string,
      discountedPrice: getDiscountPrice(
        selectedProduct?.price as number,
        discount,
      ),
      quantity: 1,
    }
    setCart({
      items: [{ ...item }],
      totalNumberOfProducts: 1,
      totalPrice: item.discountedPrice * item.quantity,
    })
  }

  function incrementProductCountInCart(productToBeAdded: number) {
    let discount = processPromotionsRules(
      cart.items[productToBeAdded].discountValue,
      (cart.items[productToBeAdded].quantity as number) + 1,
    )
    let cartItem = {
      ...cart.items[productToBeAdded],
      quantity: (cart.items[productToBeAdded].quantity as number) + 1,
      discountKey: cart.items[productToBeAdded].discountKey as string,
      discountValue: cart.items[productToBeAdded].discountValue as string,
      discountedPrice: getDiscountPrice(
        cart.items[productToBeAdded].price as number,
        discount,
      ),
    }
    setCart({
      items: [
        ...cart.items.slice(0, productToBeAdded),
        { ...cartItem },
        ...cart.items.slice(productToBeAdded + 1),
      ],
      totalNumberOfProducts: cart.totalNumberOfProducts + 1,
      totalPrice: cartItem.discountedPrice + cart.totalPrice,
    })
  }

  function addNewProductInCart(id: number, selectedProduct?: ProductProps) {
    let discount = processPromotionsRules(selectedProduct?.discountValue, 1)
    let cartItem: ItemProps = {
      id,
      name: selectedProduct?.name as string,
      price: selectedProduct?.price as number,
      quantity: 1,
      discountKey: selectedProduct?.discountKey as string,
      discountValue: selectedProduct?.discountValue as string,
      discountedPrice: getDiscountPrice(
        selectedProduct?.price as number,
        discount,
      ),
    }
    setCart({
      items: [...cart.items, { ...cartItem }],
      totalNumberOfProducts: cart.totalNumberOfProducts + 1,
      totalPrice: cart.totalPrice + cartItem.discountedPrice,
    })
  }

  const addToCart = (id: number): void => {
    const selectedProduct = products.find(p => p.id === id)

    if (cart.items.length === 0) {
      addItemToEmptyCart(id, selectedProduct)
    } else {
      const productToBeAdded = cart.items.findIndex(
        p => p.id === selectedProduct?.id,
      )
      if (productToBeAdded === -1) {
        addNewProductInCart(id, selectedProduct)
      } else {
        incrementProductCountInCart(productToBeAdded)
      }
    }
  }

  return (
    <>
      <Promotions promotions={promotions} />
      <div className="px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 lg:gap-8">
          {products.map((p, i) => (
            <Product
              key={i}
              id={i}
              name={p.name}
              price={p.price}
              discountKey={p.discountKey}
              discountValue={p.discountValue}
              addToCart={() => addToCart(p.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Products
