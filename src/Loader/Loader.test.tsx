import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Loader from "./Loader";
describe("<Cart />", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should render Loader by default", () => {
    const wrapper = render(<Loader />);
    expect(wrapper).toBeTruthy();
  });
});
