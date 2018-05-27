<template>

    <el-container class="container">

        <el-aside width="auto">

            <Menus :menuActive="menuActive"></Menus>

        </el-aside>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-main>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form class="demo-ruleForm" label-width="100px">
                                <el-form-item label="搜索" prop="name">
                                    <el-input clearable="" id="search" @keyup.native="searchKeyUp($event)"
                                              v-model="name"
                                              placeholder="按帐户名搜索">
                                        <i class="el-input__icon el-icon-search" slot="prefix">
                                        </i>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                    <AgentList ref="agentList"></AgentList>
                </el-main>
                <el-footer>
                    <Footer></Footer>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
  export default {
    data() {
      return {
        menuActive: '1-1',
        name: '',
        keyupTime: 0,

      }
    },
    methods: {
      searchKeyUp(event) {
        let _self = this;
        _self.keyupTime = event.timeStamp;
        setTimeout(function () {
          if (_self.keyupTime === event.timeStamp && _self.name !== '') {
            _self.$refs.agentList.inputChange(_self.name, 0);
          }
        }, 1000)
      },
    }
  }
</script>