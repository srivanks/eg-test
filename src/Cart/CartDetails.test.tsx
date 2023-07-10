import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CartContext } from "../CartContext";
import CartDetails from "./CartDetails";

describe("<Cart />", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should render Cart details by default", () => {
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
          <CartDetails items={[]} totalNumberOfProducts={0} />
        </CartContext.Provider>
      </BrowserRouter>,
    );
    expect(wrapper).toBeTruthy();
  });
});
