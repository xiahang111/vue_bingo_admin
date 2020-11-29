<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>


        <el-col span="4">
          <el-input v-model="listQuery.keyword" placeholder="用户名称" style="width: 90%">

          </el-input>

        </el-col>

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

        <el-button v-waves class="filter-item" type="primary" align="right" @click="isAddUser = true">
          {{ '新增用户' }}
        </el-button>


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

      <el-table-column sortable align="center" label="用户名" prop="username"></el-table-column>

      <el-table-column sortable align="center" label="真实姓名" prop="realName"></el-table-column>

      <el-table-column sortable align="center" label="手机号码" prop="mobile"></el-table-column>


      <!-- 产品名称
      <el-table-column align="center" label="产品名称" prop="联动一号">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderId }}</el-tag>
        </template>
      </el-table-column>-->

      <!-- 长度结果-->
      <el-table-column align="center" label="拥有权限">

        <template slot-scope="scope">
          <el-tag :style="success">
            {{scope.row.roleName}}
          </el-tag>
          <!--<el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录次数" prop="loginCount">

      </el-table-column>

      <el-table-column align="center" label="上次登录ip" prop="lastLoginIp">

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
      <el-table-column align="center" label="上次登录时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.lastLoginTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :pageSize.sync="listQuery.pageSize"
                @pagination="getList"/>

    <el-dialog title="" :visible.sync="isAddUser">

      <el-divider content-position="left">
        <span style="color: #b4170f">新增用户</span>
      </el-divider>

      <el-form ref="form" :model="adduser" label-width="120px" :rules="rules">

        <el-form-item label="用户名">
          <el-input v-model="adduser.username" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input v-model="adduser.password" type="password" autocomplete="off" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="确认密码:" prop="comfirmPass">
          <el-input v-model="adduser.comfirmPass" type="password" autocomplete="off" placeholder="请输入"
                    style="width: 60%"/>
        </el-form-item>

        <el-form-item label="权限:">
          <el-select v-model="adduser.roleName" placeholder="请选择" style="width: 60%">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="真实姓名:">
          <el-input v-model="adduser.realName" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="手机号:">
          <el-input v-model="adduser.mobile" placeholder="请输入" style="width: 60%"/>
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
  import {getCustomer} from '@/api/person.js'
  import {getAllUser , saveUser } from '@/api/user.js'
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

      var validatePass = (rule, value, callback) => {
        if (value == '' || value == undefined) {
          callback(new Error('请输入密码'));
        } else {
          if (this.adduser.comfirmPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value == ''|| value == undefined) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.adduser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {

        tableKey: 0,
        list: [],
        total: 0,
        isAddUser: false,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          beginTime: '',
          endTime: '',
          pageSize: 15,
          keyword: '',

        },

        adduser: {
          username: '',
          password: '',
          comfirmPass: '',
          mobile: '',
          roleName: '',
          realName: ''
        },
        roleList: [{value: 'production', label: 'production'},
          {value: 'clerk', label: 'clerk'},
          {value: 'store', label: 'store'},
          {value: 'visit', label: 'visit'}],

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
          title: [{required: true, message: 'title is required', trigger: 'blur'}],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          comfirmPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
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

        getAllUser(this.listQuery).then(response => {
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

        saveUser(this.adduser).then(response => {


          if (response.code == 'fail') {

            this.$message({
              message: response.data,
              type: 'warning'
            })
          }

          if (response.code == 'success') {

            this.adduser.username = ''
            this.adduser.password = ''
            this.adduser.comfirmPass = ''
            this.adduser.mobile = ''
            this.adduser.realName = ''
            this.adduser.roleName = ''


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
