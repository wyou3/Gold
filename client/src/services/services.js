import Api from './Api.js'

export default {
  getPrices() {
    return Api().get('prices')
  }
}
