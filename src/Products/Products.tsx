import { useContext } from "react"
import { CartContext } from "../CartContext"
import Product from "../Product/Product"
import Promotions from "../Promotions"
import { ItemProps, ProductProps, ProductsProps } from "../types/types"

const Products = ({products, promotions}: ProductsProps) => {
  const { cart, setCart } = useContext(CartContext)

  function addItemToEmptyCart(id: number, selectedProduct?: ProductProps) {
    const item: ItemProps = {
      id,
      name: selectedProduct?.name as string,
      price: selectedProduct?.price as number,
      quantity: 1,
    }
    setCart({
      items: [{ ...item }],
      totalNumberOfProducts: 1,
      totalPrice: item.price,
    })
  }

  function incrementProductCountInCart(productToBeAdded: number) {
    let cartItem = {
      ...cart.items[productToBeAdded],
      quantity: (cart.items[productToBeAdded].quantity as number) + 1,
    }
    setCart({
      items: [
        ...cart.items.slice(0, productToBeAdded),
        { ...cartItem },
        ...cart.items.slice(productToBeAdded + 1),
      ],
      totalNumberOfProducts: cart.totalNumberOfProducts + 1,
      totalPrice: cart.totalPrice + cartItem.price,
    })
  }

  function addNewProductInCart(
    id: number,
    selectedProduct?: ProductProps,
  ) {
    let cartItem: ItemProps = {
      id,
      name: selectedProduct?.name as string,
      price: selectedProduct?.price as number,
      quantity: 1,
    }
    setCart({
      items: [...cart.items, { ...cartItem }],
      totalNumberOfProducts: cart.totalNumberOfProducts + 1,
      totalPrice: cart.totalPrice + cartItem.price,
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
              addToCart={() => addToCart(p.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Products
