<template>
  <div class="slider" ref='slider'>
    <div class="slider-group">
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  name: 'slider',
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.sliderScroll = new BScroll(this.$refs.slider)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
