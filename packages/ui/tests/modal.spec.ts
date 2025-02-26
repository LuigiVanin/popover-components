/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/vue";

import CoreButton from "../src/core/button/Button.vue";
import CoreModal from "../src/core/modal/Modal.vue";

describe("Testing CoreModal", () => {
  test("renders modal contents when modelValue is true", () => {
    const randomId = `a${Math.random().toString(36).substring(7)}`;

    render(CoreModal, {
      props: {
        modelValue: true,
        id: randomId,
      },
    });

    const modalWrapper = document.querySelector(".modal-wrapper-teleport");
    const modalWrapperById = document.querySelector(`#${randomId}`);

    expect(modalWrapper).toBeInTheDocument();
    expect(modalWrapperById).toBeInTheDocument();

    expect(modalWrapper?.innerHTML).toEqual(modalWrapperById?.innerHTML);

    const modalOverlay = document.querySelector(".modal-overlay");
    expect(modalOverlay).toBeInTheDocument();
    expect(modalOverlay).toBeEmptyDOMElement();

    const modalCard = document.querySelector(".modal-card");
    const modalCardById = document.querySelector(`#${randomId}-card`);
    expect(modalCard).toBeInTheDocument();
    expect(modalCardById).toBeInTheDocument();

    expect(modalCard?.innerHTML).toEqual(modalCardById?.innerHTML);

    expect(modalCard).not.toBeEmptyDOMElement();

    const modalCloseButton = document.querySelector(".close-btn");

    expect(modalCloseButton).toBeInTheDocument();
    expect(modalCloseButton).not.toBeEmptyDOMElement();
    expect(modalCloseButton?.tagName).toBe("BUTTON");

    const svgChild = modalCloseButton?.querySelector("svg");
    expect(svgChild).toBeInTheDocument();
    expect(svgChild?.tagName).toBe("svg");
  });

  test("renders default slot content with CoreButton when modelValue is true", () => {
    render(CoreModal, {
      props: {
        modelValue: true,
      },
      slots: {
        default: `
          <div class="wrapper">
            <span>Label:</span>
            <CoreButton data-testid="modal-button">Teste</CoreButton>
          </div>
        `,
      },
      global: {
        components: { CoreButton },
      },
    });

    const spanWithText = screen.queryByText("Label:");
    const buttonWithText = screen.queryByText("Teste");

    expect(spanWithText).toBeInTheDocument();
    expect(buttonWithText).toBeInTheDocument();

    const coreButton = screen.getByTestId("modal-button");

    expect(coreButton).toBeInTheDocument();
    expect(coreButton).toHaveTextContent(/Teste/i);

    expect(coreButton.tagName).toBe("BUTTON");
  });

  test("does not render default slot content when modelValue is false", () => {
    render(CoreModal, {
      props: {
        modelValue: false,
      },
      global: {
        components: { CoreButton },
      },
      slots: {
        default: `
          <div class="wrapper">
            <span>Label:</span>
            <CoreButton data-testid="modal-button">Teste</CoreButton>
          </div>
        `,
      },
    });

    const spanWithText = screen.queryByText("Label:");
    const buttonWithText = screen.queryByText("Teste");

    expect(spanWithText).not.toBeInTheDocument();
    expect(buttonWithText).not.toBeInTheDocument();

    const coreButton = screen.queryByTestId("modal-button");

    expect(coreButton).not.toBeInTheDocument();
  });

  test("renders custom text inside of close button when using `close-btn` slot", () => {
    render(CoreModal, {
      props: {
        modelValue: true,
      },
      slots: {
        "close-btn": "Fechar",
      },
    });

    const modalCloseButton = screen.getByRole("button");

    expect(modalCloseButton).toBeInTheDocument();
    expect(modalCloseButton).toHaveTextContent(/Fechar/i);

    const modalCloseBtnByText = screen.queryByText("Fechar");

    expect(modalCloseBtnByText).toBeInTheDocument();
  });

  test("emits update:modelValue event with false when close button is clicked", async () => {
    const mockCloseHandler = vi.fn();

    render(CoreModal, {
      props: {
        modelValue: true,
        "onUpdate:modelValue": mockCloseHandler,
      },
    });

    const modalCloseButton = screen.getByRole("button");

    await fireEvent.click(modalCloseButton);

    expect(modalCloseButton).toBeInTheDocument();
    expect(mockCloseHandler).toHaveBeenCalledWith(false);
  });

  test("emits update:modelValue event with false when overlay is clicked", async () => {
    const mockCloseHandler = vi.fn();

    render(CoreModal, {
      props: {
        modelValue: true,
        "onUpdate:modelValue": mockCloseHandler,
      },
    });

    const modalOverlay = screen.getByRole("dialog");

    await fireEvent.click(modalOverlay);

    expect(modalOverlay).toBeInTheDocument();
    expect(mockCloseHandler).toHaveBeenCalledWith(false);
  });

  test("emits update:modelValue event with false when escape key is pressed", async () => {
    const mockCloseHandler = vi.fn();

    render(CoreModal, {
      props: {
        modelValue: true,
        "onUpdate:modelValue": mockCloseHandler,
      },
    });

    const modalCard = screen.getByRole("dialog");

    await fireEvent.keyDown(modalCard, { key: "Escape", code: "Escape" });

    expect(modalCard).toBeInTheDocument();

    expect(mockCloseHandler).toHaveBeenCalled();
  });

  test("does not emit update:modelValue event when overlay is clicked and persist prop is true", async () => {
    const mockCloseHandler = vi.fn();

    render(CoreModal, {
      props: {
        modelValue: true,
        persist: true,
        "onUpdate:modelValue": mockCloseHandler,
      },
    });

    const modalOverlay = screen.getByRole("dialog");

    await fireEvent.click(modalOverlay);

    expect(mockCloseHandler).not.toHaveBeenCalled();
  });

  test("does not render close button when `closButton` prop is false", () => {
    render(CoreModal, {
      props: {
        modelValue: true,
        closeButton: false,
      },
    });

    const modalCloseButton = screen.queryByRole("button");

    expect(modalCloseButton).not.toBeInTheDocument();
  });
});
