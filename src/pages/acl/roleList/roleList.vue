<template>
    <el-container class="container">
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <menus :menuActive="menuActive">
            </menus>
            <el-container>
                <el-main id="main">
                    <el-row class="breadcrumb">
                        <Crumbs ref="crumbs" :crumbs="crumbs"></Crumbs>
                        <el-col :span="3">
                            <el-button type="success" plain  @click="modifyRole('resourceForm')">添加角色</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="tableData" border="" style="width: 85%" v-loading="loading">
                                <el-table-column label="ID" prop="id" style="width:5%">
                                </el-table-column>
                                <el-table-column label="名称" prop="name" style="width:5%"></el-table-column>

                                <el-table-column label="介绍" prop="description" style="width:10%">
                                </el-table-column>
                                <el-table-column label="状态" prop="status" style="width:10%">
                                </el-table-column>
                                <el-table-column label="操作" style="width:10%">
                                    <template slot-scope="scope">
                                        <el-button size="small" >
                                            禁用
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-main>
                <el-footer>
                    <footer>
                    </footer>
                </el-footer>
            </el-container>
        </el-container>
        <!-- begin 添加角色 -->
        <el-dialog :title="resourceTitle" :visible.sync="dialogFormVisible" :width="'50%'">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form :model="resourceForm" :rules="rules" ref="resourceForm" label-width="80px">
                        <el-input type="hidden" v-model="resourceForm.id" :value="resourceForm.id"></el-input>
                        <el-form-item label="名称" prop="title">
                            <el-input v-model="resourceForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="介绍" prop="desc">
                            <el-input v-model="resourceForm.desc" :value="resourceForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item label="权限">
                            <RoleTree ref="roleTree"></RoleTree>
                        </el-form-item>
                        <el-form-item label="启用">
                            <el-radio-group v-model="resourceForm.status">
                                <el-radio label="0" v-model="resourceForm.status">是</el-radio>
                                <el-radio label="1" v-model="resourceForm.status">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveRole('resourceForm')">确 定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </el-dialog>
        <!-- end -->
    </el-container>

</template>
<style>
    @import "../../../style/scss/_role_list.sass";

</style>
<script>
  import api from '../../../common/api';
  import Crumbs from '../../../components/crumbs.vue'
  import RoleTree from '../../../components/role-tree.vue'
  export default {
    components: {
      'Crumbs': Crumbs,
      'RoleTree': RoleTree
    },
    data() {
      return {
        dialogFormVisible: false,
        crumbs: {
          current: 'getDirectAgent',
          items: [
            {
              path: '/admin/acl/roleList',
              label: '角色列表'
            },
          ]
        },
        resourceForm: {},
        rules: {
          title: [
            {required: true, message: '资源名称', trigger: 'blur'},
          ]
        },
        resourceTitle: '添加角色',
        tableData: [],
        loading: false,
        menuActive: '3-2',
      }
    },
    mounted() {
      this.$api = api;
      this.init();
    },
    methods: {
      init() {
        this.roleList();
      },
      roleList () {
        let _self = this;
        let options = {
          url: '/admin/acl/roleList',
          data: {
            type: 1
          },
          handle: {
            success: (Vue, res) => {
              let msg = res.data.msg || '操作成功';
              Vue.$message({
                type: 'success',
                message: msg
              });
              _self.tableData = res.data.data;

            }
          }
        };
        this.$api.Post(this, options);
      },
      modifyRole (formName, item) {
        let _self = this;
        _self.dialogFormVisible = true;
        _self.$nextTick(function(){
          _self.$refs.roleTree.getPermission();
        });

        //this.$refs.roleTree.getPermission();
      },

      saveRole() {
        console.log(this.value2);
      }
    }
  }
</script>