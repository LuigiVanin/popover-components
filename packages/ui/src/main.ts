import "./style.css";

import { App } from "vue";

import CoreButton from "./core/Button.vue";
import CorePopover from "./core/popover/Popover.vue";

export { CoreButton, CorePopover };

export default {
  install: (app: App) => {
    app.component("CoreButton", CoreButton);
    app.component("CorePopover", CorePopover);
  },
};
