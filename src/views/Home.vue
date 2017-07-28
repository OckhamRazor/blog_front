<template>
  <div class="container">
    <h1 class="main-title">SALUT</h1>
    <img src="/static/images/music-8.jpg" alt="Avatar" class="avatar">
    <music class="music-wrapper"></music>
  </div>
</template>

<script>
import Music from '@/components/music'
export default {
  name: 'Home',
  components: {
    Music
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.container {
  text-align: center;
  margin: 0 auto $_64px auto;
}
.main-title {
  margin: 1rem auto;
}
.avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
}
.music-wrapper {
  max-width: 16rem;
  margin: 0 auto;
  margin-top: 1.6rem;
}
</style>
