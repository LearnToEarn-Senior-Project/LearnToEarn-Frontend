import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: JSON.parse(localStorage.getItem("user")),
    role: null,
    reward: null,
    rewards: null,
    criteria: null,
    classroom: null,
    classrooms: null,
    currentToken: null,
    classroomWithAssignment: null,
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
    getCriteria(state) {
      return state.criteria;
    },
    getClassroom(state) {
      return state.classroom;
    },
    getClassrooms(state) {
      return state.classrooms;
    },
    getCurrentToken(state) {
      return state.currentToken;
    },
    getClassroomWithAssignment(state) {
      return state.classroomWithAssignment;
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
    setCriteria(state, value) {
      state.criteria = value;
    },
    setRewards(state, value) {
      state.rewards = value;
    },
    setClassroom(state, value) {
      state.classroom = value;
    },
    setClassrooms(state, value) {
      state.classrooms = value;
    },
    setCurrentToken(state, value) {
      state.currentToken = value;
    },
    setClassroomWithAssignment(state, value) {
      state.classroomWithAssignment = value;
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
    setCriteria(context, value) {
      context.commit("setCriteria", value);
    },
    setClassroom(context, value) {
      context.commit("setClassroom", value);
    },
    setClassrooms(context, value) {
      context.commit("setClassrooms", value);
    },
    setCurrentToken(context, value) {
      context.commit("setCurrentToken", value);
    },
    setClassroomWithAssignment(context, value) {
      context.commit("setClassroomWithAssignment", value);
    },
  },
});
