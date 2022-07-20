<template>
  <h1><strong>Add Vehicle</strong></h1>
  <hr />
  <h3>Vehicle Details</h3>
  <div class="add-fleet-form" v-bind="layout">
    <a-form name="vehicle" v-bind="layout">
      <a-form-item
        :name="['licence', 'plate']"
        label="*Licence Plate"
        style="font-weight: bold; text-align: left; padding-left: 5%"
      >
        <span v-if="v$.licencePlate.$error" class="error-message">
          <exclamation-circle-outlined v-if="v$.licencePlate.$error" />
          Please Input Valid/Unique Licence Plate
        </span>
        <a-input
          v-model:value="licencePlate"
          placeholder="E.G. SBS123A"
          style="text-transform: uppercase"
        />
      </a-form-item>
      <a-form-item
        label="*Capacity"
        style="font-weight: bold; text-align: left; padding-left: 5%"
      >
        <a-radio-group v-model:value="capacity">
          <a-radio :value="45">45 Seater</a-radio>
          <a-radio :value="40">40 Seater</a-radio>
          <a-radio :value="20">20 Seater</a-radio>
          <a-radio :value="19">19 & below</a-radio>
        </a-radio-group>
      </a-form-item>
      <br />
      <hr />
      <h3>Insurance Details</h3>
      <a-form-item
        label="*Insurance Date"
        style="font-weight: bold; text-align: left; padding-left: 5%"
      >
        <span v-if="v$.insuranceDate.$error" class="error-message">
          <exclamation-circle-outlined v-if="v$.insuranceDate.$error" />
          Please Input Valid Date
        </span>
        <div style="margin-left: 0%">
          <q-input filled v-model="insuranceDate" style="max-width: 400px">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="insuranceDate"
                    mask="YYYY-MM-DD"
                    :options="optionsFn2"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </a-form-item>
      <a-form-item
        label="*Next Insurance Date"
        style="font-weight: bold; text-align: left; padding-left: 5%"
      >
        <span v-if="v$.nextInsuranceRenewalDate.$error" class="error-message">
          <exclamation-circle-outlined
            v-if="v$.nextInsuranceRenewalDate.$error"
          />
          Please Input Valid Date
        </span>
        <div style="margin-left: 0%">
          <q-input
            filled
            v-model="nextInsuranceRenewalDate"
            style="max-width: 400px"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="nextInsuranceRenewalDate"
                    mask="YYYY-MM-DD"
                    :options="optionsFn"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </a-form-item>
      <a-form name="insuranceAmount" v-bind="layout">
        <a-form-item
          :name="['insurance', 'amount']"
          label="*Insurance Amount:"
          style="font-weight: bold; text-align: left; padding-left: 5%"
        >
          <span v-if="v$.insuranceAmount.$error" class="error-message">
            <exclamation-circle-outlined v-if="v$.insuranceAmount.$error" />
            Please Input Valid Insurance Amount
          </span>
          <a-input
            v-model:value="insuranceAmount"
            placeholder="Input Insurance Amount here."
            type="number"
            min="0"
          />
        </a-form-item>
      </a-form>
      <br />
      <hr />
      <h3>Servicing Details</h3>
      <a-form-item
        label="*Last Servicing Date"
        style="font-weight: bold; text-align: left; padding-left: 5%"
      >
        <span v-if="v$.lastSentForServicing.$error" class="error-message">
          <exclamation-circle-outlined v-if="v$.lastSentForServicing.$error" />
          Please Input Valid Date
        </span>
        <div style="margin-left: 0%">
          <q-input
            filled
            v-model="lastSentForServicing"
            style="max-width: 400px"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="lastSentForServicing"
                    mask="YYYY-MM-DD"
                    :options="optionsFn2"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </a-form-item>
      <a-form-item
        label="*Next Servicing Date"
        style="font-weight: bold; text-align: left; padding-left: 5%"
      >
        <span v-if="v$.nextServicingDate.$error" class="error-message">
          <exclamation-circle-outlined v-if="v$.nextServicingDate.$error" />
          Please Input Valid Date
        </span>
        <div style="margin-left: 0%">
          <q-input filled v-model="nextServicingDate" style="max-width: 400px">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="nextServicingDate"
                    mask="YYYY-MM-DD"
                    :options="optionsFn"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </a-form-item>
      <br />
      <hr />
      <h3>Road Tax Details</h3>
      <a-form name="roadTaxAmount" v-bind="layout">
        <a-form-item
          :name="['roadtax', 'amount']"
          label="*Road Tax Amount:"
          style="font-weight: bold; text-align: left; padding-left: 5%"
        >
          <span v-if="v$.roadTaxAmount.$error" class="error-message">
            <exclamation-circle-outlined v-if="v$.roadTaxAmount.$error" />
            Please Input Valid Road Tax Amount
          </span>
          <a-input
            v-model:value="roadTaxAmount"
            placeholder="Input Road Tax Amount here."
            type="number"
            min="0"
          />
        </a-form-item>
      </a-form>
      <a-form-item
        label="*Last Road Tax Date"
        style="font-weight: bold; text-align: left; padding-left: 5%"
      >
        <span v-if="v$.lastPaidRoadTaxDate.$error" class="error-message">
          <exclamation-circle-outlined v-if="v$.lastPaidRoadTaxDate.$error" />
          Please Input Valid Date
        </span>
        <div style="margin-left: 0%">
          <q-input
            filled
            v-model="lastPaidRoadTaxDate"
            style="max-width: 400px"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="lastPaidRoadTaxDate"
                    mask="YYYY-MM-DD"
                    :options="optionsFn2"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </a-form-item>
      <a-form-item
        label="*Next Road Tax Payment Date"
        style="font-weight: bold; text-align: left; padding-left: 5%"
      >
        <span v-if="v$.roadTaxDueDate.$error" class="error-message">
          <exclamation-circle-outlined v-if="v$.roadTaxDueDate.$error" />
          Please Input Valid Date
        </span>
        <div style="margin-left: 0%">
          <q-input filled v-model="roadTaxDueDate" style="max-width: 400px">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="roadTaxDueDate"
                    mask="YYYY-MM-DD"
                    :options="optionsFn"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </a-form-item>
    </a-form>
    <br />
    <div class="submit-button">
      <a-button
        @click="toggleConfirmModal"
        html-type="submit"
        type="primary"
        style="background-color: black; border-color: black"
        >Submit</a-button
      >
    </div>
    <!--Popup modal to confim add-->
    <q-dialog v-model="toggleAddVehicleConfirm" persistent>
      <q-card>
        <div class="warning-header" style="text-align: center">
          <span style="font-size: 25px"><strong>CONFIRMATION</strong></span>
        </div>
        <q-card-section class="row items-center">
          <i class="far fa-exclamation-triangle"></i>
          <span class="q-ml-sm"
            >Are you sure you want to add vehicle
            {{
              licencePlate ? licencePlate.toUpperCase() : licencePlate
            }}?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="black"
            @click="toggleConfirmModal"
          />
          <q-btn flat label="Confirm" color="green" @click="addVehicle" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--End of popup modal to confim add-->
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  maxValue,
  numeric,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { db } from "../firebase/index.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { date } from "quasar";

