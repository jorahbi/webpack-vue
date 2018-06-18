<template>
    <el-container class="container">
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <menus :menuActive="menuActive">
            </menus>
            <el-container>
                <el-main>
                    <el-row class="breadcrumb">
                        <el-col :span="21">
                            <el-breadcrumb style="line-height: 40px; height: 40px"
                                           separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                                <el-breadcrumb-item>资源列表</el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="success" plain @click="addPermission">添加资源</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">

                            <el-table :data="tableData" border="" v-loading="loading">
                                <el-table-column label="ID" prop="id" style="width:5%" type="index">
                                </el-table-column>
                                <el-table-column label="标题" prop="title" style="width:5%">
                                </el-table-column>
                                <el-table-column label="父资源" prop="action" style="width:10%">
                                </el-table-column>
                                <el-table-column label="模块" prop="module" style="width:10%">
                                </el-table-column>
                                <el-table-column label="控制器" prop="controller" style="width:10%">
                                </el-table-column>
                                <el-table-column label="方法" prop="action" style="width:10%">
                                </el-table-column>

                                <el-table-column label="状态" prop="status" style="width:10%">
                                </el-table-column>
                                <el-table-column label="操作" width="500px">
                                    <template slot-scope="scope">
                                        <el-button size="mini" @click="editPermission(scope.$index, scope.row)">修改
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                        <el-col :span="20">
                            <div class="block" style="float: right;margin: 20px;">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[10, 20, 30, 50]"
                                        :page-size="100"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total">
                                </el-pagination>
                            </div>
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
                        <el-form-item label="父资源" prop="title">
                            <el-input v-model="resourceForm.title"></el-input>
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
                            <el-button type="primary" @click="onSubmit('resourceForm')">确 定</el-button>
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

    export default {
        data() {
            return {
                loading: false,
                menuActive: '3-1',
                currentPage: 1,
                pageSize: 10,
                total: 20,
                tableData: [],
                formTiele: '添加资源',
                editDataIndex: 0,
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
                }
            }
        },
        mounted() {
            this.$api = api;
            this.init();
        },
        methods: {
            init() {
                let _self = this;
                let options = {
                    handle: {
                        success(Vue, res) {
                            Vue.tableData = res.data.data.data;
                        }
                    },
                    data: {
                        pageSize: _self.pageSize,
                        currentPage: _self.currentPage
                    },
                    url: '/admin/acl/resourceList'
                };
                _self.$api.Post(_self, options);
            },
            addPermission() {
                this.resetForm();
                this.dialogFormVisible = true;
            },
            editPermission(index, row) {
                let _self = this;
                _self.formTiele = '修改资源';
                let options = {
                    data: {
                        pid: row.id
                    },
                    handle: {
                        success(res, Vue) {
                            Vue.resourceForm = res.data.data[0];
                            _self.dialogFormVisible = true;
                        }
                    },
                    url: '/admin/acl/resourceDetail'
                };
                _self.$api.Post(_self, options);
                _self.editDataIndex = index;

            },
            resetForm() {
                this.resourceForm = {
                    id: '0',
                    title: '',
                    module: '',
                    controller: '',
                    action: '',
                    orderby: '0',
                    role_id: '0',
                    status: '0',
                    menu: '1',
                    params: ''
                };

                this.dialogFormVisible = false;
            },
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            }
        }
    }
</script>