<template>
    <div class="contaner">
        <ul>
          <li v-for="(item,ind) in list" :key="ind">
          <div class="box">
            <span class="title">{{item.name}}</span>
            <span class="input"><el-input v-model="item[item.field.bindCodeField]" placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-edit" @click="openPageList(ind)">{{item.field[item.field.bindNameField]}}</el-button>
            </el-input>
            </span>
            <pagelist :ref="`page_${ind}`" :data="data" :key="ind" :item="item" @submit="submit" />
          </div>
          </li>
        </ul>
    </div>
</template>
<script>
import pagelist from "./components/pageList.vue"
export default {
  components:{
    pagelist
  },
    name:'dataEditor',
    props: {
      data: {
      type: Object,
      default: () => {
        return {};
      },
    }
  },
  data(){
        return{
            list:[]
        }
  },
  mounted(){
    console.log(this.data,'===dataxxxxdata===')
    if(this.data.communication.Interface){
        if(this.data.communication.Interface.InterfaceList){
            this.list = this.data.communication.Interface.InterfaceList
        }
    }
    
  },
  methods:{
    openPageList(e){
      console.log(this.$refs)
      this.$refs[`page_${e}`][0].open(e)
    },
    submit(){
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
ul{
  list-style: none;
  padding: 0;
  li{
    margin: 10px 0;
    .box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title{
        width: 100px;
      }
      .input{
        width: 80%;
      }
    }
  }
}
</style>