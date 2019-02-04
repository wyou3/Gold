<template>
  <div id="gold">
    <price-ticker :price="price" :start-price="startPrice"></price-ticker>
    <line-chart :chart-data="datacollection" :options="chartOptions"></line-chart>
    <div class="timeline">
      <h3
        :key="window.name"
        v-for="window in timeWindows"
        @click="setChartWindow(window.percentYear)"
        :class="{timelineSelector: true, timeSelected: window.selected}"
      >{{window.name}}</h3>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Services from "../services/services.js";
import PriceTicker from "../components/PriceTicker.vue";
import LineChart from "../components/LineChart.js";
import ChartOptions from "../styles/chartOptions.js";

export default {
  name: "GoldChart",
  components: {
    PriceTicker,
    LineChart
  },
  data() {
    return {
      price: 0,
      startPrice: 0,
      dataPoints: [],
      datacollection: null,
      chartOptions: ChartOptions,
      timeWindows: [
        { name: "1M", percentYear: 1 / 12, selected: false },
        { name: "3M", percentYear: 1 / 4, selected: false },
        { name: "6M", percentYear: 1 / 2, selected: false },
        { name: "1Y", percentYear: 1, selected: true }
      ]
    };
  },
  mounted() {
    Services.getPrices().then(res => {
      this.dataPoints = res.data;
      this.startPrice = res.data[0].y;
      this.price = res.data[res.data.length - 1].y;
      let labels = this.dataPoints.map(point =>
        moment.unix(point.x / 1000).format("MM/DD/YYYY")
      );
      this.fillChartData(labels, this.dataPoints);
    });
  },
  methods: {
    fillChartData(labels, dataPoints) {
      this.datacollection = {
        labels: labels,
        datasets: [
          {
            fill: false,
            borderColor: "#C5B358",
            data: dataPoints
          }
        ]
      };
    },
    setChartWindow(percentYear) {
      let numPoints = this.dataPoints.length;
      let startIndex = Math.floor(numPoints * (1 - percentYear));
      let chartPoints = this.dataPoints.slice(startIndex);

      let labels = chartPoints.map(point =>
        moment.unix(point.x / 1000).format("MM/DD/YYYY")
      );
      this.fillChartData(labels, chartPoints);
      this.startPrice = chartPoints[0].y;
      this.price = chartPoints[chartPoints.length - 1].y;
    }
  }
};
</script>

<style scoped>
#gold {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
}
#line-chart {
  width: 100% !important;
}
.timeline {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}
.timelineSelector {
  height: 30px;
  width: 30px;
  margin: 5px;
  padding: 5px;
  border: 2px solid transparent;
  line-height: 30px;
  text-align: center;
}
.timelineSelector:hover,
.timeSelected {
  border: 2px solid #c5b358;
  color: #c5b358;
  border-radius: 50%;
}
</style>