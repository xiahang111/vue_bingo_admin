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

          <el-form-item label="物流信息">
            <el-input v-model="product.express" placeholder="请输入" style="width: 80%"/>
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
        <span style="color: #b4170f">层板灯信息</span>
      </el-divider>


      <el-row>

        <el-col span="6">
          <el-form-item label="材料型号">
            <el-select v-model="laminate.materialType" placeholder="请选择" style="width: 80%">
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
          <el-form-item label="材料颜色">
            <el-select v-model="laminate.materialColor" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in materialColor"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="6" v-if="laminate.materialType != '8003'">
          <el-form-item label="玻璃颜色">
            <el-select v-model="laminate.glassColor" :disabled="product.productType == '2'" placeholder="无玻璃"
                       style="width: 80%">
              <el-option
                v-for="item in glassColor"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- <el-col span="6" v-if="equalCursorPos(laminate.materialType,'酒格层板')"> -->
        <el-col span="6" v-if="laminate.materialType == '8003'">
          <el-form-item label="单管双管类型" prop="remark">
            <el-select v-model="laminate.pipeType" placeholder="请选择"
                       style="width: 80%">
              <el-option
                v-for="item in pipeType"
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
          <el-form-item label="产品宽度">
            <el-input v-model="laminate.width" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="产品深度">
            <el-input v-model="laminate.depth" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="块数">
            <el-select v-model="laminate.laminateNum" placeholder="请选择" style="width: 80%">
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
          <el-form-item label="备注" prop="remark">
            <el-input v-model="laminate.remark" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>


      </el-row>

      <el-row>

        <el-col span="6">

          <el-form-item label="灯位置">
            <el-input v-model="laminate.lightPlace" placeholder="请输入" style="width: 80%"/>
          </el-form-item>

        </el-col>

        <el-col span="6">
          <el-form-item label="出线位置" prop="remark">
            <el-input v-model="laminate.linePlace" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6" v-if="laminate.materialType != '8003'">
          <el-form-item label="灯颜色" prop="remark">
            <el-select v-model="laminate.lightColor" placeholder="请选择"
                       style="width: 80%">
              <el-option
                v-for="item in lightColor"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="6" v-if="laminate.materialType != '8003'">
          <el-form-item label="线颜色" prop="remark">
            <el-select v-model="laminate.lineColor" placeholder="请选择"
                       style="width: 80%">
              <el-option
                v-for="item in lineColor"
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
          <el-form-item label="单价(元/米)">
            <el-input v-model="laminate.price" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

      </el-row>

      <el-form-item>
        <el-button type="success" @click="addLaminate">添加</el-button>
        <el-button type="info" @click="resetLaminate">清空</el-button>
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
            <el-input v-model="ironwareInfo.ironwareNum" placeholder="请输入" style="width: 80%"/>
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
            <el-select v-model="product.bigPackageNum" filterable placeholder="请选择" style="width: 80%">
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
            <el-select v-model="product.simplePackageNum" filterable placeholder="请选择" style="width: 80%">
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
            <el-select v-model="product.salesman" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in salesMans"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
        <el-button type="primary" @click="onSubmit('form')" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction="ttb"
      size="78%"
      :with-header="false">
      <el-divider><span style="color: #b4170f;font-size: large">层板灯信息</span></el-divider>

      <el-table :data="product.laminateInfos" height="250" :stripe="true" align="center">
        <el-table-column prop="materialType" label="料型号">
          <template slot-scope="scope">

            <span v-if="scope.row.materialType == 8001">二代层板灯</span>
            <span v-if="scope.row.materialType == 8002">一代层板灯</span>
            <span v-if="scope.row.materialType == 8003">酒格层板</span>
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
            <span v-if="scope.row.materialColor == 9">欧歌红</span>
            <span v-if="scope.row.materialColor == 10">瓷泳黑</span>
            <span v-if="scope.row.materialColor == 11">拉丝金</span>
            <span v-if="scope.row.materialColor == 12">黑色</span>
            <span v-if="scope.row.materialColor == 13">金色</span>
            <span v-if="scope.row.materialColor == 14">深金色</span>
            <span v-if="scope.row.materialColor == 15">古铜色</span>
            <span v-if="scope.row.materialColor == 16">水性灰</span>

          </template>
        </el-table-column>
        <el-table-column prop="glassColor" label="玻璃颜色">
          <template slot-scope="scope">
            <span v-if="scope.row.glassColor == 0">无玻璃</span>
            <span v-if="scope.row.glassColor == 1">欧洲灰</span>
            <span v-if="scope.row.glassColor == 2">蓝星灰</span>
            <span v-if="scope.row.glassColor == 3">金茶</span>
            <span v-if="scope.row.glassColor == 4">浅茶</span>
            <span v-if="scope.row.glassColor == 5">长虹</span>
            <span v-if="scope.row.glassColor == 6">白玻</span>
            <span v-if="scope.row.glassColor == 7">黑玻</span>
            <span v-if="scope.row.glassColor == 8">超白春意阑珊</span>
            <span v-if="scope.row.glassColor == 9">丝印黑边</span>
            <span v-if="scope.row.glassColor == 10">银镜</span>
            <span v-if="scope.row.glassColor == 11">超白长虹</span>

          </template>
        </el-table-column>

        <el-table-column prop="width" label="宽度"></el-table-column>
        <el-table-column prop="depth" label="深度"></el-table-column>
        <el-table-column prop="laminateNum" label="块数"></el-table-column>
        <el-table-column prop="lightPlace" label="灯位置"></el-table-column>
        <el-table-column prop="linePlace" label="出线位置" width="110"></el-table-column>
        <el-table-column prop="lightColor" label="灯颜色" width="110">
          <template slot-scope="scope">
            <span v-if="scope.row.lightColor == 1">白光</span>
            <span v-if="scope.row.lightColor == 2">暖光</span>
          </template>
        </el-table-column>
        <el-table-column prop="lightColor" label="线颜色" width="110">
          <template slot-scope="scope">
            <span v-if="scope.row.lineColor == 0">无</span>
            <span v-if="scope.row.lineColor == 1">白色</span>
            <span v-if="scope.row.lineColor == 2">黑色</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="updateLaminateHandle(scope.$index,scope.row)"
              type="text"
              size="small">
              修改
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, product.laminateInfos)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-divider><span style="color: #b4170f;font-size: large">五金信息</span></el-divider>


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
        <!-- <el-table-column prop="totalPrice" label="金额" width="120"></el-table-column> -->
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>

        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="updateIronwareHandle(scope.$index,scope.row)"
              type="text"
              size="small">
              修改
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, product.ironwares)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-dialog title="" :visible.sync="isUpdateLaminate">
      <el-divider content-position="left">
        <span style="color: #b4170f">修改材料</span>
      </el-divider>

      <el-form ref="updateform" :model="laminateUpdateInfo" label-width="120px" :rules="rules">

        <el-form-item label="料型号:">
          <el-select v-model="laminateUpdateInfo.materialType" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in productList"
              :key="item.uid"
              :label="item.productName"
              :value="item.uid">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="料颜色:">
          <el-select v-model="laminateUpdateInfo.materialColor" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in materialColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="玻璃颜色:">
          <el-select v-model="laminateUpdateInfo.glassColor" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in glassColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="深度:">
          <el-input v-model="laminateUpdateInfo.depth" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="宽度:">
          <el-input v-model="laminateUpdateInfo.width" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="扇数:">
          <el-input v-model="laminateUpdateInfo.laminateNum" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="灯位置:">
          <el-input v-model="laminateUpdateInfo.lightPlace" placeholder="请输入" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="灯颜色:">
          <el-select v-model="laminateUpdateInfo.lightColor" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in lightColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="线位置:">
          <el-input v-model="laminateUpdateInfo.linePlace" placeholder="请输入" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="线颜色:">
          <el-select v-model="laminateUpdateInfo.lineColor" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in lineColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单价:">
          <el-input v-model="laminateUpdateInfo.price" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="备注:">
          <el-input v-model="laminateUpdateInfo.remark" placeholder="请输入" style="width: 60%"/>
        </el-form-item>


        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="updateLaminate()">修改</el-button>
        </el-form-item>


      </el-form>


    </el-dialog>
    <el-dialog title="" :visible.sync="isUpdateIronware">

      <el-divider content-position="left">
        <span style="color: #b4170f">修改五金</span>
      </el-divider>

      <el-form ref="updateform" :model="ironwareUpdateInfo" label-width="120px" :rules="rules">

        <el-form-item label="五金名称:">
          <el-input v-model="ironwareUpdateInfo.ironwareName" placeholder="请输入" style="width: 60%"/>

        </el-form-item>

        <el-form-item label="单位:">
          <el-input v-model="ironwareUpdateInfo.unit" placeholder="请输入" style="width: 60%"/>

        </el-form-item>

        <el-form-item label="五金颜色:">
          <el-select v-model="ironwareUpdateInfo.ironwareColor" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in ironwareColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格:">
          <el-input v-model="ironwareUpdateInfo.specification" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="数量:">
          <el-input v-model="ironwareUpdateInfo.ironwareNum" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="单价:">
          <el-input v-model="ironwareUpdateInfo.price" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="备注:">
          <el-input v-model="ironwareUpdateInfo.remark" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="updateIronware()">修改</el-button>
        </el-form-item>


      </el-form>


    </el-dialog>


  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import {getAllProduct, commitCBDOrder} from '../../../api/product.js'
  import local from '@/utils/storage'

  export default {
    computed: {
      ...mapGetters([
        'realName'
      ])
    },
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
        isDirectSelect: false,
        fullscreenLoading: false,
        isUpdateLaminate: false,
        isUpdateIronware: false,
        isShowPipe: true,

        product: {
          isClear: 'true',
          isHaveTransom: 'false',
          productType: '1',
          customerName: '',
          customerNick: '',
          customerAddr: '',
          customerPhoneNum: '',
          express: '',
          laminateInfos: [],//材玻信息
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

        laminateUpdateInfo: {
          index: '',
          materialColor: '',
          materialType: '',
          glassColor: '0',
          width: '',
          depth: '',
          laminateNum: '',
          lightPlace: '',
          linePlace: '',
          lightColor: '',//开启方向
          lineColor: '0',
          remark: '',
          price: '',
        },

        laminate: {

          materialColor: '',
          materialType: '',
          materialTypeCode: '',
          glassColor: '0',
          width: '',
          depth: '',
          laminateNum: '',
          lightPlace: '',
          linePlace: '',
          lightColor: '',//开启方向
          lineColor: '0',
          pipeType: '',
          remark: '',
          price: '',

        },
        ironwareUpdateInfo: {
          index: '',
          ironwareName: '',
          unit: '',
          ironwareColor: '',
          specification: '',//规格
          ironwareNum: '',
          price: '',
          remark: '',
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

        transomInfo: {
          transomType: '',
          transomColor: '',
          height: '',
          transomNum: '',
          price: '',
          remark: ''
        },
        lightColor: [{value: '1', label: '白光'},
          {value: '2', label: '暖光'}],
        lineColor: [{value: '0', label: '无'},
          {value: '1', label: '白色'},
          {value: '2', label: '黑色'}],
        pipeType: [{value: '单管', label: '单管'},{value: '双管', label: '双管'}],
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
          {value: '16', label: '水性灰'}],
        glassColor: [{value: '0', label: '无玻璃'}, {value: '1', label: '欧洲灰'},
          {value: '2', label: '蓝星灰'},
          {value: '3', label: '金茶'},
          {value: '4', label: '浅茶'},
          {value: '5', label: '长虹'},
          {value: '6', label: '白玻'},
          {value: '7', label: '黑玻'},
          {value: '8', label: '超白春意阑珊'},
          {value: '9', label: '丝印黑边'},
          {value: '10', label: '银镜'},
          {value: '11', label: '超白长虹'}],
        ironwareColor: [{value: '0', label: '无'},
          {value: '1', label: '黑色'},
          {value: '2', label: '灰色'},
          {value: '3', label: '金色'}],
        salesMans: [{value: '张芫荟', lable: '张芫荟'},{value: '柳红海', lable: '柳红海'},{value: '潘建江', lable: '潘建江'},
          {value: '张博凯', lable: '张博凯'},{value: '梁明辉', lable: '梁明辉'},{value: '夏晓兵', lable: '夏晓兵'},{value: '柳小波', lable: '柳小波'}],
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
          }, {value: '20', label: '20'}, {value: '21', label: '21'}, {value: '22', label: '22'}, {
            value: '23',
            label: '23'
          }, {value: '24', label: '24'},
          {value: '25', label: '25'}, {value: '26', label: '26'}, {value: '27', label: '27'}, {
            value: '28',
            label: '28'
          }, {value: '29', label: '29'}, {value: '30', label: '30'}, {value: '31', label: '31'},
          {value: '32', label: '32'}, {value: '33', label: '33'}, {value: '34', label: '34'}, {
            value: '35',
            label: '35'
          }, {value: '36', label: '36'}, {value: '37', label: '37'}, {value: '38', label: '38'}, {
            value: '39',
            label: '39'
          }, {value: '40', label: '40'},{value: '41', label: '41'},{value: '42', label: '42'},{value: '43', label: '43'},
          {value: '44', label: '44'},{value: '45', label: '45'},{value: '46', label: '46'},{value: '47', label: '47'},{value: '48', label: '48'},
          {value: '49', label: '49'},{value: '50', label: '50'},{value: '51', label: '51'}, {value: '52', label: '52'}, {value: '53', label: '53'}, {
            value: '54',
            label: '54'
          }, {value: '55', label: '55'},
          {value: '56', label: '56'}, {value: '57', label: '57'}, {value: '58', label: '58'}, {
            value: '59',
            label: '59'
          }, {value: '60', label: '60'}, {value: '61', label: '61'},
          {value: '62', label: '62'}, {value: '63', label: '63'}, {value: '64', label: '64'}, {
            value: '65',
            label: '65'
          }, {value: '66', label: '66'},
          {value: '67', label: '67'}, {value: '68', label: '68'}, {value: '69', label: '69'}, {
            value: '70',
            label: '70'
          }, {value: '71', label: '71'}, {value: '72', label: '72'}, {value: '73', label: '73'}, {
            value: '74',
            label: '74'
          }, {value: '75', label: '75'},
          {value: '76', label: '76'}, {value: '77', label: '77'}, {value: '78', label: '78'}, {
            value: '79',
            label: '79'
          }, {value: '80', label: '80'}, {value: '81', label: '81'}, {value: '82', label: '82'},
          {value: '83', label: '83'}, {value: '84', label: '84'}, {value: '85', label: '85'}, {
            value: '86',
            label: '86'
          }, {value: '87', label: '87'}, {value: '88', label: '88'}, {value: '89', label: '89'}, {
            value: '90',
            label: '90'
          }, {value: '91', label: '91'},{value: '92', label: '92'},{value: '93', label: '93'},{value: '94', label: '94'},
          {value: '95', label: '95'},{value: '96', label: '96'},{value: '97', label: '97'},{value: '98', label: '98'},{value: '99', label: '99'},
          {value: '100', label: '100'},{value: '101', label: '101'}],
        productType: [{value: '1', label: '成品'},
          {value: '2', label: '半成品'}],


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
        }


      }
    },

    watch: {
      // "laminate.materialType": 'materialIsEqual'
    },

    methods: {

      deleteRow(index, rows) {
        rows.splice(index, 1);
      },


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

        this.fullscreenLoading = true;

        this.$refs[formName].validate((valid) => {

          if (valid) {

            commitCBDOrder(this.product).then(response => {

              if (response.code == 'fail') {

                this.$message({
                  message: response.data,
                  type: 'warning'
                })
              }

              if (response.code == 'success') {
                this.product.isClear = 'true'
                this.product.productType = '1'
                this.product.customerName = ''
                this.product.customerNick = ''
                this.product.customerAddr = ''
                this.product.customerPhoneNum = ''
                this.product.laminateInfos = []
                this.product.ironwares = []
                this.product.transoms = []
                this.product.bigPackageNum = ''
                this.product.simplePackageNum = ''
                this.product.orederDate = ''
                this.product.customerAddr = ''
                this.product.orderDate = ''
                this.product.deliveryDate = ''
                this.product.orderId = ''
                this.product.salesman = ''
                this.product.remark = ''
                this.transomInfo = {
                  transomType: '',
                  transomColor: '',
                  height: '',
                  transomNum: '',
                  price: '',
                  remark: ''
                }
                this.laminate = {
                  materialColor: '',
                  materialType: '',
                  glassColor: '0',
                  width: '',
                  depth: '',
                  laminateNum: '',
                  lightPlace: '',
                  linePlace: '',
                  lightColor: '',//开启方向
                  lineColor: '0',
                  remark: '',
                  price: '',
                },
                  this.ironwareInfo = {
                    ironwareName: '',
                    unit: '',
                    ironwareColor: '',
                    specification: '',//规格
                    ironwareNum: '',
                    price: '',
                    remark: '',
                    totalPrice: ''
                  }

                this.$message({
                  message: "添加成功!",
                  type: 'success'
                })

                this.fullscreenLoading = false;

                let fileNames = response.data

                let url = '/order/excelDownload?fileNames=';
                for (let i = 0; i < fileNames.length; i++) {

                  if (i == 0) {
                    url = url + fileNames[i]
                  } else {
                    url = url + "," + fileNames[i]
                  }

                }
                window.open(process.env.ADMIN_API + url);

              } else {
                this.fullscreenLoading = false;
                this.$message({
                  message: response.data,
                  type: 'warning'
                })
              }
            })
          } else {
            this.fullscreenLoading = false;
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

        this.product.isClear = 'true'
        this.product.productType = '1'
        this.product.customerName = ''
        this.product.customerNick = ''
        this.product.customerAddr = ''
        this.product.customerPhoneNum = ''
        this.product.materials = []
        this.product.ironwares = []
        this.product.transoms = []
        this.product.bigPackageNum = ''
        this.product.simplePackageNum = ''
        this.product.orederDate = ''
        this.product.deliveryDate = ''
        this.product.orderId = ''
        this.product.salesman = ''
        this.product.remark = ''
        this.transomInfo = {
          transomType: '',
          transomColor: '',
          height: '',
          transomNum: '',
          price: '',
          remark: ''
        },

          this.ironwareInfo = {
            ironwareName: '',
            unit: '',
            ironwareColor: '',
            specification: '',//规格
            ironwareNum: '',
            price: '',
            remark: '',
            totalPrice: ''
          }


        this.$message({
          message: '数据清空成功!',
          type: 'success'
        })
      },

      addLaminate() {


        var isValid = true;
        var info = this.laminate;

        if (info.materialColor == undefined || info.materialColor == '') {
          isValid = false;
        }

        if (info.depth == undefined || info.depth == '') {
          isValid = false;
        }
        if (info.width == undefined || info.width == '') {
          isValid = false;
        }

        if (info.laminateNum == undefined || info.laminateNum == '') {
          isValid = false;
        }

        if (info.price == undefined || info.price == '') {
          isValid = false;
        }
        if (info.materialType == undefined || info.materialType == '') {
          isValid = false;
        }
        if (isValid) {

          var laminateInfo = {}
          laminateInfo.materialColor = this.laminate.materialColor;
          laminateInfo.materialType = this.laminate.materialType;
          laminateInfo.glassColor = this.laminate.glassColor;
          laminateInfo.depth = this.laminate.depth;
          laminateInfo.width = this.laminate.width;
          laminateInfo.laminateNum = this.laminate.laminateNum;
          laminateInfo.lightPlace = this.laminate.lightPlace;
          laminateInfo.linePlace = this.laminate.linePlace;
          laminateInfo.lightColor = this.laminate.lightColor;
          laminateInfo.lineColor = this.laminate.lineColor;
          laminateInfo.remark = this.laminate.remark;
          laminateInfo.price = this.laminate.price;
          laminateInfo.pipeType = this.laminate.pipeType

          this.product.laminateInfos.push(laminateInfo)
          this.$message({
            message: '添加成功！完成后记得点提交哦',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请先完善产品信息哦~!',
            type: 'warning'
          })

        }


      },

      resetTransom() {

        this.transomInfo.transomType = '',
          this.transomInfo.transomColor = '',
          this.transomInfo.height = '',
          this.transomInfo.transomNum = '',
          this.transomInfo.price = '',
          this.transomInfo.remark = ''
      },
      resetLaminate() {
        this.laminate.materialColor = '';
        this.laminate.glassColor = '0';
        this.laminate.depth = '';
        this.laminate.width = '';
        this.laminate.laminateNum = '';
        this.laminate.lightPlace = '';
        this.laminate.linePlace = '';
        this.laminate.lightColor = '';
        this.laminate.lineColor = '';
        this.laminate.price = '';
        this.laminate.remark = '';
      },

      materialIsEqual(){
        alert(this.laminate.materialType);
        if(this.laminate.materialType == '8003'){
          this.isShowPipe = true
        }else {
          this.isShowPipe = false
        }

      },
      addIronwareInfo() {


        var isValid = true;
        var info = this.ironwareInfo;

        if (info.ironwareName == undefined || info.ironwareName == '') {
          isValid = false;
        }

        if (info.ironwareColor == undefined || info.ironwareColor == '') {
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
      updateLaminateHandle(index, row) {
        this.laminateUpdateInfo = row
        this.ironwareUpdateInfo.index = index
        this.isUpdateLaminate = true
      },
      updateIronwareHandle(index, row) {
        this.ironwareUpdateInfo = row
        this.ironwareUpdateInfo.index = index
        this.isUpdateIronware = true
      },
      updateIronware() {
        var ironwareUpdate = {}
        var index = this.ironwareUpdateInfo.index
        ironwareUpdate.ironwareName = this.ironwareUpdateInfo.ironwareName;
        ironwareUpdate.unit = this.ironwareUpdateInfo.unit;
        ironwareUpdate.ironwareColor = this.ironwareUpdateInfo.ironwareColor;
        ironwareUpdate.specification = this.ironwareUpdateInfo.specification;
        ironwareUpdate.ironwareNum = this.ironwareUpdateInfo.ironwareNum;
        ironwareUpdate.price = this.ironwareUpdateInfo.price;
        ironwareUpdate.remark = this.ironwareUpdateInfo.remark;

        this.product.ironwares.splice(index, 1, ironwareUpdate)

        this.isUpdateIronware = false;
      },
      updateLaminate() {
        var laminateUpdate = {}

        var index = this.laminateUpdateInfo.rowNum
        laminateUpdate.materialColor = this.laminateUpdateInfo.materialColor;
        laminateUpdate.materialType = this.laminateUpdateInfo.materialType;
        laminateUpdate.glassColor = this.laminateUpdateInfo.glassColor;
        laminateUpdate.depth = this.laminateUpdateInfo.depth;
        laminateUpdate.width = this.laminateUpdateInfo.width;
        laminateUpdate.laminateNum = this.laminateUpdateInfo.laminateNum;
        laminateUpdate.lightPlace = this.laminateUpdateInfo.lightPlace;
        laminateUpdate.lightColor = this.laminateUpdateInfo.lightColor;
        laminateUpdate.linePlace = this.laminateUpdateInfo.linePlace;
        laminateUpdate.lineColor = this.laminateUpdateInfo.lineColor;
        laminateUpdate.remark = this.laminateUpdateInfo.remark;
        laminateUpdate.price = this.laminateUpdateInfo.price;


        this.product.laminateInfos.splice(index, 1, laminateUpdate);
        this.isUpdateLaminate = false;

      },
    },
    created() {

      this.product.orderMaker = this.realName;
      var productVO = local.get('productVO')
      if (productVO != undefined && productVO != '') {
        this.product = productVO;
        this.product.laminateInfos = [];

        if (productVO.isClear) {
          this.product.isClear = "true"
        } else {
          this.product.isClear = "false"
        }

        this.product.orderDate=new Date(productVO.orderDate)
        this.product.deliveryDate=new Date(productVO.deliveryDate)
        local.remove('productVO')
      }

      var params = {}
      params.productType = 2;
      getAllProduct(params).then(
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

