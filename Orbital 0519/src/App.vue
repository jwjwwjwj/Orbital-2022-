<template>
  <div class="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { auth } from "./firebase/index.js";
import { onAuthStateChanged } from "firebase/auth";
import Navigation from "./components/Navigation.vue";

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
    //Fleet,
    Navigation,
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


<!--style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0px;
  min-height: 100vh;
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
</style-->
