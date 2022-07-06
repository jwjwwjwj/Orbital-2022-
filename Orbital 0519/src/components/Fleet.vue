<template>
  <div class="q-pa-md">
    <q-btn-dropdown color="rgba(0, 0, 0, 0.8)" label="Fleet" flat>
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <router-link class="sub" to="/fleet/read-fleet"
              >Overview</router-link
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <router-link class="sub" to="/fleet/add-fleet"
              >Add Fleet</router-link
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  name: "FleetPath",
};
</script>

<style scoped>
.sub {
  color: black;
}
</style>