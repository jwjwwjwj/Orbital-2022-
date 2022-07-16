<template>
  <h1 style="text-align: center; font-size: 48px">
    <strong>Update Fleet</strong>
  </h1>
  <hr />
  <h3 style="text-align: center">Vehicle Details</h3>
  <div class="add-fleet-form" v-bind="layout">
    <a-form name="vehicle" v-bind="layout">
      <strong
        ><a-form-item
          :name="['licence', 'plate']"
          label="Licence Plate"
          style="font-weight: bold; text-align: left; padding-left: 26%"
        >
          <a-input
            v-model:value="licencePlate"
            disabled="true"
            :bordered="false"
            style="color: black"
          /> </a-form-item
      ></strong>
      <strong
        ><a-form-item
          :name="['capacity']"
          label="Vehicle Capacity"
          style="font-weight: bold; text-align: left; padding-left: 26%"
        >
          <a-input
            v-model:value="capacity"
            disabled="true"
            :bordered="false"
            style="color: black"
          /> </a-form-item
      ></strong>
      <br />
      <hr />
      <h3>Insurance Details</h3>
      <a-form-item
        label="*Insurance Date"
        style="font-weight: bold; text-align: left; padding-left: 13%"
      >
        <span v-if="v$.insuranceDate.$error">
          <exclamation-circle-outlined v-if="v$.insuranceDate.$error" />
          Please Input Date
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
        style="font-weight: bold; text-align: left; padding-left: 13%"
      >
        <span v-if="v$.nextInsuranceRenewalDate.$error">
          <exclamation-circle-outlined
            v-if="v$.nextInsuranceRenewalDate.$error"
          />
          Please Input Date
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
          style="font-weight: bold; text-align: left; padding-left: 13%"
        >
          <span v-if="v$.insuranceAmount.$error">
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
        style="font-weight: bold; text-align: left; padding-left: 13%"
      >
        <span v-if="v$.lastSentForServicing.$error">
          <exclamation-circle-outlined v-if="v$.lastSentForServicing.$error" />
          Please Input Date
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
        style="font-weight: bold; text-align: left; padding-left: 13%"
      >
        <span v-if="v$.nextServicingDate.$error">
          <exclamation-circle-outlined v-if="v$.nextServicingDate.$error" />
          Please Input Date
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
          style="font-weight: bold; text-align: left; padding-left: 13%"
        >
          <span v-if="v$.roadTaxAmount.$error">
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
        style="font-weight: bold; text-align: left; padding-left: 13%"
      >
        <span v-if="v$.lastPaidRoadTaxDate.$error">
          <exclamation-circle-outlined v-if="v$.lastPaidRoadTaxDate.$error" />
          Please Input Date
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
        style="font-weight: bold; text-align: left; padding-left: 13%"
      >
        <span v-if="v$.roadTaxDueDate.$error">
          <exclamation-circle-outlined v-if="v$.roadTaxDueDate.$error" />
          Please Input Date
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
    <div style="text-align: right">
      <a-button
        @click="toggleConfirmModal"
        html-type="submit"
        type="text"
        style="font-size: 16px; text-transform: uppercase; font-weight: bold"
        >Submit</a-button
      >
    </div>
    <!--Popup modal to confim edit-->
    <q-dialog v-model="toggleEditVehicleConfirm" persistent>
      <q-card>
        <div class="warning-header" style="text-align: center">
          <span style="font-size: 25px"><strong>CONFIRMATION</strong></span>
        </div>
        <q-card-section class="row items-center">
          <i class="far fa-exclamation-triangle"></i>
          <span class="q-ml-sm"
            >Are you sure you want to edit vehicle
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
            color="green"
            @click="updateVehicle(selectedId)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--End of popup modal to confim edit-->
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
  minValue,
} from "@vuelidate/validators";
//import { ref } from "vue";
import { db } from "../firebase/index.js";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { date } from "quasar";

export default {
  name: "UpdateFleet",
  components: {
    ExclamationCircleOutlined,
  },
  data() {
    return {
      toggleEditVehicleConfirm: false,
      licencePlate: this.selectedLicencePlate,
      id: this.selectedLicencePlate,
      capacity: this.selectedCapacity,
      insuranceDate: moment(this.selectedInsuranceDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      insuranceAmount: this.selectedInsuranceAmount,
      nextInsuranceRenewalDate: moment(
        this.selectedNextInsuranceRenewalDate.toDate()
      ).format("YYYY-MM-DD"),
      lastSentForServicing: moment(
        this.selectedLastSentForServicing.toDate()
      ).format("YYYY-MM-DD"),
      nextServicingDate: moment(this.selectedNextServicingDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      roadTaxAmount: this.selectedRoadTaxAmount,
      lastPaidRoadTaxDate: moment(
        this.selectedLastPaidRoadTaxDate.toDate()
      ).format("YYYY-MM-DD"),
      roadTaxDueDate: moment(this.selectedRoadTaxDueDate.toDate()).format(
        "YYYY-MM-DD"
      ),
    };
  },
  validations() {
    return {
      licencePlate: {
        required,
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
      insuranceAmount: {
        numeric,
        required,
        maxValue: maxValue(2000),
        minValue: minValue(0),
      },
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
      roadTaxAmount: {
        numeric,
        required,
        maxValue: maxValue(2000),
        minValue: minValue(0),
      },
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

  props: {
    selectedLicencePlate: String,
    selectedId: String,
    selectedCapacity: Number,
    selectedInsuranceAmount: Number,
    selectedInsuranceDate: Timestamp,
    selectedNextInsuranceRenewalDate: Timestamp,
    selectedLastSentForServicing: Timestamp,
    selectedNextServicingDate: Timestamp,
    selectedRoadTaxAmount: Number,
    selectedLastPaidRoadTaxDate: Timestamp,
    selectedRoadTaxDueDate: Timestamp,
  },

  methods: {
    async updateVehicle(uniqueId) {
      this.v$.$validate();
      if (!this.v$.$error) {
        const docRef = doc(db, "vehicles", uniqueId);
        const docData = {
          id: this.licencePlate,
          licencePlate: this.licencePlate,
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
        setDoc(docRef, docData);
        this.$router.push("/");
        alert(
          "Vehicle " + this.licencePlate + " has been successfully updated!"
        );
      } else {
        alert("Form failed validation");
        this.toggleConfirmModal();
      }
    },

    backToFleetOverview() {
      this.$router.push("/fleet/read-fleet");
    },

    toggleConfirmModal() {
      this.toggleEditVehicleConfirm = !this.toggleEditVehicleConfirm;
    },
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
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
}
.departure-label {
  text-align: center;
  margin-top: 30px;
}
</style>
