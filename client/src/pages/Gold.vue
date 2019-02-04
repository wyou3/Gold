<template>
  <div id="gold">
    <price-ticker :price="price" :start-price="startPrice"></price-ticker>
    <ball-spin-fade-loader v-if="loading" class="loading-spinner" color="#000000" size="20px"></ball-spin-fade-loader>
    <line-chart else :class="{hide: loading}" :chart-data="datacollection" :options="chartOptions"></line-chart>
    <div class="timeline">
      <h3
        :key="window.name"
        v-for="window in timeWindows"
        @click="setChartWindow(window)"
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
import { BallSpinFade } from "vue-loaders";

export default {
  name: "GoldChart",
  components: {
    PriceTicker,
    LineChart
  },
  data() {
    return {
      loading: true,
      price: 0,
      startPrice: 0,
      dataPoints: [],
      datacollection: null,
      chartOptions: ChartOptions,
      timeWindows: [
        { name: "1M", percentYear: 1 / 12, selected: true },
        { name: "3M", percentYear: 1 / 4, selected: false },
        { name: "6M", percentYear: 1 / 2, selected: false },
        { name: "1Y", percentYear: 1, selected: false }
      ]
    };
  },
  mounted() {
    Services.getPrices().then(res => {
      this.dataPoints = res.data;
      this.setChartWindow(this.timeWindows[0]); // default to 1 month
      this.loading = false;
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
    toggleSelectedWindow(selectedWindow) {
      let prevSelectedWindow = this.timeWindows.find(window => window.selected);
      let newSelectedWindow = this.timeWindows.find(
        window => window.name === selectedWindow.name
      );
      prevSelectedWindow.selected = false;
      newSelectedWindow.selected = true;
    },
    setChartWindow(window) {
      let numPoints = this.dataPoints.length;
      let startIndex = Math.floor(numPoints * (1 - window.percentYear));
      let chartPoints = this.dataPoints.slice(startIndex);
      let labels = chartPoints.map(point =>
        moment.unix(point.x / 1000).format("MM/DD/YYYY")
      );
      this.fillChartData(labels, chartPoints);
      this.startPrice = chartPoints[0].y;
      this.price = chartPoints[chartPoints.length - 1].y;
      this.toggleSelectedWindow(window);
    }
  }
};
</script>

<style scoped>
#gold {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}
.hide {
  display: none;
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
.loading-spinner {
  display: flex;
  margin: 0 auto;
}
</style>
