<template>
  <div class="app-container">
    <div class="filter-container">


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
      <el-table-column sortable align="center" label="告警等级" prop="remindLevel" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.remindLevel == '1'">
            <el-tag type="warning"  effect="dark">普通</el-tag>
          </span>
          <span v-if="scope.row.remindLevel == '2'">
            <el-tag type="danger"  effect="dark">严重</el-tag>
          </span>
        </template>
      </el-table-column>


      <!-- 产品名称
      <el-table-column align="center" label="产品名称" prop="联动一号">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderId }}</el-tag>
        </template>
      </el-table-column>-->


      <!-- 长度结果-->
      <el-table-column align="center" sortable label="告警信息" prop="message" >

      </el-table-column>

      <el-table-column align="center" sortable label="状态" prop="status" width="160">

        <template slot-scope="scope">
          <span v-if="scope.row.status == '1'">
            <el-tag type="info" >未读</el-tag>
          </span>
          <span v-if="scope.row.status == '2'">
            <el-tag type="success" >已读</el-tag>
          </span>
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
      <el-table-column align="center" label="创建时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>


  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import {saveRemindConfig, getRemindConfigList, getStoreNameList, deleteRemindConfigByUid, getMessageRemindPage } from '@/api/store.js'
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
        addLoding: false,
        storeNameList:[],
        messageConfig: {
          remindMethod: '',
          specification:'',
          materialName: '',
          threshold: '',
          materialColor: '',

        },
        isUpdate: false,
        updateMessageConfig: {
          uid:'',
          remindMethod: '',
          threshold: '',

        },
        tableKey: 0,
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 15,
          materialColor: '',
          materialName: ''

        },
        deleteRemindUid: '',
        isDeleteRemind: false,
        materialColor: [{value: '1', label: '黄铜拉丝'},
          {value: '2', label: '古铜拉丝'},
          {value: '3', label: '哑黑'},
          {value: '4', label: '瓷沙黑'},
          {value: '5', label: '罗马灰'},
          {value: '6', label: '绅士灰'},
          {value: '7', label: '拉丝黑'},
          {value: '8', label: '拉丝灰'},
          {value: '9', label: '欧歌红'},
          {value: '10', label: '瓷泳黑'},
          {value: '11', label: '拉丝金'},
          {value: '12', label: '黑色'},
          {value: '13', label: '金色'},
          {value: '14', label: '深金色'},
          {value: '15', label: '古铜色'},{value: '16', label: '太空灰'}],
        materialSource: [{value: '5', label: '车间用料'},
          {value: '6', label: '外销发货'}],
        remindMethod: [{value: '1', label: '页面弹窗'},{value: '2', label: '邮件告警'},{value: '3', label: '短信告警'}],
        orderByList: [{value: 'material_name', label: '品名'},
          {value: 'specification', label: '规格'},
          {value: 'price', label: '单价'},
          {value: 'material_num', label: '数量'},
          {value: 'total_price', label: '金额'},
          {value: 'create_time', label: '出库时间'}],
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
      this.getList();
      this.setStoreNameList();
    },
    methods: {
      getList() {
        this.listLoading = true

        var params = {};
        params.currentPage = this.listQuery.currentPage;
        params.pageSize = this.listQuery.pageSize;

        params.toString();

        getMessageRemindPage(params).then(response => {
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
      setStoreNameList(){
        getStoreNameList().then(response => {
          if (response.code == 'success') {
            console.log('成品料名称列表', response);
            this.storeNameList = response.data;
          }
        })

      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },



      updateRemindConfig(row){
        this.updateMessageConfig.uid = row.uid;
        this.updateMessageConfig.threshold = row.threshold;
        this.updateMessageConfig.remindMethod = row.remindMethod;
        this.isUpdate = true;
      },

      storeRecordDialog() {

        this.dialogFormVisible = true

      },
      resetQuery() {

        this.listQuery.materialColor = '';
        this.listQuery.materialName = '';

        this.listQuery.currentPage = '1';
        this.listQuery.orderBy = '';

        this.getList();
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
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

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
      handleFetchPv(pv) {

      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['订单编号', '玻璃颜色', '长度结果(mm)', '宽度结果(mm)', '块数', '创建时间']
          const filterVal = ['orderId', 'glassColor', 'glassHeight', 'glassWidth', 'glassNum', 'createTime']
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
      },
      onCancel() {
        this.storeRecord.materialResource = ''
        this.storeRecord.materialName = ''
        this.storeRecord.materialNum = ''
        this.storeRecord.materialColor = ''
        this.storeRecord.specification = ''
        this.storeRecord.unit = ''
        this.storeRecord.price = ''
        this.storeRecord.materialStatus = '2'
      },

      comfirmDelete(row) {

        this.deleteRemindUid = row.uid
        this.isDeleteRemind = true;
      },
      callbackRecord() {
        this.addLoding = true;
        var params = {}
        params.materialUid = this.deleteRemindUid;
        deleteRemindConfigByUid(params).then(response => {

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

        if (formName == 'form'){
          saveRemindConfig(this.messageConfig).then(response => {

            if (response.code == 'fail') {

              this.addLoding = false;
              this.$message({
                message: response.data,
                type: 'warning'
              })
            }

            if (response.code == 'success') {
              this.messageConfig.remindMethod = ''
              this.messageConfig.materialName = ''
              this.messageConfig.threshold = ''
              this.messageConfig.materialColor = ''

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
        if (formName == 'updateData'){
          saveRemindConfig(this.updateMessageConfig).then(response => {

            if (response.code == 'fail') {

              this.addLoding = false;
              this.$message({
                message: response.data,
                type: 'warning'
              })
            }

            if (response.code == 'success') {
              this.updateMessageConfig.uid = ''
              this.updateMessageConfig.threshold = ''
              this.updateMessageConfig.threshold = ''

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
  }
</script>
