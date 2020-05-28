<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <div>
      <FilenameOption v-model="filename"/>
      <AutoWidthOption v-model="autoWidth"/>
      <BookTypeOption v-model="bookType"/>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document"
                 @click="handleDownload">
        {{ $t('excel.export') }} Excel
      </el-button>
      <!-- <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank"
         style="margin-left:15px;">
        <el-tag type="info">Documentation</el-tag>
      </a> -->
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>

      <!-- 产品ID-->
      <el-table-column align="center" label="产品ID" width="280" prop="uid">
        <template slot-scope="scope">
          {{ scope.row.uid }}
        </template>
      </el-table-column>

      <!-- 产品编号-->
      <el-table-column align="center" label="产品编号" prop="productUid" width="260"></el-table-column>

      <!-- 产品名称-->
      <el-table-column align="center" label="产品名称" prop="联动一号">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.productName }}</el-tag>
        </template>
      </el-table-column>

      <!-- 长度结果-->
      <el-table-column align="center" label="长度结果(mm)"  prop="heightResult">

      </el-table-column>

      <!-- 宽度结果-->
      <el-table-column align="center" label="宽度结果(mm)"  prop="widthResult">

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
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { parseTime } from '@/utils'
  import { getAllGlassCalculate } from '../../../api/product.js'
  // options components
  import FilenameOption from './components/FilenameOption'
  import AutoWidthOption from './components/AutoWidthOption'
  import BookTypeOption from './components/BookTypeOption'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'ExportExcel',
    components: { FilenameOption, AutoWidthOption, BookTypeOption ,Pagination},
    data() {
      return {
        total: 0,
        list: [],
        listLoading: true,
        downloadLoading: false,
        filename: '',
        autoWidth: true,
        bookType: 'xlsx',
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getAllGlassCalculate().then(
          response => {
            console.log('head获取网站配置', response)
            if (response.code == 'success') {
              this.list = response.data
              this.listLoading = false
            }
          }
        )

      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['产品ID', '产品编号', '产品名称', '长度结果(mm)', '宽度结果(mm)', '创建时间']
          const filterVal = ['uid', 'productUid', 'productName', 'heightResult', 'widthResult','createTime']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>

<style>
  .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
  }
</style>
