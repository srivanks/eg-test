import { useContext } from "react"
import { CartContext } from "../CartContext"
import Loader from "../Loader/Loader"
import Product from "../Product/Product"
import Promotions from "../Promotions"
import useFetch from "../hooks/fetch"
import { ItemProps, ProductProps } from "../types/types"

const Products = () => {
  const { isLoading, error, data } = useFetch<ProductProps>(
    import.meta.env.VITE_PRODUCTS_API_URL,
  )
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

  function addNewProductCountInCart(
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
    const selectedProduct = data.find(p => p.id === id)

    if (cart.items.length === 0) {
      addItemToEmptyCart(id, selectedProduct)
    } else {
      const productToBeAdded = cart.items.findIndex(
        p => p.id === selectedProduct?.id,
      )
      if (productToBeAdded === -1) {
        addNewProductCountInCart(id, selectedProduct)
      } else {
        incrementProductCountInCart(productToBeAdded)
      }
    }
  }

  if (error) {
    return (
      <h3>
        An error occurred when fetching data. Please check the API and try
        again.
      </h3>
    )
  }
  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      <Promotions />
      <div className="px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 lg:gap-8">
          {data.map((p, i) => (
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
