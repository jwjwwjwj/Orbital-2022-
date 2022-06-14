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
  </main>
</template>

<script>
import RoadTax from "../components/RoadTax.vue";

export default {
  components: {
    RoadTax,
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
</style>
