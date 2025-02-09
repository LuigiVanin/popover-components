/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/vue";

import CoreButton from "../src/core/button/Button.vue";

describe("Testing CoreButton", () => {
  test("renders default slot content", () => {
    render(CoreButton, {
      slots: {
        default: "Test Button",
      },
    });

    const button = screen.getByRole("button");
    const spinner = button.querySelector("span.animate-spin");
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent(/Test Button/i);
    expect(spinner).not.toBeInTheDocument();
  });

  test("renders default slot content with nested elements", () => {
    render(CoreButton, {
      slots: {
        default: `<span>Button <strong>Text</strong></span>`,
      },
    });

    const button = screen.getByRole("button");
    const span = button.querySelector("span");
    const strong = span?.querySelector("strong");

    expect(button).toBeInTheDocument();
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("Button Text");
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
    );
  });

  test("button element has custom classes", () => {
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
    expect(button).toHaveClass("custom-class");
  });

  test("button events are emitted", async () => {
    const handleEvent = vi.fn();

    render(CoreButton, {
      props: {
        onClick: handleEvent,
        onFocus: handleEvent,
        onBlur: handleEvent,
        onMouseenter: handleEvent,
        onMouseleave: handleEvent,
      },
    });

    expect(handleEvent).not.toHaveBeenCalled();

    const button = screen.getByRole("button");
    await fireEvent.click(button);

    expect(handleEvent).toHaveBeenCalled();

    await fireEvent.focus(button);

    expect(handleEvent).toHaveBeenCalledTimes(2);

    await fireEvent.blur(button);

    expect(handleEvent).toHaveBeenCalledTimes(3);

    await fireEvent.mouseOver(button);

    expect(handleEvent).toHaveBeenCalledTimes(4);

    await fireEvent.mouseOut(button);

    expect(handleEvent).toHaveBeenCalledTimes(5);
  });

  test("button is disabled and should be not be clickable", () => {
    const handleEvent = vi.fn();

    render(CoreButton, {
      slots: {
        default: "Test Button",
      },
      props: {
        disabled: true,
        onClick: handleEvent,
      },
    });

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleEvent).not.toHaveBeenCalled();
  });

  test("button is loading and must have loading spinner", () => {
    render(CoreButton, {
      slots: {
        default: "Test Button",
      },
      props: {
        loading: true,
      },
    });

    const button = screen.getByRole("button");
    const spinner = button.querySelector("span");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  test("button loading prepend slot content should appear when loading", () => {
    render(CoreButton, {
      props: {
        loading: true,
      },
      slots: {
        default: "Test Button",
        loadingPrepend: "Loading...",
      },
    });

    const prepend = screen.getByText(/Loading\.\.\./i);
    expect(prepend).toBeInTheDocument();

    const button = screen.getByRole("button");

    expect(button.textContent).toContain(
      ["Loading...", "Test Button"].join(""),
    );
  });

  test("button loading prepend slot should not appear when not loading", () => {
    render(CoreButton, {
      props: {
        loading: false,
      },
      slots: {
        default: "Test Button",
        loadingPrepend: "Loading...",
      },
    });

    const prepend = screen.queryByText(/Loading\.\.\./i);
    expect(prepend).not.toBeInTheDocument();

    const button = screen.getByRole("button");

    expect(button.textContent).toContain("Test Button");
  });
});
