<template>
  <div class="contaner">
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item title="动画" name="1">
        <div>
          <div class="combox">
            <span> 动画效果 </span>
            <span>
              <el-select
                v-model="animate.lineAnimateType"
                placeholder="请选择"
                @change="setPen('lineAnimateType')"
              >
                <el-option
                  v-for="item in animateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="combox">
            <span> 反向 </span>
            <span>
              <el-select
                v-model="animate.animateReverse"
                placeholder="请选择"
                @change="setPen('animateReverse')"
              >
                <el-option :key="1" label="正向" :value="false"> </el-option>
                <el-option :key="2" label="反向" :value="true"> </el-option>
              </el-select>
            </span>
          </div>
          <div class="combox" v-if="animate.lineAnimateType==1">
            <span> 虚线间隔 </span>
            <span>
              <span class="colorInput"><el-input v-model="animate.animateLineDash" @change="handelAnimateLineDash" placeholder="请输入内容"></el-input></span>
            </span>
          </div>
          <div class="combox" v-if="animate.lineAnimateType==2">
            <span> 圆点大小 </span>
            <span>
              <span class="colorInput"><el-input v-model="animate.animateDotSize" @change="handelAnimateDotSize" placeholder="请输入内容"></el-input></span>
            </span>
          </div>
          <div class="combox">
            <div class="setcolor">
              <span> 动画颜色 </span>
              <span>
                <span
                  @click="setColor('animateColor')"
                  class="colorBox"
                  :style="`background-color:${animate.animateColor}`"
                ></span>
                <span class="colorInput"
                  ><el-input
                    v-model="animate.animateColor"
                    placeholder="请输入内容"
                  ></el-input
                ></span>
              </span>
            </div>
          </div>
          <div class="combox">
            <div class="setcolor">
              <span> 动画速度 </span>
              <span>
                <span class="colorInput">
                  <el-slider :min="1" :max="6" v-model="animate.animateSpan" @change="setPen('animateSpan')"></el-slider></span>
              </span>
            </div>
          </div>
          <div class="combox">
            <div class="setcolor">
              <span> 自动播放 </span>
              <span>
                <span class="colorInput">
                  <el-checkbox v-model="animate.autoPlay"  @change="setPen('autoPlay')">自动播放</el-checkbox></span>
              </span>
            </div>
          </div>
          <div class="footer">
            <el-button
              type="primary"
              size="small"
              :icon="`${play ? 'el-icon-video-pause' : 'el-icon-video-play'}`"
              @click="handlePlay"
              >{{ play ? "暂停" : "播放" }}</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="el-icon-c-scale-to-original"
              @click="stopPlay"
              >停止</el-button
            >
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
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
  name: "animateX",
  components: {
    sketchColor,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      activeNames: "1",
      value1: "",
      animate: {
        lineAnimateType: 0, //动画类型
        animateSpan: 1, //轨迹速度
        animateColor: "#D0021BFF", // 轨迹颜色 pen.lineAnimateType = 1 有效
        animateLineDash:5, //虚线段，pen.lineAnimateType = 1 有效
        animateDotSize: 20, //圆点大小，pen.lineAnimateType = 2 有效，最小值 6
        animateReverse: false, //反向播放
        autoPlay:false,//自动播放
      },
      animateOptions: [
        {
          value: 0,
          label: "水流",
        },
        {
          value: 1,
          label: "虚线",
        },
        {
          value: 2,
          label: "圆点",
        },
      ],
      play: false,
    };
  },
  mounted() {
    if (this.data.name == "line") {
      for (let key in this.data) {
        for (let key2 in this.animate) {
          if (key == key2) {
            if(key=='animateLineDash'){
              this.animate[key2] = this.data[key][0];
            }else{
              this.animate[key2] = this.data[key];
            }
          }
        }
      }
    }
  },
  methods: {
    setPen(key) {
      let obj = { id: this.data.id };
      obj[key] = this.animate[key];
      this.$eventBus.$emit("setPen", obj);
    },
    handlePlay() {
      this.play = !this.play;
      if (this.play == true) {
        this.$eventBus.$emit("startAnimate", this.data.id);
      }else{
        this.$eventBus.$emit("pauseAnimate", this.data.id);
      }
    },
    stopPlay(){
      this.play = false
      this.$eventBus.$emit("stopAnimate", this.data.id);
    },
    setColor(e){
       this.$refs.sketchColor.open(e)
    },
    sketchColorSubmit(e) {
      console.log(e)
      this.animate[e.key]=e.color
      this.setPen(e.key)
      this.sketchColorcancle()
    },
    sketchColorcancle() {this.$refs.sketchColor.handleClose()},
    handelAnimateLineDash(e){
      this.animate.animateLineDash = e
      this.$eventBus.$emit("setPen", {id:this.data.id,animateLineDash:[e,e]});
    },
    handelAnimateDotSize(e){
      this.animate.animateDotSize = e
      this.$eventBus.$emit("setPen", {id:this.data.id,animateDotSize:e});
    }
  },
};
</script>
<style lang="scss" scoped>
.combox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0px;
  > span {
    margin-right: 20px;
  }
  span:first-child {
    width: 70px;
  }
}
.styleLine {
  svg {
    position: relative;
    top: 2px;
    height: 18px;
    width: 50px;
  }
}
.setcolor {
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
}
/deep/ .el-input__inner {
  padding: 0px !important;
}
/deep/ .el-input-number {
  width: 125px !important;
}
.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
/deep/.el-icon-video-play {
  font-size: 24px;
}
/deep/.el-icon-video-pause {
  font-size: 24px;
}
/deep/.el-icon-c-scale-to-original {
  font-size: 24px;
}
</style>