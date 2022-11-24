<template>
  <div class="home">
    <div class="toolbar">
      <menuBar />
    </div>
    <div class="bodys">
      <div class="left">
        <sibar />
      </div>
      <div class="center"><editor /></div>
      <div class="rigth">
       <rightsite />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import menuBar from '@/components/menuBar.vue'
import editor from '@/components/editor.vue'
import sibar from '@/components/LeftSidebar.vue'
import rightsite from '@/components/rightsite.vue'
export default {
  name: 'Home',
  components: {
    editor,
    sibar,
    menuBar,rightsite
  }
}
</script>
<style lang="scss" scoped>
.toolbar{
  height: 60px;
}
.bodys{
  display: flex;
  justify-content: space-between;
  .left{
    width: 15%;
    min-width: 200px;
  }
  .center{
    width: 70%;
    overflow: hidden;
  }
  .rigth{
    width: 15%;
    min-width: 260px;
  }
}
</style>
