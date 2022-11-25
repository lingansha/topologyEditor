<template>
  <div>
    <div class="combox">
      <div class="setcolor">
        <span> 文本内容</span>
        <span>
          <span class="text">
            <el-input
              v-model="form.text"
              placeholder="请输入内容"
              @change="setPen('text')"
            ></el-input
          ></span>
        </span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 字体大小 </span>
        <span>
          <el-input-number
            v-model="form.fontSize"
            controls-position="right"
            @change="setPen('fontSize')"
            :min="12"
          ></el-input-number>
        </span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 文本颜色 </span>
        <span>
          <span
            @click="setColor('textColor')"
            class="colorBox"
            :style="`background-color:${form.textColor}`"
          ></span>
          <span class="colorInput">
            <el-input
              v-model="form.textColor"
              placeholder="请输入内容"
            ></el-input
          ></span>
        </span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 文字背景 </span>
        <span>
          <span
            @click="setColor('textBackground')"
            class="colorBox"
            :style="`background-color:${form.textBackground}`"
          ></span>
          <span class="colorInput">
            <el-input
              v-model="form.textBackground"
              placeholder="请输入内容"
            ></el-input
          ></span>
        </span>
      </div>
    </div>
    <div class="combox">
      <span> 加粗 </span>
      <span>
        <el-select
          v-model="form.fontWeight"
          placeholder="请选择"
          @change="setPen('fontWeight')"
        >
          <el-option :key="400" label="正常" :value="400"> </el-option>
          <el-option :key="600" label="加粗" :value="600"> </el-option>
        </el-select>
      </span>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 行高 </span>
        <span>
          <el-input-number
            v-model="form.lineHeight"
            controls-position="right"
            @change="setPen('lineHeight')"
            :min="1"
            :step="0.5"
          ></el-input-number>
        </span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 水平偏移 </span>
        <span>
          <el-input-number
            v-model="form.textLeft"
            controls-position="right"
            @change="setPen('textLeft')"
          ></el-input-number>
        </span>
      </div>
    </div>
    <div class="combox">
      <div class="setcolor">
        <span> 垂直偏移 </span>
        <span>
          <el-input-number
            v-model="form.textTop"
            controls-position="right"
            @change="setPen('textTop')"
          ></el-input-number>
        </span>
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
import sketchColor from "./sketchColor.vue";
export default {
  components: {
    sketchColor,
  },
  name: "textT",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    for (let key in this.data) {
      for (let key2 in this.form) {
        if (key == key2) {
          this.form[key2] = this.data[key];
        }
      }
    }
    console.log(this.form);
  },
  data() {
    return {
      form: {
        text: "",
        fontSize: 16,
        textColor: "#000",
        textBackground: "#fff",
        fontWeight: 400,
        lineHeight: 2.5,
        textLeft: 0,
        textTop: 0,
      },
    };
  },
  methods: {
    setPen(e) {
      let obj = { id: this.data.id };
      obj[e] = this.form[e];
      this.$eventBus.$emit("setPen", obj);
    },
    setColor(e) {
      this.$refs.sketchColor.open(e);
    },
    sketchColorSubmit(e) {
      console.log(e);
      this.form[e.key] = e.color;
      this.$refs.sketchColor.handleClose();
      let obj = { id: this.data.id };
      obj[e.key] = this.form[e.key];
      if (e.key == "textColor") {
        obj.activeTextColor = this.form[e.key];
      }
      this.$eventBus.$emit("setPen", obj);
    },
    sketchColorcancle() {
      this.$refs.sketchColor.handleClose();
    },
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
}
</style>