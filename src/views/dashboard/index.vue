<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="orderSales"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart-nums :chart-data="orderNums"/>
        </div>
      </el-col>

    </el-row>

    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart-nums :chart-data="orderNums"/>
    </el-row> -->
    <el-divider content-position="left" >
      <span style="font-size: large">成品料信息</span>
    </el-divider>
    <store-group :type="summaryType"/>
    <el-divider content-position="left">
      <span style="font-size: large"> 坯料信息</span>
    </el-divider>
    <store-group :storeDatas="originType"/>

    <el-row :gutter="32">

      <el-row :gutter="8">
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
          <transaction-table />
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
          <todo-list />
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
          <box-card />
        </el-col>
      </el-row>
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
  import StoreGroup from './components/StoreGroup'
  import LineChart from './components/LineChart'
  import LineChartNums from './components/LineChartNums'
  import RaddarChart from './components/RaddarChart'
  import PieChart from './components/PieChart'
  import BarChart from './components/BarChart'
  import TransactionTable from './components/TransactionTable'
  import TodoList from './components/TodoList'
  import BoxCard from './components/BoxCard'
  import { getLineData,getStoreTotalData } from '@/api/index'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    }
  }

  const storeData = {
    summary:{
      storeTotalWeight:0,
      storeTotalNum:0,
      storeTotalPrice:0,
      storeTotalType:0
    },
    origin:{
      storeTotalWeight:0,
      storeTotalNum:0,
      storeTotalPrice:0,
      storeTotalType:0
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
      StoreGroup,
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
        orderNums: orderSales.newVisitis,
        summaryType:'summary',
        originType:'origin'
      }
    },

    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },
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
