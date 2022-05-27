const CONSTANT_ROUTES = {
  /*================== ALL ==================*/
  HOME: "/",
  ABOUT: "/test_component",
  CMU_OAUTH_LOGIN: "/redirect",

  /*========== STUDENT AND TEACHER ==========*/
  ACCOUNT_SETTING: "/account_setting",
  CLASSROOM_LIST: "/classrooms",
  CLASSROOM_DETAIL: "/classroom/:id/",
  CLASSROOM_RANKING: "/classroom/:id/ranking",

  /*=========== STUDENT AND ADMIN ===========*/
  REWARD_LIST: "/rewards",
  REWARD_DETAIL: "/reward/:id",

  /*================ STUDENT ================*/
  TOKEN_TRANSACTION_HISTORY: "/:id/token_history",
  REWARD_PURCHASE_SUCCESS: "/reward/:id/success/:transaction_id",

  /*================ TEACHER ================*/
  CLASSROOM_CRITERIA: "/classroom/:id/criteria",

  /*================= ADMIN =================*/
  REWARD_ADD: "/add_reward",
  REWARD_EDIT: "/reward/:id/edit",
  TOKEN_ADD: "/add_token",
};
export default CONSTANT_ROUTES;
