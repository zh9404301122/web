<template>
  <div>
    <div
      :id="echartObj.echartId"
      :style="{width:echartObj.width,height:echartObj.height}"
      ref="echarts"
    ></div>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: "echart",
  props: {
    echartObj: { type: Object, required: true }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.drawEchart(this.echartObj);
    this.selfAdaption();
  },
  methods: {
    drawEchart(curObj) {
      var me = this;
      me.chart = me.$echarts.init(document.getElementById(curObj.echartId));
      me.chart.setOption({
        title: {
          text: curObj.title,
          subtext: curObj.subTitle || "",
          // padding:[5,10,10,100],
          // itemGap:30,
          left: 80
        },
        dataZoom: curObj.dataZoom,
        tooltip: {
          show: true,
          trigger: "axis",
          textStyle: {
            align: "left"
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: curObj.tooltipType ? curObj.tooltipType : "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          // top:20
          show: false
        },
        legend: {
          // type:'scroll',
          icon: "rect",
          data: curObj.legendData
        },
        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          type: "category",
          data: curObj.xData
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          type: "value"
        },
        series: curObj.seriesData
      });
    },
    selfAdaption() {
      var _this = this;
      setTimeout(() => {
        window.addEventListener("resize", function() {
          _this.chart = _this.$echarts.init(
            document.getElementById(_this.echartObj.echartId)
          );
          _this.chart.resize();
        });
      }, 10);
    }
  },
  watch: {
    echartObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.drawEchart(newValue);
        } else {
          this.drawEchart(oldValue);
        }
      },
      deep: true
    }
  }
};
</script>
