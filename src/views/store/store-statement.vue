<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col span="3">
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

        <el-col span="3">
          <!--<el-input v-model="listQuery.keyword" placeholder="品名" style="width: 90%">

          </el-input>-->
          <el-select v-model="listQuery.materialName" filterable placeholder="品名" style="width: 90%">
            <el-option
              v-for="item in storeNameList"
              :key="item.storeName"
              :label="item.storeName"
              :value="item.storeName"
            >
            </el-option>
          </el-select>

        </el-col>
        <el-col span="3">
          <el-select v-model="listQuery.materialType" placeholder="材料类型"
                     style="width: 80%">
            <el-option
              v-for="item in materialType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col span="3">
          <el-select v-model="listQuery.dateType" placeholder="时间类型"
                     style="width: 80%">
            <el-option
              v-for="item in dateType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col span="3">
          <!--<el-radio v-model="listQuery.isPartName" label="true" border >区分</el-radio>
          <el-radio v-model="listQuery.isPartName" label="false" border>不是</el-radio>-->
          <el-select v-model="listQuery.isPartName" placeholder="是否区分品名"
                     style="width: 80%">
            <el-option
              v-for="item in partName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-col>
        <el-col span="3">
          <el-select v-model="listQuery.isPartColor" placeholder="是否区分颜色"
                     style="width: 80%">
            <el-option
              v-for="item in partColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col span="5">
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

      <el-row>



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

      <el-table-column align="center" sortable label="时间" prop="createTime" width=" 260">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" label="类型" prop="materialStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.materialStatus == '1'">入库</span>
          <span v-if="scope.row.materialStatus == '2'">出库</span>
        </template>
      </el-table-column>
      <!-- 品名-->
      <el-table-column sortable align="center" label="品名" prop="materialName" width="260" v-if="this.listQuery.isPartName == 'true'"></el-table-column>


      <!-- 产品名称
      <el-table-column align="center" label="产品名称" prop="联动一号">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderId }}</el-tag>
        </template>
      </el-table-column>-->

      <!-- 产品编号-->
      <el-table-column sortable align="materialColor" label="颜色" prop="materialColor" v-if="this.listQuery.isPartColor == 'true'" >
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
          <span v-if="scope.row.materialColor == '22'">象牙白</span>

        </template>
      </el-table-column>




      <!-- 总价格-->
      <el-table-column align="center" sortable label="总价格" prop="totalPrice">

      </el-table-column>
      <!-- 总数量-->
      <el-table-column align="center" sortable label="总数量" prop="totalNum">

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
  import {getStoreRecord, saveStoreRecord, callbackStoreRecord, getStoreNameList, getStoreStatement} from '@/api/store.js'
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
        storeNameList: [],
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
        total: 0,
        listLoading: true,
        listQuery: {
          isPartName: '',
          isPartColor: '',
          materialType: '1',//1 成品料 2 坯料
          dateType: '3',//日期类型 1 年 2 月 3 日
          materialColor: '',
          materialName:'',
          materialStatus: '1'

        },
        deleteRecordUid: '',
        isDeleteRecord: false,
        dateType: [{value: '1', label: '年'},
          {value: '2', label: '月'},
          {value: '3', label: '日'}],
        partName: [{value: 'true', label: '区分品名'},
          {value: 'false', label: '不区分品名'}],
        partColor: [{value: 'true', label: '区分颜色'},
          {value: 'false', label: '不区分颜色'}],
        materialType: [{value: '1', label: '成品料'},
          {value: '2', label: '坯料'}],
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
          {value: '15', label: '古铜色'},{value: '22', label: '象牙白'}],
        materialSource: [{value: '1', label: '康达料入库'},
          {value: '2', label: '东美料入库'},
          {value: '3', label: '风和料入库'},
          {value: '4', label: '超强料入库'}],
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
      this.setStoreNameList();
    },
    methods: {
      getList() {
        this.listLoading = true

        var params = {};
        params.isPartName = this.listQuery.isPartName;
        params.isPartColor = this.listQuery.isPartColor;
        params.materialType = this.listQuery.materialType;
        params.dateType = this.listQuery.dateType;
        params.materialColor = this.listQuery.materialColor;
        params.materialStatus = this.listQuery.materialStatus;
        params.materialName = this.listQuery.materialName;
        params.beginTime = this.listQuery.beginTime;
        params.endTime = this.listQuery.endTime;
        params.toString();

        getStoreStatement(params).then(response => {
          if (response.code == 'success') {
            this.list = response.data
            this.total = response.data.total
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
        this.listQuery.page = 1
        this.getList()
      },


      storeRecordDialog() {

        this.dialogFormVisible = true

      },
      resetQuery() {

        this.listQuery.materialColor = '';
        this.listQuery.materialName = '';
        this.listQuery.isPartName = '';
        this.listQuery.isPartColor = '';
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
