import CONSTANT_ROUTES from "@/constants/routes";
import AuthServices from "@/services/AuthServices.js";

const routes = [
  /*================== ALL ==================*/
  {
    path: CONSTANT_ROUTES.HOME,
    name: "home",
    component: () => import("../views/BeforeLogin.vue"),
    beforeEnter: () => {
      if (localStorage.getItem("user") != null) {
        location.replace("http://localhost:3000/test_component");
      }
    },
  },
  {
    path: CONSTANT_ROUTES.CMU_OAUTH_LOGIN,
    name: "OAuthRedirect",
    component: () => import("../views/BeforeLogin.vue"),
    beforeEnter: (route) => {
      return AuthServices.login(route.query.code);
    },
  },
  {
    path: CONSTANT_ROUTES.ABOUT,
    name: "testComponents",
    component: () => import("../views/AboutView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  /*========== STUDENT AND TEACHER ==========*/
  {
    path: CONSTANT_ROUTES.ACCOUNT_SETTING,
    name: "accountSetting",
    component: () => import("../views/AccountSetting.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: CONSTANT_ROUTES.CLASSROOM_LIST,
    name: "classroomList",
    component: () => import("../views/classroom/ClassroomList.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  /*=========== STUDENT AND ADMIN ===========*/
  {
    path: CONSTANT_ROUTES.REWARD_LIST,
    name: "rewardList",
    component: () => import("../views/reward/RewardList.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  /*================ STUDENT ================*/

  /*================ TEACHER ================*/

  /*================= ADMIN =================*/
];
export default routes;
