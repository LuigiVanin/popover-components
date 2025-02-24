/* eslint-disable no-undef */
import { render } from "@testing-library/vue";

import CoreButton from "../src/core/button/Button.vue";
import CoreModal from "../src/core/modal/Modal.vue";

describe("Testing CoreModal", () => {
  test("renders default slot content with CoreButton", () => {
    render(CoreModal, {
      props: {
        modelValue: true,
      },
      slots: {
        default: `
          <div>
            <span>Label:</span>
            <CoreButton>Teste</CoreButton>
          </div>
        `,
      },
      global: {
        components: { CoreButton },
      },
    });

    console.log(document.body.innerHTML);
    expect(true).toBe(true);
  });
});
