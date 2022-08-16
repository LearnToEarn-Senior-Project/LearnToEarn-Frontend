import apiClient from "@/services/axios/AxiosClient.js";
import store from "@/store";
import CryptoJS from "crypto-js";

export default {
  async getStudentToken() {
    let studentCurrentToken = await apiClient.get(
      `/studentToken/${CryptoJS.AES.decrypt(
        localStorage.getItem("user"),
        "uwvuvvwevwewvwe onyetenyevwe"
      ).toString(CryptoJS.enc.Utf8)}`
    );
    return JSON.parse(studentCurrentToken.data);
  },
  async addToken(token) {
    return apiClient.post("/addToken", { amountOfCoin: parseFloat(token) });
  },
  async getAllToken() {
    let allToken = await apiClient.get("/getAllToken");
    return allToken.data;
  },
  async getAllTokenHistory(page, bool) {
    await apiClient
      .get(
        `/getAllTokenHistory/${CryptoJS.AES.decrypt(
          localStorage.getItem("user"),
          "uwvuvvwevwewvwe onyetenyevwe"
        ).toString(CryptoJS.enc.Utf8)}/page=${page}/bool=${bool}`
      )
      .then((response) => {
        store.dispatch("setTokenHistories", response.data);
      });
  },
  async getAllTokenHistorySearch(user_id, page, bool) {
    await apiClient
      .get(`/getAllTokenHistory/${user_id}/page=${page}/bool=${bool}`)
      .then((response) => {
        store.dispatch("setTokenHistories", response.data);
      });
  },
  async getAllTokenHistoryForAdmin(page) {
    await apiClient.get(`/getAllTokenHistory/page=${page}`).then((response) => {
      store.dispatch("setTokenHistories", response.data);
    });
  },
  async approveStatement(tokenHistory_id) {
    await apiClient.patch(`/approve/${tokenHistory_id}`);
  },
  async getStudentStatementImage(tokenHistory_id, reward_id) {
    await apiClient
      .post(
        `/getStatementImage/${CryptoJS.AES.decrypt(
          localStorage.getItem("user"),
          "uwvuvvwevwewvwe onyetenyevwe"
        ).toString(CryptoJS.enc.Utf8)}`,
        {
          tokenHistory_id: tokenHistory_id,
          reward_id: reward_id,
        }
      )
      .then(async (response) => {
        await store.dispatch("setTokenHistory", response.data);
      });
  },
};
