<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">任务完成排行榜</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="width:3.375rem;height:4.28rem" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ["业务员", "订单号", "价格"],
        data: [
          ["柳洪海", "H-门2012005", "<span  class='colorRed'>2890</span>"],
          ["潘建江", "Z-门2012009", "<span  class='colorRed'>369</span>"],
          ["张博凯", "L-门2012008", "<span  class='colorRed'>744</span>"],
          ["柳小波", "K-门2012013", "<span  class='colorRed'>689</span>"],
          ["梁明辉", "厂-门2012003", "<span  class='colorRed'>1263</span>"],
          ["柳洪海", "H-门2012005", "<span  class='colorRed'>885</span>"],
          ["潘建江", "Z-门2012009", "<span  class='colorRed'>900</span>"],
          ["张博凯", "L-门2012008", "<span  class='colorRed'>527</span>"],
          ["柳小波", "K-门2012013", "<span  class='colorRed'>1128</span>"],
          ["梁明辉", "厂-门2012003", "<span  class='colorRed'>600</span>"]
          //["组件10", "dev-9", "<span  class='colorGrass'>↑76%</span>"] ["潘建江", "Z-门2012009", "<span  class='colorRed'>↓33%</span>"],
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50],
        align: ["center"]
      }
    };
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
#centreRight1 {
  padding: 0.2rem;
  height: 5.125rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 4.8125rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
}
</style>