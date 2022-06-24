<template>
  <main class="add-fleet">
    <h1><strong>Add Fleet</strong></h1>
    <div class="add-fleet-form">
      <div class="q-pa-md" style="width: 300px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <span class="header1"><strong>Licence Plate</strong></span>
          <q-input
            filled
            dense
            v-model="lPlate"
            hint="For instance, SBS123X"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <span class="header2"><strong>Capacity</strong></span>
          <q-input
            filled
            dense
            type="number"
            v-model="cap"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type the capacity',
              (val) =>
                val == 19 ||
                val == 20 ||
                val == 40 ||
                val == 45 ||
                'Please type an appropriate capacity (19, 20, 40 or 45)',
            ]"
          />
          <div class="buttons">
            <q-btn
              class="submitBtn"
              label="Submit"
              type="submit"
              color="black"
            />
            <q-btn label="Reset" type="reset" color="black" class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </div>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { db } from "../firebase/index.js";
import { addDoc, collection } from "firebase/firestore";

export default {
  name: "AddFleet",
  data() {
    return {
      licencePlate: null,
      capacity: null,
      id: null,
      insuranceAmount: null,
      insuranceRenewalDate: null,
      lastPaidRoadTaxDueDate: null,
      lastSentForServicing: null,
      nextInsuranceRenewalDate: null,
      nextServicingDate: null,
      roadTaxAmount: null,
      roadTaxDueDate: null,
    };
  },
  methods: {
    async addFleet() {
      const vehicleRef = collection(db, "vehicles");
      await addDoc(vehicleRef, this.$data);
      //alert("Document created successfully!");
      //this.$router.push("/");
    },
  },
  created() {
    this.addFleet();
  },
  setup() {
    const $q = useQuasar();

    const lPlate = ref(null);
    const cap = ref(null);
    const accept = ref(false);

    return {
      lPlate,
      cap,
      accept,

      onSubmit() {
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
      },
    };
  },
};
</script>

<style scoped>
.add-fleet-form {
  display: inline-block;
  margin-left: 50px;
}
.buttons {
  margin: 15px;
}
.q-ml-sm {
  left: 20px;
  width: 75px;
}
.submitBtn {
  right: 15px;
  width: 75px;
}
.header1,
.header2 {
  margin-right: 25px;
  font-size: 25px;
}
.header2 {
  padding: 25px;
}
</style>
