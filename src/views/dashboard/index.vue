<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="orderSales"/>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart-nums :chart-data="orderNums"/>
    </el-row>

    <el-row :gutter="32">
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col> -->
     <!-- <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>-->
    </el-row>

  </div>
</template>

<script>
  import GithubCorner from '@/components/GithubCorner'
  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/LineChart'
  import LineChartNums from './components/LineChartNums'
  import RaddarChart from './components/RaddarChart'
  import PieChart from './components/PieChart'
  import BarChart from './components/BarChart'
  import TransactionTable from './components/TransactionTable'
  import TodoList from './components/TodoList'
  import BoxCard from './components/BoxCard'
  import {getLineData} from '@/api/index'


  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    }
  }

  const orderSales = {
    newVisitis: {

      actualData: [120, 82, 91, 154, 162, 140, 145]
    }
  }

  const orderNums = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165]
    }
  }

  export default {
    name: 'DashboardAdmin',
    components: {
      GithubCorner,
      PanelGroup,
      LineChart,
      LineChartNums,
      RaddarChart,
      PieChart,
      BarChart,
      TransactionTable,
      TodoList,
      BoxCard
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis,
        orderSales: orderSales.newVisitis,
        orderNums: orderSales.newVisitis
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      }
    },
    created() {

      getLineData().then(
        response => {
          console.log("head获取网站配置", response);
          if (response.code == "success") {
            this.orderSales = response.data
            this.orderNums = response.data

          }
        }
      )


    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
