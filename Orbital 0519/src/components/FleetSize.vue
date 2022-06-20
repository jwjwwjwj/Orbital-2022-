<template>
  <div id="fleetsize">
    <div class="title">
      <span class="fleetSize-placeholder">Current Fleet Size</span>
    </div>
    <div class="value">
      <span class="fleetSize">{{ vehicles.length }}</span>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/index.js";
import { getDocs, collection } from "firebase/firestore";

export default {
  name: "FleetSize",
  data() {
    return {
      vehicles: [],
      selectedDoc: null,
    };
  },

  methods: {
    async fetchVehicles() {
      const vehicleSnapshot = await getDocs(collection(db, "vehicles"));
      const vehicles = [];
      vehicleSnapshot.forEach((vehicle) => {
        const vehicleData = vehicle.data();
        vehicleData.id = vehicle.id;
        vehicles.push(vehicleData);
      });
      this.vehicles = vehicles;
    },
  },

  computed: {},

  created() {
    this.fetchVehicles();
  },
};
</script>

<style scoped>
.fleetSize-placeholder {
  font-size: 30px;
}

.fleetSize {
  font-size: 60px;
  text-decoration: bold;
}
</style>