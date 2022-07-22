import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Booking from "../views/BookingForm.vue";
import ReadFleet from "../views/ReadFleet.vue";
import UpdateFleet from "../components/UpdateFleet.vue";
import AddFleet from "../views/AddFleet.vue";
import CustomerBooking from "../views/CustomerBooking.vue";
import CustomerBookingHistory from "../views/CustomerBookingHistory.vue";
import PageNotFound from "../components/PageNotFound.vue";
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
    path: "/history",
    name: "CustomerBookingHistory",
    component: CustomerBookingHistory,
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
    path: "/view-booking",
    name: "CustomerBooking",
    component: CustomerBooking,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound
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
