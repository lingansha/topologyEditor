<template>
    <div>
        <ul v-if="Object.keys(topology).length">
            <li class="box" v-for="item in reverseList()" :key="item.id">
                <span>{{item.text || item.name}}</span>
                <span>
                    <span><i @click="up(item)" class="el-icon-top"></i></span>
                    <span><i @click="down(item)" class="el-icon-bottom"></i></span>
                    <span><i @click="clickVisible(item)" :class="`${item.visible===false?'el-icon-view visible':'el-icon-view '}`"></i></span>
                    <span><i @click="clickLocker(item)" :class="`t-icon ${item.locked==10?'t-lock warning':'t-unlock'}`"></i></span>
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    computed:{
        topology:function(){
            return this.$store.getters.topology
        }
    },
    data(){
        return{
            locked:false,
            visible:true
        }
    },
    mounted(){
        console.log(this.topology,'=====this.topology--layer====')
    },
    methods:{
        reverseList(){
            let arr = []
            for(let i = this.topology.store.data.pens.length-1;i>=0;i--){
                arr.push(this.topology.store.data.pens[i])
            }
            return arr
        },
        clickVisible(e){
            this.visible = !this.visible
            this.setPen(e,'visible')
        },
        clickLocker(e){
            console.log(e)
            this.locked = !this.locked
            if(this.locked){
                this.topology.setValue({id:e.id,locked:10});
            }else{
                this.topology.setValue({id:e.id,locked:0});
            }
           this.$forceUpdate()
        },
        setPen(item,key){
            let obj={
                id:item.id
            }
            obj[key] = this[key]
            console.log(obj)
            this.topology.setValue(obj);
            this.$forceUpdate()
        },
        up(pen){
            console.log(pen,'==up==')
            this.topology.up(pen);
            this.$forceUpdate()
            console.log(this.topology,'=====this.topology--layer====')
        },
        down(pen){
            this.topology.down(pen);
            this.$forceUpdate()
        }
    }
}
</script>
<style lang="scss" scoped>
ul{
    padding: 0;
}
.box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
    >span:last-child{
        span{
            margin: 0 10px;
            cursor: pointer;
        }
    }
    .visible{
        color: #ccc;
    }
}
.warning {
      color: #faad14;
}
</style>