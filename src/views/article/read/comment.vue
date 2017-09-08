<template>
  <div v-html="comment.content">

  </div>
</template>

<script>
export default {
  name: 'ArticleComment',
  props: {
    comment: {
      type: Object,
      defualt: {
        content: ''
      }
    }
  }
}
</script>
