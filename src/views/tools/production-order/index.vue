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
            <!-- <el-input ref="searchval" v-model="product.customerNick" placeholder="请输入" style="width: 80%" @input="search()"/> -->
            <el-select v-model="product.customerNick" filterable placeholder="请选择" style="width: 80%" @blur="customerBlur($event)">
              <el-option
              v-for="item in customerSearchList"
              :key="item.customerNick"
              :label="item.nameMapper"
              :value="item.customerNick"
              @click.native="customerSelect(item)">
              </el-option>
            </el-select>
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

        <el-col span="6">
          <el-form-item label="有无天地横梁">
            <el-radio v-model="product.isHaveTransom" label="true">有</el-radio>
            <el-radio v-model="product.isHaveTransom" label="false">没有</el-radio>
          </el-form-item>
        </el-col>
      </el-row>


      <el-divider content-position="left">
        <span style="color: #b4170f">产品信息</span>
      </el-divider>


      <el-row>

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
          <el-form-item label="玻璃颜色">
            <el-select v-model="materialInfo.glassColor" :disabled="product.productType == '2'" placeholder="无玻璃"
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

      </el-row>
      <el-row>
        <el-col span="6">
          <el-form-item label="产品高度">
            <el-input v-model="materialInfo.height" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="产品宽度">
            <el-input v-model="materialInfo.width" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="扇数">
            <el-input v-model="materialInfo.materialNum" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="materialInfo.remark" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>


      </el-row>

      <el-row>

        <el-col span="9">
          <el-form-item label="拉手位置" prop="remark">
            <el-input type="textarea" v-model="materialInfo.handlePlace" :disabled="materialInfo.handleType == '0'"
                      placeholder="请输入"
                      style="width: 80%"/>
          </el-form-item>
        </el-col>


        <el-col span="6">

          <el-form-item label="开启方向">
            <el-input v-model="materialInfo.direction" placeholder="请输入" style="width: 80%"/>
          </el-form-item>

        </el-col>

        <el-col span="6">
          <el-form-item label="角码种类">
            <el-select v-model="materialInfo.cornerMaterial" :disabled="product.productType == 1" placeholder="请选择"
                       style="width: 80%">
              <el-option
                v-for="item in cornerMaterial"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


      </el-row>

      <el-row>
        <el-col span="9">
          <el-form-item label="合页孔位置">
            <el-input type="textarea" v-model="materialInfo.hingeLocation" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
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

      <el-divider content-position="left" v-if="product.isHaveTransom == 'true'">
        <span style="color: #b4170f">天地横梁信息</span>
      </el-divider>

      <el-row v-if="product.isHaveTransom == 'true'">

        <el-col span="6">
          <el-form-item label="横梁种类">
            <el-select v-model="transomInfo.transomType" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in transomType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="横梁颜色">
            <el-select v-model="transomInfo.transomColor" placeholder="请选择" style="width: 80%">
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
          <el-form-item label="横梁长度">
            <el-input v-model="transomInfo.height" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="数量">
            <el-select v-model="transomInfo.transomNum" placeholder="请选择" style="width: 80%">
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

      <el-row v-if="product.isHaveTransom == 'true'">

        <el-col span="6">
          <el-form-item label="单价￥">
            <el-input v-model="transomInfo.price" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

        <el-col span="6">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="transomInfo.remark" placeholder="请输入" style="width: 80%"/>
          </el-form-item>
        </el-col>

      </el-row>

      <el-form-item v-if="product.isHaveTransom == 'true'">
        <el-button type="success" @click="addTransom">添加</el-button>
        <el-button type="info" @click="resetTransom">清空</el-button>
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
      <el-divider><span style="color: #b4170f;font-size: large">产品信息</span></el-divider>

      <el-table :data="product.materials" height="190" :stripe="true" align="center">
        <el-table-column prop="materialType" label="料型号">
          <template slot-scope="scope">
            <span v-if="scope.row.materialType == 1001">联动1号</span>
            <span v-if="scope.row.materialType == 1002">联动2号</span>
            <span v-if="scope.row.materialType == 1003">联动3号</span>
            <span v-if="scope.row.materialType == 1005">联动5号</span>
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
            <span v-if="scope.row.handleType == 4">50斜边镶嵌拉手</span>
            <span v-if="scope.row.handleType == 5">联动1号后装拉手</span>
            <span v-if="scope.row.handleType == 6">镶嵌168拉手</span>
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

        <el-table-column prop="cornerMaterial" label="角码种类">
          <template slot-scope="scope">
            <span v-if="scope.row.cornerMaterial == 0">无角码</span>
            <span v-if="scope.row.cornerMaterial == 1">20锌合金角码</span>
            <span v-if="scope.row.cornerMaterial == 2">20铝芯角码</span>
            <span v-if="scope.row.cornerMaterial == 3">22锌合金角码</span>
            <span v-if="scope.row.cornerMaterial == 4">22铝芯角码</span>
            <span v-if="scope.row.cornerMaterial == 5">上品角码</span>
            <span v-if="scope.row.cornerMaterial == 6">联动1号锌合金角码</span>
            <span v-if="scope.row.cornerMaterial == 7">联动2号铁片角码</span>
            <span v-if="scope.row.cornerMaterial == 8">联动3号铁片角码</span>

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
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="updateMaterialhandle(scope.$index,scope.row)"
              type="text"
              size="small">
              修改
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, product.materials)"
              type="text"
              size="small">
              移除
            </el-button>

          </template>
        </el-table-column>

      </el-table>


      <el-divider><span style="color: #b4170f;font-size: large">五金信息</span></el-divider>


      <el-table :data="product.ironwares" height="190" :stripe="true" align="center">
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
        <!--<el-table-column prop="totalPrice" label="金额" width="120"></el-table-column>-->
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

      <el-divider v-if="product.isHaveTransom == 'true'"><span style="color: #b4170f;font-size: large">天地横梁信息</span>
      </el-divider>


      <el-table :data="product.transoms" v-if="product.isHaveTransom == 'true'" height="200" :stripe="true"
                align="center">
        <el-table-column prop="transomType" label="横料种类" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.transomType == 1">47天地横梁</span>
            <span v-if="scope.row.transomType == 2">55天地横梁</span>
          </template>
        </el-table-column>
        <el-table-column prop="transomColor" label="横梁颜色" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.transomColor == 1">黄铜拉丝</span>
            <span v-if="scope.row.transomColor == 2">古铜拉丝</span>
            <span v-if="scope.row.transomColor == 3">哑黑</span>
            <span v-if="scope.row.transomColor == 4">瓷沙黑</span>
            <span v-if="scope.row.transomColor == 5">罗马灰</span>
            <span v-if="scope.row.transomColor == 6">绅士灰</span>
            <span v-if="scope.row.transomColor == 7">拉丝黑</span>
            <span v-if="scope.row.transomColor == 8">拉丝灰</span>
          </template>
        </el-table-column>
        <el-table-column prop="height" label="横梁长度" width="120"></el-table-column>
        <el-table-column prop="transomNum" label="数量" width="120"></el-table-column>
        <el-table-column prop="price" label="单价" width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>


        <el-table-column label="操作" width="120">
          <template slot-scope="scope">

            <el-button
              @click.native.prevent="deleteRow(scope.$index, product.transoms)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>


    </el-drawer>

    <el-dialog title="" :visible.sync="isUpdateMaterial">

      <el-divider content-position="left">
        <span style="color: #b4170f">修改材料</span>
      </el-divider>

      <el-form ref="updateform" :model="materialUpdateinfo" label-width="120px" :rules="rules">

        <el-form-item label="料型号:">
          <el-select v-model="materialUpdateinfo.materialType" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in productList"
              :key="item.uid"
              :label="item.productName"
              :value="item.uid">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="料颜色:">
          <el-select v-model="materialUpdateinfo.materialColor" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in materialColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="拉手类型:">
          <el-select v-model="materialUpdateinfo.handleType" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in handleType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="玻璃颜色:">
          <el-select v-model="materialUpdateinfo.glassColor" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in glassColor"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="高度:">
          <el-input v-model="materialUpdateinfo.height" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="宽度:">
          <el-input v-model="materialUpdateinfo.width" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="扇数:">
          <el-input v-model="materialUpdateinfo.materialNum" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="合页孔位置:">
          <el-input v-model="materialUpdateinfo.hingeLocation" placeholder="请输入" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="拉手位置:">
          <el-input v-model="materialUpdateinfo.handlePlace" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="开启方向:">
          <el-input v-model="materialUpdateinfo.direction" placeholder="请输入" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="单价:">
          <el-input v-model="materialUpdateinfo.price" placeholder="请输入" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="备注:">
          <el-input v-model="materialUpdateinfo.remark" placeholder="请输入" style="width: 60%"/>
        </el-form-item>


        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="updateMaterial()">修改</el-button>
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
  import {getAllProduct, commitOrder} from '../../../api/product.js'
  import { searchCustomer } from '../../../api/person.js'
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
        isUpdateMaterial: false,
        isUpdateIronware: false,

        customerSearchList: [],
        product: {
          isClear: 'true',
          isHaveTransom: 'false',
          productType: '1',
          customerName: '',
          customerNick: '',
          customerAddr: '',
          customerPhoneNum: '',
          express: '',
          materials: [],//材玻信息
          ironwares: [],//五金信息
          transoms: [],
          bigPackageNum: '',
          simplePackageNum: '',
          orderDate: '',
          deliveryDate: '',
          orderId: '',
          salesman: '',//业务员
          orderMaker: '',//制单人
          remark: ''
        },

        materialUpdateinfo: {
          rowNum: '',
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
          cornerMaterial: '',
          remark: '',
          price: '',
          area: '',//面积
          totalPrice: ''
        },

        materialInfo: {

          materialColor: '',
          materialType: '',
          handleType: '',
          glassColor: '0',
          height: '',
          width: '',
          hingeLocation: '',
          materialNum: '',
          handlePlace: '',
          direction: '',//开启方向
          cornerMaterial: '0',
          remark: '',
          price: '',
          area: '',//面积
          totalPrice: ''

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
        directions: [{value: '对开', label: '对开'},
          {value: '左开', label: '左开'},
          {value: '右开', label: '右开'},
          {value: '上翻', label: '上翻'},
          {value: '下翻', label: '下翻'}],
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
          {value: '9', label: '丝印黑边'},{value: '10', label: '银镜'},{value: '11', label: '超白长虹'}],
        ironwareColor: [{value: '0', label: '无'},
          {value: '1', label: '黑色'},
          {value: '2', label: '灰色'},
          {value: '3', label: '金色'}],
        transomType: [{value: '1', label: '47天地横梁'}, {value: '2', label: '55天地横梁'}],
        cornerMaterial: [{value: '0', label: '无角码'}, {value: '1', label: '20锌合金角码'},
          {value: '2', label: '20铝芯角码'}, {value: '3', label: '22锌合金角码'},
          {value: '4', label: '22铝芯角码'}, {value: '5', label: '上品角码'},
          {value: '6', label: '联动1号锌合金角码'}, {value: '7', label: '联动2号铁片角码'}, {value: '8', label: '联动3号铁片角码'}],
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
          {value: '49', label: '49'},{value: '50', label: '50'}, {value: '1', label: '1'}, {value: '2', label: '2'}, {
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
        handleType: [{value: '0', label: '无拉手'}, {value: '1', label: '168拉手'},
          {value: '2', label: '1100拉手'},
          {value: '3', label: '通体拉手'},
          {value: '4', label: '50斜边镶嵌拉手'}, {value: '5', label: '联动1号后装拉手'}, {value: '6', label: '镶嵌168拉手'}],

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

            commitOrder(this.product).then(response => {

              if (response.code == 'success') {
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
                this.materialInfo = {
                  materialColor: '',
                  materialType: '',
                  handleType: '',
                  glassColor: '0',
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

                this.fullscreenLoading = false;
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
                window.open(process.env.ADMIN_API + url);

              }else {
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
          this.materialInfo = {
            materialColor: '',
            materialType: '',
            handleType: '',
            glassColor: '0',
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

      addTransom() {
        var isValid = true;
        var info = this.transomInfo;

        if (info.transomType == undefined || info.transomType == '') {

          isValid = false;

        }
        if (info.transomColor == undefined || info.transomColor == '') {

          isValid = false;

        }
        if (info.height == undefined || info.height == '') {
          isValid = false;
        }

        if (info.transomNum == undefined || info.transomNum == '') {
          isValid = false;
        }
        if (info.price == undefined || info.price == '') {
          isValid = false;
        }

        if (isValid) {

          var transomInfo = {}

          transomInfo.transomType = this.transomInfo.transomType;
          transomInfo.transomColor = this.transomInfo.transomColor;
          transomInfo.height = this.transomInfo.height;
          transomInfo.transomNum = this.transomInfo.transomNum;
          transomInfo.remark = this.transomInfo.remark;
          transomInfo.price = this.transomInfo.price;


          this.product.transoms.push(transomInfo)
          this.$message({
            message: '添加成功！完成后记得点提交哦',
            type: 'success'
          })

        } else {
          this.$message({
            message: '请先完善横料信息哦~!',
            type: 'warning'
          })
        }

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
          mateInfo.cornerMaterial = this.materialInfo.cornerMaterial;

          this.product.materials.push(mateInfo)
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
      resetMaterials() {
        this.materialInfo.materialColor = '';
        this.materialInfo.handleType = '';
        this.materialInfo.glassColor = '0';
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
      updateIronwareHandle(index, row) {
        this.ironwareUpdateInfo = row
        this.ironwareUpdateInfo.index = index
        this.isUpdateIronware = true
      },
      updateMaterialhandle(index, row) {

        this.materialUpdateinfo = row
        this.materialUpdateinfo.rowNum = index
        this.isUpdateMaterial = true;

      },

      customerSelect(customer){

        console.log(customer);

        this.product.customerNick = customer.customerNick;
        this.product.customerName = customer.customerName;
        this.product.customerPhoneNum = customer.customerPhone;
        this.product.customerAddr = customer.customerAddr;
        this.product.express = customer.express;
      },
      customerBlur(e){
        this.product.customerNick = e.target.value;
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
      updateMaterial() {
        var materialUpdate = {}

        var index = this.materialUpdateinfo.rowNum
        materialUpdate.materialColor = this.materialUpdateinfo.materialColor;
        materialUpdate.materialType = this.materialUpdateinfo.materialType;
        materialUpdate.handleType = this.materialUpdateinfo.handleType;
        materialUpdate.glassColor = this.materialUpdateinfo.glassColor;
        materialUpdate.height = this.materialUpdateinfo.height;
        materialUpdate.width = this.materialUpdateinfo.width;
        materialUpdate.hingeLocation = this.materialUpdateinfo.hingeLocation;
        materialUpdate.materialNum = this.materialUpdateinfo.materialNum;
        materialUpdate.handlePlace = this.materialUpdateinfo.handlePlace;
        materialUpdate.direction = this.materialUpdateinfo.direction;
        materialUpdate.cornerMaterial = this.materialUpdateinfo.cornerMaterial;
        materialUpdate.remark = this.materialUpdateinfo.remark;
        materialUpdate.price = this.materialUpdateinfo.price;

        this.product.materials.splice(index, 1, materialUpdate);
        this.isUpdateMaterial = false;
      }
    },
    created() {

      this.product.orderMaker = this.realName;
      var productVO = local.get('productVO')
      if (productVO != undefined && productVO != '') {
        this.product = productVO;
        this.product.transoms = [];
        if (productVO.isClear) {
          this.product.isClear = "true"
        }else {
          this.product.isClear = "false"
        }

        this.product.orderDate=new Date(productVO.orderDate)
        this.product.deliveryDate=new Date(productVO.deliveryDate)

        local.remove('productVO')
      }

      getAllProduct().then(
        response => {

          console.log('head获取网站配置', response)
          if (response.code == 'success') {

            this.productList = response.data
          }
        }
      )
      searchCustomer().then(response => {
        this.customerSearchList = response.data;
      });
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

