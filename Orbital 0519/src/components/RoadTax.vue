<template>
  <div id="roadtax">
    <span>{{ $store.state.roadTaxAmount }}</span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { auth } from "../firebase/index.js";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "RoadTax",
  data() {
    return {
      displayName: auth.currentUser !== null ? auth.currentUser.email : "",
    };
  },
  setup() {
    const store = useStore();
    onAuthStateChanged(auth, (vehicle) => {
      if (vehicle) {
        store.dispatch("fetchVehicle");
      }
    });
  },

  methods: {},
};
</script>
