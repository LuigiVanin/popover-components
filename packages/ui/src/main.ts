import "./style.css";

import { App } from "vue";

import CoreButton from "./core/Button.vue";

export { CoreButton };

export default {
  install: (app: App) => {
    app.component("MyBrandButton", CoreButton);
  },
};
