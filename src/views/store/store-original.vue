<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>

        <el-col span="4">
          <el-input v-model="listQuery.keyword" placeholder="品名" style="width: 90%">

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
          <el-button v-waves class="filter-item" type="primary" align="right" @click="storeRecordDialog">
            {{ '新增材料' }}
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

      <!-- 长度结果-->
      <el-table-column align="center" sortable label="规格" prop="specification">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" label="单位" prop="unit">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" sortable label="单价(3米)" prop="price">

      </el-table-column>

      <el-table-column align="center" label="支重(kg)" prop="weight">

      </el-table-column>

      <el-table-column align="center" sortable label="数量" prop="materialNum">

      </el-table-column>

      <el-table-column align="center" sortable label="重量" prop="totalWeight">

      </el-table-column>

      <el-table-column align="center" sortable label="金额" prop="totalPrice">

      </el-table-column>


      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="updateStoreInfo(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="comfirmDelete(scope.row)" type="text" size="small">删除</el-button>

          <!--<el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>

      <!-- 创建时间-->
      <!--<el-table-column align="center" label="创建时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>-->
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>

    <el-dialog title="" :visible.sync="dialogFormVisible">

      <el-divider content-position="left">
        <span style="color: #b4170f">新增材料</span>
      </el-divider>

      <el-form ref="form" :model="storeOrigin" label-width="120px" :rules="rules">

        <el-form-item label="材料名称:">
          <el-input v-model="storeOrigin.materialName" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="规格:">
          <el-input v-model="storeOrigin.specification" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="单位:">
          <el-input v-model="storeOrigin.unit" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="单价:">
          <el-input v-model="storeOrigin.price" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="支重:">
          <el-input v-model="storeOrigin.weight" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="数量:">
          <el-input v-model="storeOrigin.materialNum" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>

          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button type="info" @click="onCancel">取消</el-button>
        </el-form-item>


      </el-form>


    </el-dialog>

    <el-dialog title="" :visible.sync="updateStoreSummary">

      <el-divider content-position="left">
        <span style="color: #b4170f">修改材料</span>
      </el-divider>

      <el-form ref="updateform" :model="storeOriginInfo" label-width="120px" :rules="rules">

        <el-form-item label="材料名称:">
          <el-input v-model="storeOriginInfo.materialName" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="规格:">
          <el-input v-model="storeOriginInfo.specification" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="单位:">
          <el-input v-model="storeOriginInfo.unit" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="单价:">
          <el-input v-model="storeOriginInfo.price" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="支重:">
          <el-input v-model="storeOriginInfo.weight" placeholder="请输入" style="width: 60%"/>
        </el-form-item>


        <!-- 按钮 -->
        <el-form-item>

          <el-button type="primary" @click="updateSubmit('updateform')">提交</el-button>
          <el-button type="info" @click="onCancel">取消</el-button>
        </el-form-item>


      </el-form>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="isDeleteStore"
      width="30%"
      center>
      <span>确定要删除这条材料数据吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isDeleteStore = false">取 消</el-button>
    <el-button type="primary" @click="deleteSubmit">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import {  saveStoreOrigin, getStoreOrigin ,deleteStoreOrigin} from '@/api/store.js'
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

        storeOrigin: {

          materialName: '',
          materialNum: '',
          specification: '',
          unit: '',
          price: '',
          weight:'',

        },

        storeOriginInfo: {
          uid:'',
          materialName: '',
          materialNum: '',
          materialColor: '',
          specification: '',
          unit: '',
          price: '',
          weight:'',

        },
        updateStoreSummary: false,
        tableKey: 0,
        dialogFormVisible: false,
        deleteStoreUid:'',
        isDeleteStore: false,
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
          orderBy:'',
          desc: 'false'

        },

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
        params.materialColor = this.listQuery.materialColor;
        params.desc = this.listQuery.desc;
        params.orderBy = this.listQuery.orderBy;
        params.beginTime = this.listQuery.beginTime;
        params.endTime = this.listQuery.endTime;
        params.toString();

        getStoreOrigin(params).then(response => {
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
      updateStoreInfo(row){

        this.storeOriginInfo.uid = row.uid
        this.storeOriginInfo.materialName = row.materialName
        this.storeOriginInfo.specification = row.specification
        this.storeOriginInfo.unit = row.unit
        this.storeOriginInfo.price = row.price
        this.storeOriginInfo.weight = row.weight

        this.updateStoreSummary = true;
      },

      comfirmDelete(row){

        this.deleteStoreUid = row.uid
        this.isDeleteStore = true;
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
        params.glassColor = 0;
        params.beginTime = '';
        params.endTime = '';
        params.toString();

        getStoreOrigin(params).then(response => {
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
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },

      cancleAddMaterial(){
        this.dialogFormVisible = false;
      },


      storeRecordDialog() {

        this.dialogFormVisible = true

      },
      onSubmit(formName) {

        saveStoreOrigin(this.storeOrigin).then(response => {


          if (response.code == 'fail') {

            this.$message({
              message: response.data,
              type: 'warning'
            })
          }

          if (response.code == 'success') {

            this.storeOrigin.materialName = ''
            this.storeOrigin.materialNum = ''
            this.storeOrigin.materialColor = ''
            this.storeOrigin.specification = ''
            this.storeOrigin.unit = ''
            this.storeOrigin.price = ''
            this.storeOrigin.weight = ''


            this.dialogFormVisible = false;

            this.$message({
              message: "添加成功!",
              type: 'success'
            })

            location.reload();

          }
        })


      },

      deleteSubmit(){

        this.storeOriginInfo.uid = this.deleteStoreUid

        deleteStoreOrigin(this.storeOriginInfo).then(response  => {

          if (response.code == 'fail') {

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

            this.storeOriginInfo.uid = ''
            location.reload();

          }
        })
      },

      updateSubmit(formName) {

        saveStoreOrigin(this.storeOriginInfo).then(response => {


          if (response.code == 'fail') {

            this.$message({
              message: response.data,
              type: 'warning'
            })
          }

          if (response.code == 'success') {

            this.storeOrigin.materialName = ''
            this.storeOrigin.materialNum = ''
            this.storeOrigin.materialColor = ''
            this.storeOrigin.specification = ''
            this.storeOrigin.unit = ''
            this.storeOrigin.price = ''
            this.storeOrigin.weight = ''


            this.dialogFormVisible = false;

            this.$message({
              message: "操作成功!",
              type: 'success'
            })

            location.reload();

          }
        })


      },
      onCancel(){

        this.storeOrigin.materialName = ''
        this.storeOrigin.materialNum = ''
        this.storeOrigin.materialColor = ''
        this.storeOrigin.specification = ''
        this.storeOrigin.unit = ''
        this.storeOrigin.price = ''
        this.storeOrigin.weight = ''

        this.storeOriginInfo.uid = ''
        this.storeOriginInfo.materialName = ''
        this.storeOriginInfo.materialNum = ''
        this.storeOriginInfo.materialColor = ''
        this.storeOriginInfo.specification = ''
        this.storeOriginInfo.unit = ''
        this.storeOriginInfo.price = ''
        this.storeOriginInfo.weight = ''
      },
    }
  }
</script>
