<template>
    <div class="drawingConfiguration">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="图纸" name="1">图纸</el-tab-pane>
            <el-tab-pane label="通信" name="2">通信</el-tab-pane>
            <el-tab-pane label="图层" name="3">图层</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name:'drawingConfiguration',
    data() {
      return {
        activeName: '1'
      };
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