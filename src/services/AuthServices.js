import apiClient from "@/services/axios/AxiosClient.js";

export default {
  addGoogleUser(access_token, firstname, lastname, email, image_url) {
    return apiClient.post("/google_login", {
      access_token: access_token,
      firstname: firstname,
      lastname: lastname,
      email: email,
      image_url: image_url,
    });
  },
};
