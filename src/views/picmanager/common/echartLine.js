import echart from 'echarts';

function options(xAxis, yAxis, name) {
  return {
    backgroundColor: '#191E40',
    title: {
      text: name + '趋势图',
      x: 'center',
      y: 0,
      textStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'normal',
      },

    },
    tooltip: {
      trigger: "axis"
    },
    grid: {
      top: "10%",
      bottom: "18%",
      left: "8%",
      right: "8%"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        color: "#cfcfdc"
        // fontSize: 10
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#253a4e"
        }
      },
      axisLine: {
        symbolSize: [6, 6],
        symbolOffset: [0, 10],
        lineStyle: {
          color: "rgb(18,44,73)"
        }
      },
      axisTick: {
        color: "rgb(18,44,73)",
        inside: true
      },
      z: 2,
      data: xAxis
    },
    yAxis: {
      type: "value",
      axisLine: {
        symbolSize: [6, 6],
        lineStyle: {
          color: "rgb(18,44,73)"
        }
      },
      axisLabel: {
        color: "#cfcfdc",
        showMaxLabel: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#253a4e"
        }
      }
    },

    series: [{
      name: name,
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 10,
      data: yAxis,
      lineStyle: {
        width: 1,
        color: new echart.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "rgba(160,57,236,1)"
        },
        {
          offset: 0.4,
          color: "rgba(160,57,236,1)"
        },
        {
          offset: 1,
          color: "rgba(160,57,236,1)"
        }
        ])
      },
      label: {
        show: false,
        position: "top",
        textStyle: {
          color: "rgba(160,57,236,1)"
        }
      },
      itemStyle: {
        color: "#6c50f3",
        borderColor: "#7dadfd",
        borderWidth: 3,
        shadowColor: "rgba(0, 0, 0, .3)",
        shadowBlur: 0,
        shadowOffsetY: 2,
        shadowOffsetX: 2
      },
      areaStyle: {
        color: new echart.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "rgba(162,31,253,1)"
        },
        {
          offset: 0.5,
          color: "rgba(99,75,138,1)"
        },
        {
          offset: 1,
          color: "rgba(99,75,138,0)"
        }
        ]),
        origin: "start"
      }
    }]
  }
}

export { options }