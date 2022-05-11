import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";
import "./index.css";
import "@fontsource/prompt";
import "@/services/axios/AxiosInterceptorSetup.js";
import "sweetalert2/dist/sweetalert2.min.css";
const options = {
  confirmButtonColor: "#3f5fff",
  cancelButtonColor: "#a7a7ad",
  cancelButtonText: "Cancel",
  customClass: {
    title: "text-lg",
    text: "text-sm",
  },
};
createApp(App)
  .use(store)
  .use(VueSweetalert2, options)
  .use(router)
  .mount("#app");
