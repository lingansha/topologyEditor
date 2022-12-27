<template>
  <div class="hello">
    <div id="topology"></div>
  </div>
</template>

<script>
import  {topology as Topology}  from "./topoligy";
import { deepClone } from "@topology/core";

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
import { update,drawingTopng } from "@/api/drawing.js";
import {proxyRequest} from "@/api/proxy.js"
import {getPenAuthInfoParmas,getTopic} from "@/utils/util"
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
      active: [],
      topicMap:{}
    };
  },
  watch:{
    'topology.store.pens':{
      handler:function(){
        for(let key in this.topology.store.pens){
          if(this.topology.store.pens[key].communication){
            if(this.topology.store.pens[key].communication.authentication.url){
              let obj = getPenAuthInfoParmas(this.topology.store.pens[key])
              proxyRequest(obj).then(res=>{
                  if(res.code==200){
                  let arr = this.topology.store.pens[key].communication.authentication.field.split('.')
                  let token = res.data
                  if(arr.length){
                    for(let data of arr){
                      token = token[data]
                    }
                  }
                  this.topology.store.pens[key].communication.authentication.token = token
                }
              })
              
            }
          }
        }
      }
    }
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
      console.log("locker");
      this.topology.lock(10);
    });
    //锁定视图
    this.$eventBus.$on("onLocker2", () => {
      console.log("locker");
      this.topology.lock(2);
    });
    //解锁视图
    this.$eventBus.$on("unLocker", () => {
      console.log("locker");
      this.topology.lock(0);
    });
    //设置视图大小
    this.$eventBus.$on("scale", (v) => {
      this.topology.scale(v);
    });
    //设置视图大小
    this.$eventBus.$on("fitView", () => {
      this.topology.fitView();
      this.$eventBus.$emit("fitViewComplete", this.topology.store.data.scale);
    });
    //撤销
    this.$eventBus.$on("undo", () => {
      this.topology.undo();
    });
    //重做
    this.$eventBus.$on("redo", () => {
      this.topology.redo();
    });
    //剪切
    this.$eventBus.$on("cut", () => {
      this.topology.cut();
    });
    //复制
    this.$eventBus.$on("copy", () => {
      this.topology.copy();
    });
    //粘贴
    this.$eventBus.$on("paste", () => {
      this.topology.paste();
    });
    //更改连线类型
    this.$eventBus.$on("updateLineType", (e) => {
      for (let data of this.topology.store.active) {
        this.topology.updateLineType(data, e);
      }
    });
    //更改画笔属性
    this.$eventBus.$on("setPen", (obj) => {
      console.log(obj, "==setPenobj==");
      this.topology.setValue(obj);
    });
    //播放动画
    this.$eventBus.$on("startAnimate", (penid) => {
      this.topology.startAnimate(penid);
    });
    //暂停动画
    this.$eventBus.$on("pauseAnimate", (penid) => {
      this.topology.pauseAnimate(penid);
    });
    //结束动画
    this.$eventBus.$on("stopAnimate", (penid) => {
      this.topology.stopAnimate(penid);
    });
    // //播放自定义动画
    // this.$eventBus.$on("customAnimateStart", (pen) => {
    //   this.topology.customAnimateStart(pen);
    // });
    // //停止自定义动画
    // this.$eventBus.$on("customAnimateStop", (pen) => {
    //   this.topology.customAnimateStop(pen);
    // });
    // //暂停自定义动画
    // this.$eventBus.$on("customAnimatePause", (pen) => {
    //   this.topology.customAnimatePause(pen);
    // });
    
    //保存
    this.$eventBus.$on("saveTopo", () => {
      console.log("保存");
      this.save();
    });
    //下载
    this.$eventBus.$on("download", () => {
      console.log("下载");
      this.download();
    });
    //打开json
    this.$eventBus.$on("openJson", (json) => {
      console.log(json, "===json===");
      this.topology.clear();
      this.topology.open(json);
      this.mqttInt()
      this.topology.lock(0);
      this.topology.inactive();
    });
    //链接mqtt
    this.$eventBus.$on("connectMqtt", (params) => {
      this.mqttInt(params)
    });
    //放大镜
    this.$eventBus.$on("toggleMagnifier", (prams) => {
      this.topology.toggleMagnifier();
    });
    //鹰眼
    this.$eventBus.$on("showMap", (prams) => {
      if(prams){
        this.topology.showMap();
      }else{
        this.topology.hideMap();
      }
     
    });
    //开始钢笔
    this.$eventBus.$on("drawLine", () => {
      this.topology.drawLine('curve');
    });
    //开始铅笔
    this.$eventBus.$on("drawingPencil", () => {
      this.topology.drawingPencil();
    });
    const topology = new Topology("topology", this.options);
    this.topology = topology;
    this.$store.dispatch("setTopology", this.topology).then(() => {
      console.log("==dispatch(setTopology)==");
    });
    this.active = this.topology.store.active;
    for (let info of dataComPonents) {
      this.componentsData[info.name] = info;
    }
    this.topology.beforeAddPens = this.beforeAddPens;

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
    // let that = this;
    // this.topology.beforeAddPens = async (pens) => {
    //   console.log("addPens", pens);
    //   // 返回 true 允许 remove
    //   return true
    // };
    //重写onMouseUp方法
    // this.topology.canvas.onMouseUp = (function (base) {
    //   return function () {
    //     base.apply(this, arguments);
    //     console.log(that.topology.store.active, "test");
    //     that.active = that.topology.store.active;
    //     that.$eventBus.$emit("activeDataReflash", that.active);
    //   };
    // })(this.topology.canvas.onMouseUp);
    //mqtt推送回调数据处理
    this.topology.socketFn = (message, topic) => {
      // Do sth
      console.log(message, topic);
      console.log(this.topicMap)
      this.topology.setValue({id:this.topicMap[topic],text:JSON.parse(message).msg})
    };
    //事件的action 对应的值
    // enum EventAction {
    //     Link,0
    //     SetProps,1
    //     StartAnimate,2
    //     PauseAnimate,3
    //     StopAnimate,4
    //     Function,5
    //     WindowFn,6
    //     Emit,7
    //   }
    // 方式1
    // 事件的示例
    // const pen = {
    //   id:"mypen",
    //   name: "rectangle",
    //   text: "矩形xxxxx",
    //   x: 100,
    //   y: 100,
    //   width: 100,
    //   height: 100,
    //   events: [
    //     {
    //       name: "valueUpdate",
    //       action: 5, // 执行动作
    //       where:{
    //                     "type": "comparison",
    //                     "value": "7",
    //                     "key": "text",
    //                     "comparison": ">"
    //       },
    //       value: "2ds.le5le.com",
    //       fn: ()=>{
    //         console.log("test")
    //       }
    //     },
    //   ],
    // };
    // var i = 0;
    // setInterval(()=>{
    //   i++
    //   this.topology.setValue({id:"mypen",text:i});
    // },5000)
    //this.topology.addPen(pen);
    document.getElementsByTagName("canvas")[1].style.left = 0;
    this.topology.inactive();
  },
  beforeDestroy() {
    this.$eventBus.$off("dragstart");
    this.$eventBus.$off("onTouchstart");
    this.$eventBus.$off("exitEditor");
    this.$eventBus.$off("onLocker");
    this.$eventBus.$off("onLocker2");
    this.$eventBus.$off("unLocker");
    this.$eventBus.$off("scale");
    this.$eventBus.$off("fitView");
    this.$eventBus.$off("undo");
    this.$eventBus.$off("redo");
    this.$eventBus.$off("cut");
    this.$eventBus.$off("copy");
    this.$eventBus.$off("paste");
    this.$eventBus.$off("updateLineType");
    this.$eventBus.$off("setPen");
    this.$eventBus.$off("startAnimate");
    this.$eventBus.$off("pauseAnimate");
    this.$eventBus.$off("stopAnimate");
    this.$eventBus.$off("saveTopo");
    this.$eventBus.$off("download");
    this.$eventBus.$off("openJson");
    this.$eventBus.$off("connectMqtt");
  },
  methods: {
    async beforeAddPens(pens) {
      console.log("addPens", pens);
      // 1. window.confirm 会阻塞后面代码，不推荐
      // return window.confirm("是否添加此类图元？");

      // 2. Promise 类型 Modal
      // showDialog 伪代码，需自行实现
      // 返回 true 允许 remove
      return true;
    },
    addPen(obj) {
      this.topology.addPen(obj);
      this.topology.inactive();
    },
    onDragstart(obj) {
      this.exitEditor();
      console.log(obj);
      const { e, item } = obj;
      console.log(this.componentsData, "==componentsData==");
      let setObj = {
        ...this.componentsData[item.data.name],
        type: 0,
        ...item.data,
        ...(item.data.rect ? item.data.rect : {}),
        ...(item.data.data ? item.data.data : {}),
      };
      console.log(setObj, "==setObj==");
      e.dataTransfer.setData("Text", JSON.stringify(setObj));
    },
    onTouchstart(obj) {
      this.exitEditor();
      const { item } = obj;
      console.log(this.componentsData, item, "==componentsData==");
      let setObj = {
        ...this.componentsData[item.data.name],
        type: 0,
        ...item.data,
        ...(item.data.rect ? item.data.rect : {}),
        ...(item.data.data ? item.data.data : {}),
      };
      if (item.name == "涂鸦" || item.name == "涂鸦2") {
        this.topology.drawingPencil();
        return;
      }
      if (item.name == "钢笔") {
        this.topology.drawLine("line");
        return;
      }
      if (item.name == "钢笔节点") {
        this.topology.drawLine("curve");
        return;
      }
      if (item.name == "钢笔闭合节点") {
        this.topology.drawLine("polyline");
        return;
      }
      this.topology.canvas.addCaches = deepClone([setObj]);
    },
    exitEditor() {
      const { topology } = this;
      topology.inactive();
      topology.stopPencil();
      topology.finishDrawLine();
    },
    async save() {
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
      let params = {
        drawingId: this.$route.query.drawingId
          ? this.$route.query.drawingId
          : undefined,
        data: JSON.stringify(obj),
      };
      var blob = this.topology.toPng();
      let file = this.base64toFile(blob,this.$route.query.drawingId)
      var formData = new FormData();
			formData.append("file", file);
      formData.append('data',JSON.stringify(params));
      // await drawingTopng(formData)
      let res = await update(formData);
      console.log(res);
      if (res.code == 200) {
        this.$message.success("保存成功");
      }
    },
    //data:base64图片格式字符串
    //filename：文件名称
   base64toFile(data, fileName) {
          const dataArr = data.split(",");
          const byteString = atob(dataArr[1]);
          const options = {
            type: "image/jpeg",
            endings: "native"
          };
          const u8Arr = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            u8Arr[i] = byteString.charCodeAt(i);
          }
          return new File([u8Arr], fileName + ".jpg", options);//返回文件流
    },
    download() {
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
      this.saveJSON(
        obj,
        obj.name ? obj.name + ".json" : Date.parse(new Date()) + ".json"
      );
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
      console.log(blob, "==blob==");
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
    mqttInt(params){
      if(!params){
        console.log('===mqttInt==')
        for(let key in this.topology.store.pens){
          if(getTopic(this.topology.store.pens[key])){
            this.topicMap[getTopic(this.topology.store.pens[key])] = key
          }
        }
      }else{
        this.topology.closeMqtt()
        console.log(this.topology.store.pens)
        let string =''
        for(let key in this.topology.store.pens){
          if(getTopic(this.topology.store.pens[key])){
            string = string + ','+ getTopic(this.topology.store.pens[key])
            this.topicMap[getTopic(this.topology.store.pens[key])] = key
          }
        }
        string = string.slice(1)
        params.mqttTopics = string
        console.log(params,'==params==')
        this.topology.connectMqtt(params);
      }
      
    }
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
