<template>
  <div class="q-pa-md">
    <q-table
      :rows="bookings"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      table-header-class="text-bold"
    >
      <template v-slot:top-right>
        <div style="margin-bottom: 20px">
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width style="font-size: 17px">Expand</q-th>
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="black"
              round
              glossy
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <!--{{ props }}-->
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <strong
                ><u
                  ><span style="font-size: 22px">Details of Booking</span></u
                ></strong
              >
              <ul>
                <br />
                <ol>
                  <strong>Booking Option:</strong>
                  {{
                    props.row.bookingOptions
                  }}-way
                </ol>
                <ol>
                  <strong>Total Number of Bus(es):</strong>
                  {{
                    props.row.bookingNumOf45 +
                    props.row.bookingNumOf40 +
                    props.row.bookingNumOf20 +
                    props.row.bookingNumOf19
                  }}
                  <ul v-if="props.row.bookingNumOf19">
                    <li style="margin-left: 40px">
                      <strong>Number of 19-seater bus:</strong>
                      {{ props.row.bookingNumOf19 }}
                    </li>
                  </ul>
                  <ul v-if="props.row.bookingNumOf20">
                    <li style="margin-left: 40px">
                      <strong>Number of 20-seater bus:</strong>
                      {{ props.row.bookingNumOf20 }}
                    </li>
                  </ul>
                  <ul v-if="props.row.bookingNumOf40">
                    <li style="margin-left: 40px">
                      <strong>Number of 40-seater bus:</strong>
                      {{ props.row.bookingNumOf40 }}
                    </li>
                  </ul>
                  <ul v-if="props.row.bookingNumOf45">
                    <li style="margin-left: 40px">
                      <strong>Number of 45-seater bus:</strong>
                      {{ props.row.bookingNumOf45 }}
                    </li>
                  </ul>
                </ol>

                <br />
                <hr />
                <strong
                  ><u
                    ><span style="font-size: 18px">Departure Details</span></u
                  ></strong
                >
                <ol>
                  <strong>Deaprture Date:</strong>
                  {{
                    moment(props.row.departureDate.toDate()).format(
                      "DD MMMM YYYY"
                    )
                  }}
                </ol>
                <ol>
                  <strong>Deaprture Time:</strong>
                  {{
                    props.row.departureTime
                  }}
                </ol>
                <ol>
                  <strong>From:</strong>
                  {{
                    props.row.departureAssembly
                  }}
                </ol>
                <ol>
                  <strong>To:</strong>
                  {{
                    props.row.departureDest
                  }}
                </ol>
                <br />
                <hr />
                <strong
                  ><u
                    ><span
                      v-if="props.row.returnFromDate"
                      style="font-size: 18px"
                      >Return Details</span
                    ></u
                  ></strong
                >
                <ol v-if="props.row.returnFromDate">
                  <strong>Return Date:</strong>
                  {{
                    moment(props.row.returnFromDate.toDate()).format(
                      "DD MMMM YYYY"
                    )
                  }}
                </ol>
                <ol v-if="props.row.returnFromDate">
                  <strong>Return Time:</strong>
                  {{
                    props.row.returnFromTime
                  }}
                </ol>
                <ol v-if="props.row.returnFromDate">
                  <strong>From:</strong>
                  {{
                    props.row.returnFromAssembly
                  }}
                </ol>
                <ol v-if="props.row.returnFromDate">
                  <strong>To:</strong>
                  {{
                    props.row.returnFromDest
                  }}
                </ol>
              </ul>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "../firebase/index.js";
import { getDocs, collection, query } from "firebase/firestore";
import moment from "moment";

const columns = [
  {
    name: "school",
    align: "center",
    label: "School",
    field: "user",
    headerStyle: {
      fontSize: "1.2em",
    },

    sortable: true,
  },
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
      //backgroundColor: "'#D3D3D3",
    },
    format: (val) => moment(val.toDate()).format("DD MMMM YYYY"),
    sortable: true,
  },
];

export default {
  name: "ViewBooking",

  data() {
    return {
      bookings: [],
      selectedDoc: null,
    };
  },

  methods: {
    async fetchBookings() {
      const q = query(collection(db, "bookings"));
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
      filter: ref(""),
      loading: ref(false),
      columns,
    };
  },
};
</script>
