
<template>
  <div
    v-show="showTop"
    class="scrollTop"
    @click="toTop"
  >
    <svg-icon
      icon-class="backtotop"
      class="backtotop"
    />
  </div>
</template>
<script>
import SvgIcon from '@/components/SvgIcon/index'
export default {
  name: 'ScrollTop',
  components: { SvgIcon },
  data() {
    return {
      scrollTop: 0,
      time: 0,
      dParams: 20,
      scrollState: 0
    }
  },
  computed: {
    showTop: function() {
      const value = this.scrollTop > 200
      return value
    }
  },
  mounted() {
    window.addEventListener('scroll', this.getScrollTop)
  },
  methods: {
    toTop(e) {
      if (this.scrollState) {
        return
      }
      this.scrollState = 1
      e.preventDefault()
      const _this = this
      this.time = setInterval(function() { _this.gotoTop(_this.scrollTop - _this.dParams) }, 10)
    },
    gotoTop(distance) {
      this.dParams += 20
      distance = distance > 0 ? distance : 0
      document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance
      if (this.scrollTop < 10) {
        clearInterval(this.time)
        this.dParams = 20
        this.scrollState = 0
      }
    },
    getScrollTop() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    }
  }

}
</script>
<style scoped>
.backtotop {
  width: 2.5rem;
  height: 2.5rem;
}
.scrollTop {
  right: 0;
  position: fixed;
  bottom: 5rem;
  cursor: pointer;
  z-index: 100;
}
</style>
