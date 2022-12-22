<template>
  <div class="systemcom">
    <div class="head">
      <span>mqtt</span>
    </div>
    <div class="bodys">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="URL地址*">
          <el-input v-model="form.mqtt"></el-input>
        </el-form-item>
        <el-form-item label="Client ID">
          <el-input v-model="form.clientId"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary">断开</el-button>
        <el-button type="primary" @click="connectMqtt">连接</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "systemcom",
  data(){
    return{
        form: {
          mqtt: '',
          clientId:'',
          username:"",
          password:""
        }
    }
  },
  computed: {
    topology: function () {
      return this.$store.getters.topology;
    },
  },
  watch:{
    'topology.store.data.mqttOptions':{
        handler:function(){
            if(this.topology.store.data){
                if(this.topology.store.data.mqtt){
                    this.form.mqtt = this.topology.store.data.mqtt
                }
                if(this.topology.store.data.mqttOptions){
                    this.form.clientId = this.topology.store.data.mqttOptions.clientId
                    this.form.username = this.topology.store.data.mqttOptions.username
                    this.form.password = this.topology.store.data.mqttOptions.password
                }
            }
        }
    }
  },
  mounted(){
  },
  methods:{
    connectMqtt(){
        let  params = {
            mqtt: this.form.mqtt,
            mqttTopics: '', // 多个主题用,分割
            mqttOptions: {
                customClientId:false,
                clientId:this.form.clientId,
                username:this.form.username,
                password:this.form.password,
            },
        };
        this.$eventBus.$emit('connectMqtt',params)
    }
  }
};
</script>
<style lang="scss" scoped>
.systemcom{
    .head{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span{
            font-weight: 600;
        }
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
    }
    .bodys{
        margin: 10px 0;
    }
}
</style>