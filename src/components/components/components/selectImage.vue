<template>
    <div class="contaner">
        <el-dialog
        title="选择图片"
        :visible.sync="dialogVisible"
        width="800px"
        :append-to-body="true"
        :before-close="handleClose">
        <div class="contaner">
            <div class="head">
                <el-button icon="el-icon-plus" type="primary" @click="(dialogVisibleImg=true)">上传图片</el-button>
            </div>
            <ul>
                <li v-for="item in list" :key="item.id" >
                   
                    <div class="imgbox" @click.stop="handelClick(item)">
                        <div class="img">
                            <div class="new-item-badge" v-if="item.checked"><i class="el-icon-check"></i></div>
                            <el-image
                            class="icon"
                            :src="item.pathname"
                            fit="fit"></el-image>
                        </div>
                        <div class="footer">
                            <el-button type="primary" size="mini" plain icon="el-icon-delete">删除</el-button>
                        </div>
                    </div>
                </li>
            </ul>
            <el-pagination
                @current-change="currentChange"
                layout="prev, pager, next"
                :total="page.total">
            </el-pagination>
            <div class="submit">
                <el-button type="primary" @click="subumitSelectImg">确定</el-button>
            </div>
        </div>
        <el-dialog
            title="上传图片"
            :visible.sync="dialogVisibleImg"
            width="50%"
            :append-to-body="true"
            :before-close="dialogVisibleImgClick">
            <upload
                v-if="dialogVisibleImg"
                ref="upload"
            :pic="bgimage"
            :limit="6"
            :autoUpload="false"
            @callback-pic="handlePicFileList"
            />
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="subumitUpload">确 定</el-button>
            </span>
        </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
import upload from "./Upload.vue"
import {getImagesListPage} from "@/api/drawing.js"
export default {
    components:{
        upload
    },
    data(){
        return{
            dialogVisible:false,
            page:{
                currentPage:1,
                pageSize:10,
                total:0
            },
            list:[],
            dialogVisibleImg:false,
            bgimage:''
        }
    },
    methods:{
        subumitUpload(){
            this.$refs.upload.submitUpload()
        },
        dialogVisibleImgClick(){
            this.dialogVisibleImg = false
        },
        handlePicFileList(){
            this.dialogVisibleImgClick()
        },
        currentChange(e){
            this.page.currentPage = e
            this.init()
        },
        open(){
            this.init()
            this.dialogVisible = true
        },
        async init(){
            const{currentPage,pageSize} = this.page
            let res =  await getImagesListPage({
                currentPage,pageSize
            })
            if(res.code==200){
                this.list = res.data.list
                this.page.total = res.data.total
            }
            console.log(res)
        },
        handleClose(){
            this.dialogVisible = false
            this.$emit('close')
        },
        handelClick(item){
            for(let data of this.list){
                if(item.id==data.id){
                    data.checked = true
                }else{
                    data.checked = false
                }
            }
            console.log(this.list)
            this.$forceUpdate()
        },
        check(){
            for(let data of this.list){
                if(data.checked){
                    return data.pathname
                }
            }
            return false
        },
        subumitSelectImg(){
            let res = this.check()
            if(res){
                this.$emit('subumitSelectImg',res)
            }else{
                this.$message.error("请选择一个图片")
            }
        }
    }
}
</script>
<style lang="scss" scoped>
ul{
    list-style: none;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li{
       
        
        width: 19%;
        margin-right: 3px;
        margin-bottom: 20px;
        border: 1px dashed #e0e0e0;
        .imgbox{
            width: 90%;
            height: 150px;
            padding:0 10px;
            display: flex;
            justify-content: space-between;
            flex-flow: column;
            .img{
                overflow: hidden;
                position: relative;
                width: 100%;
                max-height: 100px;
                overflow: hidden;
                .icon{
                        width: 100%;
                        height: 100%;
                }
            }
            
        }
        .footer{
            padding:10px 0px;
            display: flex;
            justify-content: space-between;
        }
        
    }
}
.submit{
            display: flex;
            justify-content: flex-end;
}
.new-item-badge {
      position: absolute;
      background: #02a7f0;
      z-index: 999;
      width: 60px;
      text-align: center;
      height: 30px;
      line-height: 50px;
      border-radius: 3px; 
      color: #fff;
      font-size: 12px !important;
      padding: 2px 4px 0;
      top: -11px;
      right: -26px;
      -ms-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      -webkit-transition: 0 0.1s ease-in;
      -moz-transition: 0 0.1s ease-in;
      -o-transition: 0 0.1s ease-in;
      transition: transform 0.1s ease-in;
      padding-bottom: 5px;
      .el-icon-check{
        -ms-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        font-size: 24px;
      }
    }
</style>