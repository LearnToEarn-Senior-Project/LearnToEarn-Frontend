import apiClient from "@/services/axios/AxiosClient.js";

export default {
  bindGoogleAccount(auth_code) {
    return apiClient.post("/google_login", {
      id: JSON.parse(localStorage.getItem("user"))._id,
      auth_code: auth_code,
    });
  },
  unbindGoogleAccount() {
    return apiClient.post("/google_logout", {
      id: JSON.parse(localStorage.getItem("user"))._id,
    });
  },
  getGoogleData() {
    return apiClient.get(
      "/googleGetData/" + JSON.parse(localStorage.getItem("user"))._id
    );
  },
};
