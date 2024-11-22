import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@solidjs/testing-library";
import "@testing-library/jest-dom";
import { Button } from "./button";

describe("Button Component", () => {
  it("renders with default styles and label", () => {
    render(() => <Button label="Default Button" />);
    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary text-primary-foreground");
  });

  it("applies the correct variant and size classes", () => {
    render(() => (
      <Button label="Destructive Button" variant="destructive" size="lg" />
    ));
    const button = screen.getByRole("button", { name: /destructive button/i });
    expect(button).toHaveClass(
      "bg-destructive text-destructive-foreground hover:bg-destructive/90"
    );
    expect(button).toHaveClass("h-11 rounded-md px-8");
  });

  
  it("handles the disabled state correctly", () => {
    render(() => <Button label="Disabled Button" disabled />);
    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:pointer-events-none disabled:opacity-50");
  });

  it("triggers the onClick handler when clicked", () => {
    const onClick = vi.fn();
    render(() => <Button label="Clickable Button" onClick={onClick} />);
    const button = screen.getByRole("button", { name: /clickable button/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(() => <Button label="Snapshot Button" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
