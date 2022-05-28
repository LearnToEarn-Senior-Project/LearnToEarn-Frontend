import apiClient from "@/services/axios/AxiosClient.js";

export default {
  getAllClassroom() {
    return apiClient.get(
      "/getGoogleClassrooms/" + JSON.parse(localStorage.getItem("user"))._id
    );
  },
};
