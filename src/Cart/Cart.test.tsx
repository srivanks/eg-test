import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CartContext } from "../CartContext";
import Cart from "./Cart";

describe("<Cart />", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render Cart by default", () => {
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
          <Cart />
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
          <Cart />
        </CartContext.Provider>
      </BrowserRouter>,
    );
  });
});
