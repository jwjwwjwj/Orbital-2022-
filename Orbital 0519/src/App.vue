<!--template>
  <div id="nav" v-if="$store.state.user">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <button @click="$store.dispatch('logout')">Logout</button>
  </div>
  <router-view />
</template-->

<template>
  <div class="app">
    <nav class="navbar navbar-inverse" v-if="$store.state.user">
      <div class="navbar-header">
        <span class="logo">Transporfficient</span>
      </div>
      <ul class="nav navbar-nav">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/about">About</router-link>
        <router-link class="link" to="/online-booking-form">Booking</router-link>
        <router-link class="link" to="/read-fleet">Fleet Overview</router-link>
        <router-link class="link" to="/update-fleet">Update Fleet</router-link>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <span class="welcome-message">Welcome, {{ db }}</span>
        <router-link class="link" @click="$store.dispatch('logout')" to="/">
          <span class="glyphicon glyphicon-log-out"></span>Logout</router-link
        >
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import { docType } from "firebase/firestore";
import BDropdownHover from "./components/BDropdownHover";

export default {
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });
  },
  components: {
    BDropdownHover,
  },
  docType,
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  list-style-type: none;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.link {
  font-size: 20px;
  /*margin: 10px;*/
  color: white;
  padding: 20px;
  margin: 10px 0px 0px 0px;
}

.navbar-header {
  list-style-type: none;
  padding: 0;
}

/*.logout-button {
  color: white;
  background-color: #202020;
  border: none;
}*/

#nav a.router-link-exact-active,
.logout-button {
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

.navbar {
  padding: 20px 10px 20px 0px;
}

.link,
.welcome-message,
.logo {
  font-size: 20px;
  /*margin: 10px;*/
  color: white;
  padding: 20px;
}

.link:hover {
  background-color: black;
  color: white;
}

.logout-button {
  color: white;
}
</style>
