import apiClient from "@/services/axios/AxiosClient.js";
import store from "@/store";
import CryptoJS from "crypto-js";

export default {
  async getAllClassroom(page) {
    await apiClient
      .get(
        `/getGoogleClassrooms/${CryptoJS.AES.decrypt(
          localStorage.getItem("user"),
          "uwvuvvwevwewvwe onyetenyevwe"
        ).toString(CryptoJS.enc.Utf8)}/page=${page}`
      )
      .then((response) => {
        store.dispatch("setClassrooms", response.data);
      });
  },
  async getClassroomWithAssignment(course_id) {
    await apiClient
      .get(
        `/getClassroomWithAssignment/${CryptoJS.AES.decrypt(
          localStorage.getItem("user"),
          "uwvuvvwevwewvwe onyetenyevwe"
        ).toString(CryptoJS.enc.Utf8)}/${course_id}`
      )
      .then((response) => {
        store.dispatch("setClassroomWithAssignment", response.data);
      });
  },

  async getClassroom(course_id) {
    await apiClient.get(`/getClassroom/${course_id}`).then((response) => {
      store.dispatch("setClassroom", response.data);
    });
  },

  async setClassroomCriteria(course_id, criteria) {
    await apiClient.post("/setCriteria", {
      id: course_id,
      first: criteria.first,
      second: criteria.second,
      third: criteria.third,
    });
  },

  async getClassroomCriteria(course_id) {
    await apiClient.get(`/getCriteria/${course_id}`).then((response) => {
      store.dispatch("setCriteria", response.data);
    });
  },
};
