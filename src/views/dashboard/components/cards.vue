/**
 * 首页卡片组件
 */
<template>
  <div>
    <el-row style="padding:20px">
      <el-col
        :span="5"
        v-for="(item,index) in ['a', 'b', 'c', 'd']"
        :key="index"
        :offset="(index == 0? 0 : 1)"
      >
        <el-card :class="[{'card-green':index > 1},{'card-blue':index < 2},{'card':true}]">
          <div :title="dataMap[item].v">{{dataMap[item].v}}</div>
          <p>{{dataMap[item].n}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "cards",
  props: { cardData: Array, required: true },
  data() {
    return {
      dataMap: {
        a: {
          v: "网元数（OTN）",
          n: ""
        },
        b: {
          v: "在线网元数（OTN）",
          n: ""
        },
        c: {
          v: "当前业务数（OTN）",
          n: ""
        },
        d: {
          v: "24h新增业务数（MSAP）",
          n: ""
        }
      }
    };
  },
  watch: {
    cardData: {
      immediate: true,
      handler(val) {
        var me = this,
          names = ["网元数", "激活网元数", "当前业务数", "24小时新增业务数"];
        var ks = Object.keys(me.dataMap);
        for (var i in ks) {
          me.dataMap[ks[i]].n = me.cardData[i];
        }
      }
    }
  }
};
</script>

<style scoped>
.card {
  height: 7rem !important;
  text-align: left;
  border: 1px solid #eee !important;
}
.card-blue {
  border-bottom: 2px solid blue !important;
}
.card-green {
  border-bottom: 2px solid green !important;
}
.card div {
  color: #d2d2d2;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem !important;
}
.card p {
  font-size: 1.6rem;
  color: #000;
  margin-top: 1.5rem !important;
  margin-bottom: 0.5rem !important;
}
</style>