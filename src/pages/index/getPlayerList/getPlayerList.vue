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
                        <el-col>
                            <el-breadcrumb  separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{ path: '/admin/index/list' }">代理列表</el-breadcrumb-item>
                                <el-breadcrumb-item>{{ agentName }} 直属玩家列表</el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="tableData" border="" style="width: 85%" v-loading="loading">
                                <el-table-column label="昵称" prop="nick_name" style="width:5%">
                                </el-table-column>
                                <el-table-column label="balance" prop="balance" style="width:10%">
                                </el-table-column>
                                <el-table-column label="cash_flow" prop="cash_flow" style="width:10%">
                                </el-table-column>
                                <el-table-column label="order_amount" prop="order_amount" style="width:10%">
                                </el-table-column>
                                <el-table-column label="profit_loss" prop="profit_loss" style="width:10%">
                                </el-table-column>
                                <el-table-column label="withdraw_amount" prop="withdraw_amount" style="width:10%">
                                </el-table-column>
                                <el-table-column label="创建时间" prop="create_time" style="width:10%">
                                </el-table-column>
                                <el-table-column label="register_date" prop="register_date" style="width:10%">
                                </el-table-column>
                                <el-table-column label="是否有效" prop="is_active" style="width:10%">
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
        menuActive: '1-1',
        name: '',
        agentName: '',
        agentId: 0,
        currentPage: 1,
        pageSize: 10,
        total: 20,
        tableData: [],
        breadcrumbs: []
      }
    },
    mounted(){
      this.$api = api;
      this.init();
    },
    methods: {
      init(){
        this.agentName = this.$route.params.name;
        this.agentId = this.$route.params.id;
        this.breadcrumbs[this.breadcrumbs.length] = {
          agentId: this.agentId,
          agentName: this.agentName
        };
        this.getDirectAgent();
      },
      getDirectAgent(){
        let _self = this;
        let options = {
          data: {
            agentName: this.agentName,
            agentId: this.agentId,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          },
          url: '/admin/index/getPlayerList',
          handle: {
            success: (Vue, res) => {
              let msg = res.data.msg || '操作成功';
              Vue.$message({
                type: 'success',
                message: msg
              });
              _self.tableData = res.data.data.data;
              _self.total = res.data.data.total;
            }
          }
        };
        this.$api.Post(this, options);
      },
      readChild(agentId, agentName, pageSize){
        this.breadcrumbs[this.breadcrumbs.length] = {
          agentId: agentId,
          agentName: agentName,
          path:'/admin/index/getDirectAgent/' + agentId + '/' + agentName
        };
        this.agentName = agentName;
        this.agentId = agentId;
        this.pageSize = pageSize;
        this.getDirectAgent();
      },
      handleSizeChange(val){
        this.pageSize = val;
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.getDirectAgent();
      }
    }
}
</script>