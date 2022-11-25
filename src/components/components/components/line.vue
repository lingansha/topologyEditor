<template>
    <div>
        <el-collapse v-model="activeNames" accordion>
                    <el-collapse-item title="样式" name="1">
                        <div>
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
                                        连线类型
                                    </span>
                                    <span>
                                        <el-dropdown trigger="click" @command="handleCommandLineType">
                                        <span class="el-dropdown-link">
                                            <div class="styleLine"><i class="t-icon t-icon t-curve"/><i class="el-icon-arrow-down el-icon--right"></i></div>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command='curve'><span>曲线 <i class="t-icon t-icon t-curve"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='polyline'><span>线段 <i class="t-icon t-icon t-polyline"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='line'><span>直线 <i class="t-icon t-icon t-line"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='mind'><span>脑图曲线 <i class="t-icon t-icon t-mind"></i></span></el-dropdown-item>
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
                                        v-model="line.gradientFromColor">
                                        </el-switch>
                                    </span>
                                </div>
                                <template v-if="line.gradientFromColor">
                                <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            开始颜色
                                        </span>
                                        <span>
                                            <span @click="setColor('lineGradientFromColor')" class="colorBox" :style="`background-color:${line.lineGradientFromColor}`"></span>
                                            <span class="colorInput"><el-input v-model="line.lineGradientFromColor" placeholder="请输入内容"></el-input></span>
                                        </span>
                                    </div>
                                </div>
                                <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            结束颜色
                                        </span>
                                        <span>
                                            <span @click="setColor('lineGradientToColor')" class="colorBox" :style="`background-color:${line.lineGradientToColor}`"></span>
                                            <span class="colorInput"> <el-input v-model="line.lineGradientToColor" placeholder="请输入内容"></el-input></span>
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
                                            <el-input-number v-model="line.lineWidth" controls-position="right" @change="lineWidthhandleChange" :min="1"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            边框颜色
                                        </span>
                                        <span>
                                            <span @click="setColor('borderColor')" class="colorBox" :style="`background-color:${line.borderColor}`"></span>
                                            <span class="colorInput"><el-input v-model="line.borderColor" placeholder="请输入内容"></el-input></span>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            边框宽度
                                        </span>
                                        <span>
                                            <el-input-number v-model="line.borderWidth" controls-position="right" @change="borderWidthhandleChange" :min="0"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            透明度
                                        </span>
                                        <span>
                                            <el-input-number v-model="line.globalAlpha" controls-position="right" @change="setPen({key:'globalAlpha',type:'line'})"  :min="0" :step="0.1" :max="1"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <span>
                                        起点箭头
                                    </span>
                                    <span>
                                        <el-dropdown trigger="click" @command="setPenDrop">
                                        <span class="el-dropdown-link">
                                            <div class="styleLine"><i :class="`t-icon t-line t-from-${line.fromArrow}`" style="font-size:32px"></i><i class="el-icon-arrow-down el-icon--right"></i></div>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command='fromArrow,'><span><i class="t-icon t-icon t-line" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='fromArrow,triangle'><span><i class="t-icon t-icon t-from-triangle" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='fromArrow,diamond'><span><i class="t-icon t-icon t-from-diamond" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='fromArrow,circle'><span><i class="t-icon t-icon t-from-circle" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='fromArrow,lineDown'><span><i class="t-icon t-icon t-from-lineDown" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='fromArrow,lineUp'><span><i class="t-icon t-icon t-from-lineUp" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='fromArrow,triangleSolid'><span><i class="t-icon t-icon t-from-triangleSolid" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='fromArrow,diamondSolid'><span><i class="t-icon t-icon t-from-diamondSolid" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='fromArrow,circleSolid'><span><i class="t-icon t-icon t-from-circleSolid" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='fromArrow,line'><span><i class="t-icon t-icon t-from-line" style="font-size:32px"></i></span></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    </span>
                                    
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            起点箭头大小
                                        </span>
                                        <span>
                                            <el-input-number v-model="line.fromArrowSize" controls-position="right" @change="setPen({key:'fromArrowSize',type:'line'})" :min="1"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            起点箭头颜色
                                        </span>
                                        <span>
                                            <span @click="setColor('fromArrowColor')" class="colorBox" :style="`background-color:${line.fromArrowColor}`"></span>
                                            <span class="colorInput"> <el-input v-model="line.fromArrowColor" placeholder="请输入内容"></el-input></span>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <span>
                                        终点箭头
                                    </span>
                                    <span>
                                        <el-dropdown trigger="click" @command="setPenDrop">
                                        <span class="el-dropdown-link">
                                            <div class="styleLine"><i :class="`t-icon t-line t-to-${line.toArrow}`" style="font-size:32px"></i><i class="el-icon-arrow-down el-icon--right"></i></div>
                                            
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command='toArrow,'><span><i class="t-icon t-icon t-line" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='toArrow,triangle'><span><i class="t-icon t-icon t-to-triangle" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='toArrow,diamond'><span><i class="t-icon t-icon t-to-diamond" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='toArrow,circle'><span><i class="t-icon t-icon t-to-circle" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='toArrow,lineDown'><span><i class="t-icon t-icon t-to-lineDown" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='toArrow,lineUp'><span><i class="t-icon t-icon t-to-lineUp" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='toArrow,triangleSolid'><span><i class="t-icon t-icon t-to-triangleSolid" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='toArrow,diamondSolid'><span><i class="t-icon t-icon t-to-diamondSolid" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='toArrow,circleSolid'><span><i class="t-icon t-icon t-to-circleSolid" style="font-size:32px"></i></span></el-dropdown-item>
                                            <el-dropdown-item command='toArrow,line'><span><i class="t-icon t-icon t-to-line" style="font-size:32px"></i></span></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    </span>
                                    
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            终点箭头大小
                                        </span>
                                        <span>
                                            <el-input-number v-model="line.toArrowSize" controls-position="right" @change="setPen({key:'toArrowSize',type:'line'})" :min="1"></el-input-number>
                                        </span>
                                    </div>
                            </div>
                            <div class="combox">
                                    <div class="setcolor">
                                        <span>
                                            终点箭头颜色
                                        </span>
                                        <span>
                                            <span @click="setColor('toArrowColor')" class="colorBox" :style="`background-color:${line.toArrowColor}`"></span>
                                            <span class="colorInput"> <el-input v-model="line.toArrowColor" placeholder="请输入内容"></el-input></span>
                                        </span>
                                    </div>
                            </div>
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
    name:'lineX',
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
            line:{
                gradientFromColor:false,
                lineGradientFromColor:'#000',
                lineGradientToColor:'#000',
                lineWidth:1,
                borderWidth:0,
                borderColor:'#000',
                globalAlpha:1,
                fromArrow:'',
                toArrow:'',
                fromArrowSize:10,
                toArrowSize:10,
                fromArrowColor:'#000',
                toArrowColor:'#000'
            },
        };
    },
    mounted(){
        console.log(this.data,'==this.data==')
        for(let key in this.data){
                    for(let key2 in this.line){
                        if(key == key2){
                            this.line[key2] = this.data[key]
                        }
                    }
        }
        if(this.data.lineGradientFromColor || this.data.lineGradientToColor){
            this.line.gradientFromColor = true
        }
        console.log(this.line,'===this.line===')
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
            this.line[e.key] = e.color
            this.$refs.sketchColor.handleClose()
            let obj = {id:this.data.id,strokeType: 1}
            obj[e.key] = this.line[e.key]
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
        setPen(e){
            let obj = {id:this.data.id}
            obj[e.key] = this[e.type][e.key]
            this.$eventBus.$emit('setPen',obj)
        },
        setPenDrop(e){
            console.log(e)
            let obj = {id:this.data.id}
            obj[e.split(',')[0]] = e.split(',')[1]
            this.line[e.split(',')[0]] = e.split(',')[1]
            this.$eventBus.$emit('setPen',obj)
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
/deep/ .el-input-number{
    width: 125px!important;
}
</style>