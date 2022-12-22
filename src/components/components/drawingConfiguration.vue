<template>
    <div class="drawingConfiguration">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="图纸" name="1"><drawinginfo  /></el-tab-pane>
            <el-tab-pane label="通信" name="2"><systemcom /></el-tab-pane>
            <el-tab-pane label="图层" name="3"><layer /></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import layer from "./components/layer.vue"
import drawinginfo from './components/drawinginfo.vue'
import systemcom from './components/systemcom.vue'
export default {
    components:{
      layer,
      drawinginfo,
      systemcom
    },
    name:'drawingConfiguration',
      props:{
      topology:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data() {
      return {
        activeName: '1'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    watch:{
      topology:function(val){
        console.log(val,'==drawingConfigurationtopology==')
      }
    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__item{
    padding: 0 5px!important;
}
</style>