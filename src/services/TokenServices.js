import apiClient from "@/services/axios/AxiosClient.js";
import store from "@/store";
import CryptoJS from "crypto-js";
import axios from "axios";
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
    return apiClient.post("/addToken", { amount: parseFloat(token) });
  },
  async getAllToken() {
    let allToken = await apiClient.get("/getAllToken");
    return allToken.data;
  },
  async getAllTokenHistory(page) {
    await apiClient
      .get(
        `/getAllTokenHistory/${CryptoJS.AES.decrypt(
          localStorage.getItem("user"),
          "uwvuvvwevwewvwe onyetenyevwe"
        ).toString(CryptoJS.enc.Utf8)}/page=${page}`
      )
      .then((response) => {
        store.dispatch("setTokenHistories", response.data);
      });
  },
  async getBillImage(transaction_id, reward_id) {
    await apiClient
      .post(
        `/getBillImage/${CryptoJS.AES.decrypt(
          localStorage.getItem("user"),
          "uwvuvvwevwewvwe onyetenyevwe"
        ).toString(CryptoJS.enc.Utf8)}`,
        {
          transaction_id: transaction_id,
          reward_id: reward_id,
        }
      )
      .then(async (response) => {
        await store.dispatch("setTokenHistory", response.data);
      });
  },
};
