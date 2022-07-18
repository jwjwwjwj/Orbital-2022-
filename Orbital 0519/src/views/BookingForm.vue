<template>
  <div>
    <h1>Create Booking Form</h1>
    <hr />
    <h3>Contact Details</h3>
    <a-form name="booking" v-bind="layout">
      <a-form-item
        :name="['staff', 'name']"
        label="*Name"
        style="font-weight: bold"
      >
        <div class="form-input">
          <span v-if="v$.staffName.$error">
            <exclamation-circle-outlined v-if="v$.staffName.$error" />
            Please Input Staff Name
          </span>
          <a-input
            v-model:value="staffName"
            placeholder="Input Name Here"
            style="font-weight: bold"
          />
        </div>
      </a-form-item>
      <a-form-item
        :name="['staff', 'number']"
        label="*Staff Number"
        style="font-weight: bold"
      >
        <div class="form-input">
          <span v-if="v$.staffNumber.$error">
            <exclamation-circle-outlined v-if="v$.staffNumber.$error" />
            Please Input Valid Phone Number
          </span>
          <a-input
            v-model:value="staffNumber"
            placeholder="Input Number Here"
          />
        </div>
      </a-form-item>
      <a-form-item
        :name="['staff', 'cca']"
        label="*CCA/Department"
        style="font-weight: bold"
      >
        <div class="form-input">
          <span v-if="v$.staffCCA.$error">
            <exclamation-circle-outlined v-if="v$.staffCCA.$error" />
            Please Input CCA
          </span>
          <a-input
            v-model:value="staffCCA"
            placeholder="Input CCA/Department Here"
          />
        </div>
      </a-form-item>
      <br />
      <hr />
      <h3>Booking Details</h3>
      <a-form-item
        :name="['booking', 'activity']"
        label="*Activity"
        style="font-weight: bold"
      >
        <div class="form-input">
          <span v-if="v$.bookingActivity.$error">
            <exclamation-circle-outlined v-if="v$.bookingActivity.$error" />
            Please Input Activity Description
          </span>
          <a-input
            v-model:value="bookingActivity"
            placeholder="Input Activity Description Here"
          />
        </div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 5, offset: 0 }"
        label="*1-Way / 2-Way"
        style="font-weight: bold"
      >
        <div class="form-input">
          <a-radio-group v-model:value="bookingOptions">
            <a-radio :value="1">1 - Way</a-radio>
            <a-radio :value="2">2 - Way</a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 4, offset: 0 }"
        name="['booking', 'numOf45']"
        label="45 Seater"
        style="font-weight: bold"
      >
        <span v-if="v$.bookingNumOf45.$error">
          <exclamation-circle-outlined v-if="v$.bookingNumOf45.$error" />
          Total Buses has to be non zero and less than twenty
        </span>
        <div class="form-input">
          <a-input-number v-model:value="bookingNumOf45" :min="0" :max="99" />
        </div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 4, offset: 0 }"
        name="['booking', 'numOf40']"
        label="40 Seater"
        style="font-weight: bold"
      >
        <div class="form-input">
          <a-input-number v-model:value="bookingNumOf40" :min="0" :max="99" />
        </div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 4, offset: 0 }"
        name="['booking', 'numOf20']"
        label="20 Seater"
        style="font-weight: bold"
      >
        <div class="form-input">
          <a-input-number v-model:value="bookingNumOf20" :min="0" :max="99" />
        </div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 4, offset: 0 }"
        name="['booking', 'numOf19']"
        label="19 Seater"
        style="font-weight: bold"
      >
        <div class="form-input">
          <a-input-number v-model:value="bookingNumOf19" :min="0" :max="99" />
        </div>
      </a-form-item>
      <br />
      <hr />
      <h3>Departure Details</h3>
      <div class="flex-container">
        <div class="flex-child fleet-size">
          <div class="departure-label">
            <strong>*Departure Date & Time:</strong>
          </div>
        </div>
        <div class="flex-child road-tax">
          <div id="datePicker" class="q-pa-md" style="max-width: 433px">
            <span v-if="v$.departureDate.$error">
              <exclamation-circle-outlined v-if="v$.departureDate.$error" />
              <strong> Please Input Valid Date & Time </strong>
            </span>
            <q-input filled v-model="departureDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="departureDate"
                      mask="YYYY-MM-DD HH:mm"
                      :options="optionsFn"
                    >
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

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="departureDate"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <a-form-item
        name="['departure', 'assembly']"
        label="*Assembly Venue"
        style="font-weight: bold"
      >
        <div class="form-input">
          <span v-if="v$.departureAssembly.$error">
            <exclamation-circle-outlined v-if="v$.departureAssembly.$error" />
            Please Input Assembly Venue
          </span>
          <a-input
            v-model:value="departureAssembly"
            placeholder="Input Assembly Venue"
          />
        </div>
      </a-form-item>
      <a-form-item
        name="['departure', 'dest']"
        label="*Input Destination"
        style="font-weight: bold"
      >
        <div class="form-input">
          <span v-if="v$.departureDest.$error">
            <exclamation-circle-outlined v-if="v$.departureDest.$error" />
            Please Input Destination
          </span>
          <a-input
            v-model:value="departureDest"
            placeholder="Input Destination"
          />
        </div>
      </a-form-item>
      <div v-if="bookingOptions === 2">
        <br />
        <hr />
        <h3>Return Details</h3>
        <div class="flex-container">
          <div class="flex-child fleet-size">
            <div class="departure-label">
              <strong>*Return Date & Time:</strong>
            </div>
          </div>
          <div class="flex-child road-tax">
            <div id="datePicker" class="q-pa-md" style="max-width: 433px">
              <span v-if="v$.returnFromDate.$error">
                <exclamation-circle-outlined v-if="v$.returnFromDate.$error" />
                <strong> Please Input Valid Date & Time </strong>
              </span>
              <q-input filled v-model="returnFromDate">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="returnFromDate"
                        mask="YYYY-MM-DD HH:mm"
                        :options="optionsFn"
                      >
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

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="returnFromDate"
                        mask="YYYY-MM-DD HH:mm"
                        format24h
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <a-form-item
          name="['returnFrom', 'assembly']"
          label="*Assembly Venue"
          style="font-weight: bold"
        >
          <div class="form-input">
            <span v-if="v$.returnFromAssembly.$error">
              <exclamation-circle-outlined
                v-if="v$.returnFromAssembly.$error"
              />
              Please Input Assembly Venue
            </span>
            <a-input
              v-model:value="returnFromAssembly"
              placeholder="Input Assembly Venue"
            />
          </div>
        </a-form-item>
        <a-form-item
          name="['returnFrom', 'dest']"
          label="*Input Destination"
          style="font-weight: bold"
        >
          <div class="form-input">
            <span v-if="v$.returnFromDest.$error">
              <exclamation-circle-outlined v-if="v$.returnFromDest.$error" />
              Please Input Destination
            </span>
            <a-input
              v-model:value="returnFromDest"
              placeholder="Input Destination"
            />
          </div>
        </a-form-item>
      </div>
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
    <q-dialog v-model="toggleAddBookingConfirm" persistent>
      <q-card>
        <div class="warning-header" style="text-align: center">
          <span style="font-size: 25px"><strong>CONFIRMATION</strong></span>
        </div>
        <q-card-section class="row items-center">
          <i class="far fa-exclamation-triangle"></i>
          <span class="q-ml-sm"
            >Are you sure you want to make this booking?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="black"
            @click="toggleConfirmModal"
          />
          <q-btn flat label="Confirm" color="green" @click="createBooking" />
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
  requiredIf,
  numeric,
  minLength,
  maxLength /*minValue*/,
} from "@vuelidate/validators";
import moment from "moment";
import dayjs from "dayjs";
import { ref, reactive } from "vue";
import { db } from "../firebase/index.js";
import { addDoc, collection } from "firebase/firestore";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { date } from "quasar";

