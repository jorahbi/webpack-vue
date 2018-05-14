<template>
    <div>
        <h1>title</h1>
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
            {title: 'content_title1'},
            {title: 'content_title2'},
            {title: 'content_title3'}
          ]
        }
      },
      methods: {

      }
    }
</script>