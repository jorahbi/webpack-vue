<template>
    <div>
        <h4>logo</h4>
        <el-button icon="el-icon-d-arrow-right" circle @click="isHidden" v-if="isCollapse"> </el-button>
        <el-button icon="el-icon-d-arrow-left" circle @click="isHidden" v-else> </el-button>
        <el-menu :default-active="menuActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :router="router" :collapse="isCollapse" background-color="#2c445a" text-color="#fff"
                 active-text-color="#ffd04b">

            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">代理管理</span>
                </template>
                <el-menu-item-group title="分组一">
                    <el-menu-item index="1-1" :route="{ path: '/admin/index/list' }">代理列表</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>

            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">玩家管理</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">系统管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style>

</style>


<script>
  export default {
    data() {
      return {
        isCollapse: false,
        router: true
      };
    },
    props: {
      menuActive: {
        type: String,
        default: '0'
      }
    },
    methods: {
      isHidden(){
        this.isCollapse = this.isCollapse ? false : true;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>