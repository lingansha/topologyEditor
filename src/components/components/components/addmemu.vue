<template>
  <el-dialog
    title="新增栏目"
    :visible.sync="dialogVisible"
    width="30%"
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
      <el-form-item label="栏目名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import {add} from "@/api/mymenu.js"
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入栏目名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let obj = {
            name:this.ruleForm.name
          }
          let res = await add(obj)
          console.log(res)
          if(res.code==200){
            this.$message.success("新增成功")
            this.$emit('subumitAdd')
            this.handleClose()
          }else{
            this.$message.error(res.msg)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
};
</script>