
<template>
  <div class="eatWrapper">
    <!-- 搜索栏 -->
    <Search />
    <!-- 今日菜单 -->
    <TodayMenu />
  </div>
</template>

<script type="text/javascript">

import Search from './components/Search'
import TodayMenu from './components/TodayMenu'

export default {
  components: {
    Search,
    TodayMenu
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
#eatWrapper {
  background-color: "#f5f5f5";
}
</style>
