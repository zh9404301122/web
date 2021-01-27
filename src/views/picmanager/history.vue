<template>
  <el-card>
    <div style="height: 600px" id="echarts"></div>
  </el-card>
</template>

<script>
import { options } from "./common/echartLine";
import { commodityHistoryList } from "@/api/pic";

export default {
  name: "history",
  data() {
    return {
      yAxis: [],
      xAxis: [],
      id: "",
      name: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.id = vm.$route.query.id;
      vm.name = vm.$route.query.name;
      vm.getList();
    });
  },
  mounted() {},
  methods: {
    getInit(xAxis, yAxis) {
      this.$echarts
        .init(document.getElementById("echarts"))
        .setOption(options(xAxis || [], yAxis || [], this.name || ""));
    },
    formatData() {
      const d = new Date();
      const y = d.getFullYear();
      const m =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      return y + "-" + m;
    },
    getList() {
      const data = {
        equal: {
          id: this.id,
          createTime: this.formatData(),
        },
        pageDataCount: 100,
        queryPageNum: 1,
      };
      commodityHistoryList(data).then((res) => {
        if (res.success) {
          res.list.map((v, k) => {
            this.xAxis.push(v.createTime);
            this.yAxis.push(v.price);
          });
          this.xAxis.reverse();
          this.yAxis.reverse();
          this.getInit(this.xAxis, this.yAxis);
        }
      });
    },
  },
};
</script>

<style>
</style>