<template>
  <h1 style="text-align: center; font-size: 48px">
    <strong>Update Booking</strong>
  </h1>
  <hr />
  <div class="add-fleet-form" v-bind="layout">
    <hr />
    <h3 style="text-align: center">Contact Details</h3>
    <a-form name="booking" v-bind="layout">
      <a-form-item
        :name="['staff', 'name']"
        label="*Name"
        style="font-weight: bold; text-align: left; padding-left: 10%"
      >
        <div class="form-input">
          <span v-if="v$.staffName.$error">
            <exclamation-circle-outlined v-if="v$.staffName.$error" />
            Please Input Staff Name
          </span>
          <a-input v-model:value="staffName" placeholder="Input Name Here" />
        </div>
      </a-form-item>
      <a-form-item
        :name="['staff', 'number']"
        label="*Staff Number"
        style="font-weight: bold; text-align: left; padding-left: 10%"
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
        style="font-weight: bold; text-align: left; padding-left: 10%"
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
        style="font-weight: bold; text-align: left; padding-left: 10%"
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
        style="font-weight: bold; text-align: left; padding-left: 10%"
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
        style="font-weight: bold; text-align: left; padding-left: 10%"
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
        style="font-weight: bold; text-align: left; padding-left: 10%"
      >
        <div class="form-input">
          <a-input-number v-model:value="bookingNumOf40" :min="0" :max="99" />
        </div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 4, offset: 0 }"
        name="['booking', 'numOf20']"
        label="20 Seater"
        style="font-weight: bold; text-align: left; padding-left: 10%"
      >
        <div class="form-input">
          <a-input-number v-model:value="bookingNumOf20" :min="0" :max="99" />
        </div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 4, offset: 0 }"
        name="['booking', 'numOf19']"
        label="19 Seater"
        style="font-weight: bold; text-align: left; padding-left: 10%"
      >
        <div class="form-input">
          <a-input-number v-model:value="bookingNumOf19" :min="0" :max="99" />
        </div>
      </a-form-item>
      <br />
      <hr />
      <h3>Departure Details</h3>
      <a-form-item
        label="*Departure Date & Time"
        style="font-weight: bold; text-align: left; padding-left: 10%"
      >
        <span v-if="v$.departureDate.$error">
          <exclamation-circle-outlined v-if="v$.departureDate.$error" />
           Please Input Valid Date & Time 
        </span>
        <div style="margin-left: 0%">
          <q-input filled v-model="departureDate" style="max-width: 400px">
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
                      <q-btn v-close-popup label="Close" color="primary" flat />
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
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </a-form-item>
      <a-form-item
        name="['departure', 'assembly']"
        label="*Assembly Venue"
        style="font-weight: bold; text-align: left; padding-left: 10%"
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
        style="font-weight: bold; text-align: left; padding-left: 10%"
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
        <a-form-item
          label="*Return Date & Time"
          style="font-weight: bold; text-align: left; padding-left: 10%"
        >
          <span v-if="v$.returnFromDate.$error">
            <exclamation-circle-outlined v-if="v$.returnFromDate.$error" />
             Please Input Valid Date & Time
          </span>
          <div style="margin-left: 0%">
            <q-input filled v-model="returnFromDate" style="max-width: 400px">
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
        </a-form-item>
        <a-form-item
          name="['returnFrom', 'assembly']"
          label="*Assembly Venue"
          style="font-weight: bold; text-align: left; padding-left: 10%"
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
          style="font-weight: bold; text-align: left; padding-left: 10%"
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
  </div>
  <br />
  <div style="text-align: right">
    <a-button
      @click="toggleConfirmModal"
      html-type="submit"
      type="text"
      style="
        font-size: 16px;
        text-transform: uppercase;
        font-weight: bold;
        color: black;
      "
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
        <span class="q-ml-sm">Are you sure you want to edit this booking?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="black" @click="toggleConfirmModal" />
        <q-btn
          flat
          label="Confirm"
          color="green"
          @click="updateBooking(selectedId)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!--End of popup modal to confim edit-->
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  requiredIf,
  numeric,
  minLength,
  maxLength,
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
      uniqueId: this.selectedId,
      uniqueUser: this.selectedUser,
      staffName: this.selectedStaffName,
      staffNumber: this.selectedStaffNumber,
      staffCCA: this.selectedStaffCCA,
      bookingActivity: this.selectedBookingActivity,
      bookingOptions: this.selectedBookingOptions,
      bookingNumOf19: this.selectedBookingNumOf19,
      bookingNumOf20: this.selectedBookingNumOf20,
      bookingNumOf40: this.selectedBookingNumOf40,
      bookingNumOf45: this.selectedBookingNumOf45,
      departureDate: moment(this.selectedDepartureDate.toDate()).format(
        "YYYY-MM-DD HH:mm"
      ),
      departureAssembly: this.selectedDepartureAssembly,
      departureDest: this.selectedDepartureDest,
      returnFromDate:
        this.selectedBookingOptions === 1
          ? null
          : moment(this.selectedReturnFromDate.toDate()).format(
              "YYYY-MM-DD HH:mm"
            ),
      returnFromAssembly:
        this.selectedBookingOptions === 1
          ? null
          : this.selectedReturnFromAssembly,
      returnFromDest:
        this.selectedBookingOptions === 1 ? null : this.selectedReturnFromDest,
    };
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

  props: {
    selectedId: String,
    selectedUser: String,
    selectedStaffName: String,
    selectedStaffNumber: String,
    selectedStaffCCA: String,
    selectedBookingActivity: String,
    selectedBookingOptions: Number,
    selectedBookingNumOf19: Number,
    selectedBookingNumOf20: Number,
    selectedBookingNumOf40: Number,
    selectedBookingNumOf45: Number,
    selectedDepartureDate: Timestamp,
    selectedDepartureAssembly: String,
    selectedDepartureDest: String,
    selectedReturnFromDate: Timestamp,
    selectedReturnFromAssembly: String,
    selectedReturnFromDest: String,
  },

  methods: {
    async updateBooking(uniqueId) {
      this.v$.$validate();
      if (!this.v$.$error) {
        const docRef = doc(db, "bookings", uniqueId);
        const docData = {
          id: this.uniqueUser,
          user: this.uniqueUser,
          staffName: this.staffName,
          staffNumber: this.staffNumber,
          staffCCA: this.staffCCA,
          bookingActivity: this.bookingActivity,
          bookingOptions: this.bookingOptions,
          bookingNumOf19: Number(this.bookingNumOf19),
          bookingNumOf20: Number(this.bookingNumOf20),
          bookingNumOf40: Number(this.bookingNumOf40),
          bookingNumOf45: Number(this.bookingNumOf45),
          departureDate: new Date(this.departureDate),
          departureTime: new Date(this.departureDate)
            .toTimeString()
            .slice(0, 5),
          departureAssembly: this.departureAssembly,
          departureDest: this.departureDest,
          returnFromDate:
            this.bookingOptions === 1 ? null : new Date(this.returnFromDate),
          returnFromTime:
            this.bookingOptions === 1
              ? null
              : new Date(this.returnFromDate).toTimeString().slice(0, 5),
          returnFromAssembly:
            this.bookingOptions === 1 ? null : this.returnFromAssembly,
          returnFromDest:
            this.bookingOptions === 1 ? null : this.returnFromDest,
        };
        setDoc(docRef, docData);
        this.$router.push("/");
        alert("Booking has been successfully updated!");
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
  margin-left: 70px;
  text-align: center;
}
.departure-label {
  text-align: center;
  margin-left: 125px;
  margin-top: 30px;
}
.return-label {
  text-align: center;
  margin-left: 150px;
  margin-top: 30px;
}
</style>
