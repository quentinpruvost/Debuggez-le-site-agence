import { render, screen } from "@testing-library/react";
import Menu from "../../containers/Menu";

describe("Logo component", () => {
  it("should be render inside the Menu ", () => {
    render (<Menu />);
    const logo = screen.getByTestId("logo-svg");
    expect(logo).toBeInTheDocument();
  })
})