import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CartContext } from "../CartContext";
import Product from "./Product";

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
          <Product
            addToCart={() => {}}
            id={1}
            name=''
            price={0}
            discountKey=''
            discountValue=''
          />
        </CartContext.Provider>
      </BrowserRouter>,
    );
    expect(wrapper).toBeTruthy();
  });
});
