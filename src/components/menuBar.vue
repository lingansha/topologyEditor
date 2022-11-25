<template>
  <div class="menu">
    <div>
      <span>
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar :size="30" :src="circleUrl"></el-avatar>
          </div>
        </div>
      </span>
      <span>
        <a class="menubox"
          ><div class="icon">
            <i class="t-icon t-save"></i
            ><!---->
          </div>
          <div @click="save">保存</div>
          <!----></a
        >
      </span>
      <span class="menubox">
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="t-icon t-edit"></i
              ><i class="el-icon-arrow-down el-icon--right"></i>
              <div>编辑</div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="undo">撤销 ctrl+z</span></el-dropdown-item>
              <el-dropdown-item><span @click="redo">恢复 ctrl+y</span></el-dropdown-item>
              <el-dropdown-item><span @click="cut">剪切 ctrl+x</span></el-dropdown-item>
              <el-dropdown-item><span @click="copy">复制 ctrl+c</span></el-dropdown-item>
              <el-dropdown-item><span @click="paste">粘贴 ctrl+v</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        
      </span>
    </div>
    <div>
      <span class="menubox" @click="unlockClick">
        <div>
          <i :class="`t-icon ${unlock ? 't-lock warning' : 't-unlock'}`"></i>
        </div>
        <div :class="`${unlock ? 'warning' : ''}`">
          {{ unlock ? "已锁定" : "已解锁" }}
        </div>
      </span>
      <span class="menubox">
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{(scale*100).toFixed(0)}}%<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <div class="dropdown">
                  <span @click="subScale"><i class="el-icon el-icon-zoom-out"></i></span>
                  <span @click="addScale"><i class="el-icon el-icon-zoom-in"></i></span>
                  <span @click="fitView"> <el-button size="small">窗口大小</el-button></span>
                  <span @click="reScale"> <el-button size="small">重置</el-button></span>
                </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>视图</div>
      </span>
      <span class="menubox">
        <div>
          <el-dropdown @command="updateLineType">
            <span class="el-dropdown-link">
              <i class="t-icon t-icon t-curve"></i
              ><i class="el-icon-arrow-down el-icon--right"></i>
              <div>连线</div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='curve'><span>曲线 <i class="t-icon t-icon t-curve"></i></span></el-dropdown-item>
              <el-dropdown-item command='polyline'><span>线段 <i class="t-icon t-icon t-polyline"></i></span></el-dropdown-item>
              <el-dropdown-item command='line'><span>直线 <i class="t-icon t-icon t-line"></i></span></el-dropdown-item>
              <el-dropdown-item command='mind'><span>脑图曲线 <i class="t-icon t-icon t-mind"></i></span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        
      </span>
    </div>
    <div>xx</div>
  </div>
</template>
<script>
export default {
  name: "menuBar",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      unlock: false,
      scale:1
    };
  },
  mounted(){
    this.$eventBus.$on("fitViewComplete", (v) => {
      this.scale = v
    });
  },
  methods: {
    unlockClick() {
      this.unlock = !this.unlock;
      if(this.unlock){
        this.$eventBus.$emit('onLocker')
      }else{
        this.$eventBus.$emit('unLocker')
      }
    },
    subScale(){
      this.scale = this.scale-0.1
      this.$eventBus.$emit('scale',this.scale)
    },
    addScale(){
      this.scale = this.scale+0.1
      this.$eventBus.$emit('scale',this.scale)
    },
    reScale(){
      this.$eventBus.$emit('scale',1)
    },
    fitView(){
      this.$eventBus.$emit('fitView')
    },
    undo(){
      this.$eventBus.$emit('undo')
    },
    redo(){
      this.$eventBus.$emit('redo')
    },
    cut(){
      this.$eventBus.$emit('cut')
    },
    copy(){
      this.$eventBus.$emit('copy')
    },
    paste(){
      this.$eventBus.$emit('paste')
    },
    updateLineType(e){
      console.log(e)
      this.$eventBus.$emit('updateLineType',e)
    },
    save(){
      this.$eventBus.$emit('saveTopo')
    },
    test(e){
      console.log(e)
    }
  },
};
</script>
<style lang="scss" scoped>
.menu {
  border-bottom: 1px #c0c0c0 solid;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  .menubox {
    cursor: pointer;
    .warning {
      color: #faad14;
    }
  }
  
}
.dropdown{
          width: 300px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .el-icon{
                font-size: 24px;
                cursor: pointer;
          }
}
</style>