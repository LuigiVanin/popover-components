import "./style.css";

import { App } from "vue";

import MyBrandButton from "./MyBrandButton/MyBrandButton.vue";

export { MyBrandButton };

export default {
  install: (app: App) => {
    app.component("MyBrandButton", MyBrandButton);
  },
};
