<template>
<div>
<h1> Create Booking Form</h1>
<a-space direction="inline" :size="12">
<strong> Name of Staff: </strong>
  <a-input v-model:value="staffName" placeholder="Input Full Name of Staff" />
  <strong> Mobile Number:</strong>
  <a-input v-model:value="staffNumber" placeholder="Input Mobile Number" />
  <strong> CCA/Department:</strong>
  <a-input v-model:value="CCA" placeholder="Input CCA/Department" />
  </a-space>
</div>
<div>
<br>
<h1> Booking Details </h1>
</div>
<div>
  <a-space direction="inline" :size="12">
  <strong> Name Of Activity: </strong>
  <a-input v-model:value="activity" placeholder="Input Activity" />
      <a-radio-group v-model:value="options">
      <a-radio :value="1">1 - Way</a-radio>
      <a-radio :value="2">2 - Way</a-radio>
    </a-radio-group>
  </a-space>
</div>
<div>
  <br>
  <a-space>
    <strong> Number of Buses: </strong>
    45 Seater
    <a-input-number v-model:value="numOf45" size="large" :min="0" :max="99" />
    40 Seater
    <a-input-number v-model:value="numOf40" size="large" :min="0" :max="99" />
    20 Seater
    <a-input-number v-model:value="numOf20" size="large" :min="0" :max="99" />
    19 & Below
    <a-input-number v-model:value="numOf19" size="large" :min="0" :max="99" />
  </a-space>
</div>
<div>
  <br>
  <h2> Departure Details </h2>
  <strong> Departure Details (Date): </strong>
  <a-space direction="inline" :size="12">
    <a-date-picker v-model:value="departureDate" :disabled-date="disabledDate"/>
    <strong> Departure Time: </strong>
    <a-time-picker v-model:value="departureTime" format="HH:mm"/>
    <strong> Assembly Place: </strong>
  <a-input v-model:value="assemblyPlace" placeholder="Input Assembly Place" />
      <strong> Destination: </strong>
  <a-input v-model:value="assemblyDes" placeholder="Input Destination" />
  </a-space>
</div>
<div v-if="options === 2">
  <br>
  <h2> Return Details </h2>
  <strong> Return Details (Date): </strong>
  <a-space direction="inline" :size="12">
    <a-date-picker v-model:value="returnDate" :disabled-date="disabledDate"/>
        <strong> Return Time: </strong>
    <a-time-picker v-model:value="returnTime" format="HH:mm"/>
    <strong> Assembly Place: </strong>
      <a-input v-model:value="returnPlace" placeholder="Input Assembly Place" />
      <strong> Destination: </strong>
  <a-input v-model:value="returnDes" placeholder="Input Destination" />
  </a-space>
</div>
<div>
  <br>
    <a-form-item v-bind="tailLayout">
      <a-button html-type="submit" type="primary">Submit</a-button>
    </a-form-item>
</div>
</template>

<script>
import moment from 'moment';
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const staffName = ref('');
    const staffNumber = ref('');
    const CCA = ref('');
    const numOf45 = ref('0');
    const numOf40 = ref('0');
    const numOf20 = ref('0');
    const numOf19 = ref('0');
    const activity = ref('');
    const plainOptions = ['1 - Way', '2 - Way'];
    const options = ref(1);
    const departureDate = ref(dayjs().add(3, 'day'));
    const disabledDate = current => {
    return current && current < moment().endOf('day').add(2, 'days');
    };
    const departureTime = ref(dayjs(dayjs().add(3, 'day'), 'HH:mm'));
    const returnDate = ref(dayjs().add(3, 'days'));
    const returnTime = ref(dayjs(dayjs().add(3, 'day').add(2, "hour"), 'HH:mm'));
    const assemblyPlace = ref('');
    const assemblyDes = ref('');
    const returnPlace = ref('');
    const returnDes = ref('');
    return {
      dayjs,
      staffName,
      staffNumber,
      CCA,
      numOf45,
      numOf40,
      numOf20,
      numOf19,
      activity,
      plainOptions,
      options,
      departureDate,
      disabledDate,
      departureTime,
      returnDate,
      returnTime,
      assemblyPlace,
      assemblyDes,
      returnPlace,
      returnDes,
    };
  },

});
</script>