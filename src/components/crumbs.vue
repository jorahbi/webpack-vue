<template>

    <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item separator="/" :to="{path: crumb.path}" v-for="(crumb, index) in breadcrumb"
                                :key="index"> {{ crumb.label }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </el-col>

</template>

<script>
  import Storage from '../common/storage';

  export default {
    data() {
      return {
        current: '',
        breadcrumb: [
          {
            path: '#',
            label: '首页'
          }
        ],
      }
    },
    props: {
      crumbs: {
        type: Object,
        default: []
      }
    },
    mounted() {
      this.current = this.crumbs.current;
      this.breadcrumb = this.breadcrumb.concat(this.crumbs.items);
      this.init();
    },
    methods: {
      init() {
        //this.add(this.current, this.breadcrumb)
      },
      add(context) {
        let crumbs = Storage.get(this.current);
        crumbs = crumbs || [];
        crumbs.push(context);
        Storage.set(this.current, crumbs);
      },
      clear() {
        Storage.clear(this.current);
      },
      handle(route) {

      }
    }
  }
</script>