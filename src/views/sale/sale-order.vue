<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>

      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >

      <el-table-column label="订单编号" prop="id" sortable="custom" align="center" width="280">
        <template slot-scope="{row}">
          <span>{{ row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务员" align="center">
        <template slot-scope="{row}">
          <span>{{ row.salesman }}</span>
        </template>
      </el-table-column>

      <el-table-column label="制单人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderMaker }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.productType == 'Complete' ? "成品" : "半成品"}}</span>
        </template>
      </el-table-column>

      <el-table-column label="总金额" align="center">
        <template slot-scope="{row}">
          <span style="color: #f4516c">{{ row.totalPrice }}</span>
        </template>
      </el-table-column>


      <el-table-column label="下单日期" :formatter="formatDate" align="center">
        <template slot-scope="{row}">
          <span style="color: #f4516c">{{ row.createTime }}</span>
        </template>
      </el-table-column>


      <!-- <el-table-column label="状态" class-name="status-col" align="center" >
        <template slot-scope="{row}">
          <el-tag :type="success" v-if="row.status == 0">
            进行中
          </el-tag>
          <el-tag :type="success" v-if="row.status == 1">
            已完成
          </el-tag>
          <el-tag :type="success" v-if="row.status == 2">
            已退款
          </el-tag>
        </template>
      </el-table-column> -->


      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="getMaterial(scope.row)" type="text" size="small">详情</el-button>
          <!--<el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
                @pagination="fetchData"/>

    <el-dialog title="" :visible.sync="dialogFormVisible">
      <el-divider content-position="left"><span style="color: #b4170f;font-size: large">产品信息</span></el-divider>

      <el-table :data="product.materials" height="250" :stripe="true" align="center">
        <el-table-column prop="materialType" label="料型号">
          <template slot-scope="scope">
            <span v-if="scope.row.materialType == 1001">联动1号</span>
            <span v-if="scope.row.materialType == 1002">联动2号</span>
            <span v-if="scope.row.materialType == 1003">联动3号</span>
            <span v-if="scope.row.materialType == 2001">上品2号</span>
            <span v-if="scope.row.materialType == 3001">50斜边</span>
            <span v-if="scope.row.materialType == 4001">上品1号</span>
            <span v-if="scope.row.materialType == 5001">20窄边</span>
            <span v-if="scope.row.materialType == 5002">22窄边</span>
            <span v-if="scope.row.materialType == 5003">22加厚</span>
            <span v-if="scope.row.materialType == 6001">天地1号</span>
            <span v-if="scope.row.materialType == 7001">兵歌1号</span>
            <span v-if="scope.row.materialType == 7002">兵歌2号</span>
            <span v-if="scope.row.materialType == 7003">兵歌3号</span>
            <span v-if="scope.row.materialType == 7004">兵歌4号</span>
          </template>
        </el-table-column>
        <el-table-column prop="materialColor" label="料颜色">
          <template slot-scope="scope">
            <span v-if="scope.row.materialColor == 1">黄铜拉丝</span>
            <span v-if="scope.row.materialColor == 2">古铜拉丝</span>
            <span v-if="scope.row.materialColor == 3">哑黑</span>
            <span v-if="scope.row.materialColor == 4">瓷沙黑</span>
            <span v-if="scope.row.materialColor == 5">罗马灰</span>
            <span v-if="scope.row.materialColor == 6">绅士灰</span>
            <span v-if="scope.row.materialColor == 7">拉丝黑</span>
            <span v-if="scope.row.materialColor == 8">拉丝灰</span>

          </template>
        </el-table-column>
        <el-table-column prop="handleType" label="拉手类型">
          <template slot-scope="scope">
            <span v-if="scope.row.handleType == 0">无拉手</span>
            <span v-if="scope.row.handleType == 1">168拉手</span>
            <span v-if="scope.row.handleType == 2">1100拉手</span>
            <span v-if="scope.row.handleType == 3">通体拉手</span>
            <span v-if="scope.row.handleType == 4">50斜边镶钻拉手</span>
            <span v-if="scope.row.handleType == 5">联动1号后装拉手</span>
          </template>
        </el-table-column>
        <el-table-column prop="glassColor" label="玻璃颜色">
          <template slot-scope="scope">
            <span v-if="scope.row.glassColor == 1">欧洲灰</span>
            <span v-if="scope.row.glassColor == 2">蓝星灰</span>
            <span v-if="scope.row.glassColor == 3">金茶</span>
            <span v-if="scope.row.glassColor == 4">浅茶</span>
            <span v-if="scope.row.glassColor == 5">长虹</span>
            <span v-if="scope.row.glassColor == 6">白玻</span>
            <span v-if="scope.row.glassColor == 7">黑玻</span>
            <span v-if="scope.row.glassColor == 8">超白春意阑珊</span>
            <span v-if="scope.row.glassColor == 9">丝印黑边</span>

          </template>
        </el-table-column>
        <el-table-column prop="height" label="高度"></el-table-column>
        <el-table-column prop="width" label="宽度"></el-table-column>
        <el-table-column prop="materialNum" label="扇数"></el-table-column>
        <el-table-column prop="hingeLocation" label="合页孔位置"></el-table-column>
        <el-table-column prop="handlePlace" label="拉手位置" width="110"></el-table-column>
        <el-table-column prop="direction" label="开启方向" width="110"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <!-- <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, product.materials)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column> -->

      </el-table>


      <el-divider content-position="left"><span style="color: #b4170f;font-size: large">五金信息</span></el-divider>


      <el-table :data="product.ironwares" height="250" :stripe="true" align="center">
        <el-table-column prop="ironwareName" label="配件名称" width="120"></el-table-column>
        <el-table-column prop="unit" label="单位" width="120"></el-table-column>
        <el-table-column prop="ironwareColor" label="颜色" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.ironwareColor == 0">无</span>
            <span v-if="scope.row.ironwareColor == 1">黑色</span>
            <span v-if="scope.row.ironwareColor == 2">灰色</span>
            <span v-if="scope.row.ironwareColor == 3">金色</span>
          </template>
        </el-table-column>
        <el-table-column prop="specification" label="规格" width="120"></el-table-column>
        <el-table-column prop="ironwareNum" label="数量" width="120"></el-table-column>
        <el-table-column prop="price" label="单价" width="120"></el-table-column>
        <el-table-column prop="totalPrice" label="金额" width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>

        <!-- <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, product.ironwares)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import {parseTime} from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import {getOrderByUser, getMaterialVOById} from '@/api/product.js'


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
          '未确认': '0',
          '已确认': '1',
          '已完成': '2',
          '退单': '2'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        product: {
          isClear: 'true',
          productType: '1',
          customerName: '',
          customerNick: '',
          customerAddr: '',
          customerPhoneNum: '',
          express: '',
          materials: [],//材玻信息
          ironwares: [],//五金信息
          bigPackageNum: '',
          simplePackageNum: '',
          orderDate: '',
          deliveryDate: '',
          orderId: '',
          salesman: '',//业务员
          orderMaker: '',//制单人
          remark: ''
        },

        materialInfo: {

          materialColor: '',
          materialType: '',
          handleType: '',
          glassColor: '',
          height: '',
          width: '',
          hingeLocation: '',
          materialNum: '',
          handlePlace: '',
          direction: '',//开启方向
          remark: '',
          price: '',
          area: '',//面积
          totalPrice: ''
        },

        ironwareInfo: {
          ironwareName: '',
          unit: '',
          ironwareColor: '',
          specification: '',//规格
          ironwareNum: '',
          price: '',
          remark: '',
          totalPrice: ''
        },
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id',
          keyword: ''
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
        statusOptions: ['进行中', '已完成', '已退款', '退单'],
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
      this.fetchData()
    },
    methods: {
      filterStatus(value, row) {
        return row.status === value
      },
      formatDate(value) {

        this.value1 = new Date(value.createdTime);//value.createdTime是prop绑定的字段名称
        let dateValue = this.$moment(this.value1).format("YYYY-MM-DD");//$moment专门转化时间的插件（使用时需要下载引入）
        return dateValue
      }
      ,
      getList() {
        this.listLoading = false
        this.list = [{
          orderId: '门-2004001',
          salesman: '王进喜',
          orderMaker: '刘华荣',
          productType: '成品',
          totalPrice: '3897',
          orderDate: '2020-05-31',
          status: '1'
        }, {
          orderId: '门-2004012',
          salesman: '王进喜',
          orderMaker: '刘华荣',
          productType: '成品',
          totalPrice: '3897',
          orderDate: '2020-05-31',
          status: '2'
        }, {
          orderId: '门-2004014',
          salesman: '王进喜',
          orderMaker: '刘华荣',
          productType: '成品',
          totalPrice: '3897',
          orderDate: '2020-05-31',
          status: '0'
        }]
        this.total = this.list.length

      },

      getMaterial(row) {

        var param = {};
        param.orderUid = row.uid

        getMaterialVOById(param).then(
          response => {
            if (response.code == "success") {
              this.product = response.data;
              this.dialogFormVisible = true
            }else {
              this.$message({
                message: '获取详情失败！',
                type: 'warn'
              })
            }


          }
        )


      },

      fetchData() {
        this.listLoading = true

        var params = {};
        params.currentPage = this.listQuery.currentPage;
        params.keyword = this.listQuery.keyword;
        params.pageSize = this.listQuery.pageSize;
        params.toString();

        getOrderByUser(params).then(
          response => {
            console.log('head获取网站配置', response)
            if (response.code == 'success') {
              this.list = response.data.records
              this.total = response.data.total
              this.listLoading = false
            }
          }
        )

      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      sortChange(data) {
        const {prop, order} = data
        if (prop === 'id') {
          this.sortByID(order)
        }
      },
      sortByID(order) {
        if (order === 'ascending') {
          this.listQuery.sort = '+id'
        } else {
          this.listQuery.sort = '-id'
        }
        this.handleFilter()
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
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            /*createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })*/
          }
        })
      },

      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            /*updateArticle(tempData).then(() => {
              const index = this.list.findIndex(v => v.id === this.temp.id)
              this.list.splice(index, 1, this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })*/
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

      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
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
      }
    }
  }
</script>
