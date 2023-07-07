import { useContext } from "react"
import { CartContext } from "../CartContext"
import Product from "../Product/Product"
import Promotions from "../Promotions"
import { ItemProps, ProductProps, ProductsProps } from "../types/types"

const Products = ({ products, promotions }: ProductsProps) => {
  const { cart, setCart } = useContext(CartContext)

  function processPromotionsRules(selectedProduct?: ProductProps): number {
    //This logic is based on 3 conditions (this logic should be redone as we add more discount rules)
    //For a product, there could be a discount in price, a discount in number or items or no discount
    let discountValue =
      selectedProduct?.discountValue === undefined
        ? 0
        : selectedProduct?.discountValue === "bogo"
        ? 0
        : parseInt(selectedProduct?.discountValue as string)

    return discountValue
  }

  function addItemToEmptyCart(id: number, selectedProduct?: ProductProps) {
    let discount = processPromotionsRules(selectedProduct)
    const item: ItemProps = {
      id,
      name: selectedProduct?.name as string,
      price: selectedProduct?.price as number,
      discountKey: selectedProduct?.discountKey as string,
      discountValue: selectedProduct?.discountValue as string,
      discountedPrice: (selectedProduct?.price as number) - discount,
      quantity: 1,
    }
    setCart({
      items: [{ ...item }],
      totalNumberOfProducts: 1,
      totalPrice: item.price - discount,
      discountedPrice: item.price - discount,
    })
  }

  function incrementProductCountInCart(productToBeAdded: number) {
    debugger;
    let cartItem = {
      ...cart.items[productToBeAdded],
      quantity: (cart.items[productToBeAdded].quantity as number) + 1,
      discountKey: cart.items[productToBeAdded].discountKey as string,
      discountValue: cart.items[productToBeAdded].discountValue as string,
    }
    setCart({
      items: [
        ...cart.items.slice(0, productToBeAdded),
        { ...cartItem },
        ...cart.items.slice(productToBeAdded + 1),
      ],
      totalNumberOfProducts: cart.totalNumberOfProducts + 1,
      totalPrice: cart.totalPrice +
        cart.items[productToBeAdded].discountedPrice,
    })
  }

  function addNewProductInCart(id: number, selectedProduct?: ProductProps) {
    let discountValue = processPromotionsRules(selectedProduct)
    let cartItem: ItemProps = {
      id,
      name: selectedProduct?.name as string,
      price: selectedProduct?.price as number,
      quantity: 1,
      discountKey: selectedProduct?.discountKey as string,
      discountValue: selectedProduct?.discountValue as string,
      discountedPrice: (selectedProduct?.price as number) - discountValue,
    }
    setCart({
      items: [...cart.items, { ...cartItem }],
      totalNumberOfProducts: cart.totalNumberOfProducts + 1,
      totalPrice: cart.totalPrice + cartItem.price - discountValue,
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
