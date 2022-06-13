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
  <a-radio-group v-model:value="optionValue" :options="plainOptions" />
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
    <a-date-picker v-model:value="departureDate" />
    <strong> Departure Time: </strong>
    <a-time-picker v-model:value="departureTime" format="HH:mm"/>
    <strong> Assembly Place: </strong>
  <a-input v-model:value="assemblyPlace" placeholder="Input Assembly Place" />
      <strong> Destination: </strong>
  <a-input v-model:value="assemblyDes" placeholder="Input Destination" />
  </a-space>
</div>
<div>
  <br>
  <h2> Return Details </h2>
  <strong> Return Details (Date): </strong>
  <a-space direction="inline" :size="12">
    <a-date-picker v-model:value="returnDate" />
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
    const options = [{
  label: '1 - Way',
  value: '1 - Way',
}, {
  label: '2 - Way',
  value: '2 - Way',
}];
const optionValue = ref('Apple');
    const departureDate = ref();
    const departureTime = ref(dayjs('11:00', 'HH:mm'));
    const returnDate = ref();
    const returnTime = ref(dayjs('13:00', 'HH:mm'));
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
      optionValue,
      departureDate,
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