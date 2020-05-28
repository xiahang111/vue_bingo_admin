<template>
  <div class="app-container">
    <el-form ref="form" :model="product" label-width="120px" :rules="rules">

      <el-form-item label="产品名称" prop="productId">
        <el-col :span="6">
          <el-select v-model="product.productId" placeholder="请选择" >
            <!-- <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" /> -->
            <el-option v-for="item in productList" :key="item.uid" :label="item.productName" :value="item.uid">

            </el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="产品长度(mm)" prop="height" v-if="!product.isBatch">
        <el-col :span="3">
          <el-input v-model="product.height" placeholder="请输入" :disabled="product.isBatch"/>
        </el-col>
      </el-form-item>

      <el-form-item label="产品宽度(mm)" prop="width" v-if="!product.isBatch">
        <el-col :span="3">
          <el-input v-model="product.width" placeholder="请输入" :disabled="product.isBatch"/>
        </el-col>
      </el-form-item>
      <!-- 日期选择 -->
      <!-- <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item> -->

      <!-- 开关选择 -->
      <el-form-item label="批量输入">
        <el-switch v-model="product.isBatch" @change="batchChange('form')">

        </el-switch>
      </el-form-item>

      <!-- 多选 -->
      <!-- <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item> -->

      <!-- 单选选 -->
      <!-- <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item> -->

      <!-- 描述表单 -->
      <el-form-item label="数据输入" prop="batchData" v-if="product.isBatch">
        <el-input v-model="product.batchData" placeholder="请输入,格式:a,b;c,d;(例:100,200;300,400;)" type="textarea" :disabled="!product.isBatch"/>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>
    <el-table :data="productResultList" style="width: 100%" align="center">
      <el-table-column prop="productUid" label="产品编号" width="180"></el-table-column>
      <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
      <el-table-column prop="heightResult" label="长度结果" width="180"></el-table-column>
      <el-table-column prop="widthResult" label="宽度结果" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>


  import { getAllProduct, glassCalculate,getAllGlassCalculate } from '../../../api/product.js'

  export default {
    data() {

      var checkBatchData = (rule,value,callback) => {
        if (value === '') {
          callback(new Error('请输入数据'));
        } else {
          let reg = /^(\d{1,4},\d{1,4};){1,100}/
          if (reg.test(value) === false) {
            callback(new Error('数据不符合规范'));
          } else {
            callback();
          }
        }
      };

      return {

        product: {

          width: '',
          height: '',
          isBatch: false,
          batchData: '',
          productId: ''
        },
        rules: {
          width: [
            { required: true, message: '字段不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur', transform: (value) => Number(value) }
          ],
          height: [
            { required: true, message: '字段不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur', transform: (value) => Number(value) }
          ],
          batchData: [
            { required: true, message: '字段不能为空', trigger: 'blur' },
            { validator: checkBatchData,trigger: 'blur'}
          ],
          productId: [
            { required: true, message: '字段不能为空', trigger: 'blur' }
          ]
        },
        productList: [],
        productResultList: []

      }
    },

    methods: {

      handleDelete(index, row) {
        console.log(index, row)
        this.productResultList.splice(index, 1)
      },
      batchChange(formName) {

        this.$refs[formName].resetFields()

        if (!this.product.isBatch) {

          this.product.isBatch = false

        } else {

          this.product.isBatch = true
        }

      }

      ,
      onSubmit(formName) {

        this.$refs[formName].validate((valid) => {

          if (valid) {

            glassCalculate(this.product).then(response => {
              if (response.code === 'success') {
                this.productResultList = this.productResultList.concat(response.data)

                this.product.batchData = ''
                this.product.width = ''
                this.product.height = ''
                this.product.productId = ''

              }
            })
          } else {
            this.$message({
              message: '请完善表格信息！！!',
              type: 'warning'
            })
            return false;
          }

        });


      }
      ,
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    },
    created() {

      getAllProduct().then(
        response => {
          console.log('head获取网站配置', response)
          if (response.code == 'success') {
            this.productList = response.data
          }
        }
      )
    }

  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

