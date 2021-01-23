<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>

        <el-col span="4">
          <!--<el-input v-model="listQuery.keyword" placeholder="品名" style="width: 90%">

          </el-input>-->
          <el-select v-model="listQuery.keyword" filterable placeholder="品名" style="width: 90%">
            <el-option
              v-for="item in originNameList"
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

      <!-- 长度结果-->
      <el-table-column align="center" sortable label="规格" prop="specification">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" label="单位" prop="unit">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" sortable label="单价(3米)" prop="price">

      </el-table-column>

      <el-table-column align="center" label="流向" prop="originalResource">

        <template slot-scope="scope">
          <span v-if="scope.row.originalResource == 'STORE_OUT_CJ'">出车间</span>
          <span v-if="scope.row.originalResource == 'STORE_OUT_KD'">出康达氧化</span>
          <span v-if="scope.row.originalResource == 'STORE_OUT_DM'">出东美氧化</span>
          <span v-if="scope.row.originalResource == 'STORE_OUT_FH'">出风和氧化</span>
          <span v-if="scope.row.originalResource == 'STORE_OUT_XX'">出铣型厂</span>
          <span v-if="scope.row.originalResource == 'STORE_OUT_WX'">外销发货</span>
          <span v-if="scope.row.originalResource == 'STORE_OUT_SL'">出三联喷涂厂</span>
          <span v-if="scope.row.originalResource == 'STORE_OUT_YM'">出原美喷涂厂</span>
          <span v-if="scope.row.originalResource == 'STORE_OUT_YH'">出亿和氧化厂</span>
          <span v-if="scope.row.originalResource == 'STORE_OUT_CY'">出长远拉丝厂</span>
        </template>

      </el-table-column>

      <el-table-column align="center" sortable label="数量" prop="materialNum">

      </el-table-column>


      <el-table-column align="center" sortable label="金额" prop="totalPrice">

      </el-table-column>

      <el-table-column align="center" label="出库时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="comfirmDelete(scope.row)" type="text" size="small">撤回</el-button>

          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>

    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>

    <el-dialog title="" :visible.sync="dialogFormVisible">

      <el-divider content-position="left">
        <span style="color: #b4170f">新增出库</span>
      </el-divider>

      <el-form ref="form" :model="storeRecord" label-width="120px" :rules="rules">
        <el-form-item label="材料去向:">
          <el-select v-model="storeRecord.originalResource" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in originalSource"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="材料名称:">
          <!--<el-input v-model="storeRecord.materialName" placeholder="请输入" style="width: 60%"/>-->
          <el-select v-model="storeRecord.materialName" filterable placeholder="请输入" style="width: 60%">
            <el-option
              v-for="item in originNameList"
              :key="item.storeName"
              :label="item.storeName"
              :value="item.storeName"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态:">
          <el-select v-model="storeRecord.materialStatus" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in materialStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="颜色:" v-if="storeRecord.materialStatus==4||storeRecord.materialStatus==6">
          <el-select v-model="storeRecord.materialColor" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in materialColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="规格:">
          <el-input v-model="storeRecord.specification" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="支数:">
          <el-input v-model="storeRecord.materialNum" placeholder="请输入" style="width: 60%"/>
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
  import {getStoreRecord, saveStoreRecord, callbackStoreRecord,getStoreOriginRecord,saveStoreOriginalRecord,getOriginNameList} from '@/api/store.js'
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
        originNameList:[],
        addLoding: false,
        storeRecord: {
          uid: '',
          originalResource: '',
          materialName: '',
          weight:'',
          totalWeight:'',
          aluPrice:'',
          materialNum: '',
          specification: '',
          unit: 'kg',
          price: '',
          totalPrice:'',
          materialStatus: '',
          storeMaterialStatus: '2'

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
        originalSource: [{value: '4', label: '出车间'},
          {value: '5', label: '出康达氧化'},
          {value: '6', label: '出东美氧化'},
          {value: '7', label: '出风和氧化'},
          {value: '8', label: '出铣型厂'},
          {value: '9', label: '外销发货'},
          {value: '10', label: '出三联喷涂厂'},
          {value: '11', label: '出原美喷涂厂'},
          {value: '12', label: '出亿和氧化厂'},
          {value: '13', label: '出长远拉丝厂'}],
        unit: [{value: 'kg', label: 'kg'}],
        specification: [{value: '2米', label: '2米'},
          {value: '2.5米', label: '2.5米'},{value: '3米', label: '3米'}],
        materialStatus: [{value: '2', label: '拉丝'},{value: '7', label: '抛光'},
          {value: '3', label: '铣型'},{value: '4', label: '氧化'},{value: '6', label: '喷涂'},{value: '9', label: '外销或发车间'}],
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
          {value: '15', label: '古铜色'},
          {value: '16', label: '太空灰'},
          {value: '22', label: '象牙白'}],
        orderByList: [{value: 'material_name', label: '品名'},
          {value: 'specification', label: '规格'},
          {value: 'price', label: '单价'},
          {value: 'material_num', label: '数量'},
          {value: 'total_price', label: '金额'},
          {value: 'create_time', label: '入库时间'}],
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
      this.setOriginNameList();
    },
    methods: {
      getList() {
        this.listLoading = true

        var params = {};
        params.currentPage = this.listQuery.currentPage;
        params.keyword = this.listQuery.keyword;
        params.pageSize = this.listQuery.pageSize;
        params.materialStatus = this.listQuery.materialStatus;
        params.desc = this.listQuery.desc;
        params.orderBy = this.listQuery.orderBy;
        params.beginTime = this.listQuery.beginTime;
        params.endTime = this.listQuery.endTime;
        params.toString();

        getStoreOriginRecord(params).then(response => {
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
      setOriginNameList(){
        getOriginNameList().then(response => {
          if (response.code == 'success') {
            console.log('成品料名称列表', response);
            this.originNameList = response.data;
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

        getStoreOriginRecord(params).then(response => {
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

      comfirmDelete(row) {

        this.deleteRecordUid = row.uid
        this.isDeleteRecord = true;
      },
      callbackRecord() {
        this.addLoding = true;
        var params = {}
        params.recordUid = this.deleteRecordUid
        params.type = 'origin'
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
        saveStoreOriginalRecord(this.storeRecord).then(response => {


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
