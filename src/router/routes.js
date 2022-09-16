import router from ".";
import AuthServices from "@/services/authentication/AuthServices.js";
export default [
  /*================== ALL ==================*/
  {
    path: "/",
    name: "beforeLogin",
    component: () => import("../views/BeforeLogin.vue"),
    beforeEnter: async () => {
      if (localStorage.getItem("user") != null) {
        let role = await AuthServices.getRole();
        if (role[0] == "admin") {
          router.push({ name: "adminConsole" });
        } else {
          router.push({ name: "classroomList" });
        }
      }
    },
  },
  {
    path: "/redirect",
    name: "OAuthRedirect",
    beforeEnter: (route) => {
      return AuthServices.login(route.query.code);
    },
  },
  {
    path: "/terms_and_conditions",
    name: "termAndConditions",
    component: () => import("../views/TermsAndConditions.vue"),
  },
  /*========== STUDENT AND TEACHER ==========*/
  {
    path: "/account_setting",
    name: "accountSetting",
    component: () => import("../views/account/AccountSetting.vue"),
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
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: "/classroom/:id",
    name: "classroomDetail",
    component: () => import("../views/classroom/ClassroomDetails.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  /*=========== STUDENT AND ADMIN ===========*/
  {
    path: "/reward/:id/",
    name: "rewardDetails",
    component: () => import("../views/reward/RewardDetails.vue"),
    meta: {
      requiresAuth: true,
      adminAndStudent: true,
    },
  },

  /*================ STUDENT ================*/
  {
    path: "/reward_shop",
    name: "rewardList",
    component: () => import("../views/reward/RewardList.vue"),
    meta: {
      requiresAuth: true,
      studentOnly: true,
    },
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: "/token_history",
    name: "tokenHistory",
    component: () =>
      import("../views/user/students/TokenHistory.vue"),
    meta: {
      requiresAuth: true,
      studentOnly: true,
    },
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: "/success/wql:tokenHistory_id+w:reward_id",
    name: "redeemSuccess",
    component: () => import("../views/user/students/RedeemSuccess.vue"),
    meta: {
      requiresAuth: true,
      studentOnly: true,
    },
  },
  /*================ TEACHER ================*/
  {
    path: "/classroom/:id/criteria",
    name: "classroomCriteria",
    component: () =>
      import("../views/classroom/children/ClassroomCriteria.vue"),
    meta: {
      requiresAuth: true,
      teacherOnly: true,
    },
  },
  {
    path: "/classroom/:id/statistics",
    name: "classroomCriteriaStatictic",
    component: () =>
      import("../views/classroom/children/ClassroomCriteriaStatistics.vue"),
    meta: {
      requiresAuth: true,
      teacherOnly: true,
    },
  },
  /*================= ADMIN =================*/
  {
    path: "/admin_console",
    name: "adminConsole",
    component: () => import("../views/user/admin/AdminRewardList.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: "/add_reward",
    name: "addReward",
    component: () => import("../views/reward/AddReward.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
  {
    path: "/reward/:id/edit",
    name: "rewardEdit",
    component: () => import("../views/reward/children/RewardEdit.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
  {
    path: "/add_token",
    name: "addToken",
    component: () => import("../views/user/admin/TokenManagement.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
  {
    path: "/student_statement_approval",
    name: "statementApproval",
    component: () => import("../views/user/admin/StudentStatementApproval.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: "/qr_code_student_statement_approval",
    name: "qrCodeStatementApproval",
    component: () => import("../views/user/admin/ApproveByQRCode.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
];
