export default {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltip: {
    enabled: true
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        var label = data.datasets[tooltipItem.datasetIndex].label || ''
        if (label) {
          label += ': '
        }
        label += tooltipItem.yLabel.toFixed(2)
        label = '$' + label
        return label
      }
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }
    ]
  }
}
