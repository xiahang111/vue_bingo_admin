<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
        <p class="ml-5 colorBlue fw-b">{{item.title}}</p>
        <div>
          <dv-digital-flop :config="item.number" style="width:1.02rem;height:.625rem;"/>
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1">年度大客户榜单</span>
        <dv-scroll-ranking-board :config="ranking" style="height:2.75rem" />
      </div>
      <div class="percent">
        <div class="item bg-color-black">
          <span>今日任务通过率</span>
          <centerChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />
        </div>
        <div class="item bg-color-black">
          <span>今日任务达标率</span>
          <centerChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" />
        </div>
        <div class="item bg-color-black">
          <span>今日任务通过率</span>
          <centerChart :id="rate[2].id" :tips="rate[2].tips" :colorObj="rate[2].colorData" />
        </div>
        <div class="item bg-color-black">
          <span>今日任务通过率</span>
          <centerChart :id="rate[3].id" :tips="rate[3].tips" :colorObj="rate[3].colorData" />
        </div>
        <!--<div class="water">
          <dv-water-level-pond :config="water" style="height: 1.5rem" />
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import centerChart from "../../components/echart/center/centerChartRate";

export default {
  data () {
    return {
      titleItem: [
        {
          title: "今日累计订单数",
          number: {
            number: [18],
            toFixed: 0,
            content: "{nt}"
          }
        },
        {
          title: "本月累计订单数",
          number: {
            number: [375],
            toFixed: 0,
            content: "{nt}"
          }
        },
        {
          title: "本年度累计订单数",
          number: {
            number: [3786],
            toFixed: 0,
            content: "{nt}"
          }
        },
        {
          title: "今日累计销售额",
          number: {
            number: [3725],
            toFixed: 0,
            content: "{nt}"
          }
        },
        {
          title: "当前月累计销售额",
          number: {
            number: ['18762'],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "今年累计销售额",
          number: {
            number: [368],
            toFixed: 0,
            content: "{nt}"
          }
        }
      ],
      ranking: {
        data: [
          {
            name: "刘备",
            value: 378650
          },
          {
            name: "张飞",
            value: 328900
          },
          {
            name: "关羽",
            value: 306748
          },
          {
            name: "诸葛亮",
            value: 287364
          },
          {
            name: "张辽",
            value: 253358
          },
          {
            name: "周瑜",
            value: 228090
          },
          {
            name: "孙权",
            value: 220670
          },
          {
            name: "吕蒙",
            value: 206786
          },
          {
            name: "吕布",
            value: 186790
          },
          {
            name: "夏侯渊",
            value: 178273
          },
        ],
        carousel: "single",
        unit: "元"
      },
      water: {
        data: [24, 45],
        shape: "roundRect",
        formatter: "{value}%",
        waveNum: 3
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: "centerRate1",
          tips: 60,
          colorData: {
            textStyle: "#3fc0fb",
            series: {
              color: ["#00bcd44a", "transparent"],
              dataColor: {
                normal: "#03a9f4",
                shadowColor: "#97e2f5"
              }
            }
          }
        },
        {
          id: "centerRate2",
          tips: 40,
          colorData: {
            textStyle: "#67e0e3",
            series: {
              color: ["#faf3a378", "transparent"],
              dataColor: {
                normal: "#ff9800",
                shadowColor: "#fcebad"
              }
            }
          }
        },
        {
          id: "centerRate3",
          tips: 60,
          colorData: {
            textStyle: "#3fc0fb",
            series: {
              color: ["#00bcd44a", "transparent"],
              dataColor: {
                normal: "#03a9f4",
                shadowColor: "#97e2f5"
              }
            }
          }
        },

        {
          id: "centerRate4",
          tips: 40,
          colorData: {
            textStyle: "#67e0e3",
            series: {
              color: ["#faf3a378", "transparent"],
              dataColor: {
                normal: "#ff9800",
                shadowColor: "#fcebad"
              }
            }
          }
        }
      ]
    };
  },
  components: {
    centerChart
    // centerChart1,
    // centerChart2
  }
};
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 0.0625rem;
      padding-top: 0.2rem;
      margin-top: 0.1rem;
      width: 32%;
      height: 0.875rem;
    }
  }
  .down {
    padding: 0.07rem 0.05rem;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 3.1875rem;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 0.0625rem;
    }
    .ranking {
      padding: 0.125rem;
      width: 59%;
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 1.5rem;
        span {
          margin-top: 0.0875rem;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
      }
    }
  }
}
</style>
