import apiClient from "@/services/axios/AxiosClient.js";
export default {
  async getStudentToken() {
    let studentCurrentToken = await apiClient.get(
      "/studentToken/" + JSON.parse(localStorage.getItem("user"))._id
    );
    return JSON.parse(studentCurrentToken.data);
  },
  async addToken(token) {
    return apiClient.post("/addToken", { amount: parseFloat(token) });
  },
  async getAllToken() {
    let allToken = await apiClient.get("/getAllToken");
    return allToken.data;
  },
};
