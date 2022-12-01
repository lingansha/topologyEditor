<template>
  <div class="contaner">
    <div class="create" @click="add">
      <span><i class="el-icon-plus"></i></span
      ><span>新增栏目</span>
    </div>
    <div>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="item in menuList"
          :key="item.id"
          :name="item.id"
        >
        <template slot="title">
        <div class="titlebox" >
            <span class="menutitle">{{item.name}}</span>
            <span class="menutitle"><i :title="`为${item.name}栏目创建组件`" class="el-icon-plus" @click.stop="addCom(item.id)"></i></span>
        </div>
        </template>
        <div class="thumbs">
          <div  class="thumb flex" v-for="info in item.components" :key="info.id">
            <div :title="info.text" class="center hover" 
            draggable="true"
            @dragstart="onDragstart($event,info)"
            @click="onTouchstart($event,info)"><!----><!---->
            <el-image
            style="width: 45px; height: 45px"
            :src="info.bgimage"
            fit="fit"></el-image>
            </div>
          </div>
        </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <addmenu ref="addmenu" @subumitAdd="init" />
    <addcom v-if="showAddCom" ref="addcom" @closeAddCom="showAddCom=false"  @addComComplete="init"/>
  </div>
</template>
<script>
import addmenu from "./components/addmemu.vue";
import addcom from './components/addcom.vue'
import { list } from "@/api/mymenu.js";
export default {
  components: {
    addmenu,
    addcom
  },
  data() {
    return {
      userInfo: undefined,
      addname: "",
      menuList: [],
      activeName: "1",
      showAddCom:false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      if (localStorage.getItem("userInfo")) {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(this.userInfo, "==this.userInfo==");
        let res = await list({ userId: this.userInfo.userId });
        if (res.code == 200) {
          this.menuList = res.data;
          console.log(this.menuList, "==this.menuList==");
        }
      }
    },
    add() {
      if (this.userInfo) {
        console.log("add");
        this.$refs.addmenu.open();
      } else {
        this.$message.error("请先登录");
      }
    },
    addCom(e){
        console.log("test")
        this.showAddCom = true
        this.$nextTick(()=>{
            this.$refs.addcom.open(e)
        })
    },
    onDragstart(e,item) {
      console.log(e)
      this.$eventBus.$emit('dragstart',{e,item})
    },
    onTouchstart(e,item) {
        console.log(e)
        this.$eventBus.$emit('onTouchstart',{e,item})
    },
  },
};
</script>
<style lang="scss" scoped>
.contaner {
  .create {
    cursor: pointer;
    padding: 10px;
  }
}
/deep/.titlebox{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.thumbs{
    display: flex;
    flex-wrap: wrap;
    margin-left: 8px;
    .thumb{
        width: 25%;
    }
    .flex{
        align-items: center;
        justify-content: space-between;
    }
    .thumb>div{
        width: 100%;
    }
    .icon-size{
        font-size: 25px!important;
        width: 25px;
    }
}
</style>