<template>
    <el-dialog
    :title="`${item.name}列表`"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-table
      :data="list"
      v-loading="loading"
      @row-click="singleElection"
      style="width: 100%">
      <el-table-column label="" width="65">
        <template slot-scope="scope">
            <el-radio class="radio" v-model="templateSelection" :label="scope.$index">&nbsp;</el-radio>
        </template>
    </el-table-column>
      <el-table-column
        :prop="item.field.bindNameField"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        :prop="item.field.bindCodeField"
        label="编码"
        width="180">
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
    </span>
    </el-dialog>
    </template>
<script>
import { proxyRequest } from "@/api/proxy.js";
import { getParmas } from "@/utils/util";
export default {
    props:{
        item:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        data: {
        type: Object,
        default: () => {
            return {};
        },
        }
    },
    data() {
      return {
        templateSelection: "",
        dialogVisible: false,
        page:{},
        total:0,
        list:[],
        index:0,
        loading:false
      };
    },
    methods: {
      currentChange(e){
        this.page[this.item.parmas.current] = e
        this.init()
      },
      open(e){
        this.index = e
        console.log(this.item)
        this.initPage()
        this.init()
        this.dialogVisible = true
      },
      async init(){
        this.loading = true
        let obj = getParmas(this.item,this.data,this.page,this.index)
        console.log(obj)
        let res = await proxyRequest(obj)
        console.log(res)
        if(res.code==200){
          this.getdata(res.data)
        }
        this.loading = false
      },
      getdata(data){
        
        let obj = data
        let arr = this.item.field.dataField.split('.')
            if(arr[0]!=""){
                if(arr.length){
                  for(let data of arr){
                    obj = obj[data]
                  }
                }
            }
                this.list = obj[this.item.field.listField]
                this.total = obj[this.item.field.totalField]
      },
      initPage(){
        if(this.item.parmas.current!=''){
            this.page[this.item.parmas.current] = 1
        }
        if(this.item.parmas.size!=""){
            this.page[this.item.parmas.size] = 5
        }
      },
      handleClose() {
       this.dialogVisible = false
      },
      singleElection (row) {
            console.log(row)
            this.templateSelection = this.list.indexOf(row);
            this.templateRadio = row;
      },
      submit(){
        console.log(this.templateRadio)
        console.log(this.item)
        this.item[this.item.field.relationField] = this.templateRadio[this.item.field.relationField]
        this.item[this.item.field.bindCodeField] = this.templateRadio[this.item.field.bindCodeField]
        this.item.field[this.item.field.bindNameField] = this.templateRadio[this.item.field.bindNameField]
        this.$emit("submit")
        this.handleClose()
      }
    }
}
</script>
<style lang="scss" scoped>

</style>