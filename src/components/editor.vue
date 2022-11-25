<template>
  <div class="hello">
    <div id="topology"></div>
    <canvas id="test"></canvas>
  </div>
</template>

<script>
import { Topology, deepClone } from "@topology/core";
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
    });
    //暂停动画
    this.$eventBus.$on("pauseAnimate", (penid) => {
      this.topology.pauseAnimate(penid);
    });
    //结束动画
    this.$eventBus.$on("stopAnimate", (penid) => {
      this.topology.stopAnimate(penid);
    });
    //结束动画
    this.$eventBus.$on("saveTopo", () => {
      console.log("保存");
      this.save();
    });
    this.topology = new Topology("topology", this.options);
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
    let that = this;
    // this.topology.beforeAddPens = async (pens) => {
    //   console.log("addPens", pens);
    //   // 返回 true 允许 remove
    //   return true
    // };
    this.topology.canvas.onMouseUp = (function (base) {
      return function () {
        base.apply(this, arguments);
        console.log(that.topology.store.active, "test");
        that.active = that.topology.store.active;
        that.$eventBus.$emit("activeDataReflash", that.active);
      };
    })(this.topology.canvas.onMouseUp);

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
    document.getElementsByTagName("canvas")[1].style.left = 0;
    let json ={"color":"#222222","activeColor":"#278df8","grid":true,"gridColor":"#e2e2e2","gridSize":20,"rule":true,"ruleColor":"#888888","x":0,"y":0,"scale":1,"pens":[{"name":"circle","text":"le5le","x":100,"y":100,"width":100,"height":100,"events":[{"name":"click","where":{"key":"text","comparison":"==","value":"矩形"},"value":"topology.le5le.com"}],"id":"77fe255","lineWidth":1,"fontSize":12,"lineHeight":1.5,"anchors":[{"id":"0","penId":"77fe255","x":0.5,"y":0},{"id":"1","penId":"77fe255","x":1,"y":0.5},{"id":"2","penId":"77fe255","x":0.5,"y":1},{"id":"3","penId":"77fe255","x":0,"y":0.5}],"rotate":0},{"name":"highcharts","x":100,"y":100,"width":400,"height":200,"highcharts":{"option":{"chart":{"backgroundColor":"#ffffff00"},"credits":{"enabled":false},"xAxis":{"type":"category","data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},"yAxis":{"type":"value"},"series":[{"data":[820,932,901,934,1290,1330,1320],"type":"line"}]}},"id":"de03ffb","lineWidth":1,"fontSize":12,"lineHeight":1.5,"anchors":[{"id":"0","penId":"de03ffb","x":0.5,"y":0},{"id":"1","penId":"de03ffb","x":1,"y":0.5},{"id":"2","penId":"de03ffb","x":0.5,"y":1},{"id":"3","penId":"de03ffb","x":0,"y":0.5}],"rotate":0,"connectedLines":[{"lineId":"48071b47","lineAnchor":"4a9bcbf0","anchor":"1"}]},{"text":"","width":100,"height":100,"name":"image","image":"http://iot.cloudta.cn:30001/bladex/upload/20220602/c8daafcaf9cda133dff504bdc8ecb242.png","id":"9dc2be6","x":321,"y":257,"lineWidth":1,"fontSize":12,"lineHeight":1.5,"anchors":[{"id":"0","penId":"9dc2be6","x":0.5,"y":0},{"id":"1","penId":"9dc2be6","x":1,"y":0.5},{"id":"2","penId":"9dc2be6","x":0.5,"y":1},{"id":"3","penId":"9dc2be6","x":0,"y":0.5}],"rotate":0},{"id":"48071b47","name":"line","lineName":"curve","x":321,"y":200,"type":1,"lineWidth":5,"length":374.3721618652344,"ex":508.725407090806,"ey":507,"width":187.72540709080602,"height":307,"fontSize":12,"lineHeight":1.5,"anchors":[{"id":"4a9bcbf0","x":0.9535203719836102,"y":0,"penId":"48071b47","connectTo":"de03ffb","anchorId":"1","next":{"penId":"48071b47","connectTo":"de03ffb","x":1.2198668446047303,"y":0},"start":true,"lineLength":374.3721618652344,"curvePoints":[{"x":502.3991358497479,"y":200.27442457410305,"step":0.017362402075023556},{"x":504.3953177904412,"y":201.08484371940312,"step":0.03472480415004711},{"x":505.99978834301453,"y":202.4119755703861,"step":0.05208720622507067},{"x":507.2237900284029,"y":204.2365382615382,"step":0.06944960830009422},{"x":508.078565367541,"y":206.53924992734537,"step":0.08681201037511778},{"x":508.5753568813637,"y":209.30082870229378,"step":0.10417441245014133},{"x":508.725407090806,"y":212.5019927208696,"step":0.12153681452516489},{"x":508.53995851680236,"y":216.12346011755872,"step":0.13889921660018845},{"x":508.03025368028807,"y":220.14594902684738,"step":0.156261618675212},{"x":507.2075351021975,"y":224.5501775832215,"step":0.17362402075023553},{"x":506.08304530346555,"y":229.31686392116728,"step":0.19098642282525907},{"x":504.6680268050276,"y":234.4267261751708,"step":0.20834882490028261},{"x":502.97372212781784,"y":239.8604824797182,"step":0.22571122697530616},{"x":501.01137379277117,"y":245.5988509692953,"step":0.2430736290503297},{"x":498.79222432082264,"y":251.62254977838842,"step":0.26043603112535324},{"x":496.32751623290704,"y":257.91229704148367,"step":0.2777984332003768},{"x":493.6284920499593,"y":264.44881089306693,"step":0.2951608352754003},{"x":490.70639429291384,"y":271.21280946762437,"step":0.31252323735042387},{"x":487.5724654827057,"y":278.1850108996421,"step":0.3298856394254474},{"x":484.23794814026996,"y":285.34613332360635,"step":0.34724804150047095},{"x":480.7140847865412,"y":292.676894874003,"step":0.3646104435754945},{"x":477.0121179424542,"y":300.15801368531794,"step":0.38197284565051803},{"x":473.14329012894376,"y":307.7702078920376,"step":0.3993352477255416},{"x":469.1188438669449,"y":315.49419562864796,"step":0.4166976498005651},{"x":464.9500216773926,"y":323.3106950296351,"step":0.43406005187558866},{"x":460.64806608122115,"y":331.200424229485,"step":0.4514224539506122},{"x":456.2242195993656,"y":339.1441013626839,"step":0.46878485602563574},{"x":451.68972475276104,"y":347.1224445637178,"step":0.4861472581006593},{"x":447.055824062342,"y":355.11617196707283,"step":0.5035096601756829},{"x":442.3337600490434,"y":363.1060017072349,"step":0.5208720622507065},{"x":437.5347752338002,"y":371.07265191869027,"step":0.5382344643257301},{"x":432.670112137547,"y":378.996840735925,"step":0.5555968664007537},{"x":427.75101328121866,"y":386.85928629342516,"step":0.5729592684757773},{"x":422.78872118575015,"y":394.64070672567664,"step":0.5903216705508009},{"x":417.79447837207624,"y":402.3218201671658,"step":0.6076840726258245},{"x":412.77952736113167,"y":409.88334475237866,"step":0.6250464747008481},{"x":407.75511067385133,"y":417.3059986158012,"step":0.6424088767758717},{"x":402.73247083117,"y":424.57049989191955,"step":0.6597712788508953},{"x":397.7228503540227,"y":431.6575667152197,"step":0.6771336809259189},{"x":392.737491763344,"y":438.5479172201879,"step":0.6944960830009425},{"x":387.7876375800688,"y":445.2222695413101,"step":0.711858485075966},{"x":382.88453032513206,"y":451.6613418130725,"step":0.7292208871509896},{"x":378.03941251946844,"y":457.84585216996106,"step":0.7465832892260132},{"x":373.2635266840128,"y":463.75651874646184,"step":0.7639456913010368},{"x":368.5681153397,"y":469.37405967706104,"step":0.7813080933760604},{"x":363.9644210074649,"y":474.6791930962447,"step":0.798670495451084},{"x":359.46368620824234,"y":479.65263713849885,"step":0.8160328975261076},{"x":355.07715346296703,"y":484.2751099383096,"step":0.8333952996011312},{"x":350.81606529257385,"y":488.52732963016314,"step":0.8507577016761548},{"x":346.69166421799764,"y":492.3900143485454,"step":0.8681201037511784},{"x":342.7151927601733,"y":495.84388222794246,"step":0.885482505826202},{"x":338.89789344003543,"y":498.8696514028405,"step":0.9028449079012256},{"x":335.2510087785192,"y":501.44804000772547,"step":0.9202073099762492},{"x":331.7857812965591,"y":503.5597661770836,"step":0.9375697120512728},{"x":328.51345351509013,"y":505.18554804540094,"step":0.9549321141262964},{"x":325.4452679550471,"y":506.3061037471635,"step":0.97229451620132},{"x":322.59246713736485,"y":506.90215141685735,"step":0.9896569182763436}]},{"x":0,"y":1,"clientX":713,"clientY":274,"pageX":713,"pageY":274,"ctrlKey":false,"shiftKey":false,"altKey":false,"buttons":1,"id":"4ea7f699","penId":"48071b47","prev":{"penId":"48071b47","x":0.26634647262112016,"y":1}}],"lineAnimateType":1,"animateColor":"#7ED321","animateSpan":1,"animateCycle":null,"animatePlay":true,"rotate":0,"autoPlay":true},{"name":"triangle","text":"三角形","width":100,"height":100,"type":0,"rect":{"width":100,"height":100},"id":"114086b6","children":[],"x":363,"y":479,"lineWidth":1,"fontSize":12,"lineHeight":1.5,"anchors":[{"id":"0","penId":"114086b6","x":0.5,"y":0},{"id":"1","penId":"114086b6","x":0.75,"y":0.5},{"id":"2","penId":"114086b6","x":0.5,"y":1},{"id":"3","penId":"114086b6","x":0.25,"y":0.5}],"rotate":0},{"name":"hexagon","text":"六边形","width":197.0000000000001,"height":180.0000000000001,"type":0,"rect":{"width":100,"height":100},"paddingTop":10,"paddingBottom":10,"id":"aafde26","children":[],"x":123.99999999999989,"y":417,"lineWidth":1,"fontSize":12,"lineHeight":1.5,"anchors":[{"id":"0","penId":"aafde26","x":0.5,"y":0},{"id":"1","penId":"aafde26","x":1,"y":0.5},{"id":"2","penId":"aafde26","x":0.5,"y":1},{"id":"3","penId":"aafde26","x":0,"y":0.5}],"rotate":0,"ex":321.0000000000001,"ey":609.0000000000001,"center":{"x":222.50000000000006,"y":519}}],"origin":{"x":0,"y":0},"center":{"x":0,"y":0},"paths":{},"mqtt":"ws://139.159.142.8:30061/mqtt","mqttTopics":"topic1/xxx","mqttOptions":{"clientId":"333d9386","username":"12053a1195d34e90bc2ef50eea1832f7","password":"fcae08f0d525478da5a91f8613698bf3","customClientId":false}}
    this.topology.open(json)
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
        type:0,
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
        type:0,
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
