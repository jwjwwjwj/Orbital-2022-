<template>
  <main class="customer-booking">
    <h1><strong>All Bookings</strong></h1>
    <div class="upcoming-bookings-details-container">
      <span class="upcoming-bookings-details-title">
        <p><strong>Upcoming Bookings</strong></p>
      </span>
      <span>
        <CustomerHistory />
      </span>
    </div>
    <div class="past-bookings-details-container">
      <span class="past-bookings-details-title">
        <p><strong>Past Bookings</strong></p>
      </span>
      <span>
        <CustomerCompletedBooking />
      </span>
    </div>
  </main>
</template>

<script>
import CustomerHistory from "../components/CustomerHistory.vue";
import CustomerCompletedBooking from "../components/CustomerCompletedBooking.vue";

export default {
  components: {
    CustomerHistory,
    CustomerCompletedBooking,
  },
};
</script>

<style scoped>
.upcoming-bookings-details-container,
.past-bookings-details-container {
  border: 2px solid grey;
  margin: 10px;
  padding: 10px 0px 30px 0px;
}

.upcoming-bookings-details-title,
.past-bookings-details-title {
  margin: 10px 0px 0px 0px;
  padding: 50px 0px 0px 0px;
  font-size: 20px;
  text-decoration: underline;
  text-underline-position: under;
}
</style>
