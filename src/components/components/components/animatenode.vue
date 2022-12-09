<template>
  <div class="contaner">
    <customAnimate :data="data" :key="data.id" v-if="editorAnimateShow" @addAnimateCompelte="addAnimateCompelte" @back="back" />
    <el-collapse v-model="activeNames" accordion v-else>
      <el-collapse-item title="动画" name="1">
        <div>
          <div class="combox">
            <span> 动画效果 </span>
            <span>
              <el-select
                v-model="animate.animateType"
                placeholder="请选择"
                @change="animateSelect"
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
          <template v-if="animate.animateType==6">
            <div class="combox" >
                <span> 自定义编辑 </span>
                <span>
                  <a class="editorAnimate" @click="editorAnimate">编辑动画</a>
                </span>
            </div>
            <div class="combox">
            <span> 自定义动画 </span>
            <span>
              <el-select
                v-model="customAnimateType"
                placeholder="请选择"
                @change="customAnimateSelect"
              >
                <el-option
                  v-for="item in customAnimateList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </span>
          </div>
          </template>
         
          <div class="combox" v-if="animate.animateType==5">
            <span> 进度方向 </span>
            <span>
              <el-select
                v-model="verticalProgress"
                placeholder="请选择"
                @change="verticalProgressChange"
              >
                <el-option
                  v-for="item in verticalProgressType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="combox">
            <span> 循环次数 </span>
            <span>
              <span class="colorInput"><el-input-number v-model="animate.animateCycle" @change="setPen('animateCycle')" placeholder="请输入内容" :min="0"></el-input-number></span>
            </span>
          </div>
          <div class="combox">
            <div class="setcolor">
              <span> 自动播放 </span>
              <span>
                <span class="colorInput">
                  <el-checkbox
                    v-model="animate.autoPlay"
                    @change="setPen('autoPlay')"
                    >自动播放</el-checkbox
                  ></span
                >
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
import customAnimate from "./components/customAnimate.vue"
import {getAnimateList} from "@/api/drawing.js"
export default {
  name: "animatenode",
  components: {
    sketchColor,
    customAnimate
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
        animateType:'', //动画类型
        autoPlay: false, //自动播放
        animateCycle:0
      },
      verticalProgress:false,
      animateOptions: [
        {
          value: 0,
          label: "上下跳动",
        },
        {
          value: 1,
          label: "左右跳动",
        },
        {
          value: 2,
          label: "左右偏移",
        },
        {
          value: 3,
          label: "心跳",
        },
        {
          value: 4,
          label: "成功",
        },
        {
          value: 5,
          label: "进度",
        },
        {
          value: 6,
          label: "自定义",
        },
        {
          value: 7,
          label: "自定义x",
        }
      ],
      verticalProgressType:[
      {
          value: true,
          label: "垂直",
        },
        {
          value: false,
          label: "水平",
        },
      ],
      play: false,
      editorAnimateShow:false,
      customAnimateType:undefined,
      customAnimateList:[]
    };
  },
  mounted() {
      if(this.data.animatePlay){
        this.play = this.data.animatePlay
      }
      const{customAnimateType} = this.data
      if(customAnimateType){
        this.customAnimateType = customAnimateType
      }
      for (let key in this.data) {
        for (let key2 in this.animate) {
          if (key == key2) {
            if (key == "animateCycle") {
              if(this.data[key]=='Infinity'){
                this.animate[key2] = 0
              }else{
                this.animate[key2] = this.data[key];
              }
            } else {
              this.animate[key2] = this.data[key];
            }
          }
        }
      }
      this.addAnimateCompelte()
  },
  methods: {
    back(){
      this.editorAnimateShow = false
      this.addAnimateCompelte()
    },
    async addAnimateCompelte(){
      let res = await getAnimateList()
        console.log(res)
        if(res.code==200){
          this.customAnimateList = res.data
        }
    },
    customAnimateSelect(e){
      // this.animate.autoPlay = false
      // this.setPen('autoPlay')
      // this.stopPlay()
      console.log(e)
      this.data.customAnimateType = e
      for(let data of this.customAnimateList){
        if(data.id == e){
          this.data.frames = data.frames;
          break;
        }
      }
      
    },
    verticalProgressChange(e){
      let obj = { id: this.data.id };
      if(e){
        obj.verticalProgress = true
        this.$eventBus.$emit("setPen", obj);
      }else{
        obj.verticalProgress = false
        this.$eventBus.$emit("setPen", obj);
      }
    },
    async animateSelect(e) {
      this.setPen('animateType')
      if (e == 0) {
        //上下跳动
        let arr = []
        for(let i=0;i<5;i++){
          arr = [...arr,...[
          {
            duration: 100,
            y: 20,
          },
          {
            duration: 100,
            y: -20,
          },
        ]]
        }
        this.data.frames = arr;
      }
      if (e == 1) {
        //左右跳动
        let arr = []
        for(let i=0;i<5;i++){
          arr = [...arr,...[
          {
            duration: 100,
            x: 20,
          },
          {
            duration: 100,
            x: -20,
          },
        ]]
        }
        this.data.frames = arr;
      }
      if (e == 2) {
        //左右跳动
        let arr = []
        for(let i=0;i<5;i++){
          arr = [...arr,...[
          {
            duration: 100,
            rotate: 20,
          },
          {
            duration: 200,
            rotate: -20,
          },
        ]]
        }
        this.data.frames = arr;
      }
      if (e == 3) {
        //左右跳动
        let arr = []
        for(let i=0;i<5;i++){
          arr = [...arr,...[
          {
            duration: 500,
            scale: 0.8,
          },
          {
            duration: 1000,
            scale: 1.2,
          },
        ]]
        }
        this.data.frames = arr;
      }
      if (e == 4) {
        //成功
        let arr = []
        for(let i=0;i<5;i++){
          arr = [...arr,...[
          {
            duration: 500,
            background:"green",
            globalAlpha:0.1
          },
          {
            duration: 1000,
            scale: 1.2,
          },
        ]]
        }
        this.data.frames = arr;
      }
      if (e == 5) {
        //进度
        let arr = []
        for(let i=0;i<5;i++){
          arr = [...arr,...[
          {
            duration: 1000,
            progress: 0,
          },
          {
            duration: 2000,
            progress: 1,
          },
        ]]
        }
        this.data.frames = arr;
      }
      if(e==6){
        let res = await getAnimateList()
        console.log(res)
        if(res.code==200){
          this.customAnimateList = res.data
        }
      }
      if(e==7){
        this.data.frames= [
                {
                    "duration": 2000,
                     "progress":1,
                },
            ]
      }
    },
    setPen(key) {
      let obj = { id: this.data.id };
      if(key=='animateCycle'){
        if(this.animate[key]==0){
          obj[key] = Infinity;
          this.$eventBus.$emit("setPen", obj);
        }else{
          obj[key] = this.animate[key];
          this.$eventBus.$emit("setPen", obj);
        }
        return;
      }
      obj[key] = this.animate[key];
      this.$eventBus.$emit("setPen", obj);
    },
    handlePlay() {
      this.play = !this.play;
      if (this.play == true) {
        this.data.animatePlay = true
        this.$eventBus.$emit("startAnimate", this.data.id);
      } else {
        this.data.animatePlay = false
        this.$eventBus.$emit("pauseAnimate", this.data.id);
      }
    },
    handlePlayx(){
      this.$eventBus.$emit("customAnimateStart", this.data);
    },
    stopPlay() {
      this.play = false;
      this.$eventBus.$emit("stopAnimate", this.data.id);
    },
    setColor(e) {
      this.$refs.sketchColor.open(e);
    },
    sketchColorSubmit(e) {
      console.log(e);
      this.animate[e.key] = e.color;
      this.setPen(e.key);
      this.sketchColorcancle();
    },
    sketchColorcancle() {
      this.$refs.sketchColor.handleClose();
    },
    handelAnimateLineDash(e) {
      this.animate.animateLineDash = e;
      this.$eventBus.$emit("setPen", {
        id: this.data.id,
        animateLineDash: [e, e],
      });
    },
    handelAnimateDotSize(e) {
      this.animate.animateDotSize = e;
      this.$eventBus.$emit("setPen", { id: this.data.id, animateDotSize: e });
    },
    editorAnimate(){
      console.log("editorAnimate")
      this.editorAnimateShow = !this.editorAnimateShow
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
    text-align: left;
    width: 90px;
  }
  .editorAnimate{
    cursor: pointer;
    color: #096dd9;
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