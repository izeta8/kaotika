import '@testing-library/jest-dom';
import React from "react";
import { render, screen} from "@testing-library/react";
import ItemDataContainer from '@/components/shop/buy/itemData/ItemDataContainer';


describe("ItemDataContainer", () => {
  test("Displays the minimum value and level when present", () => {
    render(<ItemDataContainer value={100} min_lvl={5} hasEnoughMoney={true} />);

    const valueElement = screen.getByTitle("Value");
    const lvlElement = screen.getByTitle("Min. lvl");


    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveTextContent("100");

    expect(lvlElement).toBeInTheDocument();
    expect(lvlElement).toHaveTextContent("5");
  });

  test("Displays only the value if min_lvl is not present", () => {
    render(<ItemDataContainer value={50} min_lvl={undefined} hasEnoughMoney={true} />);
    const valueElement = screen.getByTitle("Value");
    const lvlElement = screen.queryByTitle("Min. lvl");

    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveTextContent("50");

    expect(lvlElement).not.toBeInTheDocument();
  });

  test("Displays only min_lvl if value is not present", () => {
    render(<ItemDataContainer value={undefined} min_lvl={10} />);
    const lvlElement = screen.getByTitle("Min. lvl");
    const valueElement = screen.queryByTitle("Value");

    expect(lvlElement).toBeInTheDocument();
    expect(lvlElement).toHaveTextContent("10");
    
    expect(valueElement).not.toBeInTheDocument();
  });

  test("No display if neither value or min_lvl is present", () => {
    const { container } = render(<ItemDataContainer value={undefined} min_lvl={undefined} />);
    expect(container.querySelector('[title="Value"]')).toBeNull();
    expect(container.querySelector('[title="Min. lvl"]')).toBeNull();
  });

  test("Container uses correct classes when both data are present", () => {
    const { container } = render(<ItemDataContainer value={100} min_lvl={5} />);
    expect(container.querySelector("div.grid")).toHaveClass("w-full", "grid-cols-2");
  });

  test("ItemDataLabel applies background colour according to hasEnoughMoney", () => {
    const { rerender } = render(<ItemDataContainer value={100} min_lvl={5} hasEnoughMoney={true} />);
    // If hasEnoughMoney = true, the background is ‘bg-green-950/45’ for value
    const valueElement = screen.getByTitle("Value");
    expect(valueElement).toHaveClass("bg-green-950/45");

    rerender(<ItemDataContainer value={100} min_lvl={5} hasEnoughMoney={false} />);
    expect(screen.getByTitle("Value")).toHaveClass("bg-red-950/45");

    rerender(<ItemDataContainer value={100} min_lvl={5} hasEnoughMoney={undefined} />);
    expect(screen.getByTitle("Value")).toHaveClass("bg-black/45");
  });

  test("ItemDataLabel shows image and number", () => {
    render(<ItemDataContainer value={123} min_lvl={3} />);
    const valueElement = screen.getByTitle("Value");
    const img = valueElement.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/icons/gold.png");
    expect(valueElement).toHaveTextContent("123");
  });

});