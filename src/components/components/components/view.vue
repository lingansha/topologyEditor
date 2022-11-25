<template>
    <div class="contaner">
        <lineX :data="data"  v-if="data.type==1" />
        <node :data="data" v-if="data.type==0" />
    </div>
</template>
<script>
import lineX from './line.vue'
import node from './node.vue'
export default {
    name:'contaner',
    components:{
        lineX,
        node
    },
    props:{
      data:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
        return {
            activeNames: '1',
        };
    }
}
</script>
