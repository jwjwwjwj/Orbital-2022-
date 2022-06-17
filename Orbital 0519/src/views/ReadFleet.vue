<template>
  <main class="read-fleet">
    <h1><strong>Fleet Overview</strong></h1>
    <div class="flex-container">
      <div class="flex-child road-tax">
        <!--span>This is for road-tax</span-->
        <RoadTax />
      </div>
      <div class="flex-child vehicle-maintenance">
        <span>This is for vehicle maintenance</span>
      </div>
    </div>
    <div class="vehicle-details-container">
      <span class="vehicle-details-title">
        <p><strong>Current Fleet</strong></p>
      </span>
      <span>
        <VehicleDetails />
      </span>
    </div>
  </main>
</template>

<script>
import RoadTax from "../components/RoadTax.vue";
import VehicleDetails from "../components/VehicleDetails.vue";

export default {
  components: {
    RoadTax,
    VehicleDetails,
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
}

.flex-child {
  flex: 2;
  border: 2px solid grey;
  margin: 10px;
}

.flex-child:first-child {
  margin-right: 20px;
}

.vehicle-details-container {
  border: 2px solid grey;
  margin: 10px;
  padding: 10px 0px 30px 0px;
}

.vehicle-details-title {
  margin: 10px 0px 0px 0px;
  padding: 50px 0px 0px 0px;
  font-size: 20px;
  text-decoration: underline;
}
</style>
