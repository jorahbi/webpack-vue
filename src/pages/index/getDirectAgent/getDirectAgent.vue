<template>
    <el-container class="container">
        <el-header>
            <Header>
            </Header>
        </el-header>
        <el-container>
            <menus :menuActive="menuActive">
            </menus>
            <el-container>
                <el-main>
                    <el-row class="breadcrumb">
                        <Crumbs ref="crumbs" :crumbs="crumbs"></Crumbs>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="tableData" border="" style="width: 85%" v-loading="loading">
                                <el-table-column label="ID" prop="agent_id" style="width:5%">
                                </el-table-column>
                                <el-table-column label="帐号" prop="agent_name" style="width:5%">
                                </el-table-column>
                                <el-table-column label="直属代理总数" prop="child_count" style="width:10%">
                                    <template slot-scope="scope">
                                        <el-button size="small" @click="readChild(scope.row.agent_id, scope.row.agent_name, 1)" v-if="scope.row.child_count > 0">
                                            {{ scope.row.child_count }}
                                        </el-button>
                                        <el-button size="small" disabled v-else>
                                            {{ scope.row.child_count }}
                                        </el-button>
                                    </template>
                                </el-table-column>

                                <el-table-column label="直属玩家总数" prop="player_count" style="width:10%">
                                    <template slot-scope="scope">
                                        <el-button size="small" @click="readChild(scope.row.agent_id, scope.row.agent_name, 1)" v-if="scope.row.player_count > 0">
                                            {{ scope.row.player_count }}
                                        </el-button>
                                        <el-button size="small" disabled v-else>
                                            {{ scope.row.player_count }}
                                        </el-button>
                                    </template>
                                </el-table-column>

                                <el-table-column label="流水" prop="flow" style="width:10%">
                                </el-table-column>
                                <el-table-column label="税收" prop="taxIncome" style="width:10%">
                                </el-table-column>
                                <el-table-column label="创建时间" prop="create_time" style="width:10%">
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
  import Storage from '../../../common/storage';
  import Crumbs from '../../../components/crumbs.vue'
  export default {
    components: {
      'Crumbs': Crumbs
    },
    data() {
      return {
        loading: false,
        menuActive: '1-1',
        name: '',
        agentName: '',
        agentId: 0,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        crumbs: {
          current: 'getDirectAgent',
          items: [
            {
              path: '/admin/index/list',
              label: '代理列表'
            },
          ]
        }
      }
    },
    mounted(){

      this.$api = api;
      this.init();
    },
    watch: {
      '$route': function (route) {
        this.agentName = route.params.name;
        this.agentId = route.params.id;
        this.pageSize = 10;
        this.currentPage = 1;
        this.getDirectAgent();
      },
    },
    methods: {
      init(){
        let params = Storage.get('GetDirectAgent');
        this.agentName = params.name;
        this.agentId = params.id;

        this.getDirectAgent();
      },
      getDirectAgent() {
        this.crumbs.items.length = 2;
        this.crumbs.items.push({
          path: '/admin/index/getDirectAgent/' + this.agentId + '/' + this.agentName,
          label: this.agentName + ' 直属代理列表'
        });
        let _self = this;
        let options = {
          data: {
            agentName: this.agentName,
            agentId: this.agentId,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          },
          url: '/admin/index/getDirectAgent',
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

        this.$router.push({path: '/admin/index/getDirectAgent/' + agentId + '/' + agentName});
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