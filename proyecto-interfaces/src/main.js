import "../src/styles/main.scss";
import "./assets/main.css";
import "vue3-colorpicker/style.css";
import "bulma/css/bulma.css";
import App from "./App.vue";
import Vue3ColorPicker from "vue3-colorpicker";
import { createApp } from "vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use("vue3-colorpicker", Vue3ColorPicker);
// app.use(store);
app.mount("#app");
