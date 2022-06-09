import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: JSON.parse(localStorage.getItem("user")),
    role: null,
    reward: null,
    rewards: null,
    currentToken: null,
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
    getRole(state) {
      return state.role;
    },
    getReward(state) {
      return state.reward;
    },
    getRewards(state) {
      return state.rewards;
    },
    getCurrentToken(state) {
      return state.currentToken;
    },
  },
  mutations: {
    setCurrentUser(state, value) {
      state.currentUser = value;
    },
    setRole(state, value) {
      state.role = value;
    },
    setReward(state, value) {
      state.reward = value;
    },
    setRewards(state, value) {
      state.rewards = value;
    },
    setCurrentToken(state, value) {
      state.currentToken = value;
    },
  },
  actions: {
    setCurrentUser(context, value) {
      context.commit("setCurrentUser", value);
    },
    setRole(context, value) {
      context.commit("setRole", value);
    },
    setReward(context, value) {
      context.commit("setReward", value);
    },
    setRewards(context, value) {
      context.commit("setRewards", value);
    },
    setCurrentToken(context, value) {
      context.commit("setCurrentToken", value);
    },
  },
});
