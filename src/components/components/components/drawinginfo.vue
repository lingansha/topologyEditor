<template>
  <div>
    <div class="combox">
      <div class="setcolor">
        <span> 名字 </span>
        <span class="colorInput"
          ><el-input
            v-model="drawinginfo.name"
            placeholder="请输入内容"
            @change="setData('name')"
          ></el-input
        ></span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 背景图片 </span>
        <span class="colorInput"
          ><el-input
            v-model="drawinginfo.bkImage"
            placeholder="请输入网址"
            @change="setbackImg('bkImage')"
          ></el-input
        ></span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 开始颜色 </span>
        <span>
          <span
            @click="setColor('background')"
            class="colorBox"
            :style="`background-color:${drawinginfo.background}`"
          ></span>
          <span class="colorInput"
            ><el-input
              v-model="drawinginfo.background"
              placeholder="请输入内容"
            ></el-input
          ></span>
        </span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 背景网格 </span>
        <span class="colorInput"
          ><el-checkbox v-model="drawinginfo.grid" @change="setGrid('grid')"></el-checkbox></span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 标尺 </span>
        <span class="colorInput"
          ><el-checkbox v-model="drawinginfo.rule" @change="setRule('rule')"></el-checkbox></span>
      </div>
    </div>
    <sketchColor
      ref="sketchColor"
      @sketchColorSubmit="sketchColorSubmit"
      @sketchColorcancle="sketchColorcancle"
    />
  </div>
</template>
<script>
import sketchColor from "./components/sketchColor.vue";
export default {
  components: {
    sketchColor,
  },
  computed: {
    topology: function () {
      return this.$store.getters.topology;
    },
  },
  data() {
    return {
      drawinginfo: {
        name: "",
        bkImage: "",
        background: "",
        grid:true,
        rule:true
      },
    };
  },
  mounted() {},
  methods: {
    setData(key) {
      this.topology.store.data[key] = this.drawinginfo[key];
      setTimeout(() => {
        console.log(this.topology, "==this.topology==");
      }, 2000);
    },
    setRule(key){
        this.topology.setRule({
            rule: this.drawinginfo[key]
        });
    },
    setGrid(key){
        this.topology.setGrid({
            grid: this.drawinginfo[key]
        });
    },
    setPen(key) {
      let obj = {}
      obj[key] = this.drawinginfo[key]
      console.log(obj)
      this.topology.setOptions(obj);
    },
    setbackImg(key){
        this.setData(key)
        document.getElementById('topology').getElementsByTagName('canvas')[0].style.backgroundImage = 'url("'+this.drawinginfo[key]+'")'
    },
    setColor(e){
        this.$refs.sketchColor.open(e)
    },
    sketchColorSubmit(e) {
      console.log(e);
      this.drawinginfo[e.key] = e.color;
      this.setData('background')
      document.getElementById('topology').getElementsByTagName('canvas')[0].style.background = e.color
      this.$refs.sketchColor.handleClose();
    },
    sketchColorcancle() {
      this.$refs.sketchColor.handleClose();
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .combox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0px;
  > span {
    margin-right: 20px;
  }
}
/deep/.styleLine {
  /deep/ svg {
    position: relative;
    top: 2px;
    height: 18px;
    width: 50px;
  }
}
/deep/.styleLine svg {
  position: relative;
  top: 2px;
  height: 18px;
  width: 50px;
}
/deep/ .setcolor {
  display: flex;
  justify-content: space-between;
  width: 210px;
  > span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .colorBox {
      border: solid 1px #ccc;
      width: 30px;
      height: 30px;
      cursor: pointer;
      background-color: aqua;
      margin-right: 10px;
    }
    .colorInput {
      width: 85px;
    }
    .text {
      width: 130px;
    }
  }
  > span:first-child {
    width: 100px;
  }
}
/deep/ .el-input__inner {
  padding: 0px !important;
}
/deep/ .el-input-number,
.el-select {
  width: 125px !important;
}
</style>