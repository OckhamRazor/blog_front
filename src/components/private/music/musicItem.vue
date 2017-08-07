
<template>
  <div class="container">
    <p class="index">{{index}}</p>
    <p class="name">{{item.name}}</p>
    <p class="duration">{{item.duration}}</p>
  </div>
</template>

<script>
export default {
  name: 'MusicItem',
  props: {
    index: {
      type: Number
    },
    item: {
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/vars.scss';
.container {
  display: flex;
  width: 100%;

  p {
    margin: 0;
  }
  .index {
    width: $_30px;
  }
  .name {
    flex: 1;
  }
  .duration {
    width: $_60px;
    text-align: right;
  }
}
</style>
