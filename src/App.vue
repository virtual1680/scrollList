<script setup lang="ts">
import { ref } from "vue";
let data = ref([] as any[]);
let scrollList = ref(null);
let config = ref({
  header: {
    data: ["名称", "类型", "状态", "情况", "日期"],
    height: 40,
    color: "#fff",
    borderColor: "pink",
    borderSize: 1,
  },
  data: data,
  pageSize: 7,
});
const selectItem = (id: string, rowIndex: number, colIndex: number) => {
  console.log(id, rowIndex, colIndex);
};
data.value = [
  { id: "1", value: [1, 2, 3, 4, 5] },
  { id: "2", value: [2, 2, 3, 4, 5] },
  { id: "3", value: [3, 2, 3, 4, 5] },
  { id: "4", value: [4, 2, 3, 4, 5] },
  { id: "5", value: [5, 2, 3, 4, 5] },
  { id: "6", value: [6, 2, 3, 4, 5] },
  { id: "7", value: [7, 2, 3, 4, 5] },
  { id: "8", value: [8, 2, 3, 4, 5] },
  { id: "9", value: [9, 2, 3, 4, 5] },
  { id: "10", value: [10, 2, 3, 4, 5] },
  { id: "11", value: [11, 2, 3, 4, 5] },
  { id: "12", value: [12, 2, 3, 4, 5] },
  { id: "13", value: [13, 2, 3, 4, 5] },
  { id: "14", value: [14, 2, 3, 4, 5] },
  { id: "15", value: [15, 2, 3, 4, 5] },
  { id: "16", value: [16, 2, 3, 4, 5] },
];
setTimeout(() => {
  //一步更新数据
  (scrollList.value as any).pushData([
    { id: "17", value: [17, 22, 23, 24, 25] },
    { id: "18", value: [18, 22, 23, 24, 25] },
    { id: "19", value: [19, 22, 23, 24, 25] },
    { id: "20", value: [20, 22, 23, 24, 25] },
  ]);
}, 10000);
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="bg" style="width:500px;height:300px;margin:0 auto">
    <QScrollList :config="config" @selectItem="selectItem" ref="scrollList"></QScrollList>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.bg {
  background: url("./assets/main-bg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
