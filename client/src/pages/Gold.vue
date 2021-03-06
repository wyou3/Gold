<template>
  <div id="gold">
    <price-ticker :price="price" :start-price="startPrice"/>
    <ball-spin-fade-loader v-if="loading" class="loading-spinner" color="#000000" size="20px"/>
    <line-chart
      else
      :class="{ hide: loading }"
      :chart-data="datacollection"
      :options="chartOptions"
    />
    <chart-options-selector
      v-on:setChartWindow="setChartByPercentYear"
      v-on:toggleChartGrid="toggleGrid"
    />
  </div>
</template>

<script>
import moment from 'moment'
import Services from '../services/services.js'
import PriceTicker from '../components/PriceTicker.vue'
import LineChart from '../components/LineChart.js'
import ChartOptionsSelector from '../components/ChartOptionsSelector.vue'
import ChartOptions from '../styles/chartOptions.js'
import ChartScalesOptions from '../styles/chartScalesOptions.js'

export default {
  name: 'GoldChart',
  components: {
    PriceTicker,
    LineChart,
    ChartOptionsSelector
  },
  data() {
    return {
      loading: true,
      price: 0,
      startPrice: 0,
      dataPoints: [],
      datacollection: null,
      chartOptions: { ...ChartOptions }
    }
  },
  mounted() {
    Services.getPrices().then(res => {
      this.dataPoints = res.data
      this.setChartByPercentYear(1 / 12) // default to 1 month
      this.loading = false
    })
  },
  methods: {
    fillChartData(labels, dataPoints) {
      this.datacollection = {
        labels: labels,
        datasets: [
          {
            fill: false,
            borderColor: '#C5B358',
            data: dataPoints
          }
        ]
      }
    },
    setChartByPercentYear(percentYear) {
      let numPoints = this.dataPoints.length
      let startIndex = Math.floor(numPoints * (1 - percentYear))
      let chartPoints = this.dataPoints.slice(startIndex)
      let labels = chartPoints.map(point =>
        moment.unix(point.x / 1000).format('MMM Do YYYY')
      )
      this.fillChartData(labels, chartPoints)
      this.startPrice = chartPoints[0].y
      this.price = chartPoints[chartPoints.length - 1].y
    },
    toggleGrid() {
      let scales = this.objectIsEmpty(this.chartOptions.scales)
        ? { ...ChartScalesOptions }
        : {}
      this.chartOptions = {
        ...this.chartOptions,
        scales: scales
      }
    },
    objectIsEmpty(obj) {
      return Object.entries(obj).length === 0 && obj.constructor === Object
    }
  }
}
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
.loading-spinner {
  display: flex;
  margin: 0 auto;
}
</style>
