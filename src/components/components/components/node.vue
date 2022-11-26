<template>
    <div>
        <el-collapse v-model="activeNames" accordion>
                    <el-collapse-item title="样式" name="1">
                        <div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            边框高度
                                        </span>
                                        <span>
                                            <el-input-number v-model="node.height" controls-position="right" @change="setPen('height')" :min="0"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            边框宽度
                                        </span>
                                        <span>
                                            <el-input-number v-model="node.width" controls-position="right" @change="setPen('width')" :min="0"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            X
                                        </span>
                                        <span>
                                            <el-input-number v-model="node.x" controls-position="right" @change="setPen('x')" :min="0"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            Y
                                        </span>
                                        <span>
                                            <el-input-number v-model="node.y" controls-position="right" @change="setPen('y')" ></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            旋转
                                        </span>
                                        <span>
                                            <el-input-number v-model="node.rotate" controls-position="right" @change="setPen('rotate')" ></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <span>
                                        线条样式
                                    </span>
                                    <span>
                                        <el-dropdown trigger="click" @command="handleCommandLineStyle">
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
                                    <span>
                                        线条渐变
                                    </span>
                                    <span>
                                        <el-switch
                                        v-model="node.gradientFromColorShow">
                                        </el-switch>
                                    </span>
                                </div>
                                <template v-if="node.gradientFromColorShow">
                                <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            开始颜色
                                        </span>
                                        <span>
                                            <span @click="setColor('lineGradientFromColor')" class="colorBox" :style="`background-color:${node.lineGradientFromColor}`"></span>
                                            <span class="colorInput"><el-input v-model="node.lineGradientFromColor" placeholder="请输入内容"></el-input></span>
                                        </span>
                                    </div>
                                </div>
                                <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            结束颜色
                                        </span>
                                        <span>
                                            <span @click="setColor('lineGradientToColor')" class="colorBox" :style="`background-color:${node.lineGradientToColor}`"></span>
                                            <span class="colorInput"> <el-input v-model="node.lineGradientToColor" placeholder="请输入内容"></el-input></span>
                                        </span>
                                    </div>
                                </div>
                            </template>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            线条宽度
                                        </span>
                                        <span>
                                            <el-input-number v-model="node.lineWidth" controls-position="right" @change="lineWidthhandleChange" :min="1"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            透明度
                                        </span>
                                        <span>
                                            <el-input-number v-model="node.globalAlpha" controls-position="right" @change="setPen('globalAlpha')"  :min="0" :step="0.1" :max="1"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            背景颜色
                                        </span>
                                        <span class="colorInput">
                                            <el-select v-model="node.bkType" placeholder="请选择" @change="backColorTypeChange">
                                                <el-option
                                                v-for="item in backColorOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox" v-if="node.bkType==0">
                                    <div class="setcolor">
                                        <span>
                                            纯色背景
                                        </span>
                                        <span>
                                            <span @click="setColor('background')" class="colorBox" :style="`background-color:${node.background}`"></span>
                                            <span class="colorInput"><el-input v-model="node.background" placeholder="请输入内容"></el-input></span>
                                        </span>
                                    </div>
                            </div>
                            
                            <template v-if="node.bkType==1 || node.bkType==2">
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            开始颜色
                                        </span>
                                        <span>
                                            <span @click="setColor('gradientFromColor')" class="colorBox" :style="`background-color:${node.gradientFromColor}`"></span>
                                            <span class="colorInput"><el-input v-model="node.gradientFromColor" placeholder="请输入内容"></el-input></span>
                                        </span>
                                    </div>
                                </div>
                                <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            结束颜色
                                        </span>
                                        <span>
                                            <span @click="setColor('gradientToColor')" class="colorBox" :style="`background-color:${node.gradientToColor}`"></span>
                                            <span class="colorInput"> <el-input v-model="node.gradientToColor" placeholder="请输入内容"></el-input></span>
                                        </span>
                                    </div>
                                </div>
                            </template>
                            <template v-if="node.bkType==1">
                                <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            渐变角度
                                        </span>
                                        <span>
                                            <el-input-number v-model="node.gradientAngle" controls-position="right" @change="setPen('gradientAngle')" ></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            </template>
                            <template v-if="node.bkType==2">
                                <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            渐变半径
                                        </span>
                                        <span>
                                            <el-input-number v-model="node.gradientRadius" controls-position="right" @change="setPen('gradientRadius')" ></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            </template>
                            
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="文字" name="2">
                        <text-t :data="data" />
                    </el-collapse-item>
        </el-collapse>
        <sketchColor ref="sketchColor" @sketchColorSubmit="sketchColorSubmit" @sketchColorcancle="sketchColorcancle" />
    </div>
