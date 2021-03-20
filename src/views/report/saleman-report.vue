<template>
  <div class="app-container">
    <div class="filter-container">



      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">

        <el-col :xs="12" :sm="12" :lg="12">
          <div class="chart-wrapper">
            <line-chart :chart-data="salesmanNumData"/>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="12">
          <div class="chart-wrapper">
            <line-chart :chart-data="salesmanPriceData"/>
          </div>
        </el-col>

      </el-row>

      <el-divider content-position="left">

      </el-divider>

      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <el-col span="8">
          <el-select v-model="querySalesmanName" placeholder="业务员"
                     style="width: 80%" @change="salesmanMonthBlur($event)">
            <el-option
              v-for="item in salesMans"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>


      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="chart-wrapper">
            <wire-chart :chart-data="salesmanMonthData" :height="'450px'" v-if="refresh"/>
          </div>
        </el-col>
      </el-row>


    </div>
    <el-divider content-position="left">

    </el-divider>


  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import {getStoreRecord, saveStoreRecord, callbackStoreRecord, getStoreNameList} from '@/api/store.js'
  import {getSalemenStatement} from '@/api/product.js'
  import { salesmanPriceReport,salesmanNumReport,salesmanMonthReport } from '@/api/report'
  import {getAllOrderMaker, getAllSaleMan} from '@/api/basedata'
  import LineChart from './components/LineChart'
  import BarChart from './components/BarChart'
  import WireChart from './components/WireChart'
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
    components: {Pagination, LineChart, BarChart, WireChart},
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
        salesmanNumData: {
          orderMakers: [],
          orderNums: [],
          title: '销售员订单数量'
        },
        refresh: true,
        salesmanPriceData: {
          orderMakers: [],
          orderNums: [],
          title: '销售员订单金额'
        },
        salesmanMonthData: {
          xaxis: [],
          yaxis: [],
          title: '销售员近30天销售额'
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
        querySalesmanName: '',
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
      this.getSalesmanMonthReport();
      salesmanNumReport().then(
        response => {
          if (response.code == "success") {
            this.salesmanNumData.orderMakers = response.data.xaxis
            this.salesmanNumData.orderNums = response.data.yaxis
          }
        }
      ),
        salesmanPriceReport().then(
          response => {
            if (response.code == "success") {
              this.salesmanPriceData.orderMakers = response.data.xaxis
              this.salesmanPriceData.orderNums = response.data.yaxis
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
            this.salesMans.push({value: "", label: "无"})
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

      salesmanMonthBlur(e){
        this.getSalesmanMonthReport();
        this.refreshComp();
      },

      getSalesmanMonthReport() {

        var query = {}
        query.salesmanName = this.querySalesmanName;

        salesmanMonthReport(query).then(
          response => {
            if (response.code == "success") {
              this.salesmanMonthData.xaxis = response.data.xaxis
              this.salesmanMonthData.yaxis = response.data.yaxis
            }
          }
        )
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

      refreshComp(){
        this.refresh = false;
        this.$nextTick(() => {
          this.refresh = true
        })
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
