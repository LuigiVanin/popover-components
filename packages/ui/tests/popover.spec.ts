/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/vue";

import CoreButton from "../src/core/button/Button.vue";
import CorePopover from "../src/core/popover/Popover.vue";

describe("Testing CorePopover", () => {
  test("renders correct DOM elements on popover component", () => {
    render(CorePopover, {
      global: {
        components: { CoreButton },
      },
      slots: {
        default: `
          <div data-testid="popover-default">
            <CoreButton>Popover-Trigger</CoreButton>  
          </div>`,
        content: `<div>Popover-Content</div>`,
      },
      props: {
        modelValue: true,
      },
    });

    const popoverTrigger = screen.getByText("Popover-Trigger");
    expect(popoverTrigger).toBeInTheDocument();
    expect(popoverTrigger.tagName).toBe("BUTTON");

    const popoverContentWrapper = document.querySelector(".popover-content");

    const popoverContent = screen.getByText("Popover-Content");
    expect(popoverContent).toBeInTheDocument();
    expect(popoverContentWrapper).toBeInTheDocument();
  });

  test("Don't render popover content when modelValue is false", () => {
    render(CorePopover, {
      global: {
        components: { CoreButton },
      },
      slots: {
        default: `
          <div data-testid="popover-default">
            <CoreButton>Popover-Trigger</CoreButton>  
          </div>`,
        content: `<div>Popover-Content</div>`,
      },
      props: {
        modelValue: false,
      },
    });

    const popoverTrigger = screen.getByText("Popover-Trigger");
    expect(popoverTrigger).toBeInTheDocument();
    expect(popoverTrigger.tagName).toBe("BUTTON");

    expect(screen.queryByText("Popover-Content")).not.toBeInTheDocument();
  });

  test("Close popover when clicking outside", async () => {
    const mockOutsideClick = vi.fn();

    render(CorePopover, {
      global: {
        components: { CoreButton },
      },
      slots: {
        default: `
          <div data-testid="popover-default">
            <CoreButton>Popover-Trigger</CoreButton>  
          </div>`,
        content: `<div>Popover-Content</div>`,
      },
      props: {
        modelValue: true,
        "onUpdate:modelValue": mockOutsideClick,
      },
    });

    await fireEvent.click(document.body);

    expect(mockOutsideClick).toHaveBeenCalled();
  });

  test("Close popover should not be triggered props `persist` is `true`", async () => {
    const mockOutsideClick = vi.fn();

    render(CorePopover, {
      global: {
        components: { CoreButton },
      },
      slots: {
        default: `
        <div data-testid="popover-default">
        <CoreButton>Popover-Trigger</CoreButton>  
        </div>`,
        content: `<div>Popover-Content</div>`,
      },
      props: {
        modelValue: true,
        persist: true,
        "onUpdate:modelValue": mockOutsideClick,
      },
    });

    await fireEvent.click(document.body);

    expect(mockOutsideClick).not.toHaveBeenCalled();
  });

  test("Add wrapper and content class to the popover", () => {
    render(CorePopover, {
      global: {
        components: { CoreButton },
      },
      slots: {
        default: `
          <div data-testid="popover-default">
            <CoreButton>Popover-Trigger</CoreButton>  
          </div>`,
        content: `<div>Popover-Content</div>`,
      },
      props: {
        modelValue: true,
        class: "custom-content-class",
        wrapperClass: "custom-wrapper-class",
      },
    });

    const popoverWrapper = document.querySelector(".popover-wrapper");
    expect(popoverWrapper).toHaveClass("custom-wrapper-class");

    const popoverContent = document.querySelector(".popover-box");
    expect(popoverContent).toHaveClass("custom-content-class");
  });

  describe("Renders correct position depending on `position` props", () => {
    test("Check for `position` top prop class", () => {
      render(CorePopover, {
        global: {
          components: { CoreButton },
        },
        slots: {
          default: `
            <div data-testid="popover-default">
              <CoreButton>Popover-Trigger</CoreButton>  
            </div>`,
          content: `<div>Popover-Content</div>`,
        },
        props: {
          modelValue: true,
          position: "top",
        },
      });

      const popoverContent = document.querySelector(".popover-box");

      expect(popoverContent).toHaveClass("bottom-full");
    });
  });

  test("Check for `position` bottom prop class", () => {
    render(CorePopover, {
      global: {
        components: { CoreButton },
      },
      slots: {
        default: `
          <div data-testid="popover-default">
            <CoreButton>Popover-Trigger</CoreButton>  
          </div>`,
        content: `<div>Popover-Content</div>`,
      },
      props: {
        modelValue: true,
        position: "bottom left",
      },
    });

    const popoverContent = document.querySelector(".popover-box");

    expect(popoverContent).toHaveClass("left-0");
  });

  test("Check for `position` bottom right prop class", () => {
    render(CorePopover, {
      global: {
        components: { CoreButton },
      },
      slots: {
        default: `
          <div data-testid="popover-default">
            <CoreButton>Popover-Trigger</CoreButton>  
          </div>`,
        content: `<div>Popover-Content</div>`,
      },
      props: {
        modelValue: true,
        position: "bottom right",
      },
    });

    const popoverContent = document.querySelector(".popover-box");

    expect(popoverContent).toHaveClass("right-0");
  });
});
