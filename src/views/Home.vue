<template>
  <div class="home">
    <div class="toolbar"></div>
    <div class="bodys">
      <div class="left">
        <sibar />
      </div>
      <div class="right"><editor /></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import editor from '@/components/editor.vue'
import sibar from '@/components/LeftSidebar.vue'
export default {
  name: 'Home',
  components: {
    editor,
    sibar
  }
}
</script>
<style lang="scss" scoped>
.toolbar{
  height: 50px;
  background: #ccc;
}
.bodys{
  display: flex;
  justify-content: space-between;
  .left{
    width: 10%;
    min-width: 200px;
  }
  .right{
    width: 90%;
  }
}
</style>
