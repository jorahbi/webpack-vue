<template>
    <el-container class="container">
        <el-header>
            <Header></Header>
        </el-header>

        <el-container>
            <Menus :menuActive="menuActive"></Menus>
            <el-container>
                <el-main>
                    <el-row class="breadcrumb">
                        <Crumbs :crumbs="crumbs"></Crumbs>
                        <el-col :span="3">
                            <el-button type="success" plain @click="addRoot">添加总代</el-button>
                        </el-col>
                    </el-row>
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
    import AgentList from '../../../components/agent-list.vue'
    import Crumbs from '../../../components/crumbs.vue'

  export default {
    components: {
      'AgentList': AgentList,
      'Crumbs': Crumbs
    },
    data() {
      return {
        menuActive: '1-1',
        name: '',
        keyupTime: 0,
        crumbs: {
          current: 'getDirectAgent',
          items: [
            {
              path: '#',
              label: '代理列表'
            }
          ]
        }
      }
    },
    methods: {
      addRoot(){

      },
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