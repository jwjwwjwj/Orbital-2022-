<template>
  <h1><strong>Add Fleet</strong></h1>
  <hr />
  <h3>Vehicle Details</h3>
  <div class="add-fleet-form" v-bind="layout">
    <a-form name="vehicle" v-bind="layout">
      <a-form-item :name="['licence', 'plate']" label="*Licence Plate">
        <span v-if="v$.licencePlate.$error">
        <exclamation-circle-outlined v-if="v$.licencePlate.$error"/>
        Please Input Licence Plate
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
            <q-input filled v-model="insuranceDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="insuranceDate" mask="YYYY-MM-DD">
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
            <q-input filled v-model="nextInsuranceRenewalDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="nextInsuranceRenewalDate" mask="YYYY-MM-DD">
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
        Please Input Insurance Amount
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
            <q-input filled v-model="lastSentForServicing">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="lastSentForServicing" mask="YYYY-MM-DD">
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
            <q-input filled v-model="nextServicingDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="nextServicingDate" mask="YYYY-MM-DD">
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
            <q-input filled v-model="lastPaidRoadTaxDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="lastPaidRoadTaxDate" mask="YYYY-MM-DD">
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
            <q-input filled v-model="roadTaxDueDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="roadTaxDueDate" mask="YYYY-MM-DD">
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
    <a-button @click.prevent="addFleet()" html-type="submit" type="primary"
      >Submit</a-button
    >
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
//import { ref } from "vue";
import { db } from "../firebase/index.js";
import { addDoc, collection } from "firebase/firestore";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import moment from "moment";

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
      insuranceAmount: 0,
      nextInsuranceRenewalDate: null,
      lastSentForServicing: null,
      nextServicingDate: null,
      roadTaxAmount: 0,
      lastPaidRoadTaxDate: null,
      roadTaxDueDate: null,
    };
  },
  validations() {
    return {
      licencePlate: { required },
      insuranceDate: { required },
      capacity: { numeric, required },
      nextInsuranceRenewalDate: { required },
      insuranceAmount: { numeric, required },
      lastSentForServicing: { required },
      nextServicingDate: { required },
      roadTaxAmount: { numeric, required },
      lastPaidRoadTaxDate: { required },
      roadTaxDueDate: { required },
    };
  },
  methods: {
    async addFleet() {
      this.v$.$validate();
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
  created() {
    this.addFleet();
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
      onSubmit() {
        /*
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        lPlate.value = null;
        cap.value = null;
        accept.value = false;
        */
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