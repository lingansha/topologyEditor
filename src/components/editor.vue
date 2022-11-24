<template>
  <div class="hello">
    <div id="topology"></div>
    <canvas id="test"></canvas>
  </div>
</template>

<script>
import { Topology,deepClone } from "@topology/core";
import { registerHighcharts } from "@topology/chart-diagram";
import { flowPens } from "@topology/flow-diagram";
import { data as dataComPonents } from "./components";
import {
  activityDiagram,
  activityDiagramByCtx,
} from "@topology/activity-diagram";
import { sequencePens, sequencePensbyCtx } from "@topology/sequence-diagram";
import { classPens } from "@topology/class-diagram";
import { register as registerEcharts } from "@topology/chart-diagram";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      options: {
        grid: true,
        rule: true,
      },
      topology: {},
      componentsData: {},
      active:[]
    };
  },
  mounted() {
    this.$eventBus.$on("exitEditor", () => {
      this.exitEditor();
    });
    this.$eventBus.$on("dragstart", (e) => {
      this.onDragstart(e);
    });
    this.$eventBus.$on("onTouchstart", (e) => {
      this.onTouchstart(e);
    });
    //锁定视图
    this.$eventBus.$on("onLocker", () => {
      console.log("locker")
      this.topology.lock(10)
    });
    //解锁视图
    this.$eventBus.$on("unLocker", () => {
      console.log("locker")
      this.topology.lock(0)
    });
    //设置视图大小
    this.$eventBus.$on("scale", (v) => {
      this.topology.scale(v)
    });
    //设置视图大小
    this.$eventBus.$on("fitView", () => {
      this.topology.fitView()
      this.$eventBus.$emit("fitViewComplete",this.topology.store.data.scale)
    });
    //撤销
    this.$eventBus.$on("undo", () => {
      this.topology.undo()
    });
    //重做
    this.$eventBus.$on("redo", () => {
      this.topology.redo()
    });
    //剪切
    this.$eventBus.$on("cut", () => {
      this.topology.cut()
    });
    //复制
    this.$eventBus.$on("copy", () => {
      this.topology.copy()
    });
    //粘贴
    this.$eventBus.$on("paste", () => {
      this.topology.paste()
    });
    //更改连线类型
    this.$eventBus.$on("updateLineType", (e) => {
      for(let data of this.topology.store.active){
        this.topology.updateLineType(data,e);
      }
    });
    //更改画笔属性
    this.$eventBus.$on("setPen", (obj) => {
      console.log(obj,'==setPenobj==')
      this.topology.setValue(obj)
    });
    this.topology = new Topology("topology", this.options);
    this.active =  this.topology.store.active
    for (let info of dataComPonents) {
      this.componentsData[info.name] = info;
    }
    this.topology.beforeAddPens = this.beforeAddPens
   
    console.log(this.componentsData, "==this.componentsData==");
    registerHighcharts();
    registerEcharts();
    this.topology.register(flowPens());
    this.topology.register(activityDiagram());
    // 原生canvas绘画的图库，支持逻辑复杂的需求
    this.topology.registerCanvasDraw(activityDiagramByCtx());
    this.topology.register(sequencePens());
    this.topology.registerCanvasDraw(sequencePensbyCtx());
    this.topology.register(classPens());
    console.log(this.topology, "==this.topology==");
    let that = this
    // this.topology.beforeAddPens = async (pens) => {
    //   console.log("addPens", pens);
    //   // 返回 true 允许 remove
    //   return true
    // };
    this.topology.canvas.onMouseUp = function (base) {
      return function () {
        base.apply(this, arguments);
        console.log(that.topology.store.active,"test")
        that.active = that.topology.store.active
        that.$eventBus.$emit('activeDataReflash',that.active)
      }
    }(this.topology.canvas.onMouseUp);
    // const json = {
    //   x: 0,
    //   y: 0,
    //   scale: 1,
    //   pens: [
    //     {
    //       width: 30,
    //       height: 30,
    //       name: "activityFinal",
    //       id: "5a0f111",
    //       children: [],
    //       x: 191,
    //       y: 207,
    //       lineWidth: 1,
    //       fontSize: 12,
    //       lineHeight: 1.5,
    //       anchors: [
    //         {
    //           id: "0",
    //           penId: "5a0f111",
    //           x: 0.5,
    //           y: 0,
    //         },
    //         {
    //           id: "1",
    //           penId: "5a0f111",
    //           x: 1,
    //           y: 0.5,
    //         },
    //         {
    //           id: "2",
    //           penId: "5a0f111",
    //           x: 0.5,
    //           y: 1,
    //         },
    //         {
    //           id: "3",
    //           penId: "5a0f111",
    //           x: 0,
    //           y: 0.5,
    //         },
    //       ],
    //       rotate: 0,
    //     },
    //     {
    //       name: "radio",
    //       width: 446.25,
    //       height: 30,
    //       disableAnchor: true,
    //       direction: "horizontal",
    //       form: [
    //         {
    //           key: "options",
    //           name: "选项",
    //           type: "code",
    //           language: "json",
    //           isNotString: true,
    //         },
    //         {
    //           key: "direction",
    //           name: "方向",
    //           type: "select",
    //           options: [
    //             {
    //               label: "水平",
    //               value: "horizontal",
    //             },
    //             {
    //               label: "垂直",
    //               value: "vertical",
    //             },
    //           ],
    //         },
    //         {
    //           key: "checked",
    //           name: "选择项",
    //           type: "text",
    //         },
    //       ],
    //       options: [
    //         {
    //           text: "选项一",
    //           isForbidden: true,
    //         },
    //         {
    //           text: "选项二",
    //         },
    //         {
    //           text: "选项三",
    //         },
    //       ],
    //       checked: "选项二",
    //       id: "537a0fb2",
    //       children: [],
    //       x: 504,
    //       y: 293,
    //       lineWidth: 1,
    //       fontSize: 12,
    //       lineHeight: 1.5,
    //       anchors: [
    //         {
    //           id: "0",
    //           penId: "537a0fb2",
    //           x: 0.5,
    //           y: 0,
    //         },
    //         {
    //           id: "1",
    //           penId: "537a0fb2",
    //           x: 1,
    //           y: 0.5,
    //         },
    //         {
    //           id: "2",
    //           penId: "537a0fb2",
    //           x: 0.5,
    //           y: 1,
    //         },
    //         {
    //           id: "3",
    //           penId: "537a0fb2",
    //           x: 0,
    //           y: 0.5,
    //         },
    //       ],
    //       rotate: 0,
    //       checkboxHeight: 30,
    //       optionPos: [0, 148.75, 297.5],
    //       checkboxWidth: 446.25,
    //     },
    //     {
    //       text: "流程",
    //       width: 120,
    //       height: 40,
    //       name: "rectangle",
    //       id: "f11f16f",
    //       children: [],
    //       x: 351,
    //       y: 392,
    //       lineWidth: 1,
    //       fontSize: 12,
    //       lineHeight: 1.5,
    //       anchors: [
    //         {
    //           id: "0",
    //           penId: "f11f16f",
    //           x: 0.5,
    //           y: 0,
    //         },
    //         {
    //           id: "1",
    //           penId: "f11f16f",
    //           x: 1,
    //           y: 0.5,
    //         },
    //         {
    //           id: "2",
    //           penId: "f11f16f",
    //           x: 0.5,
    //           y: 1,
    //         },
    //         {
    //           id: "3",
    //           penId: "f11f16f",
    //           x: 0,
    //           y: 0.5,
    //         },
    //       ],
    //       rotate: 0,
    //     },
    //     {
    //       text: "开始/结束",
    //       width: 120,
    //       height: 40,
    //       borderRadius: 0.5,
    //       name: "rectangle",
    //       id: "70f4e313",
    //       children: [],
    //       x: 92,
    //       y: 352,
    //       lineWidth: 1,
    //       fontSize: 12,
    //       lineHeight: 1.5,
    //       anchors: [
    //         {
    //           id: "0",
    //           penId: "70f4e313",
    //           x: 0.5,
    //           y: 0,
    //         },
    //         {
    //           id: "1",
    //           penId: "70f4e313",
    //           x: 1,
    //           y: 0.5,
    //         },
    //         {
    //           id: "2",
    //           penId: "70f4e313",
    //           x: 0.5,
    //           y: 1,
    //         },
    //         {
    //           id: "3",
    //           penId: "70f4e313",
    //           x: 0,
    //           y: 0.5,
    //         },
    //       ],
    //       rotate: 0,
    //     },
    //   ],
    //   origin: {
    //     x: 0,
    //     y: 0,
    //   },
    //   center: {
    //     x: 0,
    //     y: 0,
    //   },
    //   paths: {},
    //   version: "1.2.12",
    // };
    // this.topology.open(json);

    // 定义一个pen，矩形
    let pen = {
      name: "circle",
      text: "圆形",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      events: [
        {
          name: "click",
          action: () => {
            console.log("test");
          }, // 执行动作
          where: { key: "text", comparison: "==", value: "矩形" }, // 触发条件
          value: "topology.le5le.com",
        },
      ],
    };

    // 方式一：open加载，将清除之前数据
    this.topology.open({ pens: [pen] });

    // // 方式二：添加到画布，并选中，会触发生命周期函数beforeAddPen
    // topology.addPen(pen);

    // // 方式三：仅添加画笔，不选中，不触发生命周期函数，不重绘（不立刻显示），可用于批量添加后，一次重绘
    // topology.canvas.makePen(pen);

    // 选中高亮
    this.topology.active([pen]);
    // 重绘显示
    this.topology.render();
    // 查找方式一：id查找，返回的是数组
    const pens1 = this.topology.find(pen.id);
    setTimeout(() => {
      this.topology.setValue({
        id: pen.id,
        text: "le5le",
      });
      this.topology.inactive();
    }, 10000);
    const params = {
      mqtt: "ws://139.159.142.8:30061/mqtt",
      mqttTopics: "topic1/xxx", // 多个主题用,分割
      mqttOptions: {
        clientId: "string",
        username: "12053a1195d34e90bc2ef50eea1832f7",
        password: "fcae08f0d525478da5a91f8613698bf3",
        // 如果clientId不为空，默认会随机重新生成一个clientId，避免连接冲突
        // 如果设置customClientId=true，不随机生成，使用用户自定义的固定的clientId
        customClientId: false,
      },
    };

    // 方式1
    this.topology.connectMqtt(params);
    this.topology.socketFn = (message, topic) => {
      // Do sth
      console.log(typeof message, topic);
      this.topology.setValue({
        id: pen.id,
        text: JSON.parse(message).msg,
      });
    };
    console.log(pens1, "==pens1==");
    const penx = {
      name: "highcharts",
      x: 100,
      y: 100,
      width: 400,
      height: 200,
      highcharts: {
        option: {
          chart: {
            backgroundColor: "#ffffff00",
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
            },
          ],
        },
      },
    };
    console.log(penx, "==pensx==");
    this.topology.addPen(penx);
    const imgage = {
      text: "",
      width: 100,
      height: 100,
      name: "image",
      image:
        "http://iot.cloudta.cn:30001/bladex/upload/20220602/c8daafcaf9cda133dff504bdc8ecb242.png",
      id: "9dc2be6",
      x: 321,
      y: 257,
    };
    this.topology.addPen(imgage);
    // const gif = {
    //   anchors: [
    //     {
    //       id: "0",
    //       penId: "1bcf065a",
    //       x: 0.5,
    //       y: 0,
    //     },
    //     {
    //       id: "1",
    //       penId: "1bcf065a",
    //       x: 1,
    //       y: 0.4999999999999998,
    //     },
    //     {
    //       id: "2",
    //       penId: "1bcf065a",
    //       x: 0.5,
    //       y: 1.0000000000000004,
    //     },
    //     {
    //       id: "3",
    //       penId: "1bcf065a",
    //       x: 0,
    //       y: 0.4999999999999998,
    //     },
    //   ],
    //   center: {
    //     x: 382.00000000000006,
    //     y: 336.50000000000006,
    //   },
    //   children: [],
    //   fontSize: 12,
    //   height: 185.6666666666667,
    //   id: "1bcf065a",
    //   image: "./test.gif",
    //   imageRatio: true,
    //   lineHeight: 1.5,
    //   lineWidth: 1,
    //   lockedOnCombine: 0,
    //   name: "gif",
    //   rotate: 0,
    //   width: 280.0000000000001,
    //   x: 242,
    //   y: 243.66666666666669,
    // };
    // this.topology.addPen(gif);
    this.topology.inactive();
    document.getElementsByTagName("canvas")[1].style.left = 0;
  },
  beforeDestroy() {
    this.$eventBus.$off("dragstart");
    this.$eventBus.$off("onTouchstart");
  },
  methods: {
    async beforeAddPens(pens){
      console.log("addPens", pens);
      // 1. window.confirm 会阻塞后面代码，不推荐
      // return window.confirm("是否添加此类图元？");

      // 2. Promise 类型 Modal
      // showDialog 伪代码，需自行实现
      // 返回 true 允许 remove
      return true
    },
    addPen(obj) {
      this.topology.addPen(obj);
      this.topology.inactive();
    },
    onDragstart(obj) {
      this.exitEditor()
      console.log(obj);
      const { e, item } = obj;
      console.log(this.componentsData,'==componentsData==')
      let setObj = {
        ...this.componentsData[item.data.name],
        ...item.data,
        ...(item.data.rect ? item.data.rect : {}),
        ...(item.data.data ? item.data.data : {}),
      };
      console.log(setObj, "==setObj==");
      e.dataTransfer.setData("Text", JSON.stringify(setObj));
    },
    onTouchstart(obj) {
      this.exitEditor()
      const {  item } = obj;
      console.log(this.componentsData,item,'==componentsData==')
      let setObj = {
        ...this.componentsData[item.data.name],
        ...item.data,
        ...(item.data.rect ? item.data.rect : {}),
        ...(item.data.data ? item.data.data : {}),
      };
      if(item.name=='涂鸦'||item.name=='涂鸦2'){
        this.topology.drawingPencil()
        return
      }
      if(item.name=='钢笔'){
        this.topology.drawLine('line')
        return
      }
      if(item.name=='钢笔节点'){
        this.topology.drawLine('curve')
        return
      }
      if(item.name=='钢笔闭合节点'){
        this.topology.drawLine('polyline')
        return
      }
      this.topology.canvas.addCaches = deepClone([setObj]);
    },
    exitEditor(){
      const {topology} = this
      topology.inactive();
      topology.stopPencil();
      topology.finishDrawLine();
    },
    save() {
      let obj = {};
      const { color, activeColor, grid, gridColor, gridSize, rule, ruleColor } =
        this.topology.getOptions();
      obj = {
        color,
        activeColor,
        grid,
        gridColor,
        gridSize,
        rule,
        ruleColor,
        ...deepClone(this.topology.store.data),
      };
      console.log(this.topology, "==this.topology==");
      console.log(obj, "==obj==");
      this.saveJSON(obj, "测试.json");
    },
    saveJSON(data, filename) {
      if (!data) {
        alert("保存的数据为空");
        return;
      }
      if (!filename) filename = "json.json";
      if (typeof data === "object") {
        data = JSON.stringify(data);
      }
      var blob = new Blob([data], { type: "text/json" });
      console.log(blob,'==blob==')
      // a标签实现兼容IE下载
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // for Non-IE (chrome, firefox etc.)
        // console.log(blob)
        // 兼容不同浏览器的URL对象
        const downloadUrl = window.URL || window.webkitURL || window.moxURL;
        console.log(downloadUrl);
        console.log(blob);
        // 创建下载链接
        const downloadHref = downloadUrl.createObjectURL(blob);
        // 创建a标签并为其添加属性
        let downloadLink = document.createElement("a");
        downloadLink.href = downloadHref;
        downloadLink.download = filename;
        // 触发点击事件执行下载
        downloadLink.click();
      }
      // console.log("下载完成了，嘿嘿")
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#topology {
  height: 90vh;
  width: 100%;
  position: relative;
}
</style>
