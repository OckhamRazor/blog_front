<template>
  <div class="user-container">
    <div>
      <h5 class="title">关于</h5>
      <div>
        <img :src="user.avatar" alt="Avatar" class="avatar">
      </div>
      <p>
        <router-link :to="user.profile">个人介绍</router-link>
      </p>
    </div>
    <div>
      <h5 class="title">Fllow Me</h5>
      <a :href="user.github" target="_blank">
        <icon-svg iconClass="github" class="contact-icon">

        </icon-svg>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserProfileCard',
    data () {
      return {
        user: {
          avatar: '/static/images/music-8.jpg',
          profile: '/article/00001',
          articleAmount: 120,
          github: 'https://github.com/OckhamRazor'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';

.avatar {
  width: $_128px;
}
.title {
  font-size: $_16px;
  font-weight: normal;
  margin: $_10px 0;
}
.contact-icon {
  width: $_32px;
  height: $_32px !important;
  color: #555;
  transition: color .3s ease;

  &:hover {
    color: black;
  }
}
</style>
