<template>
  <div class="q-pa-md" :key="componentKey">
    <q-table
      :rows="vehicles"
      :columns="columns"
      row-key="id"
      :loading="loading"
      table-header-class="text-bold"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width style="font-size: 17px">Expand</q-th>
          <q-th auto-width style="font-size: 17px">Delete</q-th>
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
          <q-td auto-width>
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
              <q-dialog v-model="confirm" persistent>
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
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!--End of popup modal to confim deletion-->
            </q-btn>
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
                <ol v-if="props.row.lastSentForServicingDate">
                  <strong>Last Servicing Date:</strong>
                  {{
                    moment(props.row.lastSentForServicingDate.toDate()).format(
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
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import moment from "moment";
import dayjs from "dayjs";

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
    classes: (row) =>
      ((row.roadTaxDueDate).toDate()) <= dayjs().endOf("month").$d //&&((row.roadTaxDueDate).toDate()) >= dayjs().startOf("month").$d
        ? "bg-red text-white"
        : "",
  },
];

export default {
  name: "VehicleDetails",

  data() {
    return {
      vehicles: [],
      selectedDoc: null,
      componentKey: 0,
      confirm: false,
      selectedLicencePlate: null,
      selectedId: null,
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

    async removeVehicle(uniqueId) {
      await deleteDoc(doc(db, "vehicles", uniqueId));
      alert("Vehicle has been successfully deleted.");
      this.componentKey += 1;
      this.$router.push("/");
    },

    toggleConfirmModal(vehicleId, lPlate) {
      this.confirm = !this.confirm;

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