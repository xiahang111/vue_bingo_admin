<template>
  <div class="app-container">

    <el-form ref="form" :model="product" label-width="120px" :rules="rules">

      <el-divider content-position="left">
        <span style="color: #b4170f">基本信息</span>
      </el-divider>

      <el-row>
        <el-col span="6">
          <el-form-item label="产品类型">
            <el-select v-model="product.productType" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in productType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col span="6">

          <el-form-item label="客户名称">
            <el-input v-model="product.customerNick" placeholder="请输入" style="width: 80%"/>
          </el-form-item>

        </el-col>

        <el-col span="6">

          <el-form-item label="收货人名称">
            <el-input v-model="product.customerName" placeholder="请输入" style="width: 80%"/>
          </el-form-item>

        </el-col>

        <el-col span="6">

          <el-form-item label="收货地址">
            <el-input v-model="product.customerAddr" placeholder="请输入" style="width: 80%"/>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col span="6">

          <el-form-item label="收货人手机号">
            <el-input v-model="product.customerPhoneNum" placeholder="请输入" style="width: 80%"/>
          </el-form-item>

        </el-col>

        <el-col span="6">
          <el-form-item label="是否为净尺寸">
            <el-radio v-model="product.isClear" label="true">是</el-radio>
            <el-radio v-model="product.isClear" label="false">不是</el-radio>
          </el-form-item>
        </el-col>
      </el-row>


      <el-divider content-position="left">
        <span style="color: #b4170f">料玻信息</span>
      </el-divider>


      <el-row>
        <el-col span="6">
          <el-form-item label="材料颜色">
            <el-select v-model="materialInfo.materialColor" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in materialColor"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="材料型号">
            <el-select v-model="materialInfo.materialType" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in productList"
                :key="item.uid"
                :label="item.productName"
                :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col span="6">
          <el-form-item label="拉手种类">
            <el-select v-model="materialInfo.handleType" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in handleType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="玻璃颜色">
            <el-select v-model="materialInfo.glassColor" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in glassColor"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col span="6">
          <el-form-item label="产品长度" v-if="!product.isBatch">
            <el-input v-model="materialInfo.height" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="产品宽度" v-if="!product.isBatch">
            <el-input v-model="materialInfo.width" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="扇数">
            <el-select v-model="materialInfo.materialNum" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in nums"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="合页孔位置">
            <el-input v-model="materialInfo.hingeLocation" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>

        <el-col span="6">
          <el-form-item label="拉手位置" prop="remark">
            <el-input v-model="materialInfo.handlePlace" :disabled="materialInfo.handleType == '0'" placeholder="请输入"
                      style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="开启方向" prop="orderDate">
            <el-select v-model="materialInfo.direction" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in directions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col span="6">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="materialInfo.remark" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-col span="6">

        </el-col>

        <el-col span="6">
          <el-form-item label="单价￥">
            <el-input v-model="materialInfo.price" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="success" @click="addMaterials">添加</el-button>
        <el-button type="info" @click="resetMaterials">清空</el-button>
      </el-form-item>

      <el-divider content-position="left">
        <span style="color: #b4170f">五金信息</span>
      </el-divider>

      <el-row>

        <el-col span="6">
          <el-form-item label="配件名称">
            <el-input v-model="ironwareInfo.ironwareName" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="单位">
            <el-input v-model="ironwareInfo.unit" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>


        <el-col span="6">

          <el-form-item label="配件颜色" prop="materialColor">
            <el-select v-model="ironwareInfo.ironwareColor" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in ironwareColor"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ironwareInfo.remark" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>


      </el-row>

      <el-row>

        <el-col span="6">
          <el-form-item label="规格">
            <el-input v-model="ironwareInfo.specification" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="数量">
            <el-select v-model="ironwareInfo.ironwareNum" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in nums"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="单价￥">
            <el-input v-model="ironwareInfo.price" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="success" @click="addIronwareInfo">添加</el-button>
        <el-button type="info" @click="resetIronwares">清空</el-button>
      </el-form-item>

      <el-divider content-position="left">
        <span style="color: #b4170f">包装信息</span>
      </el-divider>

      <el-row>

        <el-col span="6">
          <el-form-item label="大包装数量">
            <el-select v-model="product.bigPackageNum" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in nums"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="小包装数量">
            <el-select v-model="product.simplePackageNum" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in nums"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

      <el-divider content-position="left">
        <span style="color: #b4170f">其他信息</span>
      </el-divider>

      <el-row>
        <el-col span="6">

          <el-form-item label="下单日期" prop="orderDate">
            <el-date-picker
              v-model="product.orderDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

        </el-col>

        <el-col span="6">

          <el-form-item label="交货日期" prop="orderDate">
            <el-date-picker
              v-model="product.deliveryDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

        </el-col>

        <el-col span="6">
          <el-form-item label="备注">
            <el-input v-model="product.remark" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col span="6">
          <el-form-item label="订单编号">
            <el-input v-model="product.orderId" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="业务员">
            <el-input v-model="product.salesman" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="制单人">
            <el-input v-model="product.orderMaker" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 按钮 -->
      <el-form-item>
        <el-button @click="drawer = true" type="warning" align="right">
          预览
        </el-button>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <el-divider><span style="color: #00cc66;font-size: large">料玻信息</span></el-divider>

      <el-table :data="product.materials" :border="true" :stripe="true" align="left">
        <el-table-column prop="materialType" label="料型号" width="120"></el-table-column>
        <el-table-column prop="materialColor" label="料颜色" width="120"></el-table-column>
        <el-table-column prop="handleType" label="拉手类型" width="120"></el-table-column>
        <el-table-column prop="glassColor" label="玻璃颜色" width="120"></el-table-column>

      </el-table>

      <el-table :data="product.materials" :border="true" :stripe="true" align="left">
        <el-table-column prop="height" label="高度" width="110"></el-table-column>
        <el-table-column prop="width" label="宽度" width="110"></el-table-column>
        <el-table-column prop="materialNum" label="扇数" width="110"></el-table-column>
        <el-table-column prop="hingeLocation" label="合页孔位置" width="110"></el-table-column>
        <el-table-column prop="handlePlace" label="拉手位置" width="110"></el-table-column>

      </el-table>

      <el-table :data="product.materials" :border="true" :stripe="true" align="left">
        <el-table-column prop="direction" label="开启方向" width="110"></el-table-column>
        <el-table-column prop="area" label="平方数" width="110"></el-table-column>
        <el-table-column prop="price" label="单价" width="110"></el-table-column>
        <el-table-column prop="totalPrice" label="金额" width="110"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>


      <el-divider><span style="color: #00cc66;font-size: large">五金信息</span></el-divider>


      <el-table :data="product.ironwares" :border="true" :stripe="true" align="left">
        <el-table-column prop="ironwareName" label="配件名称" width="120"></el-table-column>
        <el-table-column prop="unit" label="单位" width="120"></el-table-column>
        <el-table-column prop="ironwareColor" label="颜色" width="120"></el-table-column>
        <el-table-column prop="specification" label="规格" width="120"></el-table-column>

      </el-table>

      <el-table :data="product.ironwares" :border="true" :stripe="true" align="left">
        <el-table-column prop="ironwareNum" label="数量" width="120"></el-table-column>
        <el-table-column prop="price" label="单价" width="120"></el-table-column>
        <el-table-column prop="totalPrice" label="金额" width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>

      </el-table>


    </el-drawer>


  </div>
