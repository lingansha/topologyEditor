<template>
  <div class="custom-upload">
    <el-upload
      ref="upload"
      :list-type="listType"
      :action="action"
      :on-success="onSuccess"
      :on-error="onError"
      :headers="headers"
      :multiple="multiple"
      :on-change="onChange"
      :file-list="customFileList"
      :class="{disabled: uploadDisabled}"
      v-bind="$attrs"
      :auto-upload="autoUpload"
    >
      <i class="el-icon-plus" />
      <br />
      <span>{{uploadTexts}}</span>
      <div slot="file" slot-scope="{file}">
        <el-image
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          :preview-src-list="[file.url]"
          alt=""
        />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            class="el-upload-list__item-delete"
          >
            <a :href="file.url" download>
              <i class="el-icon-download" :style="{color: 'white'}" />
            </a>
          </span>
          <span
            v-if="type!=='view'"
            class="el-upload-list__item-delete"
            @click="handleRemove(file.url)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getHeaders } from '@/utils/auth'

export default {
  name: 'upload-component',
  props: {
    type: {
      required: false,
      type: String,
      default: () => 'create'
    },
    limit: {
      required: false,
      type: Number,
      default: () => 0
    },
    pic: {
      required: true,
      type: String,
      default: () => undefined
    },
    action: {
      required: false,
      type: String,
      default: () => "/api/upload/putfile"
    },
    listType: {
      type: String,
      default: ()=> "picture-card"
    },
    uploadText: {
      type: String,
      default() { return "" }
    },
    autoUpload: {
      type: Boolean,
      default() { return true }
    },
    multiple:{
      type: Boolean,
      default() { return false }
    }
  },
  data() {
    const { uploadText } = this
    return {
      headers: getHeaders(),
      customFileList: [],
      disabled: false,
      uploadTexts: uploadText || '上传图片'
    }
  },
  watch: {
    pic: function(pic, oldPic) {
      if(pic!==oldPic) {
        console.log("-----pic-----")
        this.setFileList(pic)
      }
    }
  },
  computed: {
    uploadDisabled:function() {
      const { customFileList, limit, type } = this
      // console.log(type)
      if(type!=='view'){
        return (customFileList.length >= limit) && limit
      }
      return true
    },
  },
  mounted() {
    const { pic } = this
    // console.log(pic)
    this.setFileList(pic)
  },
  methods: {
    onChange(file){
      if(!this.check(file)){
        this.customFileList.push(file)
      }
    },
    check(file){
      if(this.customFileList.length){
        for(let data of this.customFileList){
          if(data.uid==file.uid){
            return true
          }
        }
      }
      return false
    },
    setFileList(pic) {
      const customFileList = []
      if(pic){
        const picList = pic.split(",")
        console.log(picList)
        picList.map(url=>{
          customFileList.push({
            url,
            isFromServer: true
          })
        })
      }
      this.customFileList = customFileList
    },
    callbackFileList(customFileList) {
      console.log(customFileList,'==customFileList==')
      const list = []
      customFileList.map(item=>{
        const { isFromServer, response={} } = item
        if(isFromServer){
          list.push(item.url)
        } else {
          const { data: {pathname} } = response
          list.push(pathname)
        }
      })
      // console.log(list)
      const pic = list.length>0 ? list.join(",") : ""
      this.$emit('callback-pic', pic)
    },
    handleRemove(url) {
      console.log('new handleRemove');
      // console.log(url);
      let { customFileList } = this
      customFileList = customFileList.filter(el=>el.url!==url)
      console.log(customFileList)
      this.callbackFileList(customFileList)
      this.customFileList = customFileList
    },
    handlePictureCardPreview(file, index=0) {
      console.log("点击了预览")
      const {response, isFromServer} = file
      if(isFromServer){
        this.$ImagePreview([{thumbUrl: file.url, url: file.url}], index)
        return
      }
      const { data: {link} } = response
      this.$ImagePreview([{thumbUrl: link, url: link}], index);
    },
    onSuccess(response, file) {
      //console.log(response)
      //console.log(file,'==file==')
      // console.log(customFileList)
      let lengthResponse = 0
      if(response.code===200) {
        for(let data of this.customFileList){
          if(data.uid==file.uid){
            data = file
          }
          if(data.response){
            if(data.response.data.pathname){
              lengthResponse++
            }
          }
        }
        console.log(lengthResponse,this.customFileList.length)
        if(lengthResponse==this.customFileList.length){
          this.callbackFileList(this.customFileList)
        }
        return
      }
      this.$message.error(response.msg)
    },
    onError() {
      /** 服务器异常，上传失败 **/
      this.$message.error('服务器异常，上传失败')
    },
    submitUpload() {
        let res =  this.$refs.upload.submit();
        console.log(res)
    },
  }
}
</script>

<style lang='scss' scoped>
  /deep/ .disabled .el-upload--picture-card {
    display: none;
  }
  .custom-upload {
   /deep/ .el-upload--picture-card {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      line-height: 34px;
      vertical-align: top;
      padding-top: 36px;
      >i {
        font-size: 28px;
        color: #8c939d;
      }
   }
  }
</style>