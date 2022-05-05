import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import "@fontsource/prompt";
import "@/services/AxiosInterceptorSetup.js";
createApp(App).use(store).use(router).mount("#app");
