
<template>
  <div id="changeNickName">
    <van-nav-bar
      :title="$t('mine.changeNickName')"
      :fixed="true"
      :border="false"
      left-arrow
      :right-text="$t('mine.confirm')"
      style="height:2.5rem"
      @click-left="onClickLeft"
      @click-right="onClickSave"
    />
    <div style="margin-top:3rem">
      <van-cell-group :title="$t('mine.nickName')">
        <van-field ref="field" v-model="nickName" clearable :placeholder="nickName" />
      </van-cell-group>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Toast } from 'vant'
import { mapMutations } from 'vuex'

export default {
  components: {},
  data() {
    return {
      // 路由传递过来的参数 nickName
      nickName: this.$route.params.nickName
    }
  },
  mounted() {
    this.$refs.field.focus()
  },
  methods: {
    ...mapMutations(['CHANGE_USER_NICK_NAME']),
    // 返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 修改昵称
    onClickSave() {
      //   console.log(this.nickName);
      if (this.nickName.length > 0) {
        const nickName = this.nickName
        this.CHANGE_USER_NICK_NAME({ nickName })
        this.$router.back()
        Toast({
          message: this.$t('mine.personal'),
          duration: 800
        })
      } else {
        Toast({
          message: this.$t('mine.message'),
          duration: 800
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#changeNickName {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
  .van-nav-bar__text {
    color: #45c763;
  }
}
</style>
