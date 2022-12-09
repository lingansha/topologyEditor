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
        <span class="icon" @click="selectBgimg">
          <div class="new-item-badge" v-if="drawinginfo.bkImage" @click.stop="subumitSelectImg('')">
            <i class="el-icon-close"></i>
          </div>
          <el-image
            style="width: 50px; height: 50px"
            v-if="drawinginfo.bkImage"
            :src="drawinginfo.bkImage"
            fit="fit"
          ></el-image>
          <i v-else class="el-icon-picture-outline" style="font-size: 24px"></i>
        </span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 背景颜色 </span>
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
          ><el-checkbox
            v-model="drawinginfo.grid"
            @change="setGrid('grid')"
          ></el-checkbox
        ></span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 标尺 </span>
        <span class="colorInput"
          ><el-checkbox
            v-model="drawinginfo.rule"
            @change="setRule('rule')"
          ></el-checkbox
        ></span>
      </div>
    </div>
    <sketchColor
      ref="sketchColor"
      @sketchColorSubmit="sketchColorSubmit"
      @sketchColorcancle="sketchColorcancle"
    />
    <selectimg
      ref="selectimg"
      v-if="showSelectImg"
      @close="showSelectImg = false"
      @subumitSelectImg="subumitSelectImg"
    />
  </div>
</template>
<script>
import sketchColor from "./components/sketchColor.vue";
import selectimg from "./selectImage.vue";
export default {
  components: {
    sketchColor,
    selectimg,
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
        grid: true,
        rule: true,
      },
      showSelectImg: false,
    };
  },
  mounted() {
    if(this.topology.data().bkImage){
      this.drawinginfo.bkImage = this.topology.data().bkImage
    }
  },
  methods: {
    subumitSelectImg(e) {
      this.drawinginfo.bkImage = e;
      this.topology.setBackgroundImage(e);
      this.showSelectImg = false;
    },
    selectBgimg() {
      this.showSelectImg = true;
      this.$nextTick(() => {
        this.$refs.selectimg.open();
      });
    },
    setData(key) {
      this.topology.store.data[key] = this.drawinginfo[key];
      setTimeout(() => {
        console.log(this.topology, "==this.topology==");
      }, 2000);
    },
    setRule(key) {
      this.topology.setRule({
        rule: this.drawinginfo[key],
      });
    },
    setGrid(key) {
      this.topology.setGrid({
        grid: this.drawinginfo[key],
      });
    },
    setPen(key) {
      let obj = {};
      obj[key] = this.drawinginfo[key];
      console.log(obj);
      this.topology.setOptions(obj);
    },
    setColor(e) {
      this.$refs.sketchColor.open(e);
    },
    sketchColorSubmit(e) {
      console.log(e);
      this.drawinginfo[e.key] = e.color;
      if (e.key == "background") {
        this.topology.setBackgroundColor(this.drawinginfo[e.key]);
        this.topology.render();
      }
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
  .icon {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .new-item-badge {
        position: absolute;
        background: red;
        z-index: 999;
        width: 56px;
        text-align: center;
        height: 20px;
        line-height: 50px;
        border-radius: 3px;
        color: #fff;
        font-size: 12px !important;
        padding: 2px 4px 0;
        top: -16px;
        right: -32px;
        transform: rotate(45deg);
        transition: transform 0.1s ease-in;
        padding-bottom: 11px;
        .el-icon-close {
          -ms-transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          font-size: 14px;
          margin-bottom: -5px;
          cursor: pointer;
        }
}
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