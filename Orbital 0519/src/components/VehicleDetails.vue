<template>
  <div class="q-pa-md" :key="componentKey">
    <q-table
      :rows="vehicles"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      table-header-class="text-bold"
    >
      <template v-slot:top>
        <q-btn
          color="black"
          glossy
          :disable="loading"
          label="Add Vehicle"
          @click="addVehicle"
        />
        <q-space />
        <div style="margin-bottom: 0px">
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
          <q-th auto-width style="font-size: 17px">Delete</q-th>
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
              size="10px"
              color="black"
              icon="fa fa-pen"
              round
              glossy
              dense
              class="q-ml-md"
              @click="
                toggleEditVehicleModal(
                  props.row.id,
                  props.row.licencePlate,
                  props.row.capacity,
                  props.row.insuranceAmount,
                  props.row.insuranceDate,
                  props.row.nextInsuranceRenewalDate,
                  props.row.lastSentForServicing,
                  props.row.nextServicingDate,
                  props.row.roadTaxAmount,
                  props.row.lastPaidRoadTaxDate,
                  props.row.roadTaxDueDate
                )
              "
            >
              <!--Popup modal to edit-->
              <q-dialog
                v-model="toggleEditVehicleConfirm"
                full-width
                persistent
              >
                <q-card>
                  <div class="warning-header" style="text-align: center">
                    <span style="font-size: 25px"
                      ><strong>Editing {{ selectedLicencePlate }}</strong></span
                    >
                  </div>
                  <q-card-section>
                    <span class="q-ml-sm">
                      <UpdateFleet
                        :selectedLicencePlate="selectedLicencePlate"
                        :selectedId="selectedId"
                        :selectedCapacity="selectedCapacity"
                        :selectedInsuranceAmount="selectedInsuranceAmount"
                        :selectedInsuranceDate="selectedInsuranceDate"
                        :selectedNextInsuranceRenewalDate="
                          selectedNextInsuranceRenewalDate
                        "
                        :selectedLastSentForServicing="
                          selectedLastSentForServicing
                        "
                        :selectedNextServicingDate="selectedNextServicingDate"
                        :selectedRoadTaxAmount="selectedRoadTaxAmount"
                        :selectedLastPaidRoadTaxDate="
                          selectedLastPaidRoadTaxDate
                        "
                        :selectedRoadTaxDueDate="selectedRoadTaxDueDate"
                      />
                    </span>
                  </q-card-section>

                  <q-card-actions align="right" style="margin-right: 18px">
                    <q-btn
                      flat
                      label="Cancel"
                      color="black"
                      @click="toggleEditVehicleModal"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!--End of popup modal to edit-->
            </q-btn>
          </q-td>
          <q-td auto-width>
            <!--Delete button-->
            <q-btn
              dense
              round
              glossy
              color="black"
              icon="fa fa-trash-alt"
              class="q-ml-md"
              size="10px"
              @click="toggleConfirmModal(props.row.id, props.row.licencePlate)"
            >
              <!--Popup modal to confim deletion-->
              <q-dialog v-model="toggleDeleteVehicleConfirm" persistent>
                <q-card>
                  <div class="warning-header" style="text-align: center">
                    <span style="font-size: 25px"
                      ><strong>WARNING!</strong></span
                    >
                  </div>
                  <q-card-section class="row items-center">
                    <i class="far fa-exclamation-triangle"></i>
                    <span class="q-ml-sm"
                      >Are you sure you want to delete vehicle
                      {{ selectedLicencePlate }}?</span
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
                      @click="removeVehicle(selectedId)"
                      :disabled="isLoading"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!--End of popup modal to confim deletion-->
            </q-btn>
          </q-td>
          <q-td auto-width>
            <!--Expand button-->
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
          <!--Details of selected vehicle (Expansion)-->
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <strong
                ><u
                  ><span style="font-size: 22px"
                    >Details of {{ props.row.licencePlate }}</span
                  ></u
                ></strong
              >
              <ul>
                <br />
                <strong
                  ><u
                    ><span style="font-size: 18px">Insurance Details</span></u
                  ></strong
                >
                <ol>
                  <strong>Insurance Amount:</strong>
                  {{
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(props.row.insuranceAmount)
                  }}
                </ol>
                <ol v-if="props.row.insuranceDate">
                  <strong>Last Paid Date:</strong>
                  {{
                    moment(props.row.insuranceDate.toDate()).format(
                      "DD MMMM YYYY"
                    )
                  }}
                </ol>
                <ol v-else>
                  <strong>Last Paid Date:</strong>
                  -
                </ol>
                <ol>
                  <strong>Renewal Date:</strong>
                  {{
                    moment(props.row.nextInsuranceRenewalDate.toDate()).format(
                      "DD MMMM YYYY"
                    )
                  }}
                </ol>
                <br />
                <hr />
                <strong
                  ><u
                    ><span style="font-size: 18px">Road Tax Details</span></u
                  ></strong
                >
                <ol>
                  <strong>Road Tax Amount:</strong>
                  {{
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(props.row.roadTaxAmount)
                  }}
                </ol>
                <ol v-if="props.row.lastPaidRoadTaxDate">
                  <strong>Last Paid Date:</strong>
                  {{
                    moment(props.row.lastPaidRoadTaxDate.toDate()).format(
                      "DD MMMM YYYY"
                    )
                  }}
                </ol>
                <ol v-else>
                  <strong>Last Paid Date:</strong>
                  -
                </ol>
                <ol>
                  <strong>Payment Date:</strong>
                  {{
                    moment(props.row.roadTaxDueDate.toDate()).format(
                      "DD MMMM YYYY"
                    )
                  }}
                </ol>
                <br />
                <hr />
                <strong
                  ><u
                    ><span style="font-size: 18px"
                      >Vehicle Maintenance Details</span
                    ></u
                  ></strong
                >
                <ol v-if="props.row.lastSentForServicing">
                  <strong>Last Servicing Date:</strong>
                  {{
                    moment(props.row.lastSentForServicing.toDate()).format(
                      "DD MMMM YYYY"
                    )
                  }}
                </ol>
                <ol v-else>
                  <strong>Last Servicing Date:</strong>
                  -
                </ol>
                <ol>
                  <strong>Next Servicing Date:</strong>
                  {{
                    moment(props.row.nextServicingDate.toDate()).format(
                      "DD MMMM YYYY"
                    )
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
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import moment from "moment";
import dayjs from "dayjs";
import UpdateFleet from "../components/UpdateFleet.vue";

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
    classes: (row) =>
      row.nextServicingDate.toDate() <= dayjs().endOf("month").$d &&
      row.nextServicingDate.toDate() >= dayjs().startOf("month").$d
        ? "bg-orange text-white"
        : "",
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
    classes: (row) =>
      row.nextInsuranceRenewalDate.toDate() <= dayjs().endOf("month").$d &&
      row.nextInsuranceRenewalDate.toDate() >= dayjs().startOf("month").$d
        ? "bg-orange text-white"
        : "",
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
    classes: (row) =>
      row.roadTaxDueDate.toDate() <= dayjs().endOf("month").$d &&
      row.roadTaxDueDate.toDate() >= dayjs().startOf("month").$d
        ? "bg-orange text-white"
        : "",
  },
];

