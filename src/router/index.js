import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  to.matched.some((record) => {
    record.meta.requiresAuth;
  });
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("user") == null) {
      next({ name: "home" });
    } else {
      store.dispatch("setCurrentUser", localStorage.getItem("user"));
      next();
    }
  } else {
    next();
  }
});
export default router;
