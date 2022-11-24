<template>
    <div class="colorsetch">
        <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <sketch-picker v-model="color" @input="updateValue"></sketch-picker>
        <div class="botton">
              <el-button @click="cancle">取消</el-button>
              <el-button type="primary" @click="submit">确定</el-button>
        </div>
        </el-dialog>
        
    </div>
</template>
<script>
import { Sketch } from 'vue-color'
export default {
    name:'sketchColor',
    components:{
        'sketch-picker': Sketch
    },
    data(){
        return{
            key:'',
            color: '#000',
            // 颜色选择器
            colorShow: false,
            rgba:'rgba(0,0,0,0)',
            colors: {
                hex: '#194d33',
                hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
                hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
                rgba: { r: 25, g: 77, b: 51, a: 1 },
                a: 1
            },
            dialogVisible:false
        }
    },
    methods:{
        open(key){
            this.key = key
            this.dialogVisible = true
        },
        handleClose(){
            this.dialogVisible = false
        },
        updateValue (val) {
        this.color = val.hex
        this.rgba = `rgba(${val.rgba.r},${val.rgba.g},${val.rgba.b},${val.rgba.a})`
         console.log('颜色选择', this.rgba) // 输出参数如下图1-1
        },
        cancle(){
            this.$emit('sketchColorcancle')
        },
        submit(){
            console.log(this.color)
            this.$emit('sketchColorSubmit',{color:this.color,key:this.key})
        }
    }
}
</script>
<style lang="scss" scoped>
.colorsetch{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    .botton{
        width: 100%;
        margin: 10px 0;
        display: flex;
        justify-content: flex-end;
    }
}
/deep/ .el-dialog__header{
    display: none;
}
/deep/ .el-dialog__body{
    padding:5px;
}
/deep/ .vc-sketch{
    width: 94%!important;
}
</style>