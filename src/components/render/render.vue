<template>
    <div class="contaner">
        <div id="topology"></div>
    </div>
</template>
<script>
import  {topology as Topology}  from "../topoligy";
import { deepClone } from "@topology/core";

import { registerHighcharts } from "@topology/chart-diagram";
import { flowPens } from "@topology/flow-diagram";
import {
  activityDiagram,
  activityDiagramByCtx,
} from "@topology/activity-diagram";
import { sequencePens, sequencePensbyCtx } from "@topology/sequence-diagram";
import { classPens } from "@topology/class-diagram";
import { register as registerEcharts } from "@topology/chart-diagram";
import {getTopic} from "@/utils/util"
export default {
    name:'render',
    data(){
        return{
            topology:{},
            topicMap:{}
        }
    },
    mounted(){
         //打开json
        this.$eventBus.$on("rederOpenJson", (json) => {
        console.log(json, "===json===");
        this.topology.clear();
        this.topology.open(json);
        this.mqttInt()
        this.topology.inactive();
        this.topology.fitView();
        this.topology.setRule({
            rule: false
        });
        this.topology.setGrid({
        grid: false
        });
        this.topology.lock(2);
        });
        const topology = new Topology("topology", this.options);
        this.topology = topology;
        registerHighcharts();
        registerEcharts();
        this.topology.register(flowPens());
        this.topology.register(activityDiagram());
        // 原生canvas绘画的图库，支持逻辑复杂的需求
        this.topology.registerCanvasDraw(activityDiagramByCtx());
        this.topology.register(sequencePens());
        this.topology.registerCanvasDraw(sequencePensbyCtx());
        this.topology.register(classPens());
        document.getElementsByTagName("canvas")[1].style.left = 0;
        //mqtt推送回调数据处理
        this.topology.socketFn = (message, topic) => {
        // Do sth
        console.log(message, topic);
        console.log(this.topicMap)
        this.topology.setValue({id:this.topicMap[topic],text:JSON.parse(message).msg})
        };

    },
    methods:{
        mqttInt(params){
        if(!params){
            console.log('===mqttInt==')
            for(let key in this.topology.store.pens){
            if(getTopic(this.topology.store.pens[key])){
                this.topicMap[getTopic(this.topology.store.pens[key])] = key
            }
            }
        }else{
            this.topology.closeMqtt()
            console.log(this.topology.store.pens)
            let string =''
            for(let key in this.topology.store.pens){
            if(getTopic(this.topology.store.pens[key])){
                string = string + ','+ getTopic(this.topology.store.pens[key])
                this.topicMap[getTopic(this.topology.store.pens[key])] = key
            }
            }
            string = string.slice(1)
            params.mqttTopics = string
            console.log(params,'==params==')
            this.topology.connectMqtt(params);
        }
        
        }
    }
}
</script>
<style lang="scss" scoped>
#topology {
  height: 98vh;
  width: 100%;
  position: relative;
}
</style>