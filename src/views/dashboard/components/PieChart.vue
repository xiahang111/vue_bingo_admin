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
      default: '350px'
    },
    pieData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    pieData: {
      deep: true,
      handler() {

        this.initChart()
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

      this.chart.setOption({
        backgroundColor: 'rgb(249,249,249)',
        tooltip: {
          trigger: 'item',
        },
        title: {
          text: '订单种类分布情况',
          left: 'center',
          top: 0,
          textStyle: {
            color: '#222222',
            fontSize: 18
          }
        },

        series: [
          {
            name: '订单种类',
            type: 'pie',
            roseType: '70%',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'radius',
            data: this.pieData.data
          }
        ]
      })
    }
  }
}
</script>