</template>

<script>

  import {getAllProduct, commitOrder} from '../../../api/product.js'

  export default {
    data() {

      var checkBatchData = (rule, value, callback) => {
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
        drawer: false,

        product: {
          isClear: 'true',
          productType: '1',
          customerName: '',
          customerNick: '',
          customerAddr: '',
          customerPhoneNum: '',
          materials: [],//材玻信息
          ironwares: [],//五金信息
          bigPackageNum: '1',
          simplePackageNum: '1',
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
          direction: '1',//开启方向
          remark: '',
          price: '',
          area: '0',//面积
          totalPrice: '0'
        },

        ironwareInfo: {
          ironwareName: '',
          unit: '',
          ironwareColor: '0',
          specification: '',//规格
          ironwareNum: '',
          price: '',
          remark: '',
          totalPrice: '0'
        },
        directions: [{value: '1', label: '对开'},
          {value: '2', label: '左开'},
          {value: '3', label: '右开'},
          {value: '4', label: '上翻'},
          {value: '5', label: '下翻'}],
        materialColor: [{value: '1', label: '黄铜拉丝'},
          {value: '2', label: '古铜拉丝'},
          {value: '3', label: '哑黑'},
          {value: '4', label: '瓷沙黑'},
          {value: '5', label: '罗马灰'},
          {value: '6', label: '绅士灰'},
          {value: '7', label: '拉丝黑'},
          {value: '8', label: '拉丝灰'}],
        glassColor: [{value: '1', label: '欧洲灰'},
          {value: '2', label: '蓝星灰'},
          {value: '3', label: '金茶'},
          {value: '4', label: '浅茶'},
          {value: '5', label: '花虹'},
          {value: '6', label: '白玻'},
          {value: '7', label: '黑玻'},
          {value: '8', label: '超白春意阑珊'},
          {value: '9', label: '丝印黑边'}],
        ironwareColor: [{value: '0', label: '无'},
          {value: '1', label: '黑色'},
          {value: '2', label: '灰色'},
          {value: '3', label: '金色'}],
        nums: [{value: '0', label: '0'}, {value: '1', label: '1'}, {value: '2', label: '2'}, {
          value: '3',
          label: '3'
        }, {value: '4', label: '4'},
          {value: '5', label: '5'}, {value: '6', label: '6'}, {value: '7', label: '7'}, {
            value: '8',
            label: '8'
          }, {value: '9', label: '9'}, {value: '10', label: '10'},
          {value: '11', label: '11'}, {value: '12', label: '12'}, {value: '13', label: '13'}, {
            value: '14',
            label: '14'
          }, {value: '15', label: '15'},
          {value: '16', label: '16'}, {value: '17', label: '17'}, {value: '18', label: '18'}, {
            value: '19',
            label: '19'
          }, {value: '20', label: '20'},],
        productType: [{value: '1', label: '成品'},
          {value: '2', label: '半成品'}],
        handleType: [{value: '0', label: '无拉手'}, {value: '1', label: '168拉手'},
          {value: '2', label: '1100拉手'},
          {value: '3', label: '通体拉手'},
          {value: '4', label: '50斜边镶钻拉手'}],

        rules: {
          width: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {type: 'number', message: '请输入数字', trigger: 'blur', transform: (value) => Number(value)}
          ],
          height: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {type: 'number', message: '请输入数字', trigger: 'blur', transform: (value) => Number(value)}
          ],
          batchData: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {validator: checkBatchData, trigger: 'blur'}
          ],
          notBlank: [
            {required: true, message: '字段不能为空', trigger: 'blur'}
          ]
        },
        productList: [],
        pickerOptions: {

          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }


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

            commitOrder(this.product).then(response => {

              if (response.code == 'fail') {

                this.$message({
                  message: response.data,
                  type: 'warning'
                })
              }

              if (response.code == 'success') {
                this.product.isClear = 'true'
                this.product.productType = ''
                this.product.customerName = ''
                this.product.customerNick = ''
                this.product.customerAddr = ''
                this.product.customerPhoneNum = ''
                this.product.materials = []
                this.product.ironwares = []
                this.product.bigPackageNum = '0'
                this.product.simplePackageNum = '0'
                this.product.orederDate = ''
                this.product.deliveryDate = ''
                this.product.orderId = ''
                this.product.salesman = ''
                this.product.orderMaker = ''
                this.product.remark = ''

                this.$message({
                  message: "添加成功!",
                  type: 'success'
                })


                let fileNames = response.data

                let url = '/order/excelDownload?fileNames=';
                for (let i = 0; i < fileNames.length; i++) {

                  if (i == 0) {
                    url = url + fileNames[i]
                  } else {
                    url = url + "," + fileNames[i]
                  }

                }
                alert(url)
                window.open(process.env.ADMIN_API + url);

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
      },
      addMaterials() {

        var isValid = true;
        var info = this.materialInfo;

        if (info.materialColor == undefined || info.materialColor == '') {

          isValid = false;

        }
        if (info.handleType == undefined || info.handleType == '') {
          isValid = false;
        }
        if (info.glassColor == undefined || info.glassColor == '') {
          isValid = false;
        }
        if (info.height == undefined || info.height == '') {
          isValid = false;
        }
        if (info.width == undefined || info.width == '') {
          isValid = false;
        }

        if (info.direction == undefined || info.direction == '') {
          isValid = false;
        }

        if (info.price == undefined || info.price == '') {
          isValid = false;
        }
        if (info.materialType == undefined || info.materialType == '') {
          isValid = false;
        }
        if (isValid) {

          this.materialInfo.area = (this.materialInfo.height * this.materialInfo.width * this.materialInfo.materialNum / 1000000).toFixed(2)
          this.materialInfo.totalPrice = (this.materialInfo.area * this.materialInfo.price).toFixed(2);

          var mateInfo = {}

          mateInfo.materialColor = this.materialInfo.materialColor;
          mateInfo.materialType = this.materialInfo.materialType;
          mateInfo.handleType = this.materialInfo.handleType;
          mateInfo.glassColor = this.materialInfo.glassColor;
          mateInfo.height = this.materialInfo.height;
          mateInfo.width = this.materialInfo.width;
          mateInfo.materialNum = this.materialInfo.materialNum;
          mateInfo.handlePlace = this.materialInfo.handlePlace;
          mateInfo.direction = this.materialInfo.direction;
          mateInfo.remark = this.materialInfo.remark;
          mateInfo.price = this.materialInfo.price;
          mateInfo.area = this.materialInfo.area;
          mateInfo.totalPrice = this.materialInfo.totalPrice;
          mateInfo.hingeLocation = this.materialInfo.hingeLocation;

          this.product.materials.push(mateInfo)
          this.$message({
            message: '添加成功！完成后记得点提交哦',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请先完善材玻信息哦~!',
            type: 'warning'
          })

        }


      },
      resetMaterials() {
        this.materialInfo.materialColor = '';
        this.materialInfo.handleType = '';
        this.materialInfo.glassColor = '';
        this.materialInfo.height = '';
        this.materialInfo.width = '';
        this.materialInfo.materialNum = '';
        this.materialInfo.handlePlace = '';
        this.materialInfo.direction = '';
        this.materialInfo.remark = '';
        this.materialInfo.price = '';
        this.materialInfo.materialType = '';
      },
      addIronwareInfo() {


        var isValid = true;
        var info = this.ironwareInfo;

        if (info.ironwareName == undefined || info.ironwareName == '') {
          isValid = false;
        }
        if (info.unit == undefined || info.unit == '') {
          isValid = false;
        }
        if (info.ironwareColor == undefined || info.ironwareColor == '') {
          isValid = false;
        }
        if (info.specification == undefined || info.specification == '') {
          isValid = false;
        }
        if (info.price == undefined || info.price == '') {
          isValid = false;
        }
        if (info.ironwareNum == undefined || info.ironwareNum == '') {
          isValid = false;
        }

        if (isValid) {

          this.ironwareInfo.totalPrice = this.ironwareInfo.price * this.ironwareInfo.ironwareNum

          var ironInfo = {}

          ironInfo.ironwareName = this.ironwareInfo.ironwareName;
          ironInfo.unit = this.ironwareInfo.unit;
          ironInfo.ironwareColor = this.ironwareInfo.ironwareColor;
          ironInfo.specification = this.ironwareInfo.specification;
          ironInfo.ironwareNum = this.ironwareInfo.ironwareNum;
          ironInfo.price = this.ironwareInfo.price;
          ironInfo.remark = this.ironwareInfo.remark;
          ironInfo.totalPrice = this.ironwareInfo.totalPrice;

          this.product.ironwares.push(ironInfo)
          this.$message({
            message: '添加成功！完成后记得点提交哦',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请先完善五金信息哦~!',
            type: 'warning'
          })

        }
      },
      resetIronwares() {

        this.ironwareInfo.ironwareName = '';
        this.ironwareInfo.unit = '';
        this.ironwareInfo.ironwareColor = '';
        this.ironwareInfo.specification = '';
        this.ironwareInfo.ironwareNum = '';
        this.ironwareInfo.price = '';

      },
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
<style>
  .line {
    text-align: center;
  }

  .el-table thead {
    color: #1f1b1b
  }

</style>

