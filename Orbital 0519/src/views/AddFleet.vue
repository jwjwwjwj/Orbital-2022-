<template>
  <h1><strong>Add Fleet</strong></h1>
  <hr />
  <h3>Vehicle Details</h3>
  <div class="add-fleet-form" v-bind="layout">
    <a-form name="vehicle" v-bind="layout">
      <a-form-item :name="['licence', 'plate']" label="*Licence Plate">
        <span v-if="v$.licencePlate.$error">
        <exclamation-circle-outlined v-if="v$.licencePlate.$error"/>
        Please Input Valid Licence Plate
        </span>
        <a-input
          v-model:value="licencePlate"
          placeholder="Input Licence Plate Here. E.G. SBS123A"
        />
      </a-form-item>
      <a-form-item label="Capacity">
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
                    <div class="flex-container">
        <div class="flex-child fleet-size">
          <div class="departure-label">
            <strong>*Insurance Date:</strong>
          </div>
        </div>
        <div class="flex-child road-tax">
          <div id="datePicker" class="q-pa-md" style="max-width: 300px">
                        <span v-if="v$.insuranceDate.$error">
          <exclamation-circle-outlined v-if="v$.insuranceDate.$error" />
          Please Input Date
                      </span>
            <q-input filled v-model="insuranceDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="insuranceDate" mask="YYYY-MM-DD"
                    :options="optionsFn2">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <div class="flex-container">
        <div class="flex-child fleet-size">
          <div class="departure-label">
            <strong>*Next Insurance Date:</strong>
          </div>
        </div>
        <div class="flex-child road-tax">
          <div id="datePicker" class="q-pa-md" style="max-width: 300px">
                        <span v-if="v$.nextInsuranceRenewalDate.$error">
          <exclamation-circle-outlined v-if="v$.nextInsuranceRenewalDate.$error" />
          Please Input Date
                        </span>
            <q-input filled v-model="nextInsuranceRenewalDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="nextInsuranceRenewalDate" mask="YYYY-MM-DD"
                    :options="optionsFn">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <a-form name="insuranceAmount" v-bind="layout">
        <a-form-item :name="['insurance', 'amount']" label="*Insurance Amount:">
          <span v-if="v$.insuranceAmount.$error">
        <exclamation-circle-outlined v-if="v$.insuranceAmount.$error"/>
        Please Input Valid Insurance Amount
        </span>
          <a-input
            v-model:value="insuranceAmount"
            placeholder="Input Insurance Amount here."
            type = "number"
          />
        </a-form-item>
      </a-form>
      <br />
      <hr />
      <h3>Servicing Details</h3>
            <div class="flex-container">
        <div class="flex-child fleet-size">
          <div class="departure-label">
            <strong>*Last Servicing Date:</strong>
          </div>
        </div>
        <div class="flex-child road-tax">
          <div id="datePicker" class="q-pa-md" style="max-width: 300px">
                                    <span v-if="v$.lastSentForServicing.$error">
          <exclamation-circle-outlined v-if="v$.lastSentForServicing.$error" />
          Please Input Date
                        </span>
            <q-input filled v-model="lastSentForServicing">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="lastSentForServicing" mask="YYYY-MM-DD"
                    :options="optionsFn2">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
            <div class="flex-container">
        <div class="flex-child fleet-size">
          <div class="departure-label">
            <strong>*Next Servicing Date:</strong>
          </div>
        </div>
        <div class="flex-child road-tax">
          <div id="datePicker" class="q-pa-md" style="max-width: 300px">
                                    <span v-if="v$.nextServicingDate.$error">
          <exclamation-circle-outlined v-if="v$.nextServicingDate.$error" />
          Please Input Date
                        </span>
            <q-input filled v-model="nextServicingDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="nextServicingDate" mask="YYYY-MM-DD"
                    :options="optionsFn">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <h3>Road Tax Details</h3>
      <a-form name="roadTaxAmount" v-bind="layout">
        <a-form-item :name="['roadtax', 'amount']" label="*Road Tax Amount:">
                  <span v-if="v$.roadTaxAmount.$error">
        <exclamation-circle-outlined v-if="v$.roadTaxAmount.$error"/>
        Please Input Valid Road Tax Amount
        </span>
          <a-input
            v-model:value="roadTaxAmount"
            placeholder="Input Road Tax Amount here."
            type = "number"
          />
        </a-form-item>
      </a-form>
            <div class="flex-container">
        <div class="flex-child fleet-size">
          <div class="departure-label">
            <strong>*Last Road Tax Date:</strong>
          </div>
        </div>
        <div class="flex-child road-tax">
          <div id="datePicker" class="q-pa-md" style="max-width: 300px">
                                    <span v-if="v$.lastPaidRoadTaxDate.$error">
          <exclamation-circle-outlined v-if="v$.lastPaidRoadTaxDate.$error" />
          Please Input Date
                        </span>
            <q-input filled v-model="lastPaidRoadTaxDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="lastPaidRoadTaxDate" mask="YYYY-MM-DD"
                    :options="optionsFn2">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
            <div class="flex-container">
        <div class="flex-child fleet-size">
          <div class="departure-label">
            <strong>*Next Road Tax Payment:</strong>
          </div>
        </div>
        <div class="flex-child road-tax">
          <div id="datePicker" class="q-pa-md" style="max-width: 300px">
                                    <span v-if="v$.roadTaxDueDate.$error">
          <exclamation-circle-outlined v-if="v$.roadTaxDueDate.$error" />
          Please Input Date
                        </span>
            <q-input filled v-model="roadTaxDueDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="roadTaxDueDate" mask="YYYY-MM-DD"
                    :options="optionsFn">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </a-form>
    <br />
    <a-button @click.prevent="addFleet" html-type="submit" type="primary"
      >Submit</a-button
    >
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  maxValue,
  numeric,
  minLength,
  maxLength /*minValue*/,
} from "@vuelidate/validators";
//import { ref } from "vue";
import { db } from "../firebase/index.js";
import { addDoc, collection } from "firebase/firestore";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { date } from 'quasar'

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
    };
  },
  validations() {
    return {
      licencePlate: { required, maxLength: maxLength(8), minLength: minLength(3) },
      id: {},
      insuranceDate: { required },
      capacity: { numeric, required },
      nextInsuranceRenewalDate: { required },
      insuranceAmount: { numeric, required, maxValue: maxValue(2000) },
      lastSentForServicing: { required },
      nextServicingDate: { required },
      roadTaxAmount: { numeric, required, maxValue: maxValue(2000) },
      lastPaidRoadTaxDate: { required },
      roadTaxDueDate: { required },
    };
  },
  methods: {
    async addFleet() {
      this.v$.$validate()
      if (!this.v$.$error) {
        const vehicleRef = collection(db, "vehicles");
        this.insuranceAmount= Number(this.insuranceAmount);
        this.roadTaxAmount = Number(this.roadTaxAmount);
        this.insuranceDate = new Date(this.insuranceDate);
        this.nextInsuranceRenewalDate = new Date(
          this.nextInsuranceRenewalDate);
        this.lastSentForServicing = new Date(
          this.lastSentForServicing);
        this.nextServicingDate = new Date(
          this.nextServicingDate);
        this.lastPaidRoadTaxDate = new Date(
          this.lastPaidRoadTaxDate);
        this.roadTaxDueDate = new Date(
          this.roadTaxDueDate);
        this.id = this.licencePlate;
        await addDoc(vehicleRef, this.$data);
        alert("Document created successfully!");
        this.$router.push("/");
      } else {
        alert("Form failed validation");
      }
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
          let newDate = date.formatDate(date.addToDate(Date.now(), {months:24}), 'YYYY/MM/DD')
        return d >= date.formatDate(Date.now(), 'YYYY/MM/DD') && d <=newDate},
        optionsFn2(d) {
          let oldDate = date.formatDate(date.subtractFromDate(Date.now(), {months:24}), 'YYYY/MM/DD')
        return d >= oldDate && d <= date.formatDate(Date.now(), 'YYYY/MM/DD')
        }
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
