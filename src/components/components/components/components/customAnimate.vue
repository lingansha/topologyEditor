<template>
  <div class="contaner">
    <div class="head">
      <span>节点动画</span>
      <span>
        <span @click="editorAnimate">管理</span>
        <span @click="save" title="保存为动画下次使用">保存</span>
        <span @click="back">返回</span>
      </span>
      
    </div>
    <div class="add">
      <span
        ><el-button type="primary" icon="el-icon-plus" @click="addAnimate"
          >新增动画帧</el-button
        ></span
      >
    </div>
    <div class="box">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item, ind) in animateList"
          :key="ind"
          :name="ind"
        >
          <template slot="title">
            <div class="titlebox">
              <span>帧{{ ind + 1 }}/{{ animateList.length }}</span>
              <span
                ><i class="el-icon-delete" @click.stop="deleteAnimate(ind)"></i
              ></span>
            </div>
          </template>
          <div class="combox">
            <span> 时长(ms) </span>
            <span>
              <span class="colorInput"
                ><el-input-number
                  v-model="item.duration"
                  controls-position="right"
                  placeholder="请输入内容"
                  :min="0"
                ></el-input-number
              ></span>
            </span>
          </div>
          <div class="combox">
              <span> 缩放</span>
              <span>
                <el-input-number
                  v-model="item.scale"
                  controls-position="right"
                  :min="0"
                ></el-input-number>
              </span>
          </div>
          <div class="combox">
              <span> 进度 </span>
              <span>
                <el-input-number
                    :min="0"
                    :max="1"
                  v-model="item.progress"
                  controls-position="right"
                ></el-input-number>
              </span>
          </div>
          <div class="combox">
              <span> X(px)</span>
              <span>
                <el-input-number
                  v-model="item.x"
                  controls-position="right"
                  :min="0"
                ></el-input-number>
              </span>
          </div>
          <div class="combox">
              <span> Y(px) </span>
              <span>
                <el-input-number
                  v-model="item.y"
                  controls-position="right"
                ></el-input-number>
              </span>
          </div>
          <div class="combox">
              <span> 旋转(°) </span>
              <span>
                <el-input-number
                  v-model="item.rotate"
                  controls-position="right"
                ></el-input-number>
              </span>
          </div>
          <div class="combox">
                <div class="setcolor">
                    <span> 默认颜色 </span>
                    <span>
                    <span
                        @click="setColor({key:'color',item})"
                        class="colorBox"
                        :style="`background-color:${item.color}`"
                    ></span>
                    <span class="colorInput">
                        <el-input
                        v-model="item.color"
                        placeholder="请输入内容"
                        ></el-input
                    ></span>
                    </span>
                </div>
            </div>
          <div class="combox">
                <div class="setcolor">
                    <span> 进度颜色 </span>
                    <span>
                    <span
                        @click="setColor({key:'progressColor',item})"
                        class="colorBox"
                        :style="`background-color:${item.progressColor}`"
                    ></span>
                    <span class="colorInput">
                        <el-input
                        v-model="item.progressColor"
                        placeholder="请输入内容"
                        ></el-input
                    ></span>
                    </span>
                </div>
            </div>
          <div class="combox">
              <span>线条样式</span>
                  <span>
                    <el-dropdown trigger="click" @command="handleCommandLineStyle($event,item)">
                    <span class="el-dropdown-link">
                        <div class="styleLine"><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g fill="none" stroke="black" stroke-width="1"><path d="M0 9 l85 0"></path></g></svg><i class="el-icon-arrow-down el-icon--right"></i></div>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">实线</el-dropdown-item>
                        <el-dropdown-item command="1">虚线</el-dropdown-item>
                        <el-dropdown-item command="2">虚实线</el-dropdown-item>
                        <el-dropdown-item command="3">虚实线2</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                </span>                  
           </div>
           <div class="combox">
              <span> 线条宽度 </span>
              <span>
                <el-input-number
                  v-model="item.lineWidth"
                  controls-position="right"
                ></el-input-number>
              </span>
          </div>
          <div class="combox">
                <div class="setcolor">
                    <span>
                        线条颜色
                    </span>
                    <span>
                        <span @click="setColor({key:'borderColor',item})" class="colorBox" :style="`background-color:${item.borderColor}`"></span>
                        <span class="colorInput"><el-input v-model="item.borderColor" placeholder="请输入内容"></el-input></span>
                    </span>
                </div>
           </div>
           <div class="combox">
                <div class="setcolor">
                    <span>
                        背景颜色
                    </span>
                    <span>
                        <span @click="setColor({key:'background',item})" class="colorBox" :style="`background-color:${item.background}`"></span>
                        <span class="colorInput"><el-input v-model="item.background" placeholder="请输入内容"></el-input></span>
                    </span>
                </div>
           </div>
           <div class="combox">
                    <div class="setcolor">
                        <span>
                            透明度
                        </span>
                        <span>
                            <el-input-number v-model="item.globalAlpha" controls-position="right"  :min="0" :step="0.1" :max="1"></el-input-number>
                        </span>
                    </div>
            </div>
            <div class="combox">
                <div class="setcolor">
                    <span>
                        字体颜色
                    </span>
                    <span>
                        <span @click="setColor({key:'textColor',item})" class="colorBox" :style="`background-color:${item.textColor}`"></span>
                        <span class="colorInput"><el-input v-model="item.textColor" placeholder="请输入内容"></el-input></span>
                    </span>
                </div>
           </div>
           <div class="combox">
                <div class="setcolor">
                    <span> 文字背景 </span>
                    <span>
                    <span
                        @click="setColor({key:'textBackground',item})"
                        class="colorBox"
                        :style="`background-color:${item.textBackground}`"
                    ></span>
                    <span class="colorInput">
                        <el-input
                        v-model="item.textBackground"
                        placeholder="请输入内容"
                        ></el-input
                    ></span>
                    </span>
                </div>
            </div>
            <div class="combox">
            <div class="setcolor">
                <span> 文本内容</span>
                <span>
                <span class="text">
                    <el-input
                    v-model="item.text"
                    placeholder="请输入内容"
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
                    v-model="item.fontSize"
                    controls-position="right"
                    :min="12"
                ></el-input-number>
                </span>
            </div>
            </div>
            <div class="combox">
      <span> 加粗 </span>
      <span>
        <el-select
          v-model="item.fontWeight"
          placeholder="请选择"
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
                    v-model="item.lineHeight"
                    controls-position="right"
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
                    v-model="item.textLeft"
                    controls-position="right"
                ></el-input-number>
                </span>
            </div>
            </div>
            <div class="combox">
            <div class="setcolor">
                <span> 垂直偏移 </span>
                <span>
                <el-input-number
                    v-model="item.textTop"
                    controls-position="right"
                ></el-input-number>
                </span>
            </div>
            </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <sketchColor ref="sketchColor" @sketchColorSubmit="sketchColorSubmit" @sketchColorcancle="sketchColorcancle" />
    <el-dialog
        title="保存动画"
        :visible.sync="dialogVisible"
        width="30%"
        :append-to-body="true"
        :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="动画名字" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <div class="footer">
             <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </div>
        </el-form>
    </el-dialog>
    <manageAnimate ref="manageAnimate" />
  </div>