</template>
<script>
import sketchColor from './components/sketchColor.vue'
import textT from './components/textT.vue'
export default {
    name:'node',
    components:{
        sketchColor,
        textT
    },
    props:{
      data:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
        return {
            activeNames: '1',
            node:{
                gradientFromColorShow:false,
                height:100,
                x:100,
                y:100,
                rotate:0,
                lineGradientFromColor:'#000',
                lineGradientToColor:'#000',
                lineWidth:1,
                globalAlpha:1,
                background:'#000',
                gradientFromColor:'#000',
                gradientToColor:'#000',
                bkType:0,
                gradientAngle:0,
                gradientRadius:0
            },
            backColorOptions: [{
                value: 0,
                label: '纯色背景'
                }, {
                value: 1,
                label: '线性渐变'
                }, {
                value: 2,
                label: '径向渐变'
             }],
            }
    },
    mounted(){
        console.log(this.data,'==this.data==')
        for(let key in this.data){
                    for(let key2 in this.node){
                        if(key == key2){
                            this.node[key2] = this.data[key]
                        }
                    }
        }
        if(this.data.lineGradientFromColor || this.data.lineGradientToColor){
            this.node.gradientFromColorShow = true
        }
    },
    methods:{
        handleCommandLineStyle(e){
            console.log(e)
            if(e==0){
                this.$eventBus.$emit('setPen',{id:this.data.id,lineDash: []})
            }
            if(e==1){
                this.$eventBus.$emit('setPen',{id:this.data.id,lineDash: [5,5]})
            }
            if(e==2){
                this.$eventBus.$emit('setPen',{id:this.data.id,lineDash: [15, 3, 3, 3]})
            }
            if(e==3){
                this.$eventBus.$emit('setPen',{id:this.data.id,lineDash: [20, 3, 3, 3, 3, 3, 3, 3]})
            }
            
        },
        handleCommandLineType(e){
            this.$eventBus.$emit('updateLineType',e)
        },
        setColor(e){
            this.$refs.sketchColor.open(e)
        },
        sketchColorSubmit(e){
            console.log(e)
            this.node[e.key] = e.color
            this.$refs.sketchColor.handleClose()
            let obj = {id:this.data.id,strokeType: 1}
            obj[e.key] = this.node[e.key]
            this.$eventBus.$emit('setPen',obj)
        },
        sketchColorcancle(){
            this.$refs.sketchColor.handleClose()
        },
        lineWidthhandleChange(e){
            this.$eventBus.$emit('setPen',{id:this.data.id,lineWidth: e})
        },
        borderWidthhandleChange(e){
            this.$eventBus.$emit('setPen',{id:this.data.id,borderWidth: e})
        },
        setPen(key){
            let obj = {id:this.data.id}
            obj[key] = this.node[key]
            this.$eventBus.$emit('setPen',obj)
        },
        setPenDrop(e){
            console.log(e)
            let obj = {id:this.data.id}
            obj[e.split(',')[0]] = e.split(',')[1]
            this.line[e.split(',')[0]] = e.split(',')[1]
            this.$eventBus.$emit('setPen',obj)
        },
        backColorTypeChange(e){
            console.log(e)
            this.setPen('bkType')
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .combox{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 0px;
    >span{
        margin-right: 20px;
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
/deep/ .el-input__inner{
    padding: 0px!important;
}
/deep/ .el-input-number,.el-select{
    width: 125px!important;
}
</style>