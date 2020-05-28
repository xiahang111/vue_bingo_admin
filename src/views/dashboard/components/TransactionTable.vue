<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单概览" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status==='pending'?'进行中':'已完成' }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'

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
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.list = [{order_no:"3Dbb4EF-bbA7-01aa-c4cF-C3D0e73f5e1B",timestamp:"520573885433",status:"pending",price:6017.8,username:"李冠群"},
        {order_no:"3Dbb4EF-bbA7-01aa-c4cF-C3D0e73f5e1B",timestamp:"520573885433",status:"pending",price:6017.8,username:"李冠群"},
        {order_no:"3Dbb4EF-bbA7-01aa-c4cF-C3D0e73f5e1B",timestamp:"520573885433",status:"pending",price:6017.8,username:"李冠群"},
        {order_no:"3Dbb4EF-bbA7-01aa-c4cF-C3D0e73f5e1B",timestamp:"520573885433",status:"pending",price:6017.8,username:"李冠群"},
        {order_no:"3Dbb4EF-bbA7-01aa-c4cF-C3D0e73f5e1B",timestamp:"520573885433",status:"pending",price:6017.8,username:"李冠群"},
        {order_no:"3Dbb4EF-bbA7-01aa-c4cF-C3D0e73f5e1B",timestamp:"520573885433",status:"pending",price:6017.8,username:"李冠群"},
        {order_no:"3Dbb4EF-bbA7-01aa-c4cF-C3D0e73f5e1B",timestamp:"520573885433",status:"pending",price:6017.8,username:"李冠群"}]

    }
  }
}
</script>
