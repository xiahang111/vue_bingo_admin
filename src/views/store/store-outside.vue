<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col span="3">
          <!--<el-input v-model="listQuery.keyword" placeholder="品名" style="width: 90%">

          </el-input>-->
          <el-select v-model="listQuery.materialName" filterable placeholder="品名" style="width: 90%">
            <el-option
              v-for="item in originNameList"
              :key="item.storeName"
              :label="item.storeName"
              :value="item.storeName"
            >
            </el-option>
          </el-select>

        </el-col>
        <el-col span="3">
          <!--<el-input v-model="listQuery.keyword" placeholder="品名" style="width: 90%">

          </el-input>-->
          <el-select v-model="listQuery.location" filterable placeholder="位置" style="width: 90%">
            <el-option
              v-for="item in location"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>

        </el-col>
        <el-col span="3">
          <!--<el-input v-model="listQuery.keyword" placeholder="品名" style="width: 90%">

          </el-input>-->
          <el-select v-model="listQuery.materialStatus" filterable placeholder="状态" style="width: 90%">
            <el-option
              v-for="item in materialStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

        </el-col>
        <el-col span="3">
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



        </el-col>

      </el-row>
      <el-row style="margin-top: 15px">

        <el-date-picker
          v-model="listQuery.beginTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker> &nbsp;&nbsp;至&nbsp;&nbsp;
        <el-date-picker
          v-model="listQuery.endTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>&nbsp;&nbsp;
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
      <el-table-column sortable align="center" label="品名" prop="materialName" width="190"></el-table-column>

      <!-- 长度结果-->
      <el-table-column align="center" sortable label="规格" prop="specification">

      </el-table-column>


      <!-- 宽度结果-->
      <el-table-column align="center" sortable label="单价(3米)" prop="price">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" sortable label="当前位置" prop="location">

      </el-table-column>

      <el-table-column align="center" label="状态" prop="originalResource">

        <template slot-scope="scope">
          <span v-if="scope.row.materialStatus == 'LASI'">拉丝</span>
          <span v-if="scope.row.materialStatus == 'XIXING'">铣型</span>
          <span v-if="scope.row.materialStatus == 'YANGHUA'">氧化</span>
          <span v-if="scope.row.materialStatus == 'PENTU'">喷涂</span>
          <span v-if="scope.row.materialStatus == 'PAOGUANG'">抛光</span>
          <span v-if="scope.row.materialStatus == 'BAOFEI'">报废</span>
          <span v-if="scope.row.materialStatus == 'WAIXIAO'">外销或发车间</span>
        </template>

      </el-table-column>

      <el-table-column align="center" sortable label="颜色" prop="materialColor">
        <template slot-scope="scope">
          <span v-if="scope.row.materialColor == 'WYS'">无颜色</span>
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
          <span v-if="scope.row.materialColor == 'XYB'">象牙白</span>
        </template>
      </el-table-column>

      <el-table-column align="center" sortable label="数量" prop="materialNum">

      </el-table-column>


      <el-table-column align="center" sortable label="金额" prop="totalPrice">

      </el-table-column>

      <el-table-column align="center" sortable label="备注" prop="remark">

      </el-table-column>

      <el-table-column align="center" label="出库时间" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.outTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="预计完成时间" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.completeTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="updateStoreOutsideInfo(scope.row)" type="text" size="small">变动</el-button>
          <el-button @click="updateStoreOutsideInfoData(scope.row)" type="text" size="small">修改</el-button>
<!--
          <el-button @click="updateStoreOutsideInfo" type="text" size="small">入成品库</el-button>
