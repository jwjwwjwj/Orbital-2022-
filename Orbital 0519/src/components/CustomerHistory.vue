<template>
  <div class="q-pa-md">
    <q-table
      :rows="bookings"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      table-header-class="text-bold"
      no-data-label="No upcoming bookings found."
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
          <q-th auto-width style="font-size: 17px">Edit</q-th>
          <q-th auto-width style="font-size: 17px">Cancel</q-th>
          <q-th auto-width style="font-size: 17px">Expand</q-th>
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <!--Edit button-->
            <q-btn
              v-if="editable(props.row.departureDate)"
              size="10px"
              color="black"
              icon="fa fa-pen"
              round
              glossy
              dense
              class="q-ml-md"
              @click="
                toggleEditBookingModal(
                  props.row.id,
                  props.row.user,
                  props.row.staffName,
                  props.row.staffNumber,
                  props.row.staffCCA,
                  props.row.bookingActivity,
                  props.row.bookingOptions,
                  props.row.bookingNumOf19,
                  props.row.bookingNumOf20,
                  props.row.bookingNumOf40,
                  props.row.bookingNumOf45,
                  props.row.departureDate,
                  props.row.departureAssembly,
                  props.row.departureDest,
                  props.row.returnFromDate,
                  props.row.returnFromAssembly,
                  props.row.returnFromDest
                )
              "
            >
              <!--Popup modal to edit-->
              <q-dialog
                v-model="toggleEditBookingConfirm"
                full-width
                persistent
              >
                <q-card>
                  <q-card-section>
                    <span class="q-ml-sm">
                      <UpdateBooking
                        :selectedId="selectedId"
                        :selectedUser="selectedUser"
                        :selectedStaffName="selectedStaffName"
                        :selectedStaffNumber="selectedStaffNumber"
                        :selectedStaffCCA="selectedStaffCCA"
                        :selectedBookingActivity="selectedBookingActivity"
                        :selectedBookingOptions="selectedBookingOptions"
                        :selectedBookingNumOf19="selectedBookingNumOf19"
                        :selectedBookingNumOf20="selectedBookingNumOf20"
                        :selectedBookingNumOf40="selectedBookingNumOf40"
                        :selectedBookingNumOf45="selectedBookingNumOf45"
                        :selectedDepartureDate="selectedDepartureDate"
                        :selectedDepartureAssembly="selectedDepartureAssembly"
                        :selectedDepartureDest="selectedDepartureDest"
                        :selectedReturnFromDate="selectedReturnFromDate"
                        :selectedReturnFromAssembly="selectedReturnFromAssembly"
                        :selectedReturnFromDest="selectedReturnFromDest"
                      />
                    </span>
                  </q-card-section>

                  <q-card-actions align="right" style="margin-right: 18px">
                    <q-btn
                      flat
                      label="Cancel"
                      color="black"
                      @click="toggleEditBookingModal"
                    />
                    <!--q-btn
                      flat
                      label="Confirm"
                      color="red"
                      @click="removeVehicle(selectedId)"
                    /-->
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!--End of popup modal to edit-->
            </q-btn>
            <q-btn
              v-else
              size="10px"
              color="black"
              icon="fa fa-phone-rotary"
              round
              glossy
              dense
              class="q-ml-md"
              @click="toggleWarningMessage"
            >
              <!--Popup modal for edit booking message-->
              <q-dialog v-model="toggleWarning" persistent>
                <q-card>
                  <div class="warning-header" style="text-align: center">
                    <span style="font-size: 25px"
                      ><strong
                        ><i class="far fa-exclamation-triangle"></i
                        >&nbsp;WARNING!</strong
                      ></span
                    >
                  </div>
                  <q-card-section class="row items-center">
                    <span class="q-ml-sm"
                      >As this booking is due in less than 3 days, please
                      contact us at <strong><u>+65 8888 8888</u></strong> for
                      assistance.</span
                    >
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      flat
                      label="Cancel"
                      color="black"
                      @click="toggleWarningMessage"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!--End of popup modal for edit booking message-->
            </q-btn>
          </q-td>

          <q-td auto-width>
            <!--Delete button-->
            <q-btn
              v-if="editable(props.row.departureDate)"
              dense
              round
              glossy
              color="black"
              icon="fa fa-trash-alt"
              class="q-ml-md"
              size="10px"
              @click="toggleConfirmModal(props.row.id)"
            >
              <!--Popup modal to confim deletion-->
              <q-dialog v-model="toggleDeleteBookingConfirm" persistent>
                <q-card>
                  <div class="warning-header" style="text-align: center">
                    <span style="font-size: 25px"
                      ><strong
                        ><i class="far fa-exclamation-triangle"></i
                        >&nbsp;WARNING!</strong
                      ></span
                    >
                  </div>
                  <q-card-section class="row items-center">
                    <span class="q-ml-sm"
                      >Are you sure you want to delete this booking?</span
                    >
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      flat
                      label="Cancel"
                      color="black"
                      @click="toggleConfirmModal"
                    />
                    <q-btn
                      flat
                      label="Confirm"
                      color="red"
                      @click="deleteBooking(deleteSelectedId)"
                      :disabled="isLoading"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!--End of popup modal to confim deletion-->
            </q-btn>
          </q-td>

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
                  <strong>Departure Date:</strong>
                  {{
                    moment(props.row.departureDate.toDate()).format(
                      "DD MMMM YYYY"
                    )
                  }}
                </ol>
                <ol>
                  <strong>Departure Time:</strong>
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
import { useStore } from "vuex";
import { ref } from "vue";
import { db } from "../firebase/index.js";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import moment from "moment";
import dayjs from "dayjs";
import UpdateBooking from "../components/UpdateBooking.vue";

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
  name: "CustomerHistory",

  data() {
    return {
      bookings: [],
      selectedDoc: null,
      selectedId: null,
      selectedUser: null,
      selectedStaffName: null,
      selectedStaffNumber: null,
      selectedStaffCCA: null,
      selectedBookingActivity: null,
      selectedBookingNumOf19: null,
      selectedBookingNumOf20: null,
      selectedBookingNumOf40: null,
      selectedBookingNumOf45: null,
      selectedBookingOptions: null,
      selectedDepartureAssembly: null,
      selectedDepartureDate: null,
      selectedDepartureDest: null,
      selectedReturnFromAssembly: null,
      selectedReturnFromDate: null,
      selectedReturnFromDest: null,
      toggleDeleteBookingConfirm: null,
      toggleEditBookingConfirm: null,
      toggleWarning: null,
      deleteSelectedId: null,
      isLoading: false,
    };
  },

  methods: {
    async fetchBookings() {
      const user = useStore().state.displayName;
      const q = query(
        collection(db, "bookings"),
        where("user", "==", user),
        where("departureDate", ">=", dayjs().$d)
      );
      const querySnap = await getDocs(q);
      const bookings = [];
      querySnap.forEach((booking) => {
        const bookingData = booking.data();
        bookingData.id = booking.id;
        bookings.push(bookingData);
      });
      this.bookings = bookings;
    },

    async deleteBooking(uniqueId) {
      this.isLoading = true;
      await deleteDoc(doc(db, "bookings", uniqueId));
      alert("Booking has been successfully cancelled.");
      this.isLoading = false;
      this.$router.push("/");
    },

    toggleConfirmModal(uniqueId) {
      this.toggleDeleteBookingConfirm = !this.toggleDeleteBookingConfirm;

      if (this.deleteSelectedId) {
        this.deleteSelectedId = null;
      } else {
        this.deleteSelectedId = uniqueId;
      }
    },

    toggleWarningMessage() {
      this.toggleWarning = !this.toggleWarning;
    },

    toggleEditBookingModal(
      uniqueId,
      user,
      name,
      contactNumber,
      cca,
      activity,
      options,
      num19,
      num20,
      num40,
      num45,
      departDate,
      departAssembly,
      departDest,
      returnDate,
      returnAssembly,
      returnDest
    ) {
      this.toggleEditBookingConfirm = !this.toggleEditBookingConfirm;

      if (this.selectedId) {
        this.selectedId = null;
      } else {
        this.selectedId = uniqueId;
      }

      if (this.selectedUser) {
        this.selectedUser = null;
      } else {
        this.selectedUser = user;
      }

      if (this.selectedStaffName) {
        this.selectedStaffName = null;
      } else {
        this.selectedStaffName = name;
      }

      if (this.selectedStaffNumber) {
        this.selectedStaffNumber = null;
      } else {
        this.selectedStaffNumber = contactNumber;
      }

      if (this.selectedStaffCCA) {
        this.selectedStaffCCA = null;
      } else {
        this.selectedStaffCCA = cca;
      }

      if (this.selectedBookingActivity) {
        this.selectedBookingActivity = null;
      } else {
        this.selectedBookingActivity = activity;
      }

      if (this.selectedBookingOptions) {
        this.selectedBookingOptions = null;
      } else {
        this.selectedBookingOptions = options;
      }

      if (this.selectedBookingNumOf19) {
        this.selectedBookingNumOf19 = null;
      } else {
        this.selectedBookingNumOf19 = num19;
      }

      if (this.selectedBookingNumOf20) {
        this.selectedBookingNumOf20 = null;
      } else {
        this.selectedBookingNumOf20 = num20;
      }

      if (this.selectedBookingNumOf40) {
        this.selectedBookingNumOf40 = null;
      } else {
        this.selectedBookingNumOf40 = num40;
      }

      if (this.selectedBookingNumOf45) {
        this.selectedBookingNumOf45 = null;
      } else {
        this.selectedBookingNumOf45 = num45;
      }

      if (this.selectedDepartureDate) {
        this.selectedDepartureDate = null;
      } else {
        this.selectedDepartureDate = departDate;
      }

      if (this.selectedDepartureAssembly) {
        this.selectedDepartureAssembly = null;
      } else {
        this.selectedDepartureAssembly = departAssembly;
      }

      if (this.selectedDepartureDest) {
        this.selectedDepartureDest = null;
      } else {
        this.selectedDepartureDest = departDest;
      }

      if (this.selectedReturnFromDate) {
        this.selectedReturnFromDate = null;
      } else {
        this.selectedReturnFromDate = returnDate;
      }

      if (this.selectedReturnFromAssembly) {
        this.selectedReturnFromAssembly = null;
      } else {
        this.selectedReturnFromAssembly = returnAssembly;
      }

      if (this.selectedReturnFromDest) {
        this.selectedReturnFromDest = null;
      } else {
        this.selectedReturnFromDest = returnDest;
      }
    },

    moment: (date) => {
      return moment(date);
    },

    editable(date) {
      return moment().diff(moment(date.toDate()), "days") <= -3;
    },

    vehicleInsuranceAlert: (date) => {
      return (
        moment().diff(moment(date), "months") <= 1 &&
        moment().diff(moment(date), "months") >= 0
      );
    },
  },

  components: {
    UpdateBooking,
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
