  <template>
  <main class="read-fleet">
    <h1><strong>Fleet Overview</strong></h1>
    <!--Browser View-->
    <div v-show="!mobile" class="flex-container">
      <div class="flex-child fleet-size">
        <!--span>This is for road-tax</span-->
        <Fleetsize />
      </div>
      <div class="flex-child road-tax">
        <RoadTax />
      </div>
      <div class="flex-child vehicle-maintenance">
        <VehicleMaintenance />
      </div>
    </div>
    <div v-show="!mobile" class="vehicle-details-container">
      <span class="vehicle-details-title">
        <p><strong>Current Fleet</strong></p>
      </span>
      <span>
        <VehicleDetails />
      </span>
    </div>
    <!--Mobile View-->
    <div v-show="mobile" class="container">
      <div class="fleet-size">
        <!--span>This is for road-tax</span-->
        <Fleetsize />
      </div>
      <div class="road-tax">
        <RoadTax />
      </div>
      <div class="vehicle-maintenance">
        <VehicleMaintenance />
      </div>
    </div>
    <div v-show="mobile" class="vehicle-details-container">
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
import Fleetsize from "../components/FleetSize.vue";
import RoadTax from "../components/RoadTax.vue";
import VehicleDetails from "../components/VehicleDetails.vue";
import VehicleMaintenance from "../components/VehicleMaintenance.vue";

export default {
  data() {
    return {
      mobile: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreenSize);
    this.checkScreenSize();
  },
  components: {
    Fleetsize,
    RoadTax,
    VehicleDetails,
    VehicleMaintenance,
  },
  methods: {
    checkScreenSize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 1000) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      return;
    },
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

.fleet-size,
.road-tax,
.vehicle-maintenance {
  border: 2px solid grey;
  margin: 10px;
}
</style>
