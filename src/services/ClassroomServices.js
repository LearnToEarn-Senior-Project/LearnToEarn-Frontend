import apiClient from "@/services/axios/AxiosClient.js";
import store from "@/store";

export default {
  async getAllClassroom(page) {
    await apiClient
      .get(
        "/getGoogleClassrooms/" +
          JSON.parse(localStorage.getItem("user"))._id +
          "/page=" +
          page
      )
      .then((response) => {
        store.dispatch("setClassrooms", response.data);
      });
  },
  async getClassroomById(course_id) {
    await apiClient
      .get(
        "/getClassroom/" +
          JSON.parse(localStorage.getItem("user"))._id +
          "/" +
          course_id
      )
      .then((response) => {
        store.dispatch("setClassroom", response.data);
      });
  },
};
