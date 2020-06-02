<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单编号" >
      <template slot-scope="scope">
        {{ scope.row.orderId }}
      </template>
    </el-table-column>
    <el-table-column label="价格" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.totalPrice  }}
      </template>
    </el-table-column>

    <el-table-column label="业务员" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.salesman  }}
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status==1?'进行中':'已完成' }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getIndexOrderInfo } from '@/api/index'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {

      getIndexOrderInfo().then(response =>{
        if(response.code == 'success'){

          this.list = response.data
        }
      })

    }
  }
}
</script>
