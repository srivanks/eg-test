import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import { ItemProps, ProductProps, ProductsProps } from "../types/types";

const Products = ({ notify }: ProductsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState(false);

  const { cart, setCart } = useContext(CartContext);
  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const products = await response.json();
        const productsWithId = products.map((p: ProductProps, i: number) => ({
          ...p,
          id: i,
        }));
        setProducts([...productsWithId]);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData(import.meta.env.VITE_API_URL);
  }, []);

  const addToCart = (id: number): void => {
    const selectedProduct = products.find((p) => p.id === id);

    if (cart.items.length === 0) {
      const item: ItemProps = {
        id,
        name: selectedProduct?.name as string,
        price: selectedProduct?.price as number,
        quantity: 1,
      };
      setCart({
        items: [{ ...item }],
        totalNumberOfProducts: 1,
        totalPrice: item.price,
      });
    } else {
      const productToBeAdded = cart.items.findIndex(
        (p) => p.id === selectedProduct?.id
      );
      let cartItem: ItemProps;
      if (productToBeAdded === -1) {
        cartItem = {
          id,
          name: selectedProduct?.name as string,
          price: selectedProduct?.price as number,
          quantity: 1,
        };
        setCart({
          items: [...cart.items, { ...cartItem }],
          totalNumberOfProducts: cart.totalNumberOfProducts + 1,
          totalPrice: cart.totalPrice + cartItem.price,
        });
      } else {
        cartItem = {
          ...cart.items[productToBeAdded],
          quantity: (cart.items[productToBeAdded].quantity as number) + 1,
        };
        setCart({
          items: [
            ...cart.items.slice(0, productToBeAdded),
            { ...cartItem },
            ...cart.items.slice(productToBeAdded + 1),
          ],
          totalNumberOfProducts: cart.totalNumberOfProducts + 1,
          totalPrice: cart.totalPrice + cartItem.price,
        });
      }
    }

    notify();
  };

  if (error) {
    return (
      <h3>
        An error occurred when fetching data. Please check the API and try
        again.
      </h3>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-8">
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
  );
};

export default Products;
