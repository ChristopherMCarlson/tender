// src/router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../components/LoginComponent.vue";
import Register from "../components/RegisterComponent.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    store.dispatch("checkToken");
    if (!store.getters.isLoggedIn) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
