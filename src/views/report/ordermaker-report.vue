<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">

        <el-col :xs="12" :sm="12" :lg="12">
          <div class="chart-wrapper">
            <line-chart :chart-data="orderData"/>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="12">
          <div class="chart-wrapper">
            <line-chart :chart-data="ordersaleData"/>
          </div>
        </el-col>

      </el-row>
      <el-row>
        <el-col span="4">
          <el-select v-model="listQuery.ordermaker" placeholder="制单人"
                     style="width: 80%">
            <el-option
              v-for="item in orderMakerList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col span="4">
          <el-select v-model="listQuery.salemen" placeholder="业务员"
                     style="width: 80%">
            <el-option
              v-for="item in salesMans"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col span="6">
          <el-date-picker
            v-model="listQuery.dateScope"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>

        <el-col span="3">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            {{ '查询' }}
          </el-button>
          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-delete"
                     @click="resetQuery">
            {{ '清空' }}
          </el-button>
          <!--<el-button v-waves class="filter-item" type="primary" align="right" @click="storeRecordDialog">
            {{ '新增入库' }}
          </el-button>-->
        </el-col>

        <!-- <el-col span="4">
          <el-select v-model="listQuery.orderBy" placeholder="排序名称"
                     style="width: 80%">
            <el-option
              v-for="item in orderByList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col> -->
      </el-row>


      <!-- <el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->

    </div>
    <el-divider content-position="left">

    </el-divider>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>


      <el-table-column align="center" sortable label="制单人" prop="orderMaker" width=" 230">

      </el-table-column>

      <el-table-column align="center" sortable label="业务员" prop="salesman" width=" 230">

      </el-table-column>

      <el-table-column align="center" sortable label="客户名称" prop="customerName" width=" 230">

      </el-table-column>

      <el-table-column align="center" sortable label="订单编号" prop="orderId" width=" 230">

      </el-table-column>

      <!-- 订单类型-->
      <el-table-column align="center" label="订单类型" prop="orderType">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == 'DOORORDER'">玻璃门</span>
          <span v-if="scope.row.orderType == 'CBDORDER'">层板灯</span>
        </template>
      </el-table-column>

      <!-- 产品类型-->
      <el-table-column align="center" label="产品类型" prop="productType">
        <template slot-scope="scope">
          <span v-if="scope.row.productType == 'NotComplete'">半成品</span>
          <span v-if="scope.row.productType == 'Complete'">成品</span>
        </template>
      </el-table-column>

      <el-table-column align="center" sortable label="订单价格" prop="totalPrice" width=" 200">

      </el-table-column>

      <el-table-column align="center" sortable label="下单时间" prop="createTime" width=" 260">

      </el-table-column>

      <!-- 产品名称
      <el-table-column align="center" label="产品名称" prop="联动一号">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderId }}</el-tag>
        </template>
      </el-table-column>-->

      <!-- 产品编号-->
      <el-table-column sortable align="materialColor" label="颜色" prop="materialColor"
                       v-if="this.listQuery.isPartColor == 'true'">
        <template slot-scope="scope">
          <span v-if="scope.row.materialColor == '1'">黄铜拉丝</span>
          <span v-if="scope.row.materialColor == '2'">古铜拉丝</span>
          <span v-if="scope.row.materialColor == '3'">哑黑</span>
          <span v-if="scope.row.materialColor == '4'">瓷沙黑</span>
          <span v-if="scope.row.materialColor == '5'">罗马灰</span>
          <span v-if="scope.row.materialColor == '6'">绅士灰</span>
          <span v-if="scope.row.materialColor == '7'">拉丝黑</span>
          <span v-if="scope.row.materialColor == '8'">拉丝灰</span>
          <span v-if="scope.row.materialColor == '9'">欧歌红</span>
          <span v-if="scope.row.materialColor == '10'">瓷泳黑</span>
          <span v-if="scope.row.materialColor == '11'">拉丝金</span>
          <span v-if="scope.row.materialColor == '12'">黑色</span>
          <span v-if="scope.row.materialColor == '13'">金色</span>
          <span v-if="scope.row.materialColor == '14'">深金色</span>
          <span v-if="scope.row.materialColor == '15'">古铜色</span>

        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="来源" prop="materialResource">

        <template slot-scope="scope">
          <span v-if="scope.row.materialResource == 'STORE_IN_CD'">康达料入库</span>
          <span v-if="scope.row.materialResource == 'STORE_IN_DM'">东美料入库</span>
          <span v-if="scope.row.materialResource == 'STORE_IN_FH'">风和料入库</span>
          <span v-if="scope.row.materialResource == 'STORE_IN_CQ'">超强料入库</span>
        </template>

      </el-table-column>-->
      <!-- <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column> -->

      <!-- 创建时间-->
      <!--<el-table-column align="center" label="入库时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>-->

      <!--<el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="comfirmDelete(scope.row)" type="text" size="small">撤回</el-button>

          &lt;!&ndash;<el-button type="text" size="small">编辑</el-button>&ndash;&gt;
        </template>
      </el-table-column>-->

    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>


  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import {getStoreRecord, saveStoreRecord, callbackStoreRecord, getStoreNameList} from '@/api/store.js'
  import {getSalemenStatement} from '@/api/product.js'
  import { ordermakerReport,ordermakersaleReport} from '@/api/report'
  import {getAllOrderMaker, getAllSaleMan} from '@/api/basedata'
  import LineChart from './components/LineChart'
  import {parseTime} from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  const calendarTypeOptions = [
    {key: 'CN', display_name: 'China'},
    {key: 'US', display_name: 'USA'},
    {key: 'JP', display_name: 'Japan'},
    {key: 'EU', display_name: 'Eurozone'}
  ]

  // arr to obj, such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'ComplexTable',
    components: {Pagination, LineChart},
    directives: {waves},
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    data() {
      return {
        addLoding: false,
        orderData: {
          orderMakers: [],
          orderNums: [],
          title: '制单数量'
        },
        ordersaleData: {
          orderMakers: [],
          orderNums: [],
          title: '订单总价值'
        },
        storeRecord: {
          uid: '',
          materialResource: '',
          materialName: '',
          materialNum: '',
          materialColor: '',
          specification: '',
          unit: '',
          price: '',
          materialStatus: '1'

        },
        tableKey: 0,
        list: [],
        statementData: {
          orderNum: 0,
          priceNum: 0,
          doorOrderNum: 0,
          doorPriceNum: 0,
          laminateOrderNum: 0,
          laminatePriceNum: 0
        },
        total: 0,
        listLoading: true,
        listQuery: {
          dateScope: [new Date() - 3600 * 1000 * 24 * 30, new Date()],
          salemen: '',
          ordermaker: ''
        },
        salesMans: [],
        orderMakerList: [],
        deleteRecordUid: '',
        isDeleteRecord: false,
        calendarTypeOptions,
        sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
        downloadLoading: false,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    created() {
      this.getList();
      this.setStoreNameList();
      ordermakerReport().then(
        response => {
          if (response.code == "success") {
            this.orderData.orderMakers = response.data.orderMakers
            this.orderData.orderNums = response.data.orderNums
          }
        }
      ),
        ordermakersaleReport().then(
          response => {
            if (response.code == "success") {
              this.ordersaleData.orderMakers = response.data.orderMakers
              this.ordersaleData.orderNums = response.data.orderNums
            }
          }
        ),
        getAllOrderMaker().then(
          response => {
            if (response.code == "success") {
              this.orderMakerList = response.data;
            }
          }
        )
      getAllSaleMan().then(
        response => {
          if (response.code == "success") {
            this.salesMans = response.data;
          }
        }
      )
    },
    methods: {
      getList() {
        this.listLoading = true

        var params = {};
        params.salemen = this.listQuery.salemen;
        params.ordermaker = this.listQuery.ordermaker;

        params.dateScope = this.listQuery.dateScope;
        params.toString();
        getSalemenStatement(params).then(response => {
          if (response.code == 'success') {
            this.list = response.data.orderInfos;
            this.listLoading = false
          }
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })


      },
      setStoreNameList() {
        getStoreNameList().then(response => {
          if (response.code == 'success') {
            console.log('成品料名称列表', response);
            this.storeNameList = response.data;
          }
        })

      },
      handleFilter() {
        this.getList()
      },


      storeRecordDialog() {

        this.dialogFormVisible = true

      },
      resetQuery() {

        this.listQuery.salemen = '';
        this.listQuery.ordermaker = '';
        this.listQuery.dateScope = [new Date() - 3600 * 1000 * 24 * 30, new Date()];
        this.listQuery.materialType = '1';
        this.listQuery.dateType = '3';
        this.listQuery.materialStatus = '1';

        this.getList()
      },

      comfirmDelete(row) {

        this.deleteRecordUid = row.uid
        this.isDeleteRecord = true;
      },
      callbackRecord() {
        this.addLoding = true;
        var params = {}
        params.recordUid = this.deleteRecordUid
        callbackStoreRecord(params).then(response => {

          if (response.code == 'fail') {

            this.addLoding = false;
            this.$message({
              message: response.data,
              type: 'warning'
            })
          }

          if (response.code == 'success') {
            this.$message({
              message: "删除成功!",
              type: 'success'
            })

            this.deleteRecordUid = '';
            location.reload();
          }

        })
      },


      onSubmit(formName) {
        this.addLoding = true;
        saveStoreRecord(this.storeRecord).then(response => {
          if (response.code == 'fail') {
            this.addLoding = false;
            this.$message({
              message: response.data,
              type: 'warning'
            })
          }

          if (response.code == 'success') {

            this.storeRecord.materialResource = ''
            this.storeRecord.materialName = ''
            this.storeRecord.materialNum = ''
            this.storeRecord.materialColor = ''
            this.storeRecord.specification = ''
            this.storeRecord.unit = ''
            this.storeRecord.price = ''
            this.storeRecord.materialStatus = '1'


            this.dialogFormVisible = false;

            this.addLoding = false;
            this.$message({
              message: "添加成功!",
              type: 'success'
            })

            location.reload();

          }
        })
      }
    }
  }
</script>
<style>
  .stat-ement {
    list-style: none;
    color: #0ca693;
    font-family: "Courier New";
    text-align: center;
    font-size: large;
  }

</style>
