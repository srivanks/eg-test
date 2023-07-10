import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CartContext } from "../CartContext";
import Header from "./Header";

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
          <Header />
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
          <Header />
        </CartContext.Provider>
      </BrowserRouter>,
    );
  });
});
