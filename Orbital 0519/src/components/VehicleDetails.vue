<template>
  <div class="q-pa-md">
    <q-toggle v-model="loading" label="Loading state" class="q-mb-md" />
    <q-table
      :rows="vehicles"
      :columns="columns"
      color="primary"
      row-key="name"
      :loading="loading"
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
    name: "number",
    required: true,
    label: "Number",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "licencePlate",
    align: "center",
    label: "Licence Plate",
    field: "licencePlate",
    sortable: true,
  },
  {
    name: "capacity",
    label: "Capacity",
    field: "capacity",
    sortable: true,
  },
  {
    name: "nextServicingDate",
    label: "Next Servicing Date",
    field: "nextServicingDate",
    format: (val) => moment(val.toDate()).format("DD MMMM YYYY"),
    sortable: true,
  },
  {
    name: "insuranceRenewalDate",
    label: "Insurance Renewal Date",
    field: "insuranceRenewalDate",
    format: (val) => moment(val.toDate()).format("DD MMMM YYYY"),
    sortable: true,
  },
  {
    name: "roadTaxDueDate",
    label: "Road Tax Due Date",
    field: "roadTaxDueDate",
    format: (val) => moment(val.toDate()).format("DD MMMM YYYY"),
    sortable: true,
  },
];

//const rows = [];

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

  setup() {
    return {
      loading: ref(false),
      columns,
      //rows,
    };
  },
};
</script>
