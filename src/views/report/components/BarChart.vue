<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '750px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      orderData: {
        orderMakers:["1"],
        orderNums:[1]
      }
    }
  },
  computed: {
    initData: function () {
        return this.orderData=JSON.parse(JSON.stringify(this.chartData))
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.orderData=this.chartData

        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      console.log("orderData"+this.orderData.orderMakers)
      this.setOptions(this.orderData)
    },
    setOptions({ actualData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [ '入库', '出库']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: this.chartData.xAxis
          }
        ],
        series: [

          {
            name: '出库',
            type: 'bar',
            stack: '总量',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData.rightAxis
          },
          {
            name: '入库',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'left'
            },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData.leftAxis
          }
        ]
      })
    }
  }
}
</script>