-->

          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>

    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>

    <el-dialog title="" :visible.sync="updateStoreOutside">

      <el-divider content-position="left">
        <span style="color: #b4170f">材料变动</span>
      </el-divider>

      <el-form ref="form" :model="storeOutsideInfo" label-width="120px" :rules="rules">
        <el-form-item label="状态:">
          <el-select v-model="storeOutsideInfo.materialStatus" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in materialStatus"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="材料去向:" v-if="storeOutsideInfo.materialStatus != '入库' && storeOutsideInfo.materialStatus != '外销或发车间'">
          <el-select v-model="storeOutsideInfo.location" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in originalSource"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="材料数量:">
          <el-input v-model="storeOutsideInfo.materialNum" placeholder="请输入" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="氧化颜色:" v-if="storeOutsideInfo.materialStatus == '氧化'">
          <el-select v-model="storeOutsideInfo.materialColor" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in materialColor"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计完成日期" v-if="storeOutsideInfo.materialStatus != '入库' && storeOutsideInfo.materialStatus != '外销或发车间'">
          <el-date-picker
            v-model="storeOutsideInfo.completeTime"
            align="right"
            type="date"
            style="width: 60%"
            placeholder="选择日期(不选默认延后10天)"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" :rows="3" v-model="storeOutsideInfo.remark" placeholder="请输入(可不填)" style="width: 60%"/>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" v-loading.fullscreen.lock="addLoding">提交</el-button>
          <el-button type="info" @click="onCancel">取消</el-button>
        </el-form-item>


      </el-form>


    </el-dialog>

    <el-dialog title="" :visible.sync="updateStoreOutsideData">

      <el-divider content-position="left">
        <span style="color: #b4170f">数据修改</span>
      </el-divider>

      <el-form ref="outsideData" :model="storeOutsideInfoData" label-width="120px" :rules="rules">

        <el-form-item label="预计完成日期" v-if="storeOutsideInfo.materialStatus != '入库'">
          <el-date-picker
            v-model="storeOutsideInfoData.completeTime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" :rows="3" v-model="storeOutsideInfoData.remark" placeholder="请输入(可不填)" style="width: 60%"/>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>

          <el-button type="primary" @click="onSubmit('outsideData')" v-loading.fullscreen.lock="addLoding">提交</el-button>
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
  import {updateStoreOutSideData, saveStoreOutSideRecord, callbackStoreRecord,getStoreOutsideList,saveStoreOriginalRecord,getOriginNameList} from '@/api/store.js'
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
        tableKey: 0,
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          beginTime: new Date() - 3600 * 1000 * 24 * 30,
          endTime: new Date(),
          pageSize: 15,
          keyword: '',
          orderBy: '',
          location:'',
          desc: 'false',
          materialStatus: '',
          dateScope: [new Date() - 3600 * 1000 * 24 * 30,new Date()],

        },
        storeOutsideInfo: {
          uid:'',
          location:'',
          materialStatus:'',
          materialColor:'',
          completeTime:'',
          materialNum:'',
          remark:''
        },
        storeOutsideInfoData: {
          uid:'',
          completeTime:'',
          remark:''
        },
        storeOutside: {
          originalSource: '',
          materialName:'',
          materialStatus:'',
          materialNum:'',
          materialColor:''

        },
        deleteRecordUid: '',
        isDeleteRecord: false,
        updateStoreOutside: false,
        updateStoreOutsideData: false,
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
        location: [{value: '康达厂', label: '康达厂'},
          {value: '东美厂', label: '东美厂'},
          {value: '风和厂', label: '风和厂'},
          {value: '铣型厂', label: '铣型厂'},
          {value: '三联喷涂厂', label: '三联喷涂厂'},
          {value: '金色恒辉喷涂厂入库', label: '金色恒辉喷涂厂入库'},
          {value: '原美喷涂厂', label: '原美喷涂厂'},
          {value: '亿和氧化厂', label: '亿和氧化厂'},
          {value: '长远拉丝厂', label: '长远拉丝厂'}],
        originalSource: [{value: '5', label: '出康达氧化'},
          {value: '6', label: '出东美氧化'},
          {value: '7', label: '出风和氧化'},
          {value: '8', label: '出铣型厂'},
          {value: '10', label: '出三联喷涂厂'},
          {value: '14', label: '出金色恒辉喷涂厂'},
          {value: '11', label: '出原美喷涂厂'},
          {value: '12', label: '出亿和氧化厂'},
          {value: '13', label: '出长远拉丝厂'}],
        unit: [{value: 'kg', label: 'kg'}],
        specification: [{value: '2米', label: '2米'},
          {value: '2.5米', label: '2.5米'},{value: '3米', label: '3米'}],
        materialStatus: [{value: '入库', label: '入库'},{value: '拉丝', label: '拉丝'},{value: '抛光', label: '抛光'},
          {value: '铣型', label: '铣型'},{value: '氧化', label: '氧化'},{value: '喷涂', label: '喷涂'},{value: '外销或发车间', label: '外销或发车间'}],
        orderByList: [{value: 'material_name', label: '品名'},
          {value: 'specification', label: '规格'},
          {value: 'price', label: '单价'},
          {value: 'material_num', label: '数量'},
          {value: 'total_price', label: '金额'},
          {value: 'out_time', label: '出库时间'},
          {value: 'complete_time', label: '预计完成时间'}],
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
        params.pageSize = this.listQuery.pageSize;
        params.materialStatus = this.listQuery.materialStatus;
        params.materialName = this.listQuery.materialName;
        params.location = this.listQuery.location;
        params.desc = this.listQuery.desc;
        params.orderBy = this.listQuery.orderBy;
        params.beginTime = this.listQuery.beginTime;
        params.endTime = this.listQuery.endTime;
        params.toString();

        getStoreOutsideList (params).then(response => {
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
      updateStoreOutsideInfoData(row){
        this.storeOutsideInfoData.uid = row.uid;
        this.storeOutsideInfoData.completeTime = row.completeTime;
        this.storeOutsideInfoData.remark = row.remark;
        this.updateStoreOutsideData = true;
      },

      updateStoreOutsideInfo(row){
        this.storeOutsideInfo.uid = row.uid;
/*
        this.storeOutsideInfo.location = row.location;
*/
        if(row.materialStatus == 'STOREIN'){
          this.storeOutsideInfo.materialStatus = '入库';
        }
        if(row.materialStatus == 'LASI'){
          this.storeOutsideInfo.materialStatus = '拉丝';
        }
        if(row.materialStatus == 'XIXING'){
          this.storeOutsideInfo.materialStatus = '铣型';
        }
        if(row.materialStatus == 'YANGHUA'){
          this.storeOutsideInfo.materialStatus = '氧化';
        }
        switch (row.materialStatus) {
          case 'STOREIN':this.storeOutsideInfo.materialStatus = '入库';break;
          case 'LASI':this.storeOutsideInfo.materialStatus = '拉丝';break;
          case 'XIXING':this.storeOutsideInfo.materialStatus = '铣型';break;
          case 'YANGHUA':this.storeOutsideInfo.materialStatus = '氧化';break;
          default:this.storeOutsideInfo.materialStatus = '拉丝';break;
        }

        switch (row.materialColor) {

          case 'WYS':this.storeOutsideInfo.materialColor = '无颜色';break;
          case 'HTLS':this.storeOutsideInfo.materialColor = '黄铜拉丝';break;
          case 'TLS':this.storeOutsideInfo.materialColor = '古铜拉丝';break;
          case 'YH':this.storeOutsideInfo.materialColor = '哑黑';break;
          case 'CSH':this.storeOutsideInfo.materialColor = '瓷砂黑';break;
          case 'LMH':this.storeOutsideInfo.materialColor = '罗马灰';break;
          case 'SSH':this.storeOutsideInfo.materialColor = '绅士灰';break;
          case 'LSH':this.storeOutsideInfo.materialColor = '拉丝黑';break;
          case 'LSHUI':this.storeOutsideInfo.materialColor = '拉丝灰';break;
          case 'OGH':this.storeOutsideInfo.materialColor = '欧歌红';break;
          case 'CYH':this.storeOutsideInfo.materialColor = '瓷泳黑';break;
          case 'LSJ':this.storeOutsideInfo.materialColor = '拉丝金';break;
          case 'HS':this.storeOutsideInfo.materialColor = '黑色';break;
          case 'JS':this.storeOutsideInfo.materialColor = '金色';break;
          case 'SJS':this.storeOutsideInfo.materialColor = '深金色';break;
          case 'GTS':this.storeOutsideInfo.materialColor = '古铜色';break;
          case 'TKH':this.storeOutsideInfo.materialColor = '太空灰';break;
          case 'FTH':this.storeOutsideInfo.materialColor = '氟碳灰';break;
          case 'PL':this.storeOutsideInfo.materialColor = '坯料';break;
          case 'GRAY':this.storeOutsideInfo.materialColor = '灰色';break;
          case 'XBS':this.storeOutsideInfo.materialColor = '香槟色';break;
          case 'RED':this.storeOutsideInfo.materialColor = '红色';break;
          case 'XYB':this.storeOutsideInfo.materialColor = '象牙白';break;
          case 'PGHUI':this.storeOutsideInfo.materialColor = '苹果灰';break;
          default:this.storeOutsideInfo.materialColor = '无颜色';break;
        }
/*
        this.storeOutsideInfo.completeTime = (new Date() + 3600 * 1000 * 24 * 10) ;
*/
        this.storeOutsideInfo.materialNum = row.materialNum;
        this.updateStoreOutside = true;

      },

      storeRecordDialog() {

        this.dialogFormVisible = true

      },
      resetQuery() {

        this.listQuery.materialColor = '';
        this.listQuery.materialName = '';
        this.listQuery.location = '';
        this.listQuery.materialStatus = '';
        this.listQuery.desc = '';
        this.listQuery.keyword = '';
        this.listQuery.beginTime = new Date() - 3600 * 1000 * 24 * 30;
        this.listQuery.endTime = new Date();
        this.listQuery.currentPage = '1';
        this.listQuery.orderBy = '';

        this.getList()
      },

      comfirmUpdate(row) {

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
      onCancel(){
        this.updateStoreOutside = false;
        this.updateStoreOutsideData = false;
      },


      onSubmit(formName) {
        this.addLoding = true;
        if (formName == 'form'){
          saveStoreOutSideRecord(this.storeOutsideInfo).then(response => {


            if (response.code == 'fail') {
              this.addLoding = false;
              this.$message({
                message: response.data,
                type: 'warning'
              })
            }

            if (response.code == 'success') {
              this.storeOutsideInfo.uid = ''
              this.storeOutsideInfo.location = ''
              this.storeOutsideInfo.materialColor = ''
              this.storeOutsideInfo.completeTime = ''
              this.storeOutsideInfo.materialNum = ''
              this.storeOutsideInfo.remark = ''


              this.updateStoreOutside = false;

              this.addLoding = false;
              this.$message({
                message: "修改成功!",
                type: 'success'
              })
              location.reload();
            }
          })
        }

        if (formName == 'outsideData'){
          updateStoreOutSideData(this.storeOutsideInfoData).then(response => {
            if (response.code == 'fail') {
              this.addLoding = false;
              this.$message({
                message: response.data,
                type: 'warning'
              })
            }

            if (response.code == 'success') {
              this.storeOutsideInfoData.uid = ''
              this.storeOutsideInfoData.completeTime = ''
              this.storeOutsideInfoData.remark = ''
              this.updateStoreOutsideData = false;

              this.addLoding = false;
              this.$message({
                message: "修改成功!",
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