</template>
<script>
import sketchColor from './sketchColor.vue'
import {createAnimate} from '@/api/drawing.js'
import { deepClone } from "@topology/core";
import manageAnimate from './manageAnimate.vue'
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components:{
    sketchColor,
    manageAnimate
  },
  data() {
    return {
      activeName: "1",
      animateList: [
      ],
      dialogVisible:false,
      ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入动画名称', trigger: 'blur' },
          ]
        }
    };
  },
  methods: {
    editorAnimate(){
        console.log(this.$refs,'==this.$refs==')
        this.$refs.manageAnimate.open()
    },
    back() {
      this.$emit("back");
    },
    addAnimate() {
        let add = deepClone(this.data)
      const{
            rotate,
            text,
            lineWidth,
            lineDash,
            color,
            background,
            textBackground,
            textColor,
            textLeft,
            textTop,
            progressColor,
            globalAlpha,
            fontSize,
            lineHeight,
            fontWeight,
            progress,
            scale,
            } = add
      this.animateList.push({
            duration:500,
            x:0,
            y:0,
            rotate,
            lineDash:lineDash?lineDash:[],
            color,
            scale:scale?scale:1,
            lineWidth,
            progress:progress?progress:0,
            progressColor,
            background:background?background:"",
            globalAlpha:globalAlpha?globalAlpha:1,
            textColor:textColor?textColor:'',
            textBackground:textBackground?textBackground:'#fff',
            fontSize:fontSize?fontSize:14,
            fontWeight:fontWeight?fontWeight:400,
            text,
            lineHeight,
            textLeft:textLeft?textLeft:0,
            textTop:textTop?textTop:0
        });
    },
    deleteAnimate(ind) {
      this.animateList.splice(ind, 1);
    },
    setColor(e){
            this.$refs.sketchColor.open(e)
        },
    sketchColorSubmit(e){
            console.log(e)
            e.key.item[e.key.key] = e.color
            this.$refs.sketchColor.handleClose()
    },
    sketchColorcancle(){
            this.$refs.sketchColor.handleClose()
    },
    handleCommandLineStyle(e,item){
            console.log(e)
            if(e==0){
                item.lineDash=[]
            }
            if(e==1){
                item.lineDash=[5,5]
            }
            if(e==2){
                item.lineDash=[15, 3, 3, 3]
            }
            if(e==3){
                item.lineDash=[20, 3, 3, 3, 3, 3, 3, 3]
            }
            
    },
    save(){
        if(this.animateList.length){
            this.dialogVisible = true
        }else{
            this.$message.error("请先创建动画帧")
        }
       
    },
    submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(this.animateList,'==this.animateList==')
            let res = await createAnimate({name:this.ruleForm.name,frames:this.animateList})
            console.log(res)
            if(res.code==200){
                this.$message.success("新增成功")
                this.$emit("addAnimateCompelte")
                this.handleClose()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    handleClose(){
        this.dialogVisible = false
    }
  },
};
</script>
<style lang="scss" scoped>
.contaner {
    
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #ccc;
    padding: 5px;
    font-size: 14px;
    
    > span:last-child {
      cursor: pointer;
      color: #096dd9;
      span{
        margin: 0 5px;
      }
    }
  }
  .add {
    padding: 5px 10px;
  }
  .box{
    height: 80vh;
    overflow-y: auto;
  }
}
.titlebox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 5px;
}
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
    text-align: left;
  }
  .editorAnimate {
    cursor: pointer;
    color: #096dd9;
  }
}
/deep/ .setcolor{
    display: flex;
    justify-content: space-between;
    width: 210px;
    >span{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .colorBox{
            border: solid 1px #ccc;
            width: 30px;
            height: 30px;
            cursor: pointer;
            background-color: aqua;
            margin-right: 10px;
        }
        .colorInput{
            width: 85px;
        }
        .text{
            width: 130px;
        }
    }
}
/deep/.styleLine{
    /deep/ svg{
        position: relative;
        top: 2px;
        height: 18px;
        width: 50px;
    }
}
/deep/.styleLine svg{
    position: relative;
    top: 2px;
    height: 18px;
    width: 50px;
}
/deep/ .el-input__inner{
    padding: 0px!important;
}
/deep/ .el-input-number{
    width: 125px!important;
}
.footer{
    display: flex;
    justify-content: flex-end;
}
</style>