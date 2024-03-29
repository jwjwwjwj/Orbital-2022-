<template>
  <header>
    <nav v-if="$store.state.user">
      <div class="branding">
        <span class="brand-name">Transporfficient</span>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li>
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li v-if="!$store.state.isManager">
          <router-link class="link" :to="{ name: 'Booking' }"
            >Booking</router-link
          >
        </li>
        <li v-if="!$store.state.isManager">
          <router-link class="link" :to="{ name: 'CustomerBookingHistory' }"
            >History</router-link
          >
        </li>
        <li v-if="$store.state.isManager">
          <router-link class="link" :to="{ name: 'CustomerBooking' }"
            >View Bookings</router-link
          >
        </li>
        <li v-if="$store.state.isManager">
          <router-link class="link" :to="{ name: 'ReadFleet' }"
            >Fleet Overview</router-link
          >
        </li>
      </ul>
      <ul v-show="!mobile" class="navigation">
        <li>
          <span class="welcome-message"
            >Welcome, {{ $store.state.displayName }} &nbsp;</span
          ><i class="far fa-user"></i>
        </li>
        <li>
          <router-link class="link" @click="logOut" :to="{ name: 'Login' }"
            >Logout &nbsp;<i class="far fa-sign-out-alt"></i
          ></router-link>
        </li>
      </ul>
      <div class="icon">
        <i
          @click="toggleMobileNav"
          v-show="mobile"
          class="far fa-bars"
          :class="{ 'icon-active': mobileNav }"
        ></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><span class="brand-name">Transporfficient</span></li>
          <li>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li v-if="!$store.state.isManager">
            <router-link class="link" :to="{ name: 'Booking' }"
              >Booking</router-link
            >
          </li>
          <li v-if="!$store.state.isManager">
            <router-link class="link" :to="{ name: 'CustomerBookingHistory' }"
              >History</router-link
            >
          </li>
          <li v-if="$store.state.isManager">
            <router-link class="link" :to="{ name: 'CustomerBooking' }"
              >View Bookings</router-link
            >
          </li>
          <li v-if="$store.state.isManager">
            <router-link class="link" :to="{ name: 'ReadFleet' }"
              >Fleet Overview</router-link
            >
          </li>
          &nbsp;&nbsp;&nbsp;
          <li>
            <span class="welcome-message"
              >Welcome, {{ $store.state.displayName }} &nbsp;</span
            ><i class="far fa-user"></i>
          </li>
          <li>
            <router-link class="link" @click="logOut" :to="{ name: 'Login' }"
              >Logout &nbsp;<i class="far fa-sign-out-alt"></i
            ></router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
import { useStore } from "vuex";
import { auth } from "../firebase/index.js";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "navigationPath",
  data() {
    return {
      displayName: auth.currentUser !== null ? auth.currentUser.email : "",
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreenSize);
    this.checkScreenSize();
  },
  setup() {
    const store = useStore();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch("fetchUser");
      }
    });
  },
  components: {},
  methods: {
    logOut() {
      this.$store.dispatch("logout");
      this.mobileNav = false;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreenSize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 1000) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
  },
  watch: {
    $route() {
      this.mobileNav = false;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  width: 100%;
  position: relative;
  transition: 0.5s ease all;
  color: white;

  nav {
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: 0.5s ease all;
    width: 96%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1340px;
    }

    ul.navigation {
      margin-left: 60px;
    }

    ul,
    .link {
      font-weight: 500;
      color: rgb(155, 153, 153);
      list-style: none;
      text-decoration: none;
    }

    ul.navigation li {
      text-align: center;
      text-transform: uppercase;
      padding: 14px 14px 0px 0px;
      margin-left: 14px;
      color: lightgrey;

      .router-link-active.router-link-exact-active.link {
        color: white;
        border-color: white;
        text-decoration: none;
      }
    }

    li {
      text-transform: uppercase;
      padding: 14px 14px 0px 0px;
      margin-left: 14px;
      color: lightgrey;

      .router-link-active.router-link-exact-active.link {
        color: white;
        border-color: white;
        text-decoration: none;
      }
    }

    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 2px solid transparent;

      &:hover {
        color: white;
        border-color: white;
      }
    }

    .branding {
      display: flex;
      align-items: center;

      .brand-name {
        text-align: left;
        text-transform: none;
        font-size: 24px;
        flex: 1;
      }
    }

    .welcome-message {
      text-transform: none;
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      bottom: 0;
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;

      i {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
      }
    }

    .icon-active {
      transform: rotate(90deg);
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      top: 0;
      left: 0;

      li {
        margin-left: 0;
        padding-left: 14px;

        .router-link-active.router-link-exact-active.link {
          color: white;
          border-color: white;
          text-decoration: none;
        }

        .link {
          color: rgb(155, 153, 153);
          font-size: 14px;
          transition: 0.5s ease all;
          padding-bottom: 4px;
          border-bottom: 2px solid transparent;

          &:hover {
            color: white;
            border-color: white;
          }
        }

        .brand-name {
          text-transform: none;
          color: white;
          background-color: black;
          font-size: 24px;
        }

        .welcome-message {
          text-transform: none;
        }
      }
    }
  }
}
</style>
