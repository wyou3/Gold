<template>
  <div id="price">
    <h1 class="priceText">${{ this.price }}</h1>
    <p :class="{ green: this.positiveChange(), red: !this.positiveChange() }">
      {{ this.percentChangeText() }}
    </p>
    <p></p>
  </div>
</template>

<script>
export default {
  name: 'PriceTicker',
  props: ['price', 'startPrice'],
  methods: {
    percentChangeText() {
      let percentChange = this.percentChange()
      let positive = this.positiveChange()
      let prefix = positive ? '+' : ''
      return prefix + percentChange + '%'
    },
    positiveChange() {
      return this.percentChange() >= 0
    },
    percentChange() {
      if (!(this.price && this.startPrice)) return 0 // placeholder
      return (((this.price - this.startPrice) / this.startPrice) * 100).toFixed(
        2
      )
    }
  }
}
</script>

<style scoped>
#price {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}
.priceText {
  font-size: 60px;
}
.green {
  color: green;
}
.red {
  color: red;
}
</style>
