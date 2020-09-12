<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>


        <el-col span="4">
          <el-input v-model="listQuery.keyword" placeholder="客户名称" style="width: 90%">

          </el-input>

        </el-col>

        <el-col span="12">

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


      <!-- 品名-->
      <el-table-column sortable align="center" label="序号">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
          <!--<el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>
      <!-- 品名-->
      <el-table-column sortable align="center" label="权限名称" prop="roleName"></el-table-column>

      <el-table-column sortable align="center" label="权限说明" prop="summary"></el-table-column>


      <!-- 产品名称
      <el-table-column align="center" label="产品名称" prop="联动一号">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderId }}</el-tag>
        </template>
      </el-table-column>-->


      <!-- 长度结果-->
      <el-table-column align="center"  label="状态" prop="status">

        <template slot-scope="scope">
          <el-tag :type="success">
            <span v-if="scope.row.status == '1'" >正常</span>
            <span v-if="scope.row.status == '2'">失效</span>
          </el-tag>

        </template>
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

    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>


  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import {getStoreRecord, saveStoreRecord} from '@/api/store.js'
  import {getCustomer} from '@/api/person.js'
  import {getAllRole} from '@/api/user.js'
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
          beginTime: '',
          endTime: '',
          pageSize: 15,
          keyword: '',
          materialColor: '',
          orderBy: '',
          desc: 'false',
          materialStatus: '1'

        },
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
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = false

        getAllRole().then(response => {
          if (response.code == 'success') {
            this.list = response.data
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

        this.listQuery.materialColor = '';
        this.listQuery.keyword = '';
        this.listQuery.beginTime = '';
        this.listQuery.endTime = '';
        this.listQuery.currentPage = '1';
        this.listQuery.orderBy = '';

        var params = {};
        params.currentPage = 1;
        params.pageSize = 15;
        params.materialStatus = this.listQuery.materialStatus;
        params.materialColor = '';
        params.beginTime = '';
        params.endTime = '';
        params.toString();

        getStoreRecord(params).then(response => {
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

        saveStoreRecord(this.storeRecord).then(response => {


          if (response.code == 'fail') {

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
