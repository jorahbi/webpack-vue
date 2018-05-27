<template>
    <el-container class="container">
        <el-aside width="auto">
            <menus :menuactive="menuActive">
            </menus>
        </el-aside>
        <el-container>
            <el-header>
                <header>
                </header>
            </el-header>
            <el-container>
                <el-main>
                    <AgentList ref="agentList">
                    </AgentList>
                </el-main>
                <el-footer>
                    <footer>
                    </footer>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
    export default {
    data() {
      return {
       menuActive: '1-2',

      }
    },
    mounted(){
      this.init()
    },
    methods: {
       
        init(){
            let _self = this;
            let options = {
                data: {
                agentId: _self.$route.params.id
                },
                url: '/admin/index/getDirectAgent',
                handle: {
                    success: (Vue, res) => {
                      let msg = res.data.msg || '操作成功'
                      Vue.$message({
                        type: 'success',
                        message: msg
                      })
                      _self.$refs.agentList.tableData = res.data.data
                    }
                }
            }
            _self.$refs.agentList.$api.Post(_self, options)
        }
    }
}
</script>