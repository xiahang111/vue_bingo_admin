<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col span="4">
          <el-select v-model="listQuery.materialColor" placeholder="材料颜色"
                     style="width: 80%">
            <el-option
              v-for="item in materialColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col span="4">
          <!--<el-input v-model="listQuery.keyword" placeholder="品名" style="width: 90%">

          </el-input>-->
          <el-select v-model="listQuery.keyword" filterable placeholder="品名" style="width: 90%">
            <el-option
              v-for="item in storeNameList"
              :key="item.storeName"
              :label="item.storeName"
              :value="item.storeName"
            >
            </el-option>
          </el-select>

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

          <el-button v-waves class="filter-item" type="primary" align="right" @click="storeRecordDialog">
            {{ '新增出库' }}
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
      <el-table-column sortable align="center" label="品名" prop="materialName" width="260"></el-table-column>


      <!-- 产品名称
      <el-table-column align="center" label="产品名称" prop="联动一号">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderId }}</el-tag>
        </template>
      </el-table-column>-->

      <!-- 产品编号-->
      <el-table-column sortable align="materialColor" label="颜色" prop="materialColor">
        <template slot-scope="scope">
          <span v-if="scope.row.materialColor == 'HTLS'">黄铜拉丝</span>
          <span v-if="scope.row.materialColor == 'TLS'">古铜拉丝</span>
          <span v-if="scope.row.materialColor == 'YH'">哑黑</span>
          <span v-if="scope.row.materialColor == 'CSH'">瓷沙黑</span>
          <span v-if="scope.row.materialColor == 'LMH'">罗马灰</span>
          <span v-if="scope.row.materialColor == 'SSH'">绅士灰</span>
          <span v-if="scope.row.materialColor == 'LSH'">拉丝黑</span>
          <span v-if="scope.row.materialColor == 'LSHUI'">拉丝灰</span>
          <span v-if="scope.row.materialColor == 'OGH'">欧歌红</span>
          <span v-if="scope.row.materialColor == 'CYH'">瓷泳黑</span>
          <span v-if="scope.row.materialColor == 'LSJ'">拉丝金</span>
          <span v-if="scope.row.materialColor == 'HS'">黑色</span>
          <span v-if="scope.row.materialColor == 'JS'">金色</span>
          <span v-if="scope.row.materialColor == 'SJS'">深金色</span>
          <span v-if="scope.row.materialColor == 'GTS'">古铜色</span>
          <span v-if="scope.row.materialColor == 'TKH'">太空灰</span>

        </template>
      </el-table-column>

      <!-- 长度结果-->
      <el-table-column align="center" sortable label="规格" prop="specification">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" label="单位" prop="unit">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" sortable label="单价(3米)" prop="price">

      </el-table-column>

      <el-table-column align="center" label="来源" prop="materialResource">

        <template slot-scope="scope">
          <span v-if="scope.row.materialResource == 'STORE_OUT_CJ'">车间用料</span>
          <span v-if="scope.row.materialResource == 'STORE_OUT_WX'">外销发货</span>
        </template>

      </el-table-column>

      <el-table-column align="center" sortable label="数量" prop="materialNum">

      </el-table-column>


      <el-table-column align="center" sortable label="金额" prop="totalPrice">

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
      <el-table-column align="center" label="出库时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="comfirmDelete(scope.row)" type="text" size="small">撤回</el-button>

          <!--<el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>

    <el-dialog title="" :visible.sync="dialogFormVisible">

      <el-divider content-position="left">
        <span style="color: #b4170f">新增入库</span>
      </el-divider>

      <el-form ref="form" :model="storeRecord" label-width="120px" :rules="rules">
        <el-form-item label="材料用途:">
          <el-select v-model="storeRecord.materialResource" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in materialSource"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="材料名称:">
         <!-- <el-input v-model="storeRecord.materialName" placeholder="请输入" style="width: 60%"/>-->

          <el-select v-model="storeRecord.materialName" filterable placeholder="请输入" style="width: 60%">
            <el-option
              v-for="item in storeNameList"
              :key="item.storeName"
              :label="item.storeName"
              :value="item.storeName"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="材料颜色:">
          <el-select v-model="storeRecord.materialColor" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in materialColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="材料数量:">
          <el-input v-model="storeRecord.materialNum" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="规格:">
          <el-input v-model="storeRecord.specification" placeholder="请输入" style="width: 60%"/>
        </el-form-item>


        <!-- 按钮 -->
        <el-form-item>

          <el-button type="primary" @click="onSubmit('form')" v-loading.fullscreen.lock="addLoding">提交</el-button>
          <el-button type="info" @click="onCancel">取消</el-button>
        </el-form-item>


      </el-form>


    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="isDeleteRecord"
      width="30%"
      center>
      <span>确定要撤回这条出库数据吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isDeleteRecord = false">取 消</el-button>
    <el-button type="primary" @click="callbackRecord">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import {getStoreRecord, saveStoreRecord, callbackStoreRecord, getStoreNameList } from '@/api/store.js'
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
        storeRecord: {
          materialResource: '',
          materialName: '',
          materialNum: '',
          materialColor: '',
          specification: '',
          unit: '',
          price: '',
          materialStatus: '2'

        },
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
          materialStatus: '2'

        },
        deleteRecordUid: '',
        isDeleteRecord: false,
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
        params.keyword = this.listQuery.keyword;
        params.pageSize = this.listQuery.pageSize;
        params.materialColor = this.listQuery.materialColor;
        params.materialStatus = this.listQuery.materialStatus;
        params.desc = this.listQuery.desc;
        params.orderBy = this.listQuery.orderBy;
        params.beginTime = this.listQuery.beginTime;
        params.endTime = this.listQuery.endTime;
        params.toString();

        getStoreRecord(params).then(response => {
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
            this.storeRecord.materialStatus = '2'

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
