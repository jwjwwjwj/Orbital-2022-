<template>
  <div id="roadtax">
    <div class="title">
      <span class="maintenance-placeholder"
        >Number of Vehicles Needing Maintenance For
        <strong>{{ moment().format("MMM YYYY") }}</strong>
      </span>
    </div>
    <div class="value">
      <span class="maintenance">
        {{ numVehicleMaintenance }}
      </span>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/index.js";
import { getDocs, collection, query, where } from "firebase/firestore";
import moment from "moment";
import dayjs from "dayjs";

export default {
  name: "RoadTax",

  data() {
    return {
      vehicles: [],
      numVehicleMaintenance: null,
      selectedDoc: null,
    };
  },

  methods: {
    async totalVehiclesNeedingMaintenanceThisMonth() {
      const q = query(
        collection(db, "vehicles"),
        where("nextServicingDate", "<=", dayjs().endOf("month").$d),
        where("nextServicingDate", ">=", dayjs().startOf("month").$d)
      );
      const querySnap = await getDocs(q);
      const num = [];
      querySnap.forEach((vehicle) => {
        const vehicleData = vehicle.data();
        num.push(vehicleData);
      });
      this.numVehicleMaintenance = num.length;
    },

    moment: (date) => {
      return moment(date);
    },
  },

  computed: {},

  created() {
    this.totalVehiclesNeedingMaintenanceThisMonth();
  },
};
</script>

<style scoped>
.maintenance-placeholder {
  font-size: 30px;
}
.maintenance {
  color: crimson;
  text-decoration: bold;
  font-size: 60px;
}
</style>
