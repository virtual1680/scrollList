<template>
  <div class="box" ref="boxRef" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div class="header" :style="`height:${config.header.height}px;line-height:${config.header.height}px;border-bottom:${config.header.borderSize}px solid ${config.header.borderColor};`">
      <div v-for="(item, index) in config.header.data" :style="`width:${widths[index]}px;color:${config.header.color}`" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="list" @click.stop="selectItem">
      <div class="item" v-for="(item, index) in data" :key="item.itemIndex" :style="`height:${heights[index]}px;background:${
					sIndex===item.itemIndex?config.selectBg:item.itemIndex % 2 === 0 ? config.doubleBg : config.singleBg
				};line-height:${heights[index]}px;`">
        <div class="col" v-for="(col, ci) in item.value" :data-item="`${item.id}-${index}-${ci}`" :data-sindex="item.itemIndex" :key="ci" :style="`width:${widths[ci]}px`" v-html="col"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted, Ref } from "vue";
export default defineComponent({
  name: "QScrollList",
  props: {
    config: {
      type: Object,
      default: {},
    },
  },
  setup(props, { emit }) {
    let configDefault = ref({
      header: {
        size: 14,
        color: "#f60",
        data: [],
        height: 40,
        borderColor: "#f60",
        borderSize: 2,
      },
      type: "single", //single  page
      data: [], //列表数据
      pageSize: 5, //一页展示多少个，通过个数算出高度,
      columnWidth: [],
      waitTime: 4000, //延时动画时间（毫秒）
      selectBg: "pink", //选中的行背景色
      singleBg: "", //单行背景
      //双行背景
      doubleBg:
        "linear-gradient(276deg, rgba(28, 149, 255, 0) 0%, rgba(2, 115, 213, 0.5) 50%, rgba(3, 125, 232, 0) 100%)",
    });
    let config: any = ref(null);

    let header = Object.assign(configDefault.value.header, props.config.header);
    config.value = Object.assign(configDefault.value, {
      ...props.config,
      header,
    });

    // console.log(config.value.header);
    let sIndex = ref(-1);
    let boxRef: Ref<HTMLElement | null> = ref(null); //获取盒子宽高
    let data = ref([] as any[]); //展示数据
    let copyData = ref([] as any[]); //对数据进行操作用于展示
    let heights = ref([] as number[]); //每行的高度
    let widths = ref([] as number[]); //每行的col宽度
    let animationIndex = ref(0); //分页截取数据
    let animationFrame = 0; //动画id
    let stop = false; //鼠标移入判断是否可以停止动画
    let isCancel = false; //鼠标移入判断当前执行的动画是否取消，决定是否重新执行动画
    //计算高度
    const computedHeight = () => {
      const {
        header: { height },
        pageSize,
        data,
      } = config.value;
      let rowHeight = boxRef.value!!.clientHeight - height;
      let avgHeight = rowHeight / pageSize;
      heights.value = new Array(data.length).fill(avgHeight);
    };
    //计算宽度
    const computedWidth = () => {
      const {
        columnWidth,
        header: { data: headerData },
      } = config.value;
      let colNum = headerData.length;
      let rowWidth = boxRef.value!!.clientWidth;
      let avgWidth = rowWidth / colNum;
      if (columnWidth.length > 0 && columnWidth instanceof Array) {
        let cwl = columnWidth.length - 1;
        let arr = new Array(colNum).fill(0);
        arr.forEach((item: number, index: number) => {
          if (cwl >= index) {
            let w = columnWidth[index] != null ? columnWidth[index] : avgWidth;
            widths.value.push(w);
          } else {
            //TODO 此处应该减去有的数据
            widths.value.push(avgWidth);
          }
        });
      } else {
        widths.value = new Array(colNum).fill(avgWidth);
      }
    };
    //初始化数据
    const initData = () => {
      let header = Object.assign(
        configDefault.value.header,
        props.config.header
      );
      config.value = Object.assign(configDefault.value, {
        ...props.config,
        header,
      });
      const { data: rowData } = config.value;
      data.value = rowData.map((item: any, index: number) => {
        return {
          ...item,
          itemIndex: index + 1,
        };
      });
      copyData.value = data.value;
      computedWidth();
      computedHeight();
      if (!animationFrame && data.value.length) {
        begin();
      }
    };
    watch(
      () => props.config.data,
      () => {
        animationFrame && cancelAnimationFrame(animationFrame);
        initData();
      }
    );
    //提供方法给父组件调用 用于push数据到列表中
    const pushData = (arr: any[]) => {
      if (!arr.length) {
        console.warn("push data not is null");
        return false;
      }
      const { pageSize } = config.value;
      arr.forEach((item, index) => {
        // console.log(copyData.value.length);
        if (!Reflect.has(item, "id")) {
          console.warn('data item not "id" key');
        }
        let slotPoint = copyData.value.length;
        if (slotPoint % 2 === 0) {
          copyData.value.splice(pageSize + 2, 0, {
            ...item,
            itemIndex: copyData.value.length + 1,
          });
        } else {
          copyData.value.splice(pageSize + 3, 0, {
            ...item,
            itemIndex: copyData.value.length + 1,
          });
        }
      });
    };
    //选中数据返回id rowIndex colIndex
    const selectItem = (e: Event) => {
      const dataset = (e.target as HTMLDivElement).dataset;
      const index = dataset.sindex;
      // console.log("-=-=-=-=-=-=-=", index);
      sIndex.value = parseInt(index ?? "-1");
      try {
        let param = dataset.item?.split("-");
        emit("selectItem", ...(param ?? "error"));
      } catch (err) {
        console.warn("render data error");
      }
    };
    //开始执行动画
    const begin = async () => {
      animationFrame && cancelAnimationFrame(animationFrame);
      const { pageSize, type, waitTime } = config.value;

      await new Promise((resolve) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve(1);
        }, waitTime);
      });
      if (type === "single") {
        //单行
        let index = animationIndex.value ? 1 : 0;
        heights.value.splice(0, 1, ...new Array(1).fill(0));
        if (index) {
          let ff = copyData.value.shift();
          copyData.value.push(ff!!);
        }
        animationIndex.value += 1;
      } else {
        //多行
        let index = animationIndex.value ? 0 : 1;
        heights.value.splice(0, 1, ...new Array(1).fill(0));
        let kk = copyData.value.splice(0, pageSize - index);
        copyData.value.push(...kk);
        animationIndex.value += pageSize;
      }

      data.value = copyData.value.slice(0, pageSize + 1);
      animationFrame = requestAnimationFrame(begin);
      console.log(stop);
      if (stop) {
        isCancel = true;
        cancelAnimationFrame(animationFrame);
      }
    };
    const onMouseenter = () => {
      isCancel = false;
      stop = true;
    };
    const onMouseleave = () => {
      stop = false;
      //如果鼠标移除前动画还没取消就不需要重新执行
      isCancel && begin();
    };
    onMounted(() => {
      initData();
    });

    return {
      boxRef,
      data,
      begin,
      heights,
      config,
      onMouseenter,
      onMouseleave,
      widths,
      selectItem,
      pushData,
      sIndex,
    };
  },
});
</script>
<style lang="scss">
.box {
  width: 100%;
  height: 100%;
  border: 1px solid #f60;
  overflow: hidden;
  .header {
    display: flex;
    font-size: 14px;
    div {
      overflow: hidden;
    }
  }
  .list {
    width: 100%;
    overflow: hidden;
    .item {
      overflow: hidden;
      transition: all 0.3s;
      display: flex;
      .col {
        color: #fff;
      }
    }
  }
}
</style>
