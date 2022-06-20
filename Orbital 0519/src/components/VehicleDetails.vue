<template>
  <div class="q-pa-md">
    <q-table
      :dense="$q.screen.lt.md"
      :rows="vehicles"
      :columns="columns"
      color="primary"
      row-key="name"
      :loading="loading"
      :table-header-style="{ backgroundColor: '#D3D3D3' }"
      table-header-class="text-bold"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "../firebase/index.js";
import { getDocs, collection } from "firebase/firestore";
import moment from "moment";

const columns = [
  {
    name: "licencePlate",
    align: "center",
    label: "Licence Plate",
    field: "licencePlate",
    headerStyle: {
      fontSize: "1.2em",
    },
    sortable: true,
  },
  {
    name: "capacity",
    align: "center",
    label: "Capacity",
    field: "capacity",
    headerStyle: {
      fontSize: "1.2em",
    },
    sortable: true,
  },
  {
    name: "nextServicingDate",
    align: "center",
    label: "Next Servicing Date",
    field: "nextServicingDate",
    headerStyle: {
      fontSize: "1.2em",
    },
    format: (val) => moment(val.toDate()).format("DD MMMM YYYY"),
    sortable: true,
  },
  {
    name: "insuranceRenewalDate",
    align: "center",
    label: "Insurance Renewal Date",
    field: "nextInsuranceRenewalDate",
    headerStyle: {
      fontSize: "1.2em",
    },
    format: (val) => moment(val.toDate()).format("DD MMMM YYYY"),
    sortable: true,
  },
  {
    name: "roadTaxDueDate",
    align: "center",
    label: "Road Tax Due Date",
    field: "roadTaxDueDate",
    headerStyle: {
      fontSize: "1.2em",
    },
    format: (val) => moment(val.toDate()).format("DD MMMM YYYY"),
    sortable: true,
  },
];

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
      return (
        moment().diff(moment(date), "months") <= 1 &&
        moment().diff(moment(date), "months") >= 0
      );
    },
  },

  created() {
    this.fetchVehicles();
  },

  setup() {
    return {
      loading: ref(false),
      columns,
    };
  },
};
</script>