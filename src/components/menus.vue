<template>
    <div style="background-color: #2c445a">
        <el-aside width="auto">
            <el-button icon="el-icon-d-arrow-right" circle @click="isHidden" v-if="isCollapse"></el-button>
            <el-button icon="el-icon-d-arrow-left" circle @click="isHidden" v-else></el-button>
            <el-menu :default-active="menuActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                     :router="router" :collapse="isCollapse" background-color="#2c445a" text-color="#fff"
                     active-text-color="#ffd04b">

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">代理管理</span>
                    </template>
                    <el-menu-item-group title="代理">
                        <el-menu-item index="1-1" :route="{ path: '/admin/index/list' }">代理列表</el-menu-item>
                        <el-menu-item index="1-2" :route="{ path: '/admin/index/list' }">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">系统管理</span>
                    </template>
                    <el-menu-item-group title="权限">
                        <el-menu-item index="3-1" :route="{ path: '/admin/acl/resourceList' }">资源管理</el-menu-item>
                        <el-menu-item index="3-2" :route="{ path: '/admin/acl/roleList' }">角色管理</el-menu-item>
                        <el-menu-item index="3-3" :route="{ path: '/admin/index/list' }">管理员管理</el-menu-item>
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
        </el-aside>
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
            isHidden() {
                this.isCollapse = this.isCollapse ? false : true;
            },
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            }
        }
    }
</script>