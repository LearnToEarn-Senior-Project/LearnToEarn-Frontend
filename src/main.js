import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import GAuth from "vue-google-oauth2";
import VueSweetalert2 from "vue-sweetalert2";
import msal from "vue-msal";
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
const msauthOption = {
  auth: {
    clientId: "d7b3b3c4-e90e-4aab-8f99-27c5e9c27965",
    redirectUri: "http://localhost:3000/auth",
    postLogoutRedirectUri: "http://localhost:3000/",
  },
  graph: {
    callAfterInit: true,
    endpoints: {
      profile: "/me",
      /*  allTeams: "/me/joinedTeams", */
    },
  },
  request: {
    scopes: [
      "User.Read",
      /* "Team.ReadBasic.All", */
      /* "TeamSettings.Read.All",
      "TeamSettings.ReadWrite.All",
      "Directory.Read.All",
      "Directory.ReadWrite.All", */
    ],
  },
};
createApp(App)
  .use(store)
  .use(router)
  .use(msal, msauthOption)
  .use(GAuth, gauthOption)
  .use(VueSweetalert2, options)
  .mount("#app");
