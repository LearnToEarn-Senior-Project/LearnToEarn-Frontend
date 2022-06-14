import apiClient from "@/services/axios/AxiosClient.js";
import store from "@/store";

export default {
  async getAllClassroom(page) {
    const getAllClassrooms = await apiClient.get(
      "/getGoogleClassrooms/" +
        JSON.parse(localStorage.getItem("user"))._id +
        "/page=" +
        page
    );
    store.dispatch("setClassrooms", getAllClassrooms.data);
  },
  async getClassroomById(course_id) {
    const getClassroom = await apiClient.get(
      "/getClassroom/" +
        JSON.parse(localStorage.getItem("user"))._id +
        "/" +
        course_id
    );
    store.dispatch("setClassroom", getClassroom.data);
  },
};
