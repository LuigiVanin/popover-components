/* eslint-disable no-undef */
import { render, screen } from "@testing-library/vue";

import CoreButton from "../src/core/button/Button.vue";

describe("Testing CoreButton", () => {
  test("renders default slot content", () => {
    render(CoreButton, {
      slots: {
        default: "Test Button",
      },
    });

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Test Button/i);
  });

  test("renders default slot content with nested elements", () => {
    render(CoreButton, {
      slots: {
        default: `<span>Button <strong>Text</strong></span>`,
      },
    });

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    const span = button.querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("Button Text");
    const strong = span?.querySelector("strong");
    expect(strong).toBeInTheDocument();
    expect(strong).toHaveTextContent("Text");
  });

  test("button element exists and has correct classes", () => {
    render(CoreButton, {
      slots: {
        default: "Test Button",
      },
      props: {
        variant: "normal",
        size: "md",
        class: "custom-class",
      },
    });

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "flex",
      "flex-row",
      "items-center",
      "justify-center",
      "gap-2",
      "rounded-lg",
      "shadow-md",
      "transition-all",
      "duration-75",
      "hover:opacity-80",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "bg-primary-500",
      "border-primary-500",
      "border",
      "text-neutral-200",
      "px-7",
      "py-[0.36rem]",
      "text-base",
      "custom-class",
    );
  });
});
