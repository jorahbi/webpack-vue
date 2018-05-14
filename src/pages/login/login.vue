<template>
    <div id="app">
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
    </div>
</template>
<style>
    @import "../../style/scss/_login.scss";
</style>
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
              { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
            ],
            pwd: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
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
          let _self = this;
          _self.$refs[formName].validate((valid) => {
            if (valid) {
              let options= {
                data: {
                  username: _self.ruleForm.uname,
                  password: _self.ruleForm.pwd,
                },
                url: '/admin/passport/checkLogin'
              }
              _self.$http.Post(options)
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