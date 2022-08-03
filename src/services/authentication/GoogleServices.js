import apiClient from "@/services/axios/AxiosClient.js";
import CryptoJS from "crypto-js";

export default {
  bindGoogleAccount(auth_code) {
    return apiClient.post("/google_login", {
      id: CryptoJS.AES.decrypt(
        localStorage.getItem("user"),
        "uwvuvvwevwewvwe onyetenyevwe"
      ).toString(CryptoJS.enc.Utf8),
      auth_code: auth_code,
    });
  },
  unbindGoogleAccount() {
    return apiClient.post("/google_logout", {
      id: CryptoJS.AES.decrypt(
        localStorage.getItem("user"),
        "uwvuvvwevwewvwe onyetenyevwe"
      ).toString(CryptoJS.enc.Utf8),
    });
  },
  getGoogleData() {
    return apiClient.get(
      `/googleGetData/${CryptoJS.AES.decrypt(
        localStorage.getItem("user"),
        "uwvuvvwevwewvwe onyetenyevwe"
      ).toString(CryptoJS.enc.Utf8)}`
    );
  },
};
