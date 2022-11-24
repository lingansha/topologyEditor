<template>
    <div class="componentConfiguration">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="外观" name="1"><viewW :data="data"/></el-tab-pane>
            <el-tab-pane label="事件" name="2">事件</el-tab-pane>
            <el-tab-pane label="动画" name="3">动画</el-tab-pane>
            <el-tab-pane label="数据" name="4">数据</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import viewW from './components/view.vue'
export default {
    name:'componentConfiguration',
    components:{
      viewW
    },
    data() {
      return {
        activeName: '1'
      };
    },
    props:{
      data:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__item{
    padding: 0 5px!important;
}
</style>