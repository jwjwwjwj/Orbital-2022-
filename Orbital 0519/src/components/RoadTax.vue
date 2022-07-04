<template>
  <div id="roadtax">
    <div class="title">
      <span class="roadTax-placeholder"
        >Total Amount of Road Tax Due For
        <strong>{{ moment().format("MMM YYYY") }}</strong>
      </span>
    </div>
    <div class="value">
      <span class="roadTax">
        {{ roadTaxAmount }}
      </span>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/index.js";
import { getDocs, collection, query, where } from "firebase/firestore";
import moment from "moment";
import dayjs from "dayjs";

export default {
  name: "RoadTax",

  data() {
    return {
      vehicles: [],
      roadTaxAmount: null,
      selectedDoc: null,
    };
  },

  methods: {
    async totalRoadTaxThisMonth() {
      const q = query(
        collection(db, "vehicles"),
        where("roadTaxDueDate", "<=", dayjs().endOf("month").$d),
        where("roadTaxDueDate", ">=", dayjs().startOf("month").$d)
      );
      const querySnap = await getDocs(q);
      const amount = [];
      querySnap.forEach((vehicle) => {
        const roadTaxData = vehicle.data().roadTaxAmount;
        amount.push(roadTaxData);
      });
      const totalAmount = amount.reduce((x, y) => x + y, 0);
      const currency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      this.roadTaxAmount = currency.format(totalAmount);
    },

    moment: (date) => {
      return moment(date);
    },
  },

  computed: {},

  created() {
    this.totalRoadTaxThisMonth();
  },
};
</script>

<style scoped>
.roadTax-placeholder {
  font-size: 30px;
}
.roadTax {
  color: crimson;
  text-decoration: bold;
  font-size: 60px;
}
</style>
