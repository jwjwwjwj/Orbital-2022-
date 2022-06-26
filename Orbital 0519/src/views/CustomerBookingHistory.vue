<template>
  <main class="customer-booking">
    <h1><strong>All Bookings</strong></h1>
    <CustomerHistory />
  </main>
</template>

<script>
import CustomerHistory from "../components/CustomerHistory.vue";

export default {
  components: {
    CustomerHistory,
  },
};
</script>
