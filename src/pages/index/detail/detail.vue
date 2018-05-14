<template>
    <div>
        <h1>detail</h1>
        <ul class="list">
            <li v-for="item in list" v-text="item.title"></li>
        </ul>
    </div>
</template>
<script>
    export default {
      name: 'Content',
      data(){
        return {
          list: [
            {title: 'detail_title1'},
            {title: 'detail_title2'},
            {title: 'detail_title3'}
          ]
        }
      },
      methods: {

      }
    }
</script>