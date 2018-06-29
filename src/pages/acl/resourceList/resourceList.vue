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
                            <el-button type="success" plain @click="addPermission('resourceForm')">添加资源</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20"  class="custom-tree-container">
                            <el-tree :data="treeData" :clearable="true" v-loading="loading" node-key="id" default-expand-all :expand-on-click-node="false">
                                <div class="custom-tree-node float-clear" slot-scope="{ node, data }">
                                    <span >{{ node.label }}</span>
                                    <div style="float: right">
                                        <el-button type="warning" plain size="mini" @click="editPermission(node, data)">
                                        修改
                                        </el-button>
                                        <el-button type="danger" plain size="mini" @click="disabled(node, data)" v-if="data.status == '0'">
                                            禁用
                                        </el-button>
                                        <el-button type="danger" plain size="mini" @click="disabled(node, data)" v-else>
                                            启用
                                        </el-button>
                                        <el-button type="danger" plain size="mini" @click="remove(node, data)">
                                        删除
                                        </el-button>
                                    </div>
                                </div>
                            </el-tree>
                        </el-col>
                    </el-row>
                </el-main>
                <el-footer>
                    <footer>
                    </footer>
                </el-footer>
            </el-container>
        </el-container>
        <!-- begin 添加资源 -->
        <el-dialog :title="resourceTitle" :visible.sync="dialogFormVisible" :width="'40%'">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form :model="resourceForm" :rules="rules" ref="resourceForm" label-width="80px">
                        <el-input type="hidden" v-model="resourceForm.id" :value="resourceForm.id"></el-input>
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="resourceForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="上级资源" prop="path">
                            <el-cascader style="width: 100%" placeholder="试试搜索" :options="permissionOptions.options" filterable
                                         change-on-select v-model="resourceForm.path"></el-cascader>
                        </el-form-item>
                        <el-form-item label="模块" prop="module">
                            <el-input v-model="resourceForm.module" :value="resourceForm.module"></el-input>
                        </el-form-item>
                        <el-form-item label="控制器" prop="controller">
                            <el-input v-model="resourceForm.controller" :value="resourceForm.controller"></el-input>
                        </el-form-item>
                        <el-form-item label="方法" prop="action">
                            <el-input v-model="resourceForm.action" :value="resourceForm.action"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="参数" prop="params">
                            <el-input v-model="resourceForm.params"></el-input>
                        </el-form-item>-->
                        <el-form-item label="排序" prop="orderby">
                            <el-input-number v-model="resourceForm.orderby"
                                             :value="resourceForm.orderby"></el-input-number>
                        </el-form-item>
                        <el-form-item label="菜单">
                            <el-radio-group v-model="resourceForm.menu">
                                <el-radio label="1" v-model="resourceForm.menu">是</el-radio>
                                <el-radio label="0" v-model="resourceForm.menu">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="启用">
                            <el-radio-group v-model="resourceForm.status">
                                <el-radio label="0" v-model="resourceForm.status">是</el-radio>
                                <el-radio label="1" v-model="resourceForm.status">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="savePermission('resourceForm')">确 定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </el-dialog>
        <!-- end -->
    </el-container>

</template>
<style>
    @import "../../../style/scss/_list.sass";

</style>
<script>
  import api from '../../../common/api';
  import Crumbs from '../../../components/crumbs.vue'
  export default {
    components: {
      'Crumbs': Crumbs
    },
    data() {
      return {
        crumbs: {
          current: 'getDirectAgent',
          items: [
            {
              path: '/admin/acl/resourceList',
              label: '资源列表'
            },
          ]
        },
        loading: false,
        menuActive: '3-1',
        currentPage: 1,
        pageSize: 999999,
        total: 0,
        treeData: [],

        editNode: {},
        dialogFormVisible: false,
        resourceTitle: '添加资源',
        resourceForm: {
          id: '0',
          title: '',
          module: '',
          controller: '',
          action: '',
          orderby: '0',
          role_id: '0',
          status: '0',
          path: [],
          menu: '1',
          params: ''
        },
        rules: {
          title: [
            {required: true, message: '资源名称', trigger: 'blur'},
          ],
          module: [
            {required: true, message: '请选择模块', trigger: 'blur'}
          ],
          controller: [
            {required: true, message: '请选择控制器', trigger: 'blur'}
          ],
          action: [
            {required: true, message: '请选择方法', trigger: 'blur'}
          ],
        },
        permissionOptions: {
          options: []
        }
      }
    },
    mounted() {
      this.$api = api;
      this.init();
    },
    methods: {
      init() {
        this.getPermission();
      },
      getPermission() {
        let _self = this;

        let options = {
          handle: {
            success(Vue, res) {
              Vue.treeData = res.data.data;
            }
          },
          url: '/admin/acl/resourceList'
        };
        _self.$api.Post(_self, options);
      },
      addPermission() {

        this.dialogFormVisible = true;
        this.permissionTree(0);
      },
      editPermission(node, data) {
        let _self = this;
        _self.permissionTree(data.id);
        _self.resourceTitle = '修改资源';
        let options = {
          data: {
            id: data.id
          },
          handle: {
            success(Vue, res) {
              Vue.resourceForm = res.data.data[0];
              Vue.resourceForm.path = Vue.resourceForm.path.split(',');
              _self.dialogFormVisible = true;
            }
          },
          url: '/admin/acl/resourceDetail'
        };
        _self.$api.Post(_self, options);
        _self.editNode = node;

      },
      permissionTree(id){
        let _self = this;
        let options = {
          data: {
            id: id
          },
          handle: {
            success(Vue, res) {
              Vue.permissionOptions.options = [{label: '--无--', value: 0}].concat(res.data.data);
            }
          },
          url: '/admin/acl/permissionTree'
        };
        _self.$api.Post(_self, options);
      },
      savePermission(formName){
        let _self = this;
        _self.$refs[formName].validate((valid) => {
          if (valid) {
            let options = {
              data: _self.resourceForm,
              handle: {
                success(Vue, res) {
                  Vue.$message({
                    type: 'success',
                    message: '修改成功'
                  });
                  Vue.getPermission();
                  //_self.resetForm();
                  _self.dialogFormVisible = false;
                }
              },
              url: '/admin/acl/addResource'
            };
            _self.$api.Post(_self, options);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      remove(node, data) {
        console.log(node, data);
        /*const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);*/
      },
      resetForm() {
        this.resourceForm.resetFields();
      }
    }
  }
</script>