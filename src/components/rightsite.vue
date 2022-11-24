<template>
    <div class="rightsite">
        <template v-if="active.length==1">
            <nodeInfo :data="active[0]" />
        </template>
        <template v-else>
            <sysInfo />
        </template>
    </div>
</template>
<script>
import sysInfo from './components/drawingConfiguration.vue'
import nodeInfo from './components/componentConfiguration.vue'
export default {
    components:{
        sysInfo,nodeInfo
    },
    name:'rightsite',
    data(){
        return{
            active:[]
        }
    },
    mounted(){
        this.$eventBus.$on('activeDataReflash',(obj)=>{
            console.log(obj,'==activeDataReflash==')
            this.active = obj
        })
    },
    beforeDestroy(){
        this.$eventBus.$off('activeDataReflash')
    }
}
</script>
<style scoped>
.rightsite{
    padding: 0px 0px 0 20px;
}
</style>