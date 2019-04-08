<template>
  <div class="slider" ref='slider'>
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot, index) in dots" :class="{active:currentIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentIndex: 0
      }
    },
    methods: {
      _initSlider() {
        this.sliderScroll = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: true, // 滚动动画
          snap: true, // slide组件高级设置
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
          // 因fastclick和bscroll冲突，所以使用默认点击事件即可 click: true
        })

        this.sliderScroll.on('scrollEnd', () => {
          let pageIndex = this.sliderScroll.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentIndex = pageIndex
        })

        if (this.autoPlay) {
          this._play()
        }
      },
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth

        for (let i = 0; i < this.children.length; i++) {
          let item = this.children[i]
          addClass(item, 'slider-item')
          item.style.width = sliderWidth + 'px'
          width += sliderWidth
        }

        if (this.loop && !isResize) {
          // bscorll会克隆多余两个dom
          width += 2 * sliderWidth
        }

        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        this.timer = setInterval(() => {
          let pageIndex = this.currentIndex + 1
          if (this.loop) {
            pageIndex += 1
          }
          /*
          * {Number} x 横轴的页数
            {Number} y 纵轴的页数
            {Number} time 动画执行的时间
          */
          this.sliderScroll.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    destroyed() {
      clearInterval(this.timer)
    },
    mounted() {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      window.addEventListener('resize', () => {
        if (!this.sliderScroll) {
          return
        }
        // 传参数，避免增加多余scroll衔接宽度
        this._setSliderWidth(true)
        // 宽度发生变化时调用
        this.sliderScroll.refresh()
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
