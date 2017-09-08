<template>
  <svg class="svg-icon" :class="'svg-icon-' + size" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'svgIcon',
    props: {
      icon: {
        type: String,
        required: true
      },
      size: {
        type: String,
        default: 'middle'
      }
    },
    computed: {
      iconName () {
        return `#${this.icon}`
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

