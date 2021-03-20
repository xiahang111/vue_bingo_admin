<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col span="3">
          <el-select v-model="listQuery.orderStatus" placeholder="进度"
                     style="width: 90%">
            <el-option
              v-for="item in orderStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col span="3">
          <el-select v-model="listQuery.orderType" placeholder="订单类型"
                     style="width: 90%">
            <el-option
              v-for="item in orderType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col span="3">
          <el-input v-model="listQuery.keyword" placeholder="关键字" style="width: 90%"/>
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
            {{ '新增入库' }}103.229.127.22
          </el-button>-->
        </el-col>
        <el-col span="3">
          <el-upload
            class="filter-item"
            action="http://103.229.127.22:8501/api-web/order-process/upload"
            :with-credentials='true'
            :on-preview="handlePreview"
            :headers="headers"
            :on-success="successReturn"
            :before-upload="beforeUp"
            multiple
            :limit="3"
             >
            <el-button v-waves class="filter-item" type="success" align="right">点击上传</el-button>
          </el-upload>
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

    </div>

    <el-divider content-position="left">

    </el-divider>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >

      <el-table-column label="进度" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus == 'STAY_CONFIRM'">待确认</span>
          <span v-if="scope.row.orderStatus == 'CONFIRM'">已确认</span>
          <span v-if="scope.row.orderStatus == 'MAKING'">制作中</span>
          <span v-if="scope.row.orderStatus == 'STAY_DELIVER'">待发货</span>
          <span v-if="scope.row.orderStatus == 'COMPLETE'">已完成</span>
        </template>

      </el-table-column>

      <el-table-column label="单号" prop="id" sortable="custom" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.orderId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="下单日期" prop="id" sortable="custom" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ getPartDate(row.orderDate) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="交货日期" prop="id" sortable="custom" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ getPartDate(row.deliveryDate) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="余款" align="center">
        <template slot-scope="{row}">
          <span>{{ row.restPrice }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == 'DOORORDER'">门单</span>
          <span v-if="scope.row.orderType == 'CBDORDER'">层板灯单</span>
          <span v-if="scope.row.orderType == 'DESK'">轻奢极简餐桌</span>
          <span v-if="scope.row.orderType == 'SHELF'">博古架</span>
          <span v-if="scope.row.orderType == 'CABINET'">玻璃柜</span>
          <span v-if="scope.row.orderType == 'SPECIMEN'">小样品</span>
          <span v-if="scope.row.orderType == 'HANGING'">置物架</span>
          <span v-if="scope.row.orderType == 'TRANSOM'">天地横梁</span>
          <span v-if="scope.row.orderType == 'METAL'">材料单</span>
        </template>

      </el-table-column>

      <el-table-column label="扇数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.materialNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否订玻璃" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.glassHave">√</span>
          <span v-if="!scope.row.glassHave">❌</span>
        </template>
      </el-table-column>

      <el-table-column label="已到" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.glassArrive">到</span>
          <span v-if="!scope.row.glassArrive">未到</span>
        </template>
      </el-table-column>

      <el-table-column label="下料日期" prop="id" sortable="custom" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ getPartDate(row.materialDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数控日期" prop="id" sortable="custom" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ getPartDate(row.digitalDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="台钻日期" prop="id" sortable="custom" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ getPartDate(row.drillDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组装日期" prop="id" sortable="custom" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ getPartDate(row.assembleDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包装日期" prop="id" sortable="custom" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ getPartDate(row.packageDate) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="件数" prop="id" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.packageNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" prop="id" sortable="custom" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.customerName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系电话" align="center">
        <template slot-scope="{row}">
          <span>{{ row.customerPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="收获地址" align="center" width="280">
        <template slot-scope="{row}">
          <span>{{ row.customerAddr }}</span>
        </template>
      </el-table-column>

      <el-table-column label="指定物流" align="center">
        <template slot-scope="{row}">
          <span>{{ row.express }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发货物流" align="center">
        <template slot-scope="{row}">
          <span>{{ row.expressReal }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物流单号" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.expressId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="已发日期" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ getPartDate(row.deliveryDateReal) }}</span>
        </template>
      </el-table-column>


      <el-table-column fixed="right" label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-button @click="updateOrderProcess(scope.row)" type="text" size="small">修改</el-button>
        </template>

      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
                @pagination="fetchData"/>


    <el-dialog title="" :visible.sync="isUpdateOrderProcess">

      <el-divider content-position="left">
        <span style="color: #b4170f">订单跟踪</span>
      </el-divider>

      <el-form ref="updateform" :model="orderProcessInfo" label-width="120px" :rules="rules">

        <el-scrollbar style="height:600px;">

          <el-form-item label="进度:">
            <el-select v-model="orderProcessInfo.orderStatus" name="aaa" placeholder="订单类型"
                       style="width: 80%">
              <el-option
                v-for="item in orderStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="单号:">
            <el-input v-model="orderProcessInfo.orderId" placeholder="请输入" disabled='true' style="width: 60%"/>
          </el-form-item>

          <el-form-item label="下单日期:">
            <el-input v-model="orderProcessInfo.orderDate" disabled='true' placeholder="请输入" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="发货日期:">
            <el-date-picker
              v-model="orderProcessInfo.deliveryDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions" style="width: 60%">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="余款:">
            <el-input v-model="orderProcessInfo.restPrice" placeholder="请输入" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="数量:">
            <el-input v-model="orderProcessInfo.materialNum" placeholder="请输入" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="是否订玻璃:">
            <el-select v-model="orderProcessInfo.glassHave" name="aaa" placeholder="是否订玻璃"
                       style="width: 60%">
              <el-option
                v-for="item in yesorno"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="玻璃是否已到:">
            <el-select v-model="orderProcessInfo.glassArrive" name="aaa" placeholder="玻璃是否已到"
                       style="width: 60%">
              <el-option
                v-for="item in yesorno"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="下料日期:">
            <el-date-picker
              v-model="orderProcessInfo.materialDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions" style="width: 60%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="数控日期:">
            <el-date-picker
              v-model="orderProcessInfo.digitalDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions" style="width: 60%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="台钻日期:">
            <el-date-picker
              v-model="orderProcessInfo.drillDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions" style="width: 60%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="组装日期:">
            <el-date-picker
              v-model="orderProcessInfo.assembleDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions" style="width: 60%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="包装日期:">
            <el-date-picker
              v-model="orderProcessInfo.packageDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions" style="width: 60%">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="件数:">
            <el-input v-model="orderProcessInfo.packageNum" placeholder="请输入" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="orderProcessInfo.remark" placeholder="请输入" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="收货地址:">
            <el-input v-model="orderProcessInfo.customerAddr" placeholder="请输入" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="发货物流:">
            <el-input v-model="orderProcessInfo.expressReal" placeholder="请输入" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="物流单号:">
            <el-input v-model="orderProcessInfo.expressId" placeholder="请输入" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="发货日期:">
            <el-date-picker
              v-model="orderProcessInfo.deliveryDateReal"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions" style="width: 60%">
            </el-date-picker>
          </el-form-item>

          <!-- 按钮 -->
          <el-form-item>

            <el-button type="primary" @click="updateSubmit('updateform')">提交</el-button>
            <el-button type="info" @click="isUpdateOrderProcess = false">取消</el-button>
          </el-form-item>


        </el-scrollbar>

      </el-form>


    </el-dialog>


    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import {parseTime} from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import {
    getOrderByUser,
    getMaterialVOById,
    saveOrderAgain,
    getFileNamesByOrderUid,
    deleteByOrderUid
  } from '@/api/product.js'
  import {getAllColor, getAllOrderType, getAllOrderStatus} from '@/api/basedata'
  import {getProcessRecord, updateProcessRecord} from '@/api/order.js'
  import local from '@/utils/storage'
  import {getToken} from "../../utils/auth";


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
    components: {Pagination},
    directives: {waves},
    filters: {
      statusFilter(orderstatus) {
        const statusMap = {
          'STAY_CONFIRM': '待确认',
          'CONFIRM': '已确认',
          'MAKING': '制作中',
          'STAY_DELIVER': '待发货',
          'COMPLETE': '已完成'
        }
        return statusMap[orderstatus]
      },
      booleanFilter(data) {
        const dataMap = {
          'true': '是',
          'false': '否',
        }

        return dataMap[data]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    data() {
      return {
        orderType: [],
        orderStatus: [],
        yesorno: [{value: 'true', label: '是'}, {value: 'false', label: '否'}],
        isUpdateOrderProcess: false,
        pickerOptions: {

          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          },
            {
              text: '十天后',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 10);
                picker.$emit('pick', date);
              }
            },
            {
              text: '十五天后',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 15);
                picker.$emit('pick', date);
              }
            }]
        },

        orderProcessInfo: {

          uid: '',
          orderInfouid: '',
          orderId: '',
          orderStatus: '',
          orderDate: '',
          deliveryDate: '',
          restPrice: '',
          orderType: '',
          materialNum: '',
          glassHave: '',
          glassArrive: '',
          materialDate: '',
          digitalDate: '',
          drillDate: '',
          assembleDate: '',
          packageDate: '',
          packageNum: '',
          remark: '',
          customerName: '',
          customerPhone: '',
          customerAddr: '',
          express: '',
          expressReal: '',
          expressId: '',
          deliveryDateReal: '',
        },

        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 15,
          page: 1,
          limit: 20,
          dateScope: [new Date() - 3600 * 1000 * 24 * 30, new Date()],
          keyword: '',
          orderStatus: '',
          orderType: ''
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
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
        downloadLoading: false
      }
    },
    created() {
      this.fetchData();
      this.setOrderType();
      this.setOrderStatus();
    },
    computed: {
      headers() {
        return {
          Authorization: getToken()
        }
      }
    },
    methods: {
      filterStatus(value, row) {
        return row.status === value
      },
      formatDate(value) {

        this.value1 = new Date(value.createdTime);//value.createdTime是prop绑定的字段名称
        let dateValue = this.$moment(this.value1).format("YYYY-MM-DD");//$moment专门转化时间的插件（使用时需要下载引入）
        return dateValue
      }
      ,
      getList() {
        this.listLoading = true
        this.fetchData();

      },

      setOrderType() {
        getAllOrderType().then(response => {
          if (response.code == 'success') {
            this.orderType = response.data;
          }
        })
      },

      setOrderStatus() {
        getAllOrderStatus().then(response => {
          if (response.code == 'success') {
            this.orderStatus = response.data;
          }
        })
      },

      resetQuery() {
        this.listQuery.keyword = '';
        this.listQuery.dateScope = [new Date() - 3600 * 1000 * 24 * 30, new Date()];
        this.listQuery.keyword = '';
        this.listQuery.orderStatus = '';
        this.listQuery.orderType = '';

        this.fetchData();
      },
      beforeUp(){
        this.openFullScreen2();
        return;
      },

      successReturn(res){
        this.loading.close();
        this.$message({
          message: '上传成功!!',
          type: 'success'
        })
      },

      openFullScreen2() {
        this.loading = this.$loading({
          lock: true,
          text: '拼命上传中~请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },

      updateOrderProcess(row) {

        this.orderProcessInfo.uid = row.uid;
        this.orderProcessInfo.orderInfouid = row.orderInfouid;
        this.orderProcessInfo.orderId = row.orderId;

        const statusfilter = this.$options.filters["statusFilter"];
        this.orderProcessInfo.orderStatus = statusfilter(row.orderStatus);


        this.orderProcessInfo.orderDate = this.getPartDate(row.orderDate);
        this.orderProcessInfo.deliveryDate = this.getPartDate(row.deliveryDate);
        this.orderProcessInfo.restPrice = row.restPrice;
        this.orderProcessInfo.orderType = row.orderType;
        this.orderProcessInfo.materialNum = row.materialNum;

        const booleanFilter = this.$options.filters["booleanFilter"];
        this.orderProcessInfo.glassHave = booleanFilter(row.glassHave);
        this.orderProcessInfo.glassArrive = booleanFilter(row.glassArrive);

        this.orderProcessInfo.materialDate = row.materialDate;
        this.orderProcessInfo.digitalDate = row.digitalDate;
        this.orderProcessInfo.drillDate = row.drillDate;
        this.orderProcessInfo.assembleDate = row.assembleDate;
        this.orderProcessInfo.packageDate = row.packageDate;
        this.orderProcessInfo.packageNum = row.packageNum;
        this.orderProcessInfo.remark = row.remark;
        this.orderProcessInfo.customerName = row.customerName;
        this.orderProcessInfo.customerPhone = row.customerPhone;
        this.orderProcessInfo.customerAddr = row.customerAddr;
        this.orderProcessInfo.express = row.express;
        this.orderProcessInfo.expressId = row.expressId;
        this.orderProcessInfo.expressReal = row.expressReal;
        this.orderProcessInfo.deliveryDateReal = row.deliveryDateReal;

        this.isUpdateOrderProcess = true;

      },

      deleteByOrderUid(row) {

        var param = {
          orderUid: ''
        };

        param.orderUid = row.uid

        deleteByOrderUid(param).then(response => {
          if (response.code == "success") {
            location.reload();
          } else {
            this.$message({
              message: response.data,
              type: 'warning'
            })
          }
        })

      },

      updateSubmit(formName) {

        //特殊字段转换
        if (this.orderProcessInfo.glassHave == '是') {
          this.orderProcessInfo.glassHave = true;
        }
        if (this.orderProcessInfo.glassHave == '否') {
          this.orderProcessInfo.glassHave = true;
        }
        if (this.orderProcessInfo.glassArrive == '是') {
          this.orderProcessInfo.glassArrive = true;
        }
        if (this.orderProcessInfo.glassArrive == '否') {
          this.orderProcessInfo.glassArrive = true;
        }

        if (this.orderProcessInfo.orderStatus == '待确认') {
          this.orderProcessInfo.orderStatus = 1
        }
        if (this.orderProcessInfo.orderStatus == '已确认') {
          this.orderProcessInfo.orderStatus = 2
        }
        if (this.orderProcessInfo.orderStatus == '制作中') {
          this.orderProcessInfo.orderStatus = 3
        }
        if (this.orderProcessInfo.orderStatus == '待发货') {
          this.orderProcessInfo.orderStatus = 4
        }
        if (this.orderProcessInfo.orderStatus == '已完成') {
          this.orderProcessInfo.orderStatus = 6
        }

        this.orderProcessInfo.deliveryDate = new Date(this.orderProcessInfo.deliveryDate);
        this.orderProcessInfo.materialDate = new Date(this.orderProcessInfo.materialDate);
        this.orderProcessInfo.digitalDate = new Date(this.orderProcessInfo.digitalDate);
        this.orderProcessInfo.drillDate = new Date(this.orderProcessInfo.drillDate);
        this.orderProcessInfo.assembleDate = new Date(this.orderProcessInfo.assembleDate);
        this.orderProcessInfo.packageDate = new Date(this.orderProcessInfo.packageDate);
        this.orderProcessInfo.deliveryDateReal = new Date(this.orderProcessInfo.deliveryDateReal);

        updateProcessRecord(this.orderProcessInfo).then(response => {


          if (response.code == 'fail') {

            this.$message({
              message: response.data,
              type: 'warning'
            })
          }

          if (response.code == 'success') {

            this.orderProcessInfo.uid = '';
            this.orderProcessInfo.orderInfouid = '';
            this.orderProcessInfo.orderId = '';
            this.orderProcessInfo.orderStatus = '';
            this.orderProcessInfo.orderDate = '';
            this.orderProcessInfo.deliveryDate = '';
            this.orderProcessInfo.restPrice = '';
            this.orderProcessInfo.orderType = '';
            this.orderProcessInfo.materialNum = '';
            this.orderProcessInfo.glassHave = '';
            this.orderProcessInfo.glassArrive = '';
            this.orderProcessInfo.materialDate = '';
            this.orderProcessInfo.digitalDate = '';
            this.orderProcessInfo.drillDate = '';
            this.orderProcessInfo.assembleDate = '';
            this.orderProcessInfo.packageDate = '';
            this.orderProcessInfo.packageNum = '';
            this.orderProcessInfo.remark = '';
            this.orderProcessInfo.customerName = '';
            this.orderProcessInfo.customerPhone = '';
            this.orderProcessInfo.customerAddr = '';
            this.orderProcessInfo.express = '';
            this.orderProcessInfo.expressReal = '';
            this.orderProcessInfo.expressId = '';
            this.orderProcessInfo.deliveryDateReal = '';


            this.isUpdateOrderProcess = false;

            this.$message({
              message: "操作成功!",
              type: 'success'
            })

            location.reload();

          }
        })


      },

      getPartDate(val) {
        if (val != null && val != '') {
          return val.substring(0, 10)
        }
      },


      fetchData() {
        this.listLoading = true

        var params = {};
        params.currentPage = this.listQuery.currentPage;
        params.keyword = this.listQuery.keyword;
        params.pageSize = this.listQuery.pageSize;
        params.dateScope = this.listQuery.dateScope;
        params.orderStatus = this.listQuery.orderStatus;
        params.orderType = this.listQuery.orderType;
        params.toString();

        getProcessRecord(params).then(
          response => {
            console.log('head获取网站配置', response)
            if (response.code == 'success') {
              this.list = response.data.records
              this.total = response.data.total
              this.listLoading = false
            }
          }
        )

      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      sortChange(data) {
        const {prop, order} = data
        if (prop === 'id') {
          this.sortByID(order)
        }
      },
      sortByID(order) {
        if (order === 'ascending') {
          this.listQuery.sort = '+id'
        } else {
          this.listQuery.sort = '-id'
        }
        this.handleFilter()
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            /*createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })*/
          }
        })
      },

      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            /*updateArticle(tempData).then(() => {
              const index = this.list.findIndex(v => v.id === this.temp.id)
              this.list.splice(index, 1, this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })*/
          }
        })
      },
      handleDelete(row, index) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      },

      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal) {
        return this.list.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      getSortClass: function (key) {
        const sort = this.listQuery.sort
        return sort === `+${key}` ? 'ascending' : 'descending'
      }
    }
  }
</script>
