<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-table :data="tableData" v-loading="loading" border="" :stripe="true" @expand-change="expand"
                          ref="table">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-row>
                                <el-col>
                                    代理链：
                                    <el-button size="small" type="text" @click="inputChange(item.name)"
                                               v-for="(item, key) in expandInfo[props.row.name].fathers"
                                               :key="key">
                                        {{ item.name }}
                                        <span size="small" type="text"
                                              v-if="item.id != props.row.id"> ></span>
                                    </el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    直属代理总数:
                                    <router-link :to="{ name: 'GetDirectAgent', params: { id: props.row.id, name: props.row.name}}"
                                            v-if="expandInfo[props.row.name].child_count > 0">
                                        {{ expandInfo[props.row.name].child_count }}
                                    </router-link>
                                    <span v-else>0</span>
                                </el-col>
                                <el-col :span="6">
                                    直属玩家总数:
                                    <router-link
                                            :to="{path:'/admin/index/getPlayerList/' + props.row.id + '/' + props.row.name}"
                                            v-if="expandInfo[props.row.name].player_count > 0">
                                        {{ expandInfo[props.row.name].player_count }}
                                    </router-link>
                                    <span v-else>0</span>
                                </el-col>
                                <el-col :span="6">
                                    <span> 流水: {{ expandInfo[props.row.name].flow }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span> 直属税收: {{ expandInfo[props.row.name].taxIncome }}</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <span> 团队税收: {{ expandInfo[props.row.name].groupTaxIncome }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span>剩余额度: {{ expandInfo[props.row.name].balance }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span>-已提现: {{ expandInfo[props.row.name].amount }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span> +调整额度: {{ expandInfo[props.row.name].adjust }}</span>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>

                    <el-table-column label="ID" prop="promoters_id" style="width:5%">
                    </el-table-column>
                    <el-table-column label="帐号" prop="name" style="width:5%">
                    </el-table-column>

                    <el-table-column label="来源组" prop="source_group" style="width:10%">
                    </el-table-column>
                    <!--
                    <el-table-column label="安全手机" prop="safety_phone" style="width:10%">
                    </el-table-column>
                    <el-table-column label="是否验证安全邮箱" prop="is_checked" style="width:10%">
                    </el-table-column>
                    -->
                    <el-table-column label="分成比例/分成链" prop="divided" style="width:10%">
                    </el-table-column>
                    <el-table-column label="创建时间" prop="create" style="width:10%">
                    </el-table-column>
                    <el-table-column label="操作" width="600px">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" size="small" type="text"
                                       v-if="scope.row.auth_error >= 10">
                                解除锁定
                            </el-button>
                            <el-button size="mini" type="text" v-else disabled>
                                未锁定
                            </el-button>
                            <el-button size="mini" @click="proportion(scope.row)">
                                分成比例
                            </el-button>
                            <el-button size="mini" @click="readLevel(scope.row)">
                                查看档位
                            </el-button>
                            <el-button size="mini" @click="modifyPwd(scope.row)">
                                修改密码
                            </el-button>
                            <el-button size="mini" @click="modifyBillPwd(scope.row)">
                                修改提现密码
                            </el-button>

                            <el-button size="mini" @click="amountDialog(scope.row)">
                                增加额度
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!-- 修改金额 -->
        <el-dialog :title="amountForm.agentName + '增加额度'" :visible.sync="AmountDialogFormVisible" width="40%">
            <el-row>
                <el-col :span="20">
                    <el-form :model="amountForm" ref="amountForm" :rules="amountRules" label-width="80px">
                        <el-input v-model="amountForm.agentId" type="hidden" value="amountForm.agentId"></el-input>
                        <el-input v-model="amountForm.agentName" type="hidden"
                                  value="amountForm.agentName"></el-input>
                        <el-form-item label="额度" prop="amount">
                            <el-input v-model="amountForm.amount"></el-input>
                        </el-form-item>
                        <el-form-item label="简介" prop="msg">
                            <el-input v-model="amountForm.msg"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addAmountJust('amountForm')">确 定</el-button>
                <el-button @click="AmountDialogFormVisible = false">取 消</el-button>
            </div>

        </el-dialog>

        <!-- end 修改金额 -->
        <!-- begin 弹层修改档位 -->
        <el-dialog :title=" levelTitle " :visible.sync="dialogFormVisible" :width="'50%'">
            <!-- 增加档位 -->
            <el-dialog width="45%" :title="addLevelTitle" :visible.sync="addLevelVisible" append-to-body>
                <el-form :model="level" :inline="true" class="demo-form-inline">
                    <el-form-item label="开始段" prop="first">
                        <el-select v-model="level.first" name="first" placeholder="起始段"
                                   @change="selLevelChange($event)">
                            <el-option :label="item.first" :key="index" :value="item.first"
                                       v-for="(item, index) in levels"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="结束段" prop="last">
                        <el-select v-model="level.last" placeholder="结束段">
                            <el-option :label="level.last" :value="level.last"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="增加量" prop="level">
                        <el-input-number v-model="level.level" :value="level.level"></el-input-number>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addLevelVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSubmitLivel('level')">确 定</el-button>
                </div>

            </el-dialog>
            <el-row :gutter="20">
                <el-col :span="1" :offset="19" style="margin-bottom: 10px;">
                    <el-button type="success" @click="addLevel">新增档位</el-button>
                </el-col>
            </el-row>
            <el-table :data="promotersLevels" border="">
                <el-table-column property="first_num" label="开始段" style="width: 25%"></el-table-column>
                <el-table-column property="last_num" label="结束段" style="width: 25%"></el-table-column>
                <el-table-column property="num" label="数量" style="width: 25%"></el-table-column>
                <el-table-column property="use_num" label="可用数量" style="width: 25%"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="modifyLevel(scope.row)" size="small" type="text">
                            修改档位
                        </el-button>
                        <el-button @click="modifyLevelInfinite(scope.row)" size="small" type="text"
                                   v-if="scope.row.num == -1">
                            取消无限
                        </el-button>
                        <el-button @click="modifyLevelInfinite(scope.row)" size="small" type="text" v-else>
                            设为无限
                        </el-button>
                        <el-button @click="delLevel(scope.row)" size="small" type="text">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<style>
    @import "../style/scss/_list.sass";

</style>
<script>

    import api from '../common/api'

    const EDIT = -1; //修改档位
    const INFINITE = 1; //设为无限
    const NOT_INFINITE = 0; //取消无限
    export default {
        data() {
            return {
                loading: false,
                tableData: [],

                isLock: true,
                dialogFormVisible: false,
                addLevelVisible: false,
                AmountDialogFormVisible: false,
                level: {
                    first: '',
                    last: '',
                    level: 1,
                    agent: '',
                },
                levelTitle: '',
                addLevelTitle: '',
                promotersLevels: [],
                levels: [
                    {first: "1", last: "15"},
                    {first: "16", last: "25"},
                    {first: "26", last: "35"},
                    {first: "36", last: "45"},
                    {first: "46", last: "50"},
                    {first: "51", last: "51"},
                ],
                lastLevel: '',
                expandInfo: {},
                amountForm: {
                    amount: '',
                    msg: '',
                    agentId: 0,
                    agentName: '',
                },
                amountRules: {
                    amount: [
                        {required: true, message: '金额不能为空', trigger: 'blur'},
                    ]
                }
            }
        },
        mounted() {
            this.$api = api
        },
        watch: {
            '$route': function (route) {
                console.log(route, 'list')
            },
        },
        methods: {
            expand(row) {
                if (this.expandInfo[row.name] || !row.name) {
                    return false;
                }
                this.expandInfo[row.name] = {
                    fathers: []
                };
                let options = {
                    data: {
                        agentName: row.name,
                        agentId: row.id
                    },
                    url: '/admin/index/getAgentDetail',
                    handle: {
                        success: (Vue, res) => {
                            let msg = res.data.msg || '操作成功';
                            Vue.$message({
                                type: 'success',
                                message: msg
                            });
                            Vue.expandInfo[row.name] = res.data.data;
                            Vue.$refs.table.toggleRowExpansion(res.data.data, true)

                        }
                    }
                };
                this.$api.Post(this, options)
            },
            amountDialog(row) {
                let _self = this;
                _self.AmountDialogFormVisible = true;
                _self.amountForm.agentId = row.id;
                _self.amountForm.agentName = row.name;
            },
            addAmountJust(formName) {

                let _self = this;
                _self.$refs[formName].validate((valid) => {
                    if (valid) {
                        let options = {
                            data: {
                                agentId: _self.amountForm.agentId,
                                agentName: _self.amountForm.agentName,
                                amount: _self.amountForm.amount,
                                log: _self.amountForm.msg,
                            },
                            handle: {
                                success: (Vue, res) => {
                                    let msg = res.data.msg || '操作成功';
                                    Vue.$message({
                                        type: 'success',
                                        message: msg
                                    });
                                    Object.assign(_self.expandInfo[_self.amountForm.agentName], res.data.data);
                                    //_self.tableData[0] = Object.assign({}, _self.tableData[0], res.data.data);
                                    _self.amountForm.amount = '';
                                    _self.amountForm.msg = '';
                                    _self.AmountDialogFormVisible = false
                                }
                            },
                            url: '/admin/amount_money/addAmountJust'
                        };
                        this.$api.Post(_self, options)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            selLevelChange(event) {
                let _self = this;
                for (let level in _self.levels) {
                    if (_self.levels[level].first === event) {
                        _self.level.last = _self.levels[level].last;
                        break;
                    }
                }
            },
            inputChange(uname, id) {
                let options = {
                    data: {
                        agentName: uname,
                        agentId: id
                    },
                    url: '/admin/index/list',
                    handle: {
                        success: (Vue, res) => {
                            let msg = res.data.msg || '操作成功';
                            Vue.$message({
                                type: 'success',
                                message: msg
                            });
                            Vue.tableData = res.data.data
                        }
                    }
                };
                this.$api.Post(this, options)
            },
            handleClick(row) {
                let options = {
                    url: '/admin/index/unlock'
                };
                let params = {agentName: row.name};
                this.$api.Post(this, options, params);
            },
            readLevel(row) {
                let _self = this;
                _self.levelTitle = '查看代理: ' + row.name + ' 的档位';
                _self.level.agent = row.name;
                _self.dialogFormVisible = true;

                let options = {
                    data: {
                        agentName: row.name,
                    },
                    url: '/admin/index/getLevels',
                    handle: {
                        success: (Vue, res) => {
                            _self.promotersLevels = res.data.data;
                        }
                    }
                };
                this.$api.Post(this, options)
            },
            //修改档位
            modifyLevel(row) {
                let _self = this;
                _self.$prompt('修改档位', '修改用户' + _self.level.agent + '档位', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    _self.submitModifyLevel(row, value, EDIT);
                }).catch(() => {
                    _self.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });
            },
            modifyLevelInfinite(row) {
                let _self = this;
                let isInfinite = INFINITE;
                let dialog = '是否设为无限';
                if (row.num === '-1') {
                    isInfinite = NOT_INFINITE;
                    dialog = '是否取消无限';
                }

                _self.$confirm(dialog, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _self.submitModifyLevel(row, -1, isInfinite);
                }).catch(() => {
                    _self.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            addLevel() {
                let _self = this;
                _self.addLevelVisible = true;
                _self.addLevelTitle = '添加' + _self.level.agent + '档位';
            },
            addSubmitLivel() {
                let _self = this;
                let row = {
                    user: _self.level.agent,
                    first_num: _self.level.first,
                    last_num: _self.level.last,
                    id: 0
                };
                _self.submitModifyLevel(row, _self.level.level, EDIT);
                _self.addLevelVisible = false;
            },
            submitModifyLevel(row, value, infinite) {
                let options = {
                    data: {
                        agentName: row.user,
                        first: row.first_num,
                        last: row.last_num,
                        level: value,
                        infinite: infinite,
                        id: row.id
                    },
                    url: '/admin/index/modifyLevel',
                    handle: {
                        success: (Vue, res) => {
                            Vue.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                            Vue.readLevel({name: row.user});
                        }
                    }
                };
                this.$api.Post(this, options);
            },
            delLevel(row) {
                let _self = this;
                _self.$confirm('确定删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let options = {
                        url: '/admin/index/delLevel',
                        data: {
                            levelId: row.id
                        },
                        handle: {
                            success: (Vue, res) => {
                                Vue.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                                _self.readLevel({name: row.user});

                            }
                        }
                    };
                    _self.$api.Post(_self, options);

                }).catch(() => {
                    _self.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            proportion(row) {

                let _self = this;
                let options = {
                    data: {
                        agentName: row.name
                    },
                    url: '/admin/index/getProportion',
                    handle: {
                        success: (Vue, res) => {

                            Vue.$prompt('原比例:' + res.data.data.proportion, '修改用户' + row.name + '分成比例', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                            }).then(({value}) => {
                                value = parseInt(value);
                                if (isNaN(value) || value < 0 || value > 100) {
                                    Vue.$message.error('请输入大于等于0并且小于等于100的整数数字');
                                    return false;
                                }
                                let options = {
                                    url: '/admin/index/editProportion',
                                    data: {
                                        agentName: row.name,
                                        proportion: value
                                    }
                                };
                                _self.$api.Post(_self, options);

                            }).catch((err) => {
                                console.log(err)
                                _self.$message({
                                    type: 'info',
                                    message: '取消修改'
                                });
                            });
                        }

                    }
                };
                this.$api.Post(this, options)
            },
            modifyPwd(row) {
                let _self = this;
                this.$prompt('请输入密码', '修改用户' + row.name + '密码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {

                    let options = {
                        data: {
                            agentId: row.id,
                            pwd: value
                        },
                        url: '/admin/index/modifyPwd'
                    };
                    _self.$api.Post(_self, options);
                }).catch(() => {
                    _self.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });
            },
            modifyBillPwd(row) {
                let _self = this;
                this.$prompt('请输入提现密码', '修改用户' + row.name + '提现密码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    let options = {
                        data: {
                            agentId: row.id,
                            billPwd: value
                        },
                        url: '/admin/index/modifyBillPwd'
                    };
                    _self.$api.Post(_self, options);

                }).catch(() => {
                    _self.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });
            }
        }
    }
</script>