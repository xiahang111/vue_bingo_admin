<template>
  <div class="app-container">
    <div class="filter-container">

      <el-upload
        class="upload-demo"
        drag
        show-file-list
        action="http://localhost:8501/api-web/order/upload"
        :with-credentials='true'
        :headers="headers"
        :on-success="successReturn"
        :before-upload="beforeUp"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xls文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import { getMaterialRecordByQuery } from '../../../api/product.js'
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination'
  import {getToken} from "../../../utils/auth"; // secondary package based on el-pagination

  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]

  // arr to obj, such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'ComplexTable',
    components: { Pagination },
    directives: { waves },
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
        loading:{}
      }
    },
    created() {
      this.getList()
    },
    computed: {
      headers() {
        return {
          Authorization: getToken()
        }
      }
    },
    methods: {

      doUpload(file){
        console.log(file);
        alert("文件上传"+file);
      },
      beforeUp(){
        this.openFullScreen2();
        return;
      },
      successReturn(res){
        this.loading.close();
        let fileNames = res.data
        console.log("返回参数"+fileNames);
        let url = '/order/excelDownload?fileNames=';
        if (fileNames.length > 0){
          for (let i = 0; i < fileNames.length; i++) {

            if (i == 0) {
              url = url + fileNames[i]
            } else {
              url = url + "," + fileNames[i]
            }

          }
          window.open(process.env.ADMIN_API + url);
        }
      },
      openFullScreen2() {
          this.loading = this.$loading({
          lock: true,
          text: '拼命生成中~请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }

    }
  }
</script>
