<template>
  <router-link
    to=""
    class="menu-item"
    @mouseover="isOpen = !isOpen"
    @mouseleave="isOpen != isOpen"
  >
    {{ title
    }}<svg class="caret" viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
        fill="#FFF"
      ></path>
    </svg>
  </router-link>
  <transition name="fade" apear>
    <div class="sub-menu" v-if="isOpen">
      <div class="menu-item">
        <router-link class="sub" to="/fleet/read-fleet">Overview</router-link>
      </div>
      <div class="menu-item">
        <router-link class="sub" to="/fleet/update-fleet"
          >Update Fleet</router-link
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Fleet",
  props: ["title"],
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped>
.menu-item {
  color: white;
  font-size: 20px;
  margin: 5px;
  padding: 0.5px;
}

.menu-item:active {
  background-color: black;
}

.sub {
  color: white;
  font-size: 20px;
  opacity: 0.4;
}

.menu-item:hover {
  background-color: black;
  color: white;
  text-decoration: none;
  padding: 15px;
}

.menu-item svg {
  width: 10px;
  margin-left: 10px;
}
.menu-item .sub-menu {
  position: absolute;
  background-color: #222;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sub-menu {
  background-color: rgb(41, 39, 39);
  position: relative;
  left: 40px;
  cursor: pointer;
}

.router-link-active.router-link-exact-active.sub {
  color: white;
  text-decoration: none;
  padding: 10px;
  opacity: 1;
}
</style>
