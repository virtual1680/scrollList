# q-scroll-list

### Vue 3 + Typescript + Vite

#### 数据列表向上滚动、无感更新数据

### 安装

npm https://www.npmjs.com/package/q-scroll-list

```
npm install q-scroll-list
or
yarn add q-scroll-list

```

### main.js

```
import QScrollList from 'q-scroll-list';
const app = createApp(App);
app.use(QScrollList);

//简单使用
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

```

### 事件

| 回调方法      | 返回参数                 | 参数类型        | 返回说明      |
| ------------- | ------------------------ | --------------- | ------------- |
| `@selectItem` | `(id,rowIndex,colIndex)` | `(int,int,int)` | 点击行返回 id |
| `pushData`    | `(data)`                 | `(array)`       | 异步更新数据  |

### 参数 config

| 参数名        | 参数类型       | 说明                                        |     |
| ------------- | -------------- | ------------------------------------------- | --- |
| `header`      | `HeaderObject` | 表头配置                                    |
| `type`        | `string`       | 单行滚动：single 分页滚动：page             |
| `data`        | `object[]`     | 列表数据{id:'xx',value:['xx','hh']}         |
| `pageSize`    | `number`       | 一页展示多少行                              |
| `columnWidth` | `number[]`     | 每列的间隔[,,20,]这样第三列为 20,其他列等分 |
| `waitTime`    | `number`       | 动画执行间隔时间                            |
| `selectBg`    | `string`       | 鼠标点击行的背景颜色                        |
| `singleBg`    | `string`       | 奇行背景颜色                                |
| `doubleBg`    | `string`       | 偶行背景颜色                                |

```
注意：
  data 必须包含id及value
  value为每列的数据可以为html字符
```

### 参数 HeaderObject

| 参数名        | 参数类型   | 说明                    |     |
| ------------- | ---------- | ----------------------- | --- |
| `size`        | `number`   | 字体大小                |
| `color`       | `string`   | 字体颜色                |
| `data`        | `string[]` | 表头数据['姓名','公司'] |
| `height`      | `number`   | 表头行高                |
| `borderColor` | `number[]` | 表头下的 border 颜色    |
| `borderSize`  | `number`   | 表头下的 border 大小    |

### 图片

<!-- ![Alt text](https://github.com/QinHongYang/transfer/blob/master/WechatIMG26.png?raw=true) -->

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
