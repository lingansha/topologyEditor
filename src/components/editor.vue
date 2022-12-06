<template>
  <div class="hello">
    <div id="topology"></div>
    <canvas id="test"></canvas>
  </div>
</template>

<script>
import { Topology, deepClone } from "@topology/core";
Topology.prototype.customAnimateStart = function (pen) {
  pen.copyPen = deepClone(pen)
  pen.customAnimateStart = true
  this.customAnimate(pen)
};
Topology.prototype.customAnimateStop = function (pen) {
  pen.customAnimateStart = false
  console.log(pen,"stop")
};
Topology.prototype.customAnimatePause = function (pen) {
  if(!pen.pause){
    pen.pause = true
    return
  }
  pen.pause = !pen.pause
};
Topology.prototype.customAnimate = function (pen) {
  if(!pen.customAnimateStart){
    this.setValue(pen.copyPen)
    return
  }
  if(pen.pause){
    pen.pausePen = deepClone(pen)
    return
  }
  var __values =
    (this && this.__values) ||
    function (o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number")
        return {
          next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          },
        };
      throw new TypeError(
        s ? "Object is not iterable." : "Symbol.iterator is not defined."
      );
    };
  var now = Date.now();
  function initPrevFrame(pen) {
    pen.prevFrame = {};
    for (var k in pen) {
      if (typeof pen[k] !== "object" || k === "lineDash") {
        pen.prevFrame[k] = pen[k];
      }
    }
    pen.prevFrame.rotate = 0;
    pen.prevFrame.x = 0;
    pen.prevFrame.y = 0;
    pen.prevFrame.scale = 1;
  }
  function setNodeAnimate(pen, now) {
    var e_4, _a, e_5, _b;
    if (pen.calculative.start === 0 || !pen.frames || !pen.frames.length) {
      pen.calculative.start = undefined;
      return 0;
    }
    if (!pen.calculative.duration) {
      pen.calculative.duration = 0;
      try {
        for (
          var _c = __values(pen.frames), _d = _c.next();
          !_d.done;
          _d = _c.next()
        ) {
          var f = _d.value;
          pen.calculative.duration += f.duration;
          for (var k in f) {
            if (k !== "duration" && !pen[k]) {
              if (k === "scale") {
                pen[k] = 1;
              }
            }
          }
        }
      } catch (e_4_1) {
        e_4 = { error: e_4_1 };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        } finally {
          if (e_4) throw e_4.error;
        }
      }
    }
    if (!pen.animateCycle) {
      pen.animateCycle = Infinity;
    }
    if (!pen.calculative.start) {
      pen.calculative.start = now;
      pen.calculative.frameIndex = 0;
      pen.calculative.frameStart = pen.calculative.start;
      pen.calculative.frameDuration = pen.frames[0].duration;
      pen.calculative.frameEnd =
      pen.calculative.frameStart + pen.calculative.frameDuration;
      pen.calculative.cycleIndex = 1;
      pen.calculative.x = pen.calculative.worldRect.x;
      pen.calculative.y = pen.calculative.worldRect.y;
      pen.calculative.initRect = deepClone(pen.calculative.worldRect);
      pen.calculative.initRect.rotate = pen.calculative.rotate || 0;
      initPrevFrame(pen);
    } else {
      var frameIndex = 0;
      var cycleIndex = Math.ceil(
        (now - pen.calculative.start) / pen.calculative.duration
      );
      // 播放结束
      if (cycleIndex > pen.animateCycle) {
        pen.calculative.start = undefined;
        setNodeAnimateProcess(pen, 1);
        return 0;
      }
      var pos = (now - pen.calculative.start) % pen.calculative.duration;
      var d = 0;
      try {
        for (
          var _e = __values(pen.frames), _f = _e.next();
          !_f.done;
          _f = _e.next()
        ) {
          var frame = _f.value;
          d += frame.duration;
          if (pos > d) {
            ++frameIndex;
          } else {
            break;
          }
        }
      } catch (e_5_1) {
        e_5 = { error: e_5_1 };
      } finally {
        try {
          if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        } finally {
          if (e_5) throw e_5.error;
        }
      }
      // 帧超出
      if (!pen.frames[frameIndex]) {
        return true;
      }
      pen.calculative.frameDuration = pen.frames[frameIndex].duration;
      pen.calculative.frameStart =
        pen.calculative.start + pen.calculative.duration * (cycleIndex - 1);
      pen.calculative.frameEnd =
        pen.calculative.frameStart + pen.calculative.frameDuration;
      // 换帧
      var frameChanged = frameIndex !== pen.calculative.frameIndex;
      // 新循环播放

      var cycleChanged = cycleIndex > pen.calculative.cycleIndex;
      frameChanged && (pen.calculative.frameIndex = frameIndex);
      cycleChanged && (pen.calculative.cycleIndex = cycleIndex);
      if (frameChanged || cycleChanged) {
        // 以初始位置为参考点。因为网页在后台时，不执行动画帧，网页恢复显示时，位置不确定
        for(let key in pen.copyPen[key]){
                for(let keys in pen){
                    if(key == keys){
                        pen[keys] = pen.copyPen[key]
                    }
                }
        }
      }
    }
    var process =
      ((now - pen.calculative.frameStart) / pen.calculative.frameDuration) % 1;
    setNodeAnimateProcess(pen, process);
    return true;
  }
  function setNodeAnimateProcess(pen, process) {
    var _a;
    if (process < 0) {
        return;
    }
    if (process > 1) {
        process = 1;
    }
    var frame = pen.frames[pen.calculative.frameIndex];
    for (var k in frame) {
        if (k === 'duration') {
            continue;
        }
        else if (k === 'x'|| k === 'y') {
            var current = pen.prevFrame[k] + (frame[k] - pen.prevFrame[k]) * process;
            //pen.calculative[k] = Math.round(current * 100) / 100;
            var v = {id:pen.id};
            v[k] = Math.round(current * 100) / 100 + pen.copyPen[k];
            _this.setValue(v);
        }
        else if (isLinear(frame[k], k, pen)) {
            if (pen.prevFrame[k] == null) {
                if (k === 'globalAlpha') {
                    pen.prevFrame[k] = 1;
                }
                else {
                    pen.prevFrame[k] = 0;
                }
            }
            var current = pen.prevFrame[k] + (frame[k] - pen.prevFrame[k]) * process;
            //pen.calculative[k] = Math.round(current * 100) / 100;
            var v = {id:pen.id};
            v[k] = Math.round(current * 100) / 100;
            _this.setValue(v);
        }
        else {
            var v = {id:pen.id};
            v[k] = frame[k];
            _this.setValue(v);
        }
        if (k === 'text') {
            calcTextLines(pen);
        }
    }
  }
  /**
   * 值类型为 number , pen.linear 为 false 时，且 key 不属于 noLinear 时，返回 true
   * @param value 值
   * @param key 键值
   * @param pen 画笔
   * @returns
   */
  function isLinear(value, key, pen) {
      // 不线性变化的属性
      var noLinear = ['strokeType', 'bkType', 'showChild'];
      return (typeof value === 'number' &&
          pen.linear !== false &&
          !noLinear.includes(key));
  }
  let _this = this;
  requestAnimationFrame(function () {
    setNodeAnimate(pen, now);
    _this.customAnimate(pen);
  });
};
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
import { update } from "@/api/drawing.js";
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
      console.log("locker");
      this.topology.lock(10);
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
      this.topology.inactive();
    });
    //暂停动画
    this.$eventBus.$on("pauseAnimate", (penid) => {
      this.topology.pauseAnimate(penid);
      this.topology.inactive();
    });
    //结束动画
    this.$eventBus.$on("stopAnimate", (penid) => {
      this.topology.stopAnimate(penid);
    });
    //播放自定义动画
    this.$eventBus.$on("customAnimateStart", (pen) => {
      this.topology.customAnimateStart(pen);
    });
    //停止自定义动画
    this.$eventBus.$on("customAnimateStop", (pen) => {
      this.topology.customAnimateStop(pen);
    });
    //暂停自定义动画
    this.$eventBus.$on("customAnimatePause", (pen) => {
      this.topology.customAnimatePause(pen);
    });
    
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
    //保存
    this.$eventBus.$on("openJson", (json) => {
      console.log(json, "===json===");
      this.topology.clear();
      this.topology.open(json);
      this.topology.inactive();
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
      console.log(message, topic);
    };
    document.getElementsByTagName("canvas")[1].style.left = 0;
    this.topology.inactive();
  },
  beforeDestroy() {
    this.$eventBus.$off("dragstart");
    this.$eventBus.$off("onTouchstart");
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
      let res = await update(params);
      console.log(res);
      if (res.code == 200) {
        this.$message.success("保持成功");
      }
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
