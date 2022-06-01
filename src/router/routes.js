import AuthServices from "@/services/authentication/AuthServices.js";

const routes = [
  /*================== ALL ==================*/
  {
    path: "/",
    name: "home",
    component: () => import("../views/BeforeLogin.vue"),
    beforeEnter: () => {
      if (localStorage.getItem("user") != null) {
        location.replace("http://localhost:3000/test_component");
      }
    },
  },
  {
    path: "/redirect",
    name: "OAuthRedirect",
    component: () => import("../views/BeforeLogin.vue"),
    beforeEnter: (route) => {
      return AuthServices.login(route.query.code);
    },
  },
  {
    path: "/test_component",
    name: "testComponents",
    component: () => import("../views/AboutView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  /*========== STUDENT AND TEACHER ==========*/
  {
    path: "/account_setting",
    name: "accountSetting",
    component: () => import("../views/AccountSetting.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/classrooms",
    name: "classroomList",
    component: () => import("../views/classroom/ClassroomList.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  /*=========== STUDENT AND ADMIN ===========*/
  {
    path: "/rewards",
    name: "rewardList",
    component: () => import("../views/reward/RewardList.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reward/:id",
    name: "rewardDetails",
    component: () => import("../views/reward/RewardDetails.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  /*================ STUDENT ================*/

  /*================ TEACHER ================*/

  /*================= ADMIN =================*/
  {
    path: "/addRewards",
    name: "addReward",
    component: () => import("../views/reward/AddReward.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];
export default routes;
