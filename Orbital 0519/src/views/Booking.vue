<template>
  <div>
    <h1>Create Booking Form</h1>
    <hr />
    <h3>Contact Details</h3>
<<<<<<< Updated upstream
    <a-form :model="formState" name="booking" v-bind="layout">
=======
    <a-form name="booking" v-bind="layout">
>>>>>>> Stashed changes
      <a-form-item
        :name="['staff', 'name']"
        label="Name"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.staff.name" 
                placeholder="Input Name Here"/>
      </a-form-item>
      <a-form-item
        :name="['staff', 'number']"
        label="Staff Number"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.staff.number" 
        placeholder="Input Number Here"/>
      </a-form-item>
      <a-form-item :name="['staff', 'cca']" label="CCA/Department">
        <a-input v-model:value="formState.staff.cca" 
        placeholder="Input CCA/Department Here"/>
      </a-form-item>
      <br />
      <hr />
      <h3>Booking Details</h3>
      <a-form-item
        :name="['booking', 'activity']"
        label="Activity"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.staff.cca" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 5, offset: 3 }" label="1-Way / 2-Way">
        <a-radio-group v-model:value="options">
          <a-radio :value="1">1 - Way</a-radio>
          <a-radio :value="2">2 - Way</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item name="['booking', 'numOf45']" label="45 Seater">
        <a-input-number
          v-model:value="formState.booking.numOf45"
          :min="0"
          :max="99"
        />
      </a-form-item>
      <a-form-item name="['booking', 'numOf40']" label="40 Seater">
        <a-input-number
          v-model:value="formState.booking.numOf40"
          :min="0"
          :max="99"
        />
      </a-form-item>
      <a-form-item name="['booking', 'numOf20']" label="20 Seater">
        <a-input-number
          v-model:value="formState.booking.numOf20"
          :min="0"
          :max="99"
        />
      </a-form-item>
      <a-form-item name="['booking', 'numOf19']" label="19Seater">
        <a-input-number
          v-model:value="formState.booking.numOf19"
          :min="0"
          :max="99"
        />
      </a-form-item>
      <br />
      <hr />
      <h3>Departure Details</h3>
      <a-form-item name="['departure', 'date']" label="Departure Date">
        <a-date-picker
          v-model:value="formState.departure.date"
          :disabled-date="disabledDate"
        />
      </a-form-item>
      <a-form-item name="['departure', 'time']" label="Departure Time">
        <a-time-picker
          v-model:value="formState.departure.time"
          format="HH:mm"
        />
      </a-form-item>
      <a-form-item name="['departure', 'assembly']" label="Assembly Venue"
      :rules="[{ required: true }]">
        <a-input
          v-model:value="formState.departure.assembly"
          placeholder="Input Assembly Venue"
        />
      </a-form-item>
      <a-form-item name="['departure', 'dest']" label="Input Destination"
      :rules="[{ required: true }]">
        <a-input
          v-model:value="formState.departure.dest"
          placeholder="Input Destination"
        />
      </a-form-item>
      <div v-if="options === 2">
        <br />
        <hr />
        <h3>Return Details</h3>
        <a-form-item name="['departure', 'date']" label="Return Date">
          <a-date-picker
            v-model:value="formState.return.date"
            :disabled-date="disabledDate"
          />
        </a-form-item>
        <a-form-item name="['departure', 'time']" label="Return Time">
          <a-time-picker v-model:value="formState.return.time" format="HH:mm" />
        </a-form-item>
        <a-form-item name="['return', 'assembly']" label="Assembly Venue">
          <a-input
            v-model:value="formState.return.assembly"
            placeholder="Input Assembly Venue"
          />
        </a-form-item>
        <a-form-item name="['return', 'dest']" label="Input Destination">
          <a-input
            v-model:value="formState.return.dest"
            placeholder="Input Destination"
          />
        </a-form-item>
      </div>
      <a-form-item>
        <a-button html-type="submit" type="primary">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from "moment";
import dayjs from "dayjs";
<<<<<<< Updated upstream
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
=======
import { ref, reactive } from "vue";
//import useValidate from "@vuelidate/core";
//import { required } from "@vuelidate/validators";
import { db } from "../firebase/index.js";
import { addDoc, collection} from "firebase/firestore";

export default {
  data() {
    return {
      staff: {
        name: null,
        number: null,
        cca: null,
      },
      booking: {
        numOf45: 0,
        numOf40: 0,
        numOf20: 0,
        numOf19: 0,
        activity: null,
        options: 1,
      },
      departure: {
        date: null,
        time: null, 
        assembly: null,
        dest: null,
      },
      returnFrom: {
        date: null,
        time: null,
        assembly: null,
        dest: null,
      },
      /*validations () {
        return {
          staff: {
            name: { required },
          }*/
  
    };
  },
  methods: {
    async createBooking() {
      const bookingsRef = collection(db, "bookings");
      this.departure.date = this.departure.date.format("dddd, MMMM Do YYYY");
      this.departure.time = this.departure.time.format("h:mm a");
      if (this.returnFrom.date == null) {
        this.returnFrom.date = null;
      } else {
        this.returnFrom.date = this.returnFrom.date.format("dddd, MMMM Do YYYY");
      }
      if (this.returnFrom.time == null) {
        this.returnFrom.time = null;
      } else {
        this.returnFrom.time = this.returnFrom.time.format("h:mm a");
      }
      await addDoc(bookingsRef, this.$data);
      alert("Document created successfully!");
      this.$router.push("/");
    },
  },
>>>>>>> Stashed changes
  setup() {
    const plainOptions = ["1 - Way", "2 - Way"];
    const options = ref(1);
    const disabledDate = (current) => {
      return current && current < moment().endOf("day").add(2, "days");
    };

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const formState = reactive({
      staff: {
        name: "",
        number: "",
        cca: "",
      },
      booking: {
        numOf45: 0,
        numOf40: 0,
        numOf20: 0,
        numOf19: 0,
        activity: "",
        options: 1,
      },
      departure: {
        date: dayjs().add(3, "day"),
        time: dayjs(dayjs().add(3, "day"), "HH:mm"),
        assembly: "",
        dest: "",
      },
      return: {
        date: dayjs().add(3, "day"),
        time: dayjs(dayjs().add(3, "day").add(2, "hour"), "HH:mm"),
        assembly: "",
        dest: "",
      },
    });
    return {
      dayjs,
      plainOptions,
      disabledDate,
      options,
      layout,
<<<<<<< Updated upstream
      formState,
=======
      formStates,
      //v$: useValidate()
>>>>>>> Stashed changes
    };
  },
});
</script>
