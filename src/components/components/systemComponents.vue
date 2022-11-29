<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(item, ind) in data"
        :title="item.name"
        :name="ind"
        :key="ind"
      >
        <div class="thumbs">
          <div  class="thumb flex" v-for="info in item.list" :key="info.id">
            <div :title="info.name" class="center hover" 
            draggable="true"
            @dragstart="onDragstart($event,info)"
            @click="onTouchstart($event,info)">
              <i
                :class="`icon-size ${info.icon}`"
              ></i
              ><!----><!---->
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { defalutMaterials } from "./data";
export default {
  data() {
    return {
      activeNames: ["1"],
      data: [],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
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
  created() {
    console.log(defalutMaterials);
    this.data = defalutMaterials;
  }
};
</script>
<style lang="scss" scoped>
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