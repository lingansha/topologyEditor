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
import {detail} from '@/api/drawing.js'
export default {
  name: 'Home',
  components: {
    editor,
    sibar,
    menuBar,rightsite
  },
  async mounted(){
    const {drawingId} = this.$route.query
    console.log(this.$route.query,'===this.$route===')
    if(drawingId){
      let res = await detail({drawingId})
      console.log(res)
      if(res.code==200){
        this.$eventBus.$emit('openJson',res.data)
      }
    }
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
  height: 88vh;
  overflow: hidden;
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
    min-width: 350px;
    height: 88vh;
    overflow-y: auto;
  }
}
</style>
