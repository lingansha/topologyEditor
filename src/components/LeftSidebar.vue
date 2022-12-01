<template>
  <div class="LeftSidebar">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="系统组件" name="first"><systemCom /></el-tab-pane>
      <el-tab-pane label="我的组件" name="second"><myMenu /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import systemCom from "./components/systemComponents.vue"
import myMenu from "./components/customizeComponentMenu.vue"
export default {
  name: "LeftSidebar",
  components:{
    systemCom,
    myMenu
  },
  data(){
    return{
        activeName:'first'
    }
  },
  computed: {
    topology: function () {
      return this.$store.getters.topology;
    },
  },
  methods:{
    handleClick(){
        
    }
  }
};
</script>
<style lang="scss" scoped>

/deep/.el-tabs__header{
    margin-bottom: 0px!important;
}

</style>