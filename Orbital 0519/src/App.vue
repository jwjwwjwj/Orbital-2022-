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
          <router-link class="link" to="/home">Home</router-link>
          <router-link class="link" to="/about">About</router-link>
          <router-link class="link" to="/online-booking-form"
            >Booking</router-link
          >
          <router-link class="link" to="/read-fleet"
            >Fleet Overview</router-link
          >
          <router-link class="link" to="/update-fleet"
            >Update Fleet</router-link
          >
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <span class="welcome-message">Welcome, {{ displayName }} </span>
          <router-link class="link" @click="$store.dispatch('logout')" to="/">
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
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import { auth, db } from "./firebase/index.js";
import { getDoc, doc } from "firebase/firestore";

console.log(auth.currentUser);
const docRef = doc(db, "users", "CE0sMj9GYLbTpZfXj7SZbJjUoJX2");
//const docRef = doc(db, "users", auth.currentUser.uid);
//var properties = null;
const property = getDoc(docRef)
  .then((doc) => {
    console.log(doc.data(), doc.id);
    return doc.data();
});

console.log("Hello", property);

export default {
  data() {
    return {
      displayName: auth.currentUser !== null ? auth.currentUser.email : '',
    };
  },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("fetchUser");
    }); 
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

.logout-button {
  color: white;
}
</style>
