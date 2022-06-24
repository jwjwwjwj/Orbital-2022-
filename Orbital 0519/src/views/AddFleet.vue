<template>
    <h1><strong>Add Fleet</strong></h1>
        <hr />
    <h3>Vehicle Details</h3>
    <div class="add-fleet-form" v-bind="layout">
      <a-form name="vehicle" v-bind="layout">
        <a-form-item
        :name = "['licence', 'plate']"
        label="*Licence Plate"
        >
        <a-input 
        v-model:value= "licencePlate"
        placeholder="Input Licence Plate Here. E.G. SBS123A"
        />
        </a-form-item>
      <a-form-item 
      label="Capacity"
      >
        <a-radio-group 
        v-model:value="capacity">
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
          :wrapper-col="{ span: 5, offset: 1 }"
          name="['insurance', 'date']" 
          label="Last Insurance Payment Date">
        <a-date-picker
          v-model:value="insuranceDate"
          :disabled-date="disabledDate"
        />
      </a-form-item>
        <a-form name="insuranceAmount" v-bind="layout">
        <a-form-item
        :name = "['insurance', 'amount']"
        label="*Insurance Amount:"
        >
        <a-input
         v-model:value= "insuranceAmount"
         placeholder="Input Insurance Amount here."
         />
        </a-form-item>
        </a-form>
      <br />
      <hr />
      <h3>Servicing Details</h3>
        <a-form-item 
        :wrapper-col="{ span: 5, offset: 1 }"
        name="['servicing', 'date']" 
        label="*Last Servicing Date">
            <a-date-picker
          v-model:value="lastSentForServicing"
          :disabled-date="disabledDate"
        />
        </a-form-item>
        <a-form-item 
        :wrapper-col="{ span: 5, offset: 1 }"
        name="['next', 'servicing', 'date']" 
        label="*Next Servicing Date">
            <a-date-picker
          v-model:value="nextServicingDate"
          :disabled-date="disabledDateAfter"
        />
        </a-form-item>
      <br />
      <hr />
      <h3>Road Tax Details</h3>
        <a-form name="roadTaxAmount" v-bind="layout">
        <a-form-item
        :name = "['roadtax', 'amount']"
        label="*Road Tax Amount:"
        >
        <a-input
         v-model:value= "roadTaxAmount"
         placeholder="Input Road Tax Amount here."
         />
        </a-form-item>
        </a-form>
        <a-form-item 
        :wrapper-col="{ span: 5, offset: 1 }"
        name="['roadtax', 'date']" 
        label="*Last Road Tax Payment">
            <a-date-picker
          v-model:value="lastPaidRoadTaxDate"
          :disabled-date="disabledDate"
        />
        </a-form-item>
                <a-form-item 
        :wrapper-col="{ span: 5, offset: 1 }"
        name="['roadtax', 'date']" 
        label="*Next Road Tax Payment">
            <a-date-picker
          v-model:value="roadTaxDueDate"
          :disabled-date="disabledDateAfter"
        />
        </a-form-item>
      </a-form>
      <br/>
    <a-button @click.prevent="addFleet()" html-type="submit" type="primary">Submit</a-button>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { ref } from "vue";
import { db } from "../firebase/index.js";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment";

export default {
  name: "AddFleet",
  data() {
    return {
      licencePlate: null,
      capacity: 45,
      insuranceDate: ref(),
      insuranceAmount: null,
      lastSentForServicing: ref(),
      nextServicingDate: ref(),
      roadTaxAmount: null,
      lastPaidRoadTaxDate: ref(),
      roadTaxDueDate: ref(),
    };
  },
  validations() {
    return {
      licencePlate: { required },
      capacity: { numeric },
      insuranceDate: { required },
      insuranceAmount: { numeric },
      lastSentForServicing: { required },
      nextServicingDate: { required },
      roadTaxAmount: { numeric },
      lastPaidRoadTaxDate: { required },
      roadTaxDueDate: { required },
    }
  },
  methods: {
    async addFleet() {
      this.v$.$validate()
      if (!this.v$.$error){
      const vehicleRef = collection(db, "vehicles");
      this.insuranceDate = this.insuranceDate.format("dddd, MMMM D YYYY");
      this.lastSentForServicing = this.lastSentForServicing.format("dddd, MMMM D YYYY");
      this.nextServicingDate = this.nextServicingDate.format("dddd, MMMM D YYYY");
      this.lastPaidRoadTaxDate = this.lastPaidRoadTaxDate.format("dddd, MMMM D YYYY");
      this.roadTaxDueDate = this.roadTaxDueDate.format("dddd, MMMM D YYYY");
      await addDoc(vehicleRef, this.$data);
      alert("Document created successfully!");
      this.$router.push("/");
      } else {
     alert('Form failed validation')
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
      v$:useVuelidate(),
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