const puppeteer = require('puppeteer')
const express = require('express')
const moment = require('moment')
const cors = require('cors')
const app = express()
const port = 3000

let goldChartPrices
let lastRequest

app.use(cors())

app.get('/prices', async (req, res) => {
  if (
    goldChartPrices &&
    moment.duration(moment().diff(lastRequest)).asMinutes() < 10
  ) {
    console.log('cached')
    res.send(goldChartPrices)
    return
  }
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://www.apmex.com/spotprices/gold-price')
  const chartData = await page.evaluate(() => {
    $('.highcharts-button:nth(4)').click()
    let dataObject = window.Highcharts.charts[0].series[0].data
    let chartData = Object.keys(dataObject).map(key => {
      let point = dataObject[key]
      return { x: point.x.toFixed(2), y: point.y.toFixed(2) }
    })
    return chartData
  })
  await browser.close()
  goldChartPrices = chartData
  lastRequest = moment()
  console.log('new request')
  res.send(goldChartPrices)
})

app.listen(port, () => console.log(`Gold listening on port ${port}!`))
