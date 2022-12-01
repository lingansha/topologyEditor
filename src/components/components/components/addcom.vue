<template>
  <el-dialog
    title="新增自定义组件"
    :visible.sync="dialogVisible"
    width="50%"
    :append-to-body="true"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="类型" prop="name">
        <el-select v-model="ruleForm.name" placeholder="请选择">
          <el-option
            v-for="item in nameType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文字" prop="text">
        <el-input v-model="ruleForm.text"></el-input>
      </el-form-item>
      <el-form-item label="高" prop="height">
        <el-input-number v-model="ruleForm.height" :min="100"></el-input-number>
      </el-form-item>
      <el-form-item label="宽" prop="width">
        <el-input-number v-model="ruleForm.width" :min="100"></el-input-number>
      </el-form-item>
      <el-form-item label="图片" prop="bgimage">
        <upload
          :pic="ruleForm.bgimage"
          :limit="1"
          @callback-pic="handlePicFileList"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import upload from "./Upload.vue";
import {createComponent} from '@/api/mymenu.js'
export default {
  components: {
    upload,
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: "",
        text: "",
        height: 100,
        width: 100,
        bgimage: "",
        data: {},
        menuId:'',
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        text: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        height: [
          { required: true, trigger: "blur" },
        ],
        width: [
          { required: true, trigger: "blur" },
        ],
        bgimage:[
          { required: true, trigger: "blur" },
        ]
      },
      nameType: [
        {
          value: "gif",
          label: "gif",
        },
        {
          value: "image",
          label: "image",
        },
      ],
    };
  },
  methods: {
    open(e) {
        this.ruleForm.menuId = e
      this.dialogVisible = true;
    },
    handleClose() {
      this.$emit("closeAddCom")
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { name,text,bgimage,} = this.ruleForm
          this.ruleForm.data ={
            text,
            name,
            image:bgimage
          }
          let res = await createComponent(this.ruleForm)
          if(res.code==200){
            this.$message.success("添加成功")
            this.$emit('addComComplete')
            this.handleClose()
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handlePicFileList(file) {
        this.ruleForm.bgimage = file
        console.log(this.ruleForm.bgimage,'===this.ruleForm.bgimage===')
    },
  },
};
</script>