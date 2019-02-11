<template>
  <div class="timeline">
    <h3
      :key="window.name"
      v-for="window in timeWindows"
      @click="toggleSelectedWindow(window)"
      :class="{ timelineSelector: true, timeSelected: window.selected }"
    >{{ window.name }}</h3>
    <h3
      :class="{ gridSelector: true, gridSelected: grid.selected }"
      @click="toggleChartGrid()"
    >{{ grid.name }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeWindows: [
        { name: '1M', percentYear: 1 / 12, selected: true },
        { name: '3M', percentYear: 1 / 4, selected: false },
        { name: '6M', percentYear: 1 / 2, selected: false },
        { name: '1Y', percentYear: 1, selected: false }
      ],
      grid: { name: '#', selected: false }
    }
  },
  methods: {
    toggleSelectedWindow(selectedWindow) {
      let prevSelectedWindow = this.timeWindows.find(window => window.selected)
      let newSelectedWindow = this.timeWindows.find(
        window => window.name === selectedWindow.name
      )
      prevSelectedWindow.selected = false
      newSelectedWindow.selected = true
      this.$emit('setChartWindow', selectedWindow.percentYear)
    },
    toggleChartGrid() {
      this.grid.selected = !this.grid.selected
      this.$emit('toggleChartGrid')
    }
  }
}
</script>

<style scoped>
.timeline {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}
.gridSelector,
.timelineSelector {
  height: 30px;
  width: 30px;
  margin: 5px;
  padding: 5px;
  border: 2px solid transparent;
  line-height: 30px;
  text-align: center;
}
.gridSelector {
  font-family: 'Courier New', Courier, monospace;
}
.timelineSelector:hover,
.gridSelector:hover {
  font-size: 21px;
  color: #c5b358;
  cursor: pointer;
}
.timeSelected,
.gridSelected {
  font-size: 21px;
  border: 2px solid #c5b358;
  color: #c5b358;
  border-radius: 50%;
}
</style>