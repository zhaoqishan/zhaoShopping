
<template>
  <div id="login">
    <div class="loginBox" @click="changeImage(3)">
      <div class="auth-form">
        <div class="panfish">
          <img :src="imageURL" alt />
        </div>
        <!-- 关闭按钮 -->
        <van-icon name="close" class="closeButton" @click="close" />
        <van-tabs v-model="active" animated>
          <van-tab :title="$t('login.title')">
            <!-- 账号密码登录 -->
            <van-cell-group v-show="!isShowSMSLogin">
              <van-field
                v-model="login_userName"
                required
                clearable
                :label="$t('login.phoneNumber')"
                maxlength="11"
                :error-message="phoneNumberRight?'':$t('login.phoneNumberNotCorrect')"
                :placeholder="$t('login.phoneInput')"
                @click.stop="
                  changeImage(0)"
              />
              <van-field
                v-model="login_password"
                type="password"
                :label="$t('login.pass')"
                :placeholder="$t('login.passTip')"
                required
                autocomplete
                @click.stop="changeImage(1)"
              />
              <van-field
                v-model="imgCaptcha"
                center
                clearable
                maxlength="4"
                :placeholder="$t('login.varify')"
              >
                <img
                  ref="imgCaptcha"
                  slot="button"
                  class="verificationImage"
                  src="http://demo.itlike.com/web/xlmc/api/captcha"
                  alt="captcha"
                  @click.prevent="getCaptcha"
                />
              </van-field>
              <!-- 手机号快捷登录 -->
            </van-cell-group>
            <van-cell-group v-show="isShowSMSLogin">
              <van-field
                v-model="login_phone"
                required
                clearable
                maxlength="11"
                :label="$t('login.phoneNumber')"
                :placeholder="$t('login.phoneInput')"
                :error-message="phoneNumberRight?'':$t('login.phoneNumberNotCorrect')"
              />
              <van-field
                v-model="smsCaptcha"
                center
                clearable
                required
                :label="$t('login.varify')"
                maxlength="6"
                :placeholder="$t('login.varify')"
              >
                <van-button
                  v-if="!countDown"
                  slot="button"
                  size="small"
                  type="primary"
                  :disabled="captchaDisable"
                  @click="sendVerifyCode"
                >{{ $t('login.sendVerify') }}</van-button>
                <van-button
                  v-else
                  slot="button"
                  v-model="smsCaptcha"
                  size="small"
                  type="primary"
                  disabled
                >{{ $t('login.hasSend') }}{{ countDown }}s</van-button>
              </van-field>
            </van-cell-group>
            <van-button
              type="info"
              size="large"
              style="margin-top:1rem"
              @click="login"
            >{{ $t('login.login') }}</van-button>
            <div
              class="switchLogin"
              @click="switchLogin"
            >{{ isShowSMSLogin?$t('login.phoneVerify'):$t('login.smsMessage') }}</div>
          </van-tab>
          <!-- 注册 -->
          <van-tab :title="$t('login.resgin')">
            <van-cell-group>
              <van-field
                v-model="register_userName"
                clearable
                maxlength="11"
                :label="$t('login.phoneNumber')"
                :placeholder="$t('login.phoneInput')"
                required
              />
              <van-field
                v-model="register_pwd"
                type="password"
                :label="$t('login.pass')"
                :placeholder="$t('login.passTip2')"
                required
              />
            </van-cell-group>
            <van-button
              type="info"
              size="large"
              style="margin-top:1rem"
              @click="register"
            >{{ $t('login.resgin') }}</van-button>
          </van-tab>
        </van-tabs>

        <!-- 第三方登录 -->
        <van-divider
          :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 5px' }"
        >{{ $t('login.otherMethods') }}</van-divider>
        <van-grid :column-num="2" :border="false">
          <van-grid-item @click="thirdLogin(0)">
            <svg-icon icon-class="wechat" />
            <div class="title">{{ $t('login.wechat') }}</div>
          </van-grid-item>
          <van-grid-item @click="thirdLogin(1)">
            <svg-icon icon-class="QQ" />
            <div class="title">{{ $t('login.qqchant') }}</div>
          </van-grid-item>
        </van-grid>
        <!-- 底部声明 -->
        <p class="agreement">
          {{ $t('login.tipTile') }}
          <br />
          {{ $t('login.tipContent') }}
          <a
            class="agreement-box"
            @click.stop="agreement(0)"
          >{{ $t('login.tip') }}</a>、
          <a class="agreement-box" @click.stop="agreement(1)">{{ $t('login.tipProcy') }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// 引入Vant的组件
import { Toast, Dialog } from 'vant'
// 引入API调用接口
import { getPhoneCaptcha, phoneCaptchaLogin } from '@/api'
// 引入vuex
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      countDown: 0, // 倒计时
      active: 0,
      login_userName: '', // 用户名
      login_password: '', // 用户密码
      login_phone: '', // 手机号码
      redirect: '',
      register_userName: '', // 注册用户名
      register_pwd: '', // 注册密码

      imgCaptcha: '', // 图片验证码
      smsCaptcha: '', // 短信验证码
      isShowSMSLogin: true, // 是否短信登录
      switchLoginMsg: this.$t('login.switchLoginMsg'),
      imageURL: require('@/images/login/normal.png'),
      smsCaptchaResult: null,
      userInfo: null
    }
  },
  computed: {
    // 1.手机号码验证
    phoneNumberRight() {
      const value = this.isShowSMSLogin ? this.login_phone : this.login_userName
      // 1.1 当输入的手机号大于10位进行验证
      if (value.length > 10) {
        return /[1][3,4,5,6,7,8][0-9]{9}$/.test(value)
      } else {
        return true
      }
    },
    // 2.发送验证码按钮显示
    captchaDisable() {
      if (this.login_phone.length > 10 && this.phoneNumberRight) {
        return false
      } else {
        return true
      }
    }
  },
  created: function() {
    this.redirect = this.$route.query.redirect
    // console.info(this.redirect)
  },
  methods: {
    // 0.mapActions 同步用户信息
    ...mapActions(['syncuserInfo']),
    toHome() {
      if (typeof this.redirect !== 'undefined') {
        // 存在回跳地址就回跳
        this.$router.push(this.redirect)
      } else {
        // 否则就跳到默认的首页
        this.$router.push({
          name: 'home'
        })
      }
    },
    // 1.账号密码登录及短信验证码切换
    switchLogin() {
      this.isShowSMSLogin = !this.isShowSMSLogin
    },
    // 2.切换萌猫图片
    changeImage(index) {
      if (index === 0) {
        this.imageURL = require('@/images/login/greeting.png')
      } else if (index === 1) {
        this.imageURL = require('@/images/login/blindfold.png')
      } else {
        this.imageURL = require('@/images/login/normal.png')
      }
    },
    // 3.账号密码登录切换图片验证码
    getCaptcha() {
      // 获取验证码的标签
      const captchaEle = this.$refs.imgCaptcha
      this.$set(
        captchaEle,
        'src',
        'http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date()
      )
    },
    // 4.获取手机验证码
    async sendVerifyCode() {
      this.countDown = 60
      this.timeIntervalID = setInterval(() => {
        this.countDown--
        // 4.1 如果减到0 则清除定时器
        if (this.countDown === 0) {
          clearInterval(this.timeIntervalID)
        }
      }, 1000)

      // 4.2 获取短信验证码
      await getPhoneCaptcha(this.login_phone).then(response => {
        this.smsCaptchaResult = response.code
        // 4.3  获取验证码成功
        Dialog.alert({
          title: this.$t('login.tipTile'),
          message: this.$t('login.message') + response.code
        })
      })
    },
    // 5.登录
    async login() {
      if (this.isShowSMSLogin) {
        // 5.1手机验证码登录
        // 5.1.1 验证手机号
        if (!this.phoneNumberRight || this.login_phone.length < 10) {
          Toast({
            message: this.$t('login.pleaseInputCorrectPhoneNumber'),
            duration: 800
          })
          return
        } else if (
          this.smsCaptcha < 1 ||
          Number(this.smsCaptcha) !== Number(this.smsCaptchaResult)
        ) {
          // 5.1.2 验证验证码
          Toast({
            message: this.$t('login.pleaseInputCorrectVerifyNumber'),
            duration: 800
          })
          return
        }
        // 5.1.3 请求后台登录接口
        // 6.1 请求后台登录接口
        await phoneCaptchaLogin(this.login_phone, this.smsCaptcha)
          .then(response => {
            console.info(response)
            // 设置userInfo 保存到vuex和本地
            this.syncuserInfo(response)
            this.toHome()
          })
          .catch(() => {
            // this.$message.error(err)
          })
      } else {
        // 5.2 账号密码登录
        // 5.2.1 验证输入框
        if (this.login_userName.length < 1) {
          Toast({
            message: this.$t('login.phoneNumber'),
            duration: 800
          })
          return
        } else if (!this.phoneRegex(this.login_userName)) {
          Toast({
            message: this.$t('login.phoneNumberNotCorrect'),
            duration: 800
          })
          return
        } else if (this.login_password.length < 1) {
          Toast({
            message: this.$t('login.passNumberNotCorrect'),
            duration: 800
          })
          return
        } else if (this.imgCaptcha.length < 1) {
          Toast({
            message: this.$t('login.pleaseInputCorrectVerifyNumber'),
            duration: 800
          })
          return
        }
        // 5.2.2 请求后台
        await phoneCaptchaLogin(this.login_userName, this.login_password)
          .then(response => {
            // 设置userInfo 保存到vuex和本地
            this.syncuserInfo(response)
            this.toHome()
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    },
    // 6.注册
    async register() {
      if (this.register_userName.length < 1) {
        Toast({
          message: this.$t('login.phoneNumberNotEmpty'),
          duration: 800
        })
      } else if (!this.phoneRegex(this.register_userName)) {
        Toast({
          message: this.$t('login.phoneNumberNotCorrect'),
          duration: 800
        })
      } else if (this.register_pwd.length < 0) {
        Toast({
          message: this.$t('login.passTip'),
          duration: 800
        })
      } else if (this.register_pwd.length < 6) {
        Toast({
          message: this.$t('login.passTip2'),
          duration: 800
        })
      } else {
        // 6.1 请求后台登录接口
        await phoneCaptchaLogin(this.register_userName, this.register_pwd).then(
          response => {
            // 设置userInfo 保存到vuex和本地
            this.syncuserInfo(response)
            this.toHome()
          }
        )
      }
    },
    // 7.用户协议
    agreement(index) {
      if (index === 0) {
        Toast({
          message: this.$t('login.tip'),
          duration: 800
        })
      } else {
        Toast({
          message: this.$t('login.tipProcy'),
          duration: 800
        })
      }
    },
    // 8.关闭
    close() {
      this.$router.back()
    },
    // 9.第三方登录
    thirdLogin(value) {
      if (value === 0) {
        Toast({
          message: this.$t('login.otherWechat'),
          duration: 800
        })
      } else {
        Toast({
          message: this.$t('login.otherQQ'),
          duration: 800
        })
      }
    },
    // 正则验证
    phoneRegex(number) {
      return /[1][3,4,5,6,7,8][0-9]{9}$/.test(number)
    }
  }
}
</script>
<style lang="less" scoped>
#login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../images/login/back2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  .loginBox {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    opacity: 0.95;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    .auth-form {
      position: relative;
      padding: 2rem;
      width: 26.5rem;
      max-width: 90%;
      font-size: 1.167rem;
      background-color: #fff;
      border-radius: 8px;
      box-sizing: border-box;
    }
    img {
      position: absolute;
      top: 1rem;
      left: 50%;
      width: 4rem;
      transform: translate(-50%, -70%);
      z-index: 1;
      @media screen and (max-width: 320px) {
        top: 0.5rem;
        transform: translate(-50%, -40%);
        width: 5rem;
      }
    }
    .closeButton {
      position: absolute;
      right: 1rem;
      top: 0.4rem;
    }
    .verificationImage {
      position: absolute;
      right: 0;
      width: 8rem;
      height: 3rem;
      margin-left: 3rem;
    }
    .switchLogin {
      margin-top: 1rem;
      font-size: 0.78rem;
    }
  }
}
.title {
  padding: 0.5rem;
  font-size: 0.5rem;
  color: grey;
}
.agreement {
  // margin-top: 1.667rem;
  line-height: 1rem;
  color: #767676;
  font-size: 0.867rem;
  .agreement-box {
    color: blue;
  }
}
</style>
