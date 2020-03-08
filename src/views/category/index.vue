
<template>
  <div id="category">
    <!--头部-->
    <Header />
    <!--内容-->
    <div v-if="!isShowLoading" class="listWrapper">
      <!--左边-->
      <div class="leftWrapper">
        <ul class="wrapper">
          <li
            v-for="(cate, index) in categoriesData"
            :key="cate.id"
            ref="menuList"
            class="categoryItem"
            :class="{selected: currentIndex === index}"
            @click="clickLeftLi(index)"
          >
            <span class="textWrapper">{{ cate.name }}</span>
          </li>
        </ul>
      </div>
      <!--右边-->
      <ContentView :categories-detail-data="categoriesDetailData" />
    </div>
    <!-- 加载动画 -->
    <Loading v-show="isShowLoadingGif" />
    <!-- 点击左边按钮加载数据时候显示动画 -->
    <LoadingGif :show="isShowLoading" />
  </div>
</template>

<script>
// 1. 引入组件
import Header from './components/SearchHead'
import ContentView from './components/ContentView'
// 2. 引入滚动组件
import BScroll from 'better-scroll'
// 3. 引入接口
import { getCategoryData, getCategoryDetailData } from '@/api'
// 4.引入加载动画
import LoadingGif from '@/components/loading/LoadingGif'
// 5.引入加载动画
import Loading from '@/components/loading'
export default {
  name: 'Category',
  components: {
    Header,
    ContentView,
    Loading,
    LoadingGif
  },
  data() {
    return {
      // 是否显示加载图标
      isShowLoading: true,
      // 左边列表数据
      categoriesData: [],
      // 右边列表数据
      categoriesDetailData: [],
      // 左边item选中与否
      currentIndex: 0,
      leftScroll: {},
      isShowLoadingGif: false
    }
  },
  created() {},
  mounted() {
    // 初始化数据
    this._initData()
  },
  activated() {
    // 页面缓存了数据,所以会走这个方法
    this.$nextTick(() => {
      if (this.$route.params.currentIndex > -1) {
        this.clickLeftLi(this.$route.params.currentIndex + 1)
      }
    })
  },
  methods: {
    // 1. 初始化操作(数据和界面)
    _initData() {
      // 1.1 获取左边的数据
      getCategoryData().then(response => {
        // 1.3. 隐藏loading框
        this.isShowLoading = false
        this.categoriesData = response.cate
        // 1.4.初始化滚动视图
        this.$nextTick(() => {
          if (typeof this.leftScroll !== 'undefined') {
            this.leftScroll = new BScroll('.leftWrapper', {
              probeType: 3,
              click: true,
              scrollY: true,
              tap: true,
              mouseWheel: true
            })
          } else {
            this.leftScroll.refresh()
          }
        })
      })
      // 1.2 获取右边的数据
      getCategoryDetailData('/lk001', '').then(response => {
        // 1.3. 隐藏loading框
        this.isShowLoading = false
        this.categoriesDetailData = response.cate
      })
    },
    // 2. 处理左边的点击
    async clickLeftLi(index) {
      this.isShowLoadingGif = true
      // 2.1 改变索引
      this.currentIndex = index
      // 2.2 滚动到对应的位置
      setTimeout(() => {
        const menuLists = this.$refs.menuList
        const el = menuLists[index]
        console.info(el)
        console.info(this.leftScroll)
        // 2.3 滚动到对应元素上
        this.leftScroll.scrollToElement(el, 300)
      }, 900)

      // 2.4 获取右边的数据
      let param = ''
      if (index >= 9) {
        param = `/lk0${index + 1}`
      } else {
        param = `/lk00${index + 1}`
      }
      await getCategoryDetailData(param, '').then(response => {
        this.categoriesDetailData = response.cate
        this.isShowLoadingGif = false
      })
    }
  }
}
</script>

<style scoped>
#category {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}

.listWrapper {
  display: flex;
  position: absolute;
  top: 2.75rem;
  bottom: 3rem;
  width: 100%;
  overflow: hidden;
}

.leftWrapper {
  background-color: #f4f4f4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
}

.categoryItem {
  padding: 0.75rem 0;
  border-bottom: solid 0.01rem #e8e9e8;
  position: relative;
}

.categoryItem .textWrapper {
  line-height: 1.25rem;
  border-left: solid 0.1875rem transparent;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}

.categoryItem.selected {
  background: #fff;
}

.categoryItem.selected .textWrapper {
  border-left-color: #3cb963;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333333;
}

@media (min-width: 960px) {
  .wrapper {
    border-right: 0.01rem solid #e8e9e8;
  }

  .wrapper .categoryItem {
    background: #fff;
  }
}
</style>
