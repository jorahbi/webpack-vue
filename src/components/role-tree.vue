<template>
    <el-transfer  v-loading="loading"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="搜索资源名称"
            v-model="hold"
            :render-content="renderFunc"
            @left-check-change="leftChange"
            @right-check-change="rightChange"
            @change="handleChange"
            :left-default-checked="leftChecked"
            :right-default-checked="rightChecked"
            :titles="['Source', 'Target']"
            :data="permissions">
    </el-transfer>
</template>
<style>
    @import "../style/scss/_role_list.sass";

</style>


<script>
  import api from '../common/api';
    export default {
      data(){
        return {
          permissions: [],
          hold: [],
          filterMethod(query, item) {
            return item.label.indexOf(query) > -1;
          },
          renderFunc(h, option) {
            console.log('as');
            return <span style={{'padding-left': option.level * 15 + 'px'}} title={ option.label }> { option.label }</span>;
          },
          mapping: {
            init: false,
            items: {}
          },
          leftChecked: [],
          rightChecked: [],
          leftPrevSum: 0,
          rightPrevSum: 0,
          loading: false
        }
      },
      mounted() {
        this.$api = api;
      },
      methods: {
        leftChange(all, current) {
          let checked = this.isChecked(all, current, this.leftPrevSum);
          this.leftChecked = checked;
          this.leftPrevSum = checked.length;

        },
        rightChange(all, current) {
          let checked = this.isChecked(all, current, this.rightPrevSum);
          this.rightChecked = checked;
          this.rightPrevSum = checked.length;
        },
        handleChange(all, type , current){
          if (type === 'right') {
            this.leftPrevSum -= current.length;
          } else {
            this.rightPrevSum -= current.length;
          }
        },
        isChecked(all, current, prevSum) {
          current = current.shift();
          let mapping = this.getMapping(current);
          if (prevSum > all.length) {
            //取消
            all = all.filter(function (i) {
              return mapping.children.indexOf(i) < 0;
            });
          } else {
            //增加
            all = Array.from(new Set(all.concat(mapping.parent, current)));
          }
          return all;
        },
        getMapping(key) {
          let _self = this;
          if (!_self.mapping.init) {
            for (let i = 0; i < _self.permissions.length; i++) {
              let current = _self.permissions[i];
              _self.mapping.items[current.key] = {
                parent: current.path,
                children: []
              };
              current.path.map(function (k) {
                _self.mapping.items[k].children.push(current.key);
              });
            }
            _self.mapping.init = true;
          }
          return _self.mapping.items[key];
        },
        getPermission () {
          let _self = this;
          let options = {
            url: '/admin/acl/permissions',
            data: {
              type: 1
            },
            handle: {
              success: (Vue, res) => {
                let msg = res.data.msg || '操作成功';
                Vue.$message({
                  type: 'success',
                  message: msg
                });
                _self.permissions = res.data.data;
                _self.permissions.map(function (permission) {

                });
              }
            }
          };
          this.$api.Post(this, options);
        },
      }
    }
</script>