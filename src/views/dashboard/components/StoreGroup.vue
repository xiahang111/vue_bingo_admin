<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="clipboard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总库存重量
          </div>
          <count-to :start-val="0" :end-val=storeDatas.storeTotalWeight :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="documentation" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总库存数量
          </div>
          <count-to :start-val="0" :end-val=storeDatas.storeTotalNum :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <!--  @click="handleSetLineChartData('purchases')" -->
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总库存价值
          </div>
          <count-to :start-val="0" :end-val=storeDatas.storeTotalPrice :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总库存种类
          </div>
          <count-to :start-val="0" :end-val=storeDatas.storeTotalType :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import CountTo from 'vue-count-to'
import { indexOrderAndSaleCount } from '../../../api/index'
import { getLineData,getStoreTotalData } from '@/api/index'


export default {
  data () {
    return {
      info:{},
      storeDatas:{
        storeTotalWeight:1,
        storeTotalNum:0,
        storeTotalPrice:0,
        storeTotalType:0
      },
      type:''
    }
  },
  props:['type'],

  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  },
  created() {
    getStoreTotalData().then(
      response => {
        if (this.type == 'summary'){
          let dataList = response.data;
          if(dataList[0].storeType == "summary"){
            this.storeDatas.storeTotalWeight = dataList[0].storeTotalWeight;
            this.storeDatas.storeTotalNum = dataList[0].storeTotalNum;
            this.storeDatas.storeTotalPrice = dataList[0].storeTotalPrice;
            this.storeDatas.storeTotalType = dataList[0].storeTotalType;
          }else {
            this.storeDatas.storeTotalWeight = dataList[1].storeTotalWeight;
            this.storeDatas.storeTotalNum = dataList[1].storeTotalNum;
            this.storeDatas.storeTotalPrice = dataList[1].storeTotalPrice;
            this.storeDatas.storeTotalType = dataList[1].storeTotalType;
          }
        }else {
          let dataList = response.data;
          if(dataList[0].storeType == "origin"){
            this.storeDatas.storeTotalWeight = dataList[0].storeTotalWeight;
            this.storeDatas.storeTotalNum = dataList[0].storeTotalNum;
            this.storeDatas.storeTotalPrice = dataList[0].storeTotalPrice;
            this.storeDatas.storeTotalType = dataList[0].storeTotalType;
          }else {
            this.storeDatas.storeTotalWeight = dataList[1].storeTotalWeight;
            this.storeDatas.storeTotalNum = dataList[1].storeTotalNum;
            this.storeDatas.storeTotalPrice = dataList[1].storeTotalPrice;
            this.storeDatas.storeTotalType = dataList[1].storeTotalType;
          }
        }
      }
    )

  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
