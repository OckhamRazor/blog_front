<template>
  <div>
    <div class="container">
      <div class="tabs">
        <md-list class="custom-list md-triple-line md-dense">
          <md-list-item>
            <div class="tab-menu" @click="setTabIndex(0)">
              <span>个人信息</span>
            </div>
            <md-divider></md-divider>
          </md-list-item>
          <md-list-item>
            <div class="tab-menu" @click="setTabIndex(1)">
              <span>修改密码</span>
            </div>
            <md-divider></md-divider>
          </md-list-item>
          <md-list-item>
            <div class="tab-menu" @click="setTabIndex(2)">
              <span>自定义设置</span>
            </div>
            <md-divider></md-divider>
          </md-list-item>
        </md-list>
      </div>
      <div>
        <div v-if="tabIndex === 0">
          <profile></profile>
        </div>
        <div v-if="tabIndex === 1">修改密码</div>
        <div v-if="tabIndex === 2">设置</div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from './profile'

export default {
  name: 'UserCenter',
  components: {
    Profile
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    setTabIndex (index) {
      this.tabIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;

  .tabs {
    width: 200px;

    .tab-menu {
      cursor: pointer;
    }
  }
}
</style>
