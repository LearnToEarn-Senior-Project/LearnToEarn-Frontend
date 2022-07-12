import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import GAuth from "vue-google-oauth2";
import VueSweetalert2 from "vue-sweetalert2";
import "./index.css";
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
const gauthOption = {
  clientId:
    "726873603726-tq3t7s31jodv5qcu335dpn8beln6oise.apps.googleusercontent.com",
  prompt: "consent",
  plugin_name: "chat",
};
createApp(App)
  .use(store)
  .use(router)
  .use(GAuth, gauthOption)
  .use(VueSweetalert2, options)
  .mount("#app");
