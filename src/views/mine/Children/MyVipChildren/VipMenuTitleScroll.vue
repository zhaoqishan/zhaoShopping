
<template>
  <div id="horizontalScroll">
    <!-- 水平滑动 -->
    <div
      ref="menuTitleWrapper"
      class="menuTitleWrapper"
    >
      <ul ref="menuTitleUlContent">
        <li
          v-for="(item,index) in menuTitlesArray"
          :key="item.id"
          ref="menuTitles"
          class="menuTitles"
          :class="{selected:currentSubTitle === index}"
          @click="menuTitleClick(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
export default {
  components: {
  },
  props: {
    // 接受父组件传递的数据
    menuTitlesArray: Array
  },
  data() {
    return {
      currentSubTitle: 0,
      menuDown: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initHorizontalScroll()
    })
  },
  methods: {
    // 初始化滚动
    _initHorizontalScroll() {
      let contentWrapperWidth = 0
      const el = this.$refs.menuTitles
      for (let i = 0; i < el.length; i++) {
        contentWrapperWidth += el[i].clientWidth
      }
      // 1.1给ul设置宽度,保证可以横向滚动
      this.$refs.menuTitleUlContent.style.width = contentWrapperWidth + 'px'
      if (!this.horizontalScroll) {
        this.horizontalScroll = new BScroll('.menuTitleWrapper', {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true
        })
      } else {
        this.horizontalScroll.refresh()
      }
    },
    // 上下箭头切换
    menuClick() {
      this.menuDown = !this.menuDown
    },
    // 点击标题
    menuTitleClick(index) {
      // 让横向滑动到合适位置
      this.currentSubTitle = index
      const el = this.$refs.menuTitles[index]
      this.horizontalScroll.scrollToElement(el, 500)
      // 给父组件MyVip传递事件并将index值传递过去
      this.$emit('menuTitleClick', index)
    }
  }
}
</script>

<style lang="less" scoped>
#horizontalScroll {
  .menuTitleWrapper {
    position: relative;
    width: 100%;
    height: 2.8rem;
    display: inline-block;
    white-space: nowrap;
    border-bottom: solid 0.01rem #e8e9e8;
    overflow: hidden;
    background-color: white;
    .menuTitles {
      display: inline-block;
      font-size: 0.73rem;
      padding: 1rem;
    }
    .selected {
      color: #3cb963;
    }
    .showMenu {
      position: absolute;
      width: 10%;
      top: -0.1rem;
      right: 0;
      padding-right: 0.5rem;
      height: 2.8rem;
      line-height: 2.8rem;
      background-color: #ffffff;
      .menuIcon {
        width: 100%;
        height: 2.8re;
      }
    }
  }
}
</style>
