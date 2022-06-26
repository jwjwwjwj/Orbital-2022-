<template>
  <div class="q-pa-md">
    <q-table
      :dense="$q.screen.lt.md"
      :rows="bookings"
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
import { useStore } from "vuex";
import { ref } from "vue";
import { db } from "../firebase/index.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import moment from "moment";

const columns = [
  {
    name: "staffName",
    align: "center",
    label: "Staff Name",
    field: "staffName",
    headerStyle: {
      fontSize: "1.2em",
    },

    sortable: true,
  },

  {
    name: "staffNumber",
    align: "center",
    label: "Contact Number",
    field: "staffNumber",
    headerStyle: {
      fontSize: "1.2em",
    },
    sortable: true,
  },

  {
    name: "staffCCA",
    align: "center",
    label: "CCA",
    field: "staffCCA",
    headerStyle: {
      fontSize: "1.2em",
    },
    sortable: true,
  },

  {
    name: "bookingActivity",
    align: "center",
    label: "Activity",
    field: "bookingActivity",
    headerStyle: {
      fontSize: "1.2em",
    },
    sortable: true,
  },

  {
    name: "departureDate",
    align: "center",
    label: "Departure Date",
    field: "departureDate",
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
      bookings: [],
      selectedDoc: null,
    };
  },

  methods: {
    async fetchBookings() {
      const user = useStore().state.displayName;
      const q = query(collection(db, "bookings"), where("user", "==", user));
      const querySnap = await getDocs(q);
      const bookings = [];
      querySnap.forEach((booking) => {
        const bookingData = booking.data();
        bookingData.id = booking.id;
        bookings.push(bookingData);
      });
      this.bookings = bookings;
    },

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
    this.fetchBookings();
  },

  setup() {
    return {
      loading: ref(false),
      columns,
    };
  },
};
</script>
