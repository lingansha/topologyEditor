<template>
    <div id="renderContaner">
        <render />
    </div>
</template>
<script>
import {detail} from '@/api/drawing.js'
import render from "@/components/render/render.vue"
export default {
    name:"views",
    components:{
        render
    },
    async mounted(){
        const {drawingId} = this.$route.query
        console.log(this.$route.query,'===this.$route===')
        if(drawingId){
        let res = await detail({drawingId})
        console.log(res)
            if(res.code==200){
                this.$eventBus.$emit('rederOpenJson',res.data)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#renderContaner{
    width: 100%;
    height: 100%;
}
</style>