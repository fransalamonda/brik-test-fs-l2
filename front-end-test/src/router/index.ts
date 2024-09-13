import { createRouter, createWebHistory } from "vue-router";
import HomeView  from "../views/HomeView.vue";
import Login     from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import ProductDetails from "../views/ProductDetails.vue";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.group === "admin";
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/details/:id",
      component: ProductDetails,
      name: "ProductDetails",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next("/login");
    } else if (to.matched.some((record) => record.meta.requiresAdmin) && !isAdmin()) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
