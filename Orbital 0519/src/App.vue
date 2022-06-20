<template>
  <div class="app">
    <nav class="navbar navbar-inverse" v-if="$store.state.user">
      <span class="nav navbar-nav navbar-left">Transporfficient</span>
      <button
        type="button"
        class="navbar-toggle"
        data-toggle="collapse"
        data-target="#myNavbar"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <router-link class="link" to="/">Home</router-link>
          <router-link class="link" to="/about">About</router-link>
          <router-link class="link" to="/online-booking-form" v-if"!$store.state.isManager"
            >Booking</router-link
          >
          <Fleet
            class="fleet"
            title="Fleet"
            v-if="$store.state.isManager"
            v-on:mouseover="mouseover"
            v-on:mouseleave="mouseleave"
          />
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <span class="welcome-message"
            >Welcome, {{ $store.state.displayName }}
          </span>
          <router-link class="link" @click="$store.dispatch('logout')" to="/login">
            <span class="glyphicon glyphicon-log-out"></span>
            Logout</router-link
          >
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { auth } from "./firebase/index.js";
import { onAuthStateChanged } from "firebase/auth";
import Fleet from "./components/Fleet.vue";

export default {
  name: "app",
  data() {
    return {
      displayName: auth.currentUser !== null ? auth.currentUser.email : "",
      isOpen: false,
    };
  },
  setup() {
    const store = useStore();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch("fetchUser");
      }
    });
  },
  
  components: {
    Fleet,
  },
  
  methods: {
    mouseover: function () {
      this.isOpen = true;
    },
    mouseleave: function () {
      this.isOpen = false;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#nav a.router-link-exact-active {
  color: white;
}
</style>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0px;
}
.nav.navbar-nav.navbar-left {
  font-size: 20px;
  color: white;
  padding: 0px 20px 0px 20px;
}
.navbar {
  padding: 15px 10px 15px 0px;
}
.link,
.welcome-message {
  font-size: 20px;
  /*margin: 10px;*/
  color: white;
  padding: 15px;
}
.link:hover {
  background-color: black;
  color: white;
  text-decoration: none;
}
.router-link-active.router-link-exact-active.link {
  color: white;
  background-color: black;
  text-decoration: none;
}

.router-link-active.router-link-exact-active.link.menu-item {
  color: white;
  background-color: black;
  text-decoration: none;
}

.fleet {
  font-size: 20px;
  color: white;
}

.logout-button {
  color: white;
}
</style>
