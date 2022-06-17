<template>
  <div class="container">
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Licence Plate</th>
            <th>Capacity</th>
            <th>Next Servicing Date</th>
            <th>Insurance Renewal Date</th>
            <th>Road Tax Due Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(vehicle, index) in vehicles" v-bind:key="vehicle.id">
            <td>{{ index + 1 }})</td>
            <td>{{ vehicle.licencePlate }}</td>
            <td>{{ vehicle.capacity }}</td>
            <td>
              {{
                moment(vehicle.nextServicingDate.toDate()).format(
                  "DD MMMM YYYY"
                )
              }}
            </td>
            <td>
              {{
                moment(vehicle.nextInsuranceRenewalDate.toDate()).format(
                  "DD MMMM YYYY"
                )
              }}
            </td>
            <td>
              {{
                moment(vehicle.roadTaxDueDate.toDate()).format("DD MMMM YYYY")
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { auth, db } from "../firebase/index.js";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, doc, deleteDoc, collection } from "firebase/firestore";
import moment from "moment";

export default {
  name: "VehicleDetails",

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
      console.log(vehicles);
      this.vehicles = vehicles;
    },

    makeInsurancePayment: () => {
      alert("SUCCESS");
    },
    /*
    async makeInsuranePayment() {
      alert("SUCCESS");
    },
*/
    moment: (date) => {
      return moment(date);
    },

    vehicleInsuranceAlert: (date) => {
      console.log(moment().diff(moment(date), "months"));
      return (
        moment().diff(moment(date), "months") <= 1 &&
        moment().diff(moment(date), "months") >= 0
      );
    },
  },

  created() {
    this.fetchVehicles();
  },
};
</script>

<style scoped>
th {
  text-align: center;
  font-size: 18px;
}

td {
  height: 75px;
  font-size: 15px;
}
</style>
