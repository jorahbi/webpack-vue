<template>
    <el-container>
        <el-header>后台登录</el-header>
        <el-main>
            <el-row>
                <el-col :span="8" :offset="8">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="uname">
                            <el-input v-model="ruleForm.uname"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input v-model="ruleForm.pwd" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import HttpService from '../../common/httpService'
    export default {
      name: 'Index',
      data() {
        return {
          ruleForm: {
            uname: '',
            pwd: ''
          },
          rules: {
            uname: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
            ],
            pwd: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
            ]
          }
        };
      },
      mounted(){
        this.$http = new HttpService(this);
        console.log(this.$http);
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>