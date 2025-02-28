/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/vue";

import CoreSelect from "../src/core/select/Select.vue";
import { BaseSelectOption } from "../src/types";

describe("Testing CoreSelect", () => {
  const options: Readonly<BaseSelectOption[]> = [
    {
      label: "Option 1",
      value: "option1",
    },
    {
      label: "Option 2",
      value: "option2",
    },
    {
      label: "Option 3",
      value: "option3",
    },
  ];

  test("renders correct DOM elements on select focus", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: null,
      },
    });

    let listBox = screen.queryByRole("listbox");
    const input = screen.getByRole("combobox");

    expect(listBox).not.toBeInTheDocument();

    options.forEach((option) => {
      const optionElement = screen.queryByText(option.label);
      expect(optionElement).not.toBeInTheDocument();
    });

    await fireEvent.focus(input);

    listBox = screen.queryByRole("listbox");

    expect(listBox).toBeInTheDocument();
    options.forEach((option) => {
      const optionElement = screen.queryByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });

    await fireEvent.blur(input);

    listBox = screen.queryByRole("listbox");

    expect(listBox).not.toBeInTheDocument();
    options.forEach((option) => {
      const optionElement = screen.queryByText(option.label);
      expect(optionElement).not.toBeInTheDocument();
    });
  });

  test("hide select content when option is cliecked", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: null,
      },
    });

    const input = screen.getByRole("combobox");

    await fireEvent.focus(input);

    const optionElement = screen.getByText(options[0].label);

    await fireEvent.click(optionElement);

    const listBox = screen.queryByRole("listbox");

    expect(listBox).not.toBeInTheDocument();
  });

  test("emits the update:modelValue event when one of the options is select", async () => {
    const mockOptionSelectHandler = vi.fn();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: null,
        "onUpdate:modelValue": mockOptionSelectHandler,
      },
    });

    for (const option of options) {
      const input = screen.getByRole("combobox");
      await fireEvent.focus(input);
      const optionElement = screen.getByText(option.label);
      await fireEvent.click(optionElement);
    }

    options.forEach(async (option, index) => {
      expect(mockOptionSelectHandler).toHaveBeenCalled();

      const selectedOption = mockOptionSelectHandler.mock.calls[index][0];

      expect(selectedOption).toStrictEqual(option);
      expect(mockOptionSelectHandler).toBeCalledTimes(options.length);
    });
  });

  test("emits the change event when one of the options is select", async () => {
    const mockOptionSelectHandler = vi.fn();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: null,
        onChange: mockOptionSelectHandler,
      },
    });

    for (const option of options) {
      const input = screen.getByRole("combobox");
      await fireEvent.focus(input);
      const optionElement = screen.getByText(option.label);
      await fireEvent.click(optionElement);
    }

    options.forEach(async (option, index) => {
      expect(mockOptionSelectHandler).toHaveBeenCalled();

      const selectedOption = mockOptionSelectHandler.mock.calls[index][0];

      expect(selectedOption).toStrictEqual(option);
      expect(mockOptionSelectHandler).toBeCalledTimes(options.length);
    });
  });

  test("emits blur event when option is selected and input blur occurs", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: null,
      },
    });

    const input = screen.getByRole("combobox");

    await fireEvent.focus(input);

    const optionElement = screen.getByText(options[0].label);

    await fireEvent.click(optionElement);

    const listBox = screen.queryByRole("listbox");

    expect(optionElement).not.toBeInTheDocument();
    expect(listBox).not.toBeInTheDocument();
  });

  test("testing disabled prop on the select component and input element", () => {
    const mockOptionSelectHandler = vi.fn();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: null,
        disabled: true,
        onChange: mockOptionSelectHandler,
      },
    });

    const input = screen.getByRole("combobox");

    expect(input).toHaveAttribute("disabled");

    fireEvent.focus(input);

    const listBox = screen.queryByRole("listbox");

    expect(listBox).not.toBeInTheDocument();
    expect(mockOptionSelectHandler).not.toHaveBeenCalled();
  });

  test("testing the placeholder prop on the select component", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: null,
        placeholder: "Select an option",
      },
    });

    const input = screen.getByRole("combobox");
    const placeholder = screen.getByText("Select an option");

    expect(input).toHaveAttribute("placeholder", "Select an option");
    expect(placeholder).toBeInTheDocument();
  });

  test("testing the loading props on the select component", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: null,
        loading: true,
      },
    });

    const input = screen.getByRole("combobox");
    const loading = screen.queryByTestId("loading");

    expect(input).toHaveAttribute("placeholder", "Select an option");
    expect(loading).toBeInTheDocument();
  });

  test("testing corect render of sufix and prefix slot on the select component", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: null,
        loading: true,
      },
      slots: {
        sufix: "<div data-testid='sufix-slot'>Sufix Slot</div>",
        prefix: "<div data-testid='prefix-slot'>Prefix Slot</div>",
      },
    });

    const sufixSlot = screen.queryByTestId("sufix-slot");
    const prefixSlot = screen.queryByTestId("prefix-slot");

    expect(sufixSlot).toBeInTheDocument();
    expect(prefixSlot).toBeInTheDocument();

    const input = screen.getByRole("combobox");

    expect(input).toHaveAttribute("disabled");

    const loading = screen.queryByTestId("loading");

    expect(loading).not.toBeInTheDocument();
  });

  test("testing the modelValue props to select and option", async () => {
    const randomIndex = Math.floor(Math.random() * options.length);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(CoreSelect as any, {
      props: {
        options,
        modelValue: options[randomIndex],
      },
    });

    const input = screen.getByRole("combobox");
    const optionText = screen.getByText(options[randomIndex].label);

    expect(input).toHaveValue(options[randomIndex].value);
    expect(optionText).toBeInTheDocument();
  });
});
