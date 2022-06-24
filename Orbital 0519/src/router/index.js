import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Booking from "../views/Booking.vue";
import Fleet from "../components/Fleet.vue";
import ReadFleet from "../views/ReadFleet.vue";
import UpdateFleet from "../views/UpdateFleet.vue";
import { auth } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/online-booking-form",
    name: "Booking",
    component: Booking,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/fleet",
    name: "Fleet",
    component: Fleet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/fleet/add-fleet",
    name: "AddFleet",
    component: AddFleet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/fleet/read-fleet",
    name: "ReadFleet",
    component: ReadFleet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/fleet/update-fleet",
    name: "UpdateFleet",
    component: UpdateFleet,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" && auth.currentUser) {
    next("/");
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }

  next();
});

export default router;
