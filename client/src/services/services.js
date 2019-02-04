import Api from './Api.js'

export default {
  getPrices() {
    return Api().get('prices')
  }
}

// export async function getMonthPrices() {
//   let prices = await getPrices()
//   return prices.slice(Math.floor((prices.length * 11) / 12))
// }
// export async function getThreeMonthPrices() {
//   let prices = await getPrices()
//   return prices.slice(Math.floor((prices.length * 3) / 4))
// }
// export async function getSixMonthPrices() {
//   let prices = await getPrices()
//   return prices.slice(Math.floor(prices.length / 2))
// }
// export async function getYearPrices() {
//   let prices = await getPrices()
//   return prices
// }