export default {
  components: {
    ExclamationCircleOutlined,
  },
  data() {
    return {
      user: useStore().state.displayName,
      id: useStore().state.displayName,
      staffName: null,
      staffNumber: null,
      staffCCA: null,
      bookingNumOf45: 0,
      bookingNumOf40: 0,
      bookingNumOf20: 0,
      bookingNumOf19: 0,
      bookingActivity: null,
      bookingOptions: 1,
      departureDate: ref(), //dayjs().add(3, "day"),//ref(),
      departureTime: ref(),
      departureAssembly: null,
      departureDest: null,
      returnFromDate: null,
      returnFromTime: null,
      returnFromAssembly: null,
      returnFromDest: null,
      toggleAddBookingConfirm: false,
    };
  },
  computed: {
    validNumOfBuses() {
      return (
        this.bookingNumOf45 +
        this.bookingNumOf40 +
        this.bookingNumOf20 +
        this.bookingNumOf19
      );
    },
  },
  validations() {
    return {
      user: {},
      id: {},
      staffName: { required },
      staffNumber: {
        required,
        numeric,
        minLength: minLength(8),
        maxLength: maxLength(8),
      },
      staffCCA: { required },
      bookingNumOf45: {
        required,
        minValue: (value) =>
          +value +
            this.bookingNumOf40 +
            this.bookingNumOf20 +
            this.bookingNumOf19 >
            0 &&
          +value +
            this.bookingNumOf40 +
            this.bookingNumOf20 +
            this.bookingNumOf19 <
            20,
      },
      bookingNumOf40: { required },
      bookingNumOf20: { required },
      bookingNumOf19: { required },
      bookingActivity: { required },
      bookingOptions: { required },
      departureDate: {
        required,
        minValue(value) {
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 2);
          return new Date(value) >= newDate;
        },
      },
      departureTime: {},
      departureAssembly: { required },
      departureDest: { required },
      returnFromDate: {
        required: requiredIf(function () {
          return this.bookingOptions === 2;
        }),
        minValue: function (value) {
          return this.bookingOptions === 1 || value > this.departureDate;
        },
      },
      returnFromTime: {},
      returnFromAssembly: {
        required: requiredIf(function () {
          return this.bookingOptions === 2;
        }),
      },
      returnFromDest: {
        required: requiredIf(function () {
          return this.bookingOptions === 2;
        }),
      },
    };
  },
  methods: {
    async createBooking() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const bookingsRef = collection(db, "bookings");
        this.departureDate = new Date(this.departureDate);
        this.departureTime = new Date(this.departureDate)
          .toTimeString()
          .slice(0, 5); //08/03/2022
        if (this.bookingOptions === 1) {
          this.returnFromDate = null;
          this.returnFromTime = null;
        } else {
          this.returnFromDate = new Date(this.returnFromDate);
          this.returnFromTime = new Date(this.returnFromDate)
            .toTimeString()
            .slice(0, 5);
        }
        await addDoc(bookingsRef, this.$data);
        this.$router.push({ path: "/" });
        alert("Booking form submitted!");
      } else {
        alert("Form failed validation");
        this.toggleAddBookingConfirm = !this.toggleAddBookingConfirm;
      }
    },

    toggleConfirmModal() {
      this.toggleAddBookingConfirm = !this.toggleAddBookingConfirm;
    },
  },
  setup() {
    const plainOptions = ["1 - Way", "2 - Way"];
    const options = ref(1);
    const layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
      date: moment(),
      dDate: moment().add(3, "days"),
      dayjs,
      plainOptions,
      options,
      layout,
      formStates,
      v$: useVuelidate(),
      optionsFn(d) {
        let newDate = date.addToDate(new Date(), { days: 3 });
        let maxDate = date.addToDate(new Date(), { months: 3 });
        return (
          d >= date.formatDate(newDate, "YYYY/MM/DD") &&
          d <= date.formatDate(maxDate, "YYYY/MM/DD")
        );
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

.form-input {
  text-align: left;
  padding-left: 50px;
}

.flex-container {
  display: flex;
}

.flex-child {
  flex: 1;
  margin: 10px;
}

.flex-child:first-child {
  max-width: 40.7%;
  width: 50px;
}

.flex-child.fleet-size .departure-label {
  text-align: right;
}

#datePicker {
  text-align: left;
  margin-left: 20px;
}

.departure-label {
  text-align: center;
  margin-top: 30px;
}
</style>
