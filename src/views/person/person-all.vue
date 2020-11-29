<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>


        <el-col span="4">
          <el-input v-model="listQuery.keyword" placeholder="客户名称" style="width: 90%">

          </el-input>

        </el-col>
        <el-col span="4">
          <el-select v-model="listQuery.orderBy" placeholder="排序名称"
                     style="width: 80%">
            <el-option
              v-for="item in orderByList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col span="12">
          <template>
            <el-radio v-model="listQuery.desc" v-if="listQuery.orderBy != ''" label="false">升序</el-radio>
            <el-radio v-model="listQuery.desc" v-if="listQuery.orderBy != ''" label="true">降序</el-radio>
          </template>

          <!--<el-date-picker
            v-model="listQuery.beginTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker> &nbsp;&nbsp;至&nbsp;&nbsp;
          <el-date-picker
            v-model="listQuery.endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>&nbsp;&nbsp; -->
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            {{ '搜索' }}
          </el-button>

          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-delete"
                     @click="resetQuery">
            {{ '清空' }}
          </el-button>

          <el-button v-waves class="filter-item" type="primary" align="right" @click="isAddCustomer=true">
            {{ '新增客户' }}
          </el-button>


        </el-col>

        <el-col span="6">


        </el-col>

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


      <el-table-column align="center" label="来源账号" prop="adminUid">

      </el-table-column>
      <!-- 品名-->
      <el-table-column sortable align="center" label="销售员" prop="salesman"></el-table-column>


      <el-table-column sortable align="center" label="客户名称" prop="customerName"></el-table-column>

      <el-table-column sortable align="center" label="收货人名称" prop="customerNick"></el-table-column>
      <!-- 产品名称
      <el-table-column align="center" label="产品名称" prop="联动一号">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderId }}</el-tag>
        </template>
      </el-table-column>-->

      <!-- 长度结果-->

      <el-table-column align="center" label="客户手机号" prop="customerPhone">

      </el-table-column>

      <el-table-column align="center" label="客户地址" prop="customerAddr">

      </el-table-column>

      <el-table-column align="center" label="快递信息" prop="express">

      </el-table-column>


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
      <el-table-column align="center" label="加入时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>

    <el-dialog title="" :visible.sync="isAddCustomer">

      <el-divider content-position="left">
        <span style="color: #b4170f">新增用户</span>
      </el-divider>

      <el-form ref="form" :model="addCustomer" label-width="120px" :rules="rules">


        <el-form-item label="销售员:">
          <el-input v-model="addCustomer.salesman" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="客户姓名:">
          <el-input v-model="addCustomer.customerName" placeholder="请输入" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="收货人姓名:">
          <el-input v-model="addCustomer.customerNick" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="客户地址:">
          <el-input v-model="addCustomer.customerAddr" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="客户手机号:">
          <el-input v-model="addCustomer.cutomerPhone" placeholder="请输入" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="快递信息:">
          <el-input v-model="addCustomer.express" placeholder="请输入" style="width: 60%"/>
        </el-form-item>


        <!-- 按钮 -->
        <el-form-item>

          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button type="info" @click="">取消</el-button>
        </el-form-item>


      </el-form>


    </el-dialog>


  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import {getStoreRecord, saveStoreRecord} from '@/api/store.js'
  import {getCustomer, saveCustomer} from '@/api/person.js'
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
    components: {Pagination},
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

        tableKey: 0,
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 15,
          keyword: '',
          orderBy: '',
          desc: 'false',

        },
        calendarTypeOptions,
        sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        isAddCustomer: false,
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
        addCustomer: {
          customerName: '',
          customerAddr: '',
          cutomerPhone: '',
          salesman: '',
          express: '',
          customerNick:'',
          customerResource: '2'
        },
        dialogPvVisible: false,
        pvData: [],
        orderByList: [{value: 'salesman', label: '销售员'},
          {value: 'customer_name', label: '客户名称'},
          {value: 'customer_phone', label: '客户手机号'},
          {value: 'customer_addr', label: '客户地址'},
          {value: 'create_time', label: '加入时间'}],
        rules: {
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        var params = {};
        params.currentPage = this.listQuery.currentPage;
        params.keyword = this.listQuery.keyword;
        params.pageSize = this.listQuery.pageSize;
        params.orderBy = this.listQuery.orderBy;
        params.toString();

        getCustomer(params).then(response => {
          if (response.code == 'success') {
            this.list = response.data.records
            this.total = response.data.total
            this.listLoading = false
          }


          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })


      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },


      storeRecordDialog() {

        this.dialogFormVisible = true

      },
      resetQuery() {

        this.listQuery.keyword = '';
        this.listQuery.currentPage = '1';
        this.listQuery.orderBy = '';

        var params = {};
        params.currentPage = this.listQuery.currentPage;
        params.keyword = this.listQuery.keyword;
        params.pageSize = this.listQuery.pageSize;
        params.orderBy = this.listQuery.orderBy;
        params.toString();

        getCustomer(params).then(response => {
          console.log('head获取网站配置', response)
          if (response.code == 'success') {
            this.list = response.data.records
            this.total = response.data.total
            this.listLoading = false
          }


          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },


      onSubmit(formName) {

        this.listLoading = true;
        saveCustomer(this.addCustomer).then(response => {


          if (response.code == 'fail') {

            this.$message({
              message: response.data,
              type: 'warning'
            })
          }


          if (response.code == 'success') {

            this.addCustomer.customerName = ''
            this.addCustomer.customerAddr = ''
            this.addCustomer.cutomerPhone = ''
            this.addCustomer.salesman = ''
            this.addCustomer.customerResource = '2'

            this.listLoading = false;

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
