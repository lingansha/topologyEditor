<template>
    <div class="componentConfiguration">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="外观" name="1"><viewW :key="data.id" :data="data"/></el-tab-pane>
            <el-tab-pane label="事件" name="2"><event :key="data.id" :data="data" /></el-tab-pane>
            <el-tab-pane label="动画" name="3"><animate-x :data="data" :key="data.id" v-if="data.type == 1" /><animateN :data="data" :key="data.id" v-if="data.type == 0" /></el-tab-pane>
            <el-tab-pane label="数据" name="4"><dataEditor :key="data.id" :data="data" /></el-tab-pane>
            <el-tab-pane label="通信" name="5"><communication :key="data.id" :data="data" /></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import viewW from './components/view.vue'
import animateX from './components/animatex.vue'
import animateN from './components/animatenode.vue'
import communication from './components/communication.vue'
import dataEditor from './components/dataEditor.vue'
import event from './components/event.vue'
export default {
    name:'componentConfiguration',
    components:{
      viewW,
      animateX,
      animateN,
      communication,
      dataEditor,
      event
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