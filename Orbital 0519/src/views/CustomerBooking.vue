<template>
  <main class="customer-booking">
    <h1><strong>All Bookings</strong></h1>
    <ViewBooking />
  </main>
</template>

<script>
import ViewBooking from "../components/ViewBooking.vue";

export default {
  components: {
    ViewBooking,
  },
};
</script>
