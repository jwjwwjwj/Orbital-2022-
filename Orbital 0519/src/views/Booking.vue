<template>
  <div>
    <h1>Create Booking Form</h1>
    <hr />
    <h3>Contact Details</h3>
    <a-form name="booking" v-bind="layout">
      <a-form-item
        :name="['staff', 'name']"
        label="*Name"
      >
      <span v-if="v$.form.staff.name.$error">
        <exclamation-circle-outlined v-if="v$.form.staff.name.$error"/>
        Please Input Staff Name
        </span>
        <a-input v-model:value="form.staff.name" 
                placeholder="Input Name Here"
                />
      </a-form-item>
      <a-form-item
        :name="['staff', 'number']"
        label="*Staff Number"
        >
        <span v-if="v$.form.staff.number.$error">
        <exclamation-circle-outlined v-if="v$.form.staff.number.$error"/>
        Please Input Valid Phone Number
        </span>
        <a-input v-model:value="form.staff.number" 
        placeholder="Input Number Here"/>
      </a-form-item>
      <a-form-item 
      :name="['staff', 'cca']" 
      label="*CCA/Department"
      >
        <span v-if="v$.form.staff.cca.$error">
        <exclamation-circle-outlined v-if="v$.form.staff.cca.$error"/>
        Please Input CCA
        </span>
        <a-input 
        v-model:value="form.staff.cca" 
        placeholder="Input CCA/Department Here"/>
      </a-form-item>
      <br />
      <hr />
      <h3>Booking Details</h3>
      <a-form-item
        :name="['booking', 'activity']"
        label="*Activity"
      >
        <span v-if="v$.form.booking.activity.$error">
        <exclamation-circle-outlined v-if="v$.form.booking.activity.$error"/>
        Please Input Activity Description
        </span>
        <a-input 
        v-model:value="form.booking.activity" 
        placeholder="Input Activity Description Here"/>
      </a-form-item>
      <a-form-item 
      :wrapper-col="{ span: 5, offset: 1 }" 
      label="1-Way / 2-Way">
        <a-radio-group 
        v-model:value="form.booking.options">
          <a-radio :value="1">1 - Way</a-radio>
          <a-radio :value="2">2 - Way</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item 
      :wrapper-col="{ span: 4, offset: 1 }" 
      name="['booking', 'numOf45']" 
      label="45 Seater">
        <a-input-number
          v-model:value="form.booking.numOf45"
          :min="0"
          :max="99"
        />
      </a-form-item>
      <a-form-item 
      :wrapper-col="{ span: 4, offset: 1 }" 
      name="['booking', 'numOf40']" 
      label="40 Seater">
        <a-input-number
          v-model:value="form.booking.numOf40"
          :min="0"
          :max="99"
        />
      </a-form-item>
      <a-form-item 
      :wrapper-col="{ span: 4, offset: 1 }" 
      name="['booking', 'numOf20']" 
      label="20 Seater">
        <a-input-number
          v-model:value="form.booking.numOf20"
          :min="0"
          :max="99"
        />
      </a-form-item>
      <a-form-item 
      :wrapper-col="{ span: 4, offset: 1 }" 
      name="['booking', 'numOf19']" 
      label="19Seater">
        <a-input-number
          v-model:value="form.booking.numOf19"
          :min="0"
          :max="99"
        />
      </a-form-item>
      <br />
      <hr />
      <h3>Departure Details</h3>
      <a-form-item 
      :wrapper-col="{ span: 5, offset: 1 }" 
      name="['departure', 'date']" 
      label="Departure Date">
        <a-date-picker
          v-model:value="form.departure.date"
          :disabled-date="disabledDate"
        />
      </a-form-item>
      <a-form-item 
      :wrapper-col="{ span: 7, offset:0 }" 
      name="['departure', 'time']" 
      label="Departure Time">
        <a-time-picker
          v-model:value="form.departure.time"
          format="HH:mm"
        />
      </a-form-item>
      <a-form-item 
      name="['departure', 'assembly']" 
      label="*Assembly Venue"
      >
        <span v-if="v$.form.departure.assembly.$error">
        <exclamation-circle-outlined v-if="v$.form.departure.assembly.$error"/>
        Please Input Assembly Venue
        </span>
        <a-input
          v-model:value="form.departure.assembly"
          placeholder="Input Assembly Venue"
        />
      </a-form-item>
      <a-form-item 
      name="['departure', 'dest']" 
      label="*Input Destination"
      >
        <span v-if="v$.form.departure.dest.$error">
        <exclamation-circle-outlined v-if="v$.form.departure.dest.$error"/>
        Please Input Destination
        </span>
        <a-input
          v-model:value="form.departure.dest"
          placeholder="Input Destination"
        />
      </a-form-item>
      <div v-if="form.booking.options === 2">
        <br />
        <hr />
        <h3>Return Details</h3>
        <a-form-item :wrapper-col="{ span: 5, offset: 1 }" name="['departure', 'date']" label="Return Date">
          <a-date-picker
            v-model:value="form.returnFrom.date"
            :disabled-date="disabledDate"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 7, offset:0 }" name="['departure', 'time']" label="Return Time">
          <a-time-picker v-model:value="form.returnFrom.time" format="HH:mm" />
        </a-form-item>
        <a-form-item name="['returnFrom', 'assembly']" label="*Assembly Venue">
          <a-input
            v-model:value="form.returnFrom.assembly"
            placeholder="Input Assembly Venue"
          />
        </a-form-item>
        <a-form-item name="['returnFrom', 'dest']" label="*Input Destination">
          <a-input
            v-model:value="form.returnFrom.dest"
            placeholder="Input Destination"
          />
        </a-form-item>
      </div>
    </a-form>
    <br/>
    <a-button @click.prevent="createBooking" html-type="submit" type="primary">Submit</a-button>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, requiredIf, numeric, minLength, maxLength, /*minValue*/ } from '@vuelidate/validators'
import moment from "moment";
import dayjs from "dayjs";
import { ref, reactive } from "vue";
import { db } from "../firebase/index.js";
import { addDoc, collection} from "firebase/firestore";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    ExclamationCircleOutlined, 
  },
  data() {
    return {
      v$:useVuelidate(),
      form: {
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
        date: dayjs().add(3, "day"),
        time: ref(), 
        assembly: null,
        dest: null,
      },
      returnFrom: {
        date: null,
        time: ref(),
        assembly: null,
        dest: null,
      },
    }
    }
  },
  computed: {
      validNumOfBuses() {
        return (this.form.booking.numOf45 + this.form.booking.numOf40 + this.form.booking.numOf20 + this.form.booking.numOf20) 
      }
  },
  validations() {
    return {
      form: {
      staff: {
        name: { required },
        number: { required, numeric, minLength: minLength(8), maxLength: maxLength(8) },
        cca: { required },
      },
      booking: {
        numOf45: { required },
        numOf40: { required  },
        numOf20: { required  },
        numOf19: { required },
        activity: { required },
        options: { required },
      },
      departure: {
        date: { required },
        time: { required }, 
        assembly: { required },
        dest: { required },
      },
      returnFrom: {
        date: { required: requiredIf(function () {
      return ( this.form.booking.options === 2 )
    })},
        time: {required: requiredIf(function () {
      return ( this.form.booking.options === 2 )
    })},
        assembly: {required: requiredIf(function () {
      return ( this.form.booking.options === 2 )
    })},
        dest: {required: requiredIf(function () {
      return ( this.form.booking.options === 2 )
    })},
    }
    }
    }
  },
  methods: {
    async createBooking() {
      this.v$.$validate()
      if (!this.v$.$error){
      const bookingsRef = collection(db, "bookings");
      this.form.departure.date = this.form.departure.date.format("dddd, MMMM D YYYY");
      this.form.departure.time = this.form.departure.time.format("hh:mm a");
      if (this.form.returnFrom.date == null) {
        this.form.returnFrom.date = null;
      } else {
        this.form.returnFrom.date = this.form.returnFrom.date.format("dddd, MMMM D YYYY");
      }
      if (this.form.returnFrom.time == null) {
        this.form.returnFrom.time = null;
      } else {
        this.form.returnFrom.time = this.form.returnFrom.time.format("hh:mm a");
      }
      await addDoc(bookingsRef, this.$data.form);
      this.$router.push({ path: '/' })
      alert("Booking form submitted!");
    } else {
     alert('Form failed validation')
    }
  }
  },
  setup() {
    const plainOptions = ["1 - Way", "2 - Way"];
    const options = ref(1);
    const disabledDate = (current) => {
      return current && current < moment().endOf("day").add(2, "days");
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
    const formStates = reactive({
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
        time: ref(dayjs(dayjs().add(3, "day"))),
        assembly: "",
        dest: "",
      },
      returnFrom: {
        date: dayjs().add(3, "day"),
        time: ref(dayjs(dayjs().add(3, "day").add(2, "hour"), "HH:mm")),
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
      formStates,
    };
  },
}
</script>
