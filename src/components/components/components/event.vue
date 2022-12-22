<template>
    <div class="event">
        <div class="head">
            <el-button type="primary" icon="el-icon-plus" @click="addEvent">添加事件</el-button>
        </div>
        <div class="eventsBodys">
            <el-collapse v-for="(item,ind) in events" :key="ind" v-model="activeName" accordion>
                <el-collapse-item :name="ind+1">
                    <template slot="title">
                        <div class="title">
                            <span>
                                事件{{ ind+1 }}
                            </span>
                            <span>
                                <i @click.stop="deleteEvent(ind)" class="header-icon el-icon-delete"></i>
                            </span>
                        </div>
                    </template>
                    <div>
                        <div class="box">
                            <span>事件类型：</span>
                            <span>
                                <el-select v-model="item.name" placeholder="请选择">
                                    <el-option
                                    v-for="item in eventTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </div>
                        <div class="box">
                            <span>事件行为：</span>
                            <span>
                                <el-select v-model="item.action" placeholder="请选择" @change="actionTypeChange(item)">
                                    <el-option
                                    v-for="item in actionTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </div>
                        <div  class="box" v-if="item.action==0">
                            <span>链接地址：</span>
                            <span><el-input v-model="item.value" placeholder="链接地址URL"></el-input></span>
                        </div>
                        <div  class="box" v-if="item.action==5">
                            <span>函数体(js)：</span>
                            <span><el-input v-model="item.value" placeholder="函数体(js)" type="textarea" :rows="4"></el-input></span>
                        </div>
                        <div class="box">
                            <span>触发条件：</span>
                            <span>
                                <el-select v-model="item.type" placeholder="请选择" @change="comparisonChange($event,item)">
                                    <el-option
                                    v-for="item in comparisonList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </div>
                        <template v-if="item.type=='comparison'">
                            <div class="box">
                                <span>属性名：</span>
                                <span>
                                    <el-select v-model="item.where.key" placeholder="请选择">
                                            <template v-for="(val, key) in data">
                                                <el-option
                                                v-if="include(key)"
                                                :key="key"
                                                :label="key"
                                                :value="key">
                                            </el-option>
                                            </template>
                                        
                                    </el-select>
                                </span>
                            </div>
                            <div class="box">
                                <span>条件：</span>
                                <span>
                                    <el-select v-model="item.where.comparison" placeholder="请选择">
                                                <el-option
                                                v-for="item,ind in comparisonTypeList"
                                                :key="ind"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        
                                    </el-select>
                                </span>
                            </div>
                            <div  class="box">
                            <span>属性值：</span>
                            <span><el-input v-model="item.where.value" placeholder="属性值" ></el-input></span>
                        </div>
                        </template>
                    </div>
                </el-collapse-item>
          </el-collapse>
        </div>
    </div>
</template>
<script>
import { deepClone } from "@topology/core";
export default {
    name:'event',
    props:{
      data:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
        return{
            events:[],
            activeName: '1',
            eventTypeList:[
                {
                value: 'click',
                label: '单击'
                },
                {
                value: 'dblclick',
                label: '双击'
                },
                {
                value: 'enter',
                label: '鼠标进入'
                },
                {
                value: 'leave',
                label: '鼠标离开'
                },
                {
                value: 'active',
                label: '选中'
                },
                {
                value: 'inactive',
                label: '取消选中'
                },
                {
                value: 'mousedown',
                label: '鼠标按下'
                },
                {
                value: 'mouseup',
                label: '鼠标抬起'
                },
                {
                value: 'valueUpdate',
                label: '数据更新'
                },
            ],
            actionTypeList:[
                {
                value: 0,
                label: '打开链接'
                },
                // {
                // value: 1,
                // label: '设置属性'
                // },
                {
                value: 2,
                label: '播放动画'
                },
                {
                value: 3,
                label: '暂停动画'
                },
                {
                value: 4,
                label: '停止动画'
                },
                {
                value: 5,
                label: '执行函数'
                },
            ],
            comparisonList:[
                {
                value: 0,
                label: '无'
                },
                {
                value: 'comparison',
                label: '关系运算'
                },
            ],
            includeList:['text','name'],
            where:{
                "type":"",
                "value": "",
                "key": "",
                "comparison": ""
            },
            comparisonTypeList:[
                {
                value: "==",
                label: '等于'
                },
                {
                value: "!=",
                label: '不等于'
                },
                {
                value: ">",
                label: '大于'
                },
                {
                value: "<",
                label: '小于'
                },
                {
                value: ">=",
                label: '大于等于'
                },
                {
                value: "<=",
                label: '小于等于'
                },
            ]
        }
    },
    mounted(){
        if(this.data.events){
            this.events = this.data.events
            if(this.data.events.where){
                this.where = this.data.events.where
            }
        }
    },
    methods:{
        actionTypeChange(item){
            item.value = ""
        },
        addEvent(){
            this.events.push({
                name: "click",
                action: 0, // 执行动作
                value: "",
                type:"",
                where:{
                    "type":"",
                    "value": "",
                    "key": "",
                    "comparison": ""
                },
            })
            this.data.events = this.events
        },
        deleteEvent(ind){
            this.events.splice(ind,1)
        },
        include(key){
            if(this.includeList.includes(key)) {
                return true
            }
            return false
        },
        comparisonChange(e,item){
            console.log(e,item,'==e==')
            if(e==0){
                item.where = {
                    "type":"",
                    "value": "",
                    "key": "",
                    "comparison": ""
                }
            }
            this.$forceUpdate()
        }
    }
}
</script>
<style lang="scss" scoped>
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.box{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >span:last-child{
        width: 65%;
    }
}
</style>