<template>
  <el-dialog
    title="登录"
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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
          username: '',
          password: ''
        },
        rules: {
            username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
        }
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            let that = this
            this.$store.dispatch("login",this.ruleForm).then((res) => {
                    console.log(res,"==login success==")
                    if(res.code==200){
                        this.$message({
                        message: '登录成功',
                        type: 'success'
                        });
                        that.handleClose()
                    }else{
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        }); 
                    }
                    that.$emit('loginSuccess',res.data)
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>