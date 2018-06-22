<template>
    <div id="app">
    <el-container>
        <el-header>后台登录</el-header>
        <el-main>
            <el-row>
                <el-col :span="6" :offset="8">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="uname">
                            <el-input v-model="ruleForm.uname" placeholder="用户名"></el-input>
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
    @import "../../../style/scss/_login.sass";
</style>
<script>

    import api from '../../../common/api'
    export default {
      name: 'PassportLogin',
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
        this.$api = api
      },
      methods: {
        submitForm(formName) {
          let _self = this;
          _self.$refs[formName].validate((valid) => {
            if (valid) {
              let options= {
                handle: {
                  success: (Vue, res) => {
                    let msg = res.data.msg || '操作成功';
                    Vue.$message({
                      type: 'success',
                      message: msg
                    });
                    _self.$router.push({path: '/admin/index/list'});
                  }
                },
                data: {
                  username: _self.ruleForm.uname,
                  password: _self.ruleForm.pwd,
                },
                url: '/admin/passport/checkLogin'
              }
              this.$api.Post(_self, options)
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