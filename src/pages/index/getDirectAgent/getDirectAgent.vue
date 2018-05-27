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
    mounted(){
      console.log(this.$route, 'sdfsd')
    },
    methods: {

    }
  }
</script>