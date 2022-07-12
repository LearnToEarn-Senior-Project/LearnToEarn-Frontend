export default {
  logout: {
    type: Function,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  token: {
    type: Number,
    required: true,
  },
  swap: {
    type: Function,
    required: true,
  },
};