export default {
  name: "VehicleDetails",

  data() {
    return {
      vehicles: [],
      selectedVehicle: null,
      componentKey: 0,
      toggleEditVehicleConfirm: false,
      toggleDeleteVehicleConfirm: false,
      selectedLicencePlate: null,
      selectedId: null,
      selectedCapacity: null,
      selectedInsuranceAmount: null,
      selectedInsuranceDate: null,
      selectedNextInsuranceRenewalDate: null,
      selectedLastSentForServicing: null,
      selectedNextServicingDate: null,
      selectedRoadTaxAmount: null,
      selectedLastPaidRoadTaxDate: null,
      selectedRoadTaxDueDate: null,
      isLoading: false,
    };
  },

  components: {
    UpdateFleet,
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

    async fetchSelectedVehicle(uniqueId) {
      const docRef = doc(db, "vehicles", uniqueId);
      const selectedVehicle = await getDoc(docRef);
      this.selectedVehicle = selectedVehicle;
    },

    async removeVehicle(uniqueId) {
      this.isLoading = true;
      await deleteDoc(doc(db, "vehicles", uniqueId));
      alert("Vehicle has been successfully deleted.");
      this.componentKey += 1;
      this.isLoading = false;
      this.$router.push("/");
    },

    addVehicle() {
      this.$router.push("/fleet/add-fleet");
    },

    toggleEditVehicleModal(
      vehicleId,
      lPlate,
      vehicleCapacity,
      vehicleInsuranceAmount,
      vehicleInsuranceDate,
      vehicleNextInsuranceRenewalDate,
      vehicleLastSentForServicing,
      vehicleNextServicingDate,
      vehicleRoadTaxAmount,
      vehicleLastPaidRoadTaxDate,
      vehicleRoadTaxDueDate
    ) {
      this.toggleEditVehicleConfirm = !this.toggleEditVehicleConfirm;

      if (this.selectedId) {
        this.selectedId = null;
      } else {
        this.selectedId = vehicleId;
      }

      if (this.selectedLicencePlate) {
        this.selectedLicencePlate = null;
      } else {
        this.selectedLicencePlate = lPlate;
      }

      if (this.selectedCapacity) {
        this.selectedCapacity = null;
      } else {
        this.selectedCapacity = vehicleCapacity;
      }

      if (this.selectedInsuranceAmount) {
        this.selectedInsuranceAmount = null;
      } else {
        this.selectedInsuranceAmount = vehicleInsuranceAmount;
      }

      if (this.selectedInsuranceDate) {
        this.selectedInsuranceDate = null;
      } else {
        this.selectedInsuranceDate = vehicleInsuranceDate;
      }

      if (this.selectedNextInsuranceRenewalDate) {
        this.selectedNextInsuranceRenewalDate = null;
      } else {
        this.selectedNextInsuranceRenewalDate = vehicleNextInsuranceRenewalDate;
      }

      if (this.selectedLastSentForServicing) {
        this.selectedLastSentForServicing = null;
      } else {
        this.selectedLastSentForServicing = vehicleLastSentForServicing;
      }

      if (this.selectedNextServicingDate) {
        this.selectedNextServicingDate = null;
      } else {
        this.selectedNextServicingDate = vehicleNextServicingDate;
      }

      if (this.selectedRoadTaxAmount) {
        this.selectedRoadTaxAmount = null;
      } else {
        this.selectedRoadTaxAmount = vehicleRoadTaxAmount;
      }

      if (this.selectedLastPaidRoadTaxDate) {
        this.selectedLastPaidRoadTaxDate = null;
      } else {
        this.selectedLastPaidRoadTaxDate = vehicleLastPaidRoadTaxDate;
      }

      if (this.selectedRoadTaxDueDate) {
        this.selectedRoadTaxDueDate = null;
      } else {
        this.selectedRoadTaxDueDate = vehicleRoadTaxDueDate;
      }
    },

    toggleConfirmModal(vehicleId, lPlate) {
      this.toggleDeleteVehicleConfirm = !this.toggleDeleteVehicleConfirm;

      if (this.selectedId) {
        this.selectedId = null;
      } else {
        this.selectedId = vehicleId;
      }

      if (this.selectedLicencePlate) {
        this.selectedLicencePlate = null;
      } else {
        this.selectedLicencePlate = lPlate;
      }
    },

    makeInsurancePayment: () => {
      alert("SUCCESS");
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
    this.fetchVehicles();
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
<style>
input#f_2b15f11d-8a51-4950-957f-269cebca0148 {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
