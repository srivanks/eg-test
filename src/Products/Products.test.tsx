import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CartContext } from "../CartContext";
import Products from "./Products";

describe("<Products />", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render Products by default", () => {
    const wrapper = render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cart: {
              items: [],
              totalNumberOfProducts: 0,
              cartPromotion: 0,
              discountedPrice: 0,
            },
            setCart: () => {},
          }}
        >
          <Products products={[]} promotions={[]} />
        </CartContext.Provider>
      </BrowserRouter>,
    );
    expect(wrapper).toBeTruthy();
  });

  it("should test what goes into the state", () => {
    global.fetch = vi.fn();
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cart: {
              items: [],
              totalNumberOfProducts: 0,
              cartPromotion: 0,
              discountedPrice: 0,
            },
            setCart: () => {},
          }}
        >
          <Products products={[]} promotions={[]} />
        </CartContext.Provider>
      </BrowserRouter>,
    );
  });
  it("should render products", () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cart: {
              items: [],
              totalNumberOfProducts: 0,
              cartPromotion: 0,
              discountedPrice: 0,
            },
            setCart: () => {},
          }}
        >
          <Products
            products={[
              {
                id: 1,
                name: "test",
                price: 0,
                discountKey: "test",
                discountValue: "test",
                addToCart: () => {},
              },
            ]}
            promotions={[]}
          />
        </CartContext.Provider>
      </BrowserRouter>,
    );
  });
  it("should trigger add to cart when there is no item in the cart", () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cart: {
              items: [],
              totalNumberOfProducts: 0,
              cartPromotion: 0,
              discountedPrice: 0,
            },
            setCart: () => {},
          }}
        >
          <Products
            products={[
              {
                id: 1,
                name: "test",
                price: 0,
                discountKey: "test",
                discountValue: "test",
                addToCart: () => {},
              },
            ]}
            promotions={[]}
          />
        </CartContext.Provider>
      </BrowserRouter>,
    );
    const title = screen.getByText(/Add to cart/i);
    fireEvent.click(title);
  });
  it("should trigger add to cart when there is 1 similar item in the cart", () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cart: {
              items: [
                {
                  id: 1,
                  name: "test",
                  price: 0,
                  discountKey: "test",
                  discountValue: "test",
                  discountedPrice: 0,
                  quantity: 1,
                },
              ],
              totalNumberOfProducts: 0,
              cartPromotion: 0,
              discountedPrice: 0,
            },
            setCart: () => {},
          }}
        >
          <Products
            products={[
              {
                id: 1,
                name: "test",
                price: 0,
                discountKey: "test",
                discountValue: "test",
                addToCart: () => {},
              },
            ]}
            promotions={[]}
          />
        </CartContext.Provider>
      </BrowserRouter>,
    );
    const title = screen.getByText(/Add to cart/i);
    fireEvent.click(title);
  });
  it("should trigger add to cart when there is 1 different item in the cart", () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cart: {
              items: [
                {
                  id: 11,
                  name: "test1",
                  price: 0,
                  discountKey: "test1",
                  discountValue: "test1",
                  discountedPrice: 0,
                  quantity: 1,
                },
              ],
              totalNumberOfProducts: 0,
              cartPromotion: 0,
              discountedPrice: 0,
            },
            setCart: () => {},
          }}
        >
          <Products
            products={[
              {
                id: 1,
                name: "test",
                price: 0,
                discountKey: "test",
                discountValue: "test",
                addToCart: () => {},
              },
            ]}
            promotions={[]}
          />
        </CartContext.Provider>
      </BrowserRouter>,
    );
    const title = screen.getByText(/Add to cart/i);
    fireEvent.click(title);
  });
  it("should trigger add to cart when there is 1 different item in the cart with nod discount", () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cart: {
              items: [
                {
                  id: 11,
                  name: "test1",
                  price: 0,
                  discountKey: "test",
                  discountValue: "test",
                  discountedPrice: 0,
                  quantity: 1,
                },
              ],
              totalNumberOfProducts: 0,
              cartPromotion: 0,
              discountedPrice: 0,
            },
            setCart: () => {},
          }}
        >
          <Products
            products={[
              {
                id: 1,
                name: "test",
                price: 0,
                discountKey: "test",
                discountValue: undefined,
                addToCart: () => {},
              },
            ]}
            promotions={[]}
          />
        </CartContext.Provider>
      </BrowserRouter>,
    );
    const title = screen.getByText(/Add to cart/i);
    fireEvent.click(title);
  });
  it("should trigger add to cart when there is 1 different item in the cart with discount code bogo", () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cart: {
              items: [
                {
                  id: 11,
                  name: "test1",
                  price: 0,
                  discountKey: "test",
                  discountValue: "test",
                  discountedPrice: 0,
                  quantity: 1,
                },
              ],
              totalNumberOfProducts: 0,
              cartPromotion: 0,
              discountedPrice: 0,
            },
            setCart: () => {},
          }}
        >
          <Products
            products={[
              {
                id: 1,
                name: "test",
                price: 0,
                discountKey: "test",
                discountValue: "bogo",
                addToCart: () => {},
              },
            ]}
            promotions={[]}
          />
        </CartContext.Provider>
      </BrowserRouter>,
    );
    const title = screen.getByText(/Add to cart/i);
    fireEvent.click(title);
  });
});
