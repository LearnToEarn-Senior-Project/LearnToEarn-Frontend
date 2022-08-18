import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import GAuth from "vue-google-oauth2";
import VueSweetalert2 from "vue-sweetalert2";
import VueQrcodeReader from "vue-qrcode-reader";
import VueExpandableImage from "vue-expandable-image";
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
  scope:
    "profile email https://www.googleapis.com/auth/classroom.student-submissions.students.readonly https://www.googleapis.com/auth/classroom.student-submissions.me.readonly https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly",
};
createApp(App)
  .use(store)
  .use(router)
  .use(VueQrcodeReader)
  .use(VueExpandableImage)
  .use(GAuth, gauthOption)
  .use(VueSweetalert2, options)
  .mount("#app");
