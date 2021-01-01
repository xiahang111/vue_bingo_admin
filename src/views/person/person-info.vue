<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>


        <el-col span="4">
          <el-input v-model="listQuery.keyword" placeholder="公司名称" style="width: 90%">

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

          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-delete"
                     @click="resetQuery">
            {{ '清空' }}
          </el-button>

          <el-button v-waves class="filter-item" type="primary" align="right" @click="storeRecordDialog">
            {{ '新增公司' }}
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

      <el-table-column sortable align="center" label="序号">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
          <!--<el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>
      <!-- 品名-->
      <el-table-column sortable align="center" label="公司名称" prop="companyName" width="260"></el-table-column>


      <!-- 产品名称
      <el-table-column align="center" label="产品名称" prop="联动一号">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderId }}</el-tag>
        </template>
      </el-table-column>-->

      <!-- 产品编号-->
      <el-table-column align="center" label="公司性质" prop="companyUse">

        <template slot-scope="scope">
          <span v-if="scope.row.companyUse == 'LSC'">拉丝厂</span>
          <span v-if="scope.row.companyUse == 'YHC'">氧化厂</span>
          <span v-if="scope.row.companyUse == 'BLC'">玻璃厂</span>
        </template>

      </el-table-column>

      <!-- 长度结果-->
      <el-table-column align="center" label="公司联系人" prop="companyBoss">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" label="联系电话" prop="companyPhone">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" sortable label="公司地址" prop="companyAddr">

      </el-table-column>


      <!-- 创建时间-->
      <el-table-column align="center" label="添加时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>

    <el-dialog title="" :visible.sync="dialogFormVisible">

      <el-divider content-position="left">
        <span style="color: #b4170f">新增公司信息</span>
      </el-divider>


      <el-form ref="form" :model="addCompany" label-width="120px" :rules="rules">
        <el-form-item label="公司性质:">
          <el-select v-model="addCompany.companyUse" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in companyUseEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公司名称:">
          <el-input v-model="addCompany.companyName" placeholder="请输入" style="width: 60%"/>
        </el-form-item>


        <el-form-item label="公司联系人:">
          <el-input v-model="addCompany.companyBoss" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="联系人电话:">
          <el-input v-model="addCompany.companyPhone" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="公司地址">
          <el-input v-model="addCompany.companyAddr" placeholder="请输入" style="width: 60%"/>
        </el-form-item>


        <!-- 按钮 -->
        <el-form-item>

          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button type="info" @click="onCancel">取消</el-button>
        </el-form-item>


      </el-form>


    </el-dialog>

  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import {getStoreRecord, saveStoreRecord} from '@/api/store.js'
  import {getCompany,saveCompany} from '@/api/person.js'
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
        addCompany: {

          companyName: '',
          companyUse: '',
          companyBoss: '',
          companyPhone: '',
          companyAddr: '',

        },
        tableKey: 0,
        list: [],
        total: 0,
        listLoading: true,
        isAddCompany: true,
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
        companyUseEnum: [{value: '1', label: '拉丝厂'},
          {value: '2', label: '氧化厂'},
          {value: '3', label: '玻璃厂'}],
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
          {value: '15', label: '古铜色'},{value: '16', label: '太空灰'},{value: '18', label: '坯料'}],
        materialSource: [{value: '1', label: '康达料入库'},
          {value: '2', label: '东美料入库'},
          {value: '3', label: '风和料入库'},
          {value: '4', label: '超强料入库'}],
        orderByList: [{value: 'material_name', label: '品名'},
          {value: 'specification', label: '规格'},
          {value: 'price', label: '单价'},
          {value: 'weight', label: '支重'},
          {value: 'material_num', label: '数量'},
          {value: 'total_weight', label: '重量'},
          {value: 'total_price', label: '金额'}],
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
        this.listLoading = true

        var params = {};
        params.currentPage = this.listQuery.currentPage;
        params.keyword = this.listQuery.keyword;
        params.pageSize = this.listQuery.pageSize;

        params.toString();

        getCompany(params).then(response => {
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
        this.listQuery.beginTime = '';
        this.listQuery.endTime = '';
        this.listQuery.currentPage = '1';
        this.listQuery.orderBy = '';

        var params = {};
        params.currentPage = 1;
        params.pageSize = 15;
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
        this.listLoading = true;

        saveCompany(this.addCompany).then(response => {


          if (response.code == 'fail') {

            this.$message({
              message: response.data,
              type: 'warning'
            })
          }

          if (response.code == 'success') {

            this.addCompany.companyAddr = ''
            this.addCompany.companyPhone = ''
            this.addCompany.companyBoss = ''
            this.addCompany.companyName = ''
            this.addCompany.companyUse = ''

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