export default {
  name: "AddFleet",
  components: {
    ExclamationCircleOutlined,
  },
  data() {
    return {
      licencePlate: null,
      id: null,
      capacity: 45,
      insuranceDate: null,
      insuranceAmount: null,
      nextInsuranceRenewalDate: null,
      lastSentForServicing: null,
      nextServicingDate: null,
      roadTaxAmount: null,
      lastPaidRoadTaxDate: null,
      roadTaxDueDate: null,
      toggleAddVehicleConfirm: false,
      vehicles: [],
    };
  },
  validations() {
    const uniqueLicencePlate = (value) =>
      value === null ? value : !this.vehicles.includes(value.toUpperCase());
    const licencePlateRegEx = helpers.regex(/([A-Z]{2,3}\d{1,4}[A-Z]{1}$)/i);
    return {
      licencePlate: {
        required,
        uniqueLicencePlate,
        licencePlateRegEx,
        maxLength: maxLength(8),
        minLength: minLength(3),
      },
      id: {},
      insuranceDate: {
        required,
        minValue(value) {
          return new Date(value) < new Date();
        },
      },
      capacity: { numeric, required },
      nextInsuranceRenewalDate: {
        required,
        minValue: function (value) {
          return value > this.insuranceDate && new Date(value) >= new Date();
        },
      },
      insuranceAmount: { numeric, required, maxValue: maxValue(2000) },
      lastSentForServicing: {
        required,
        minValue(value) {
          return new Date(value) < new Date();
        },
      },
      nextServicingDate: {
        required,
        minValue: function (value) {
          return (
            value > this.lastSentForServicing && new Date(value) >= new Date()
          );
        },
      },
      roadTaxAmount: { numeric, required, maxValue: maxValue(2000) },
      lastPaidRoadTaxDate: {
        required,
        minValue(value) {
          return new Date(value) < new Date();
        },
      },
      roadTaxDueDate: {
        required,
        minValue: function (value) {
          return (
            value > this.lastPaidRoadTaxDate && new Date(value) >= new Date()
          );
        },
      },
    };
  },
  methods: {
    async addVehicle() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const vehicleRef = collection(db, "vehicles");
        const docData = {
          id: this.licencePlate,
          licencePlate: this.licencePlate.toUpperCase(),
          capacity: Number(this.capacity),
          insuranceAmount: Number(this.insuranceAmount),
          insuranceDate: new Date(this.insuranceDate),
          nextInsuranceRenewalDate: new Date(this.nextInsuranceRenewalDate),
          lastSentForServicing: new Date(this.lastSentForServicing),
          nextServicingDate: new Date(this.nextServicingDate),
          roadTaxAmount: Number(this.roadTaxAmount),
          lastPaidRoadTaxDate: new Date(this.lastPaidRoadTaxDate),
          roadTaxDueDate: new Date(this.roadTaxDueDate),
        };
        await addDoc(vehicleRef, docData);
        alert(
          "Vehicle " +
            this.licencePlate.toUpperCase() +
            " has been successfully added!"
        );
        this.$router.push("/");
      } else {
        alert("Form failed validation");
        this.toggleConfirmModal();
      }
    },

    async fetchVehicles() {
      const vehicleSnapshot = await getDocs(collection(db, "vehicles"));
      const vehicles = [];
      vehicleSnapshot.forEach((vehicle) => {
        const vehicleData = vehicle.data();
        vehicleData.id = vehicle.id;
        vehicles.push(vehicleData.licencePlate);
      });
      this.vehicles = vehicles;
    },

    toggleConfirmModal() {
      this.toggleAddVehicleConfirm = !this.toggleAddVehicleConfirm;
    },
  },
  created() {
    this.fetchVehicles();
  },
  setup() {
    const disabledDate = (current) => {
      return current && current > moment().endOf("day");
    };
    const disabledDateAfter = (current) => {
      return current && current < moment().endOf("day");
    };
    const layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    return {
      layout,
      disabledDate,
      disabledDateAfter,
      v$: useVuelidate(),
      optionsFn(d) {
        let newDate = date.formatDate(
          date.addToDate(Date.now(), { months: 24 }),
          "YYYY/MM/DD"
        );
        return d > date.formatDate(Date.now(), "YYYY/MM/DD") && d <= newDate;
      },
      optionsFn2(d) {
        let oldDate = date.formatDate(
          date.subtractFromDate(Date.now(), { months: 24 }),
          "YYYY/MM/DD"
        );
        return d >= oldDate && d <= date.formatDate(Date.now(), "YYYY/MM/DD");
      },
    };
  },
};
</script>

<style scoped>
h1,
h3 {
  text-align: center;
}

.submit-button {
  text-align: center;
  padding-bottom: 40px;
}

.flex-container {
  display: flex;
}

.flex-child {
  flex: 2;
  margin: 10px;
}

.flex-child:first-child {
  margin-right: 20px;
  width: 180px;
}
#datePicker {
  text-align: center;
  margin-left: 86px;
}
.departure-label {
  text-align: center;
  margin-top: 30px;
  /*margin-left: 160px;*/
  margin-left: 17%;
}
.error-message {
  color: red;
}
</style>
