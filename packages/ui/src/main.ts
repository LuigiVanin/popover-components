import "./style.css";

import { App } from "vue";

import CoreButton from "./core/button/Button.vue";
import CorePopover from "./core/popover/Popover.vue";
import CoreSelect from "./core/select/Select.vue";

export { CoreButton, CorePopover, CoreSelect };

export default {
  install: (app: App) => {
    app.component("CoreButton", CoreButton);
    app.component("CorePopover", CorePopover);
    app.component("CoreSelect", CoreSelect);
  },
};
