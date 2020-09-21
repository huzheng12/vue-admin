<template>
  <div class="login-container">
    <div class="title-container">
        <h3 class="title">{{systemName}}</h3>
      </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      
      <div class="right-top"></div>
      <div class="title-container userLogin">
        <h3 class="titles">用户登录</h3>
      </div>
      <div class="left-top"></div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <!-- 图形验证码 S -->
      <el-form-item prop="verificationCode">
        <span class="svg-container">
          <svg-icon icon-class="yanzhengmaa" />
        </span>
        <el-input
          ref="verificationCode"
          type="text"
          placeholder="验证码"
          v-model="loginForm.verificationCode"
          name="Verification Code"
          tabindex="3"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <div class="verification-code">
          <img
            :src="verificationCodeUrl"
          />
        </div>
        <span class="show-pwd" @click="verificationCodeRefresh">
          <svg-icon icon-class="refresh" />
        </span>
      </el-form-item>
      <!-- 图形验证码 E-->

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
        >登 录</el-button
      >
      <div class="left-bottom"></div>
      <div class="right-bottom"></div>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      if (!value.length) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不可少于5位'))
      } else {
        callback()
      }
    }
    const validateVerificationCode = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        verificationCode: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        verificationCode: [
          { required: true, trigger: 'blur', validator: validateVerificationCode }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      verificationCodeUrl: '',
      token: '',
      // systemName: ''
    }
  },
  mounted() {
    // this.getsystemname()
    this.verificationCodeRefresh()
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect //存储路由历史
      },
      immediate: true
    }
  },
  methods: {
    // 附加配置信息列表
    // async getsystemname() {
    //   try {
    //     const res = await this.$api.SiteConfiguration.infolist()
    //     // console.log('systemnameRes', res)
    //     if(res.success) {
    //       res.obj.configList.forEach((e) => {
    //         if ( e.configkey === 'managerName' ) {
    //           this.systemName = e.value
    //         }
    //       })
    //     }
    //   } catch (e) {
    //     // Handle api request exception
    //     this.$handleError.handleApiRequestException(e)
    //   }
    // },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          // 加密密码
          const mpassword = this.$md5.md5(this.loginForm.password)
          try {
            // const res = await this.$api.Account.login(this.loginForm)
            const res = await this.$api.Account.login({
              username: this.loginForm.username, // 登录用户名
              password: mpassword, // 登录密码（加密以后的）
              loginCode: this.loginForm.verificationCode, // 验证码
              loginToken: this.token
            })
            this.loading = false
            if (res.success) {
              // console.log('登录成功');
              // console.log(res.obj);
              sessionStorage.setItem('routerInfo',JSON.stringify(res.obj.permission))
              // this.$store.commit('UPDATE_TOPMENU',res.obj.menu)
              // sessionStorage.setItem('menu',JSON.stringify(res.obj.menu))
              // this.$store.commit('UPDATE_ROUTELIST',res.obj.permission)
              // Update token
              // this.$store.commit('UPDATE_TOKEN', { token: res.data.user.token })
              this.$store.commit('UPDATE_TOKEN', { token: res.obj.token })
              // Update user info
              // this.$store.commit('UPDATE_USER_INFO', { userInfo: res.data.user })
              this.$store.commit('UPDATE_USER_INFO', { userInfo: res.obj.username })
              this.$router.push({ path: this.redirect || '/' })
            } else {
              this.$message({
                type: 'warning',
                message: res.msg
              })
              this.verificationCodeRefresh()
            }
          } catch (e) {
            this.loading = false
            // Handle api request exception
            this.$handleError.handleApiRequestException(e)
          }
          // this.$store
          //   .dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: this.redirect || '/' })
          //     this.loading = false
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
          // if (
          //   this.loginForm.username == 'admin' &&
          //   this.loginForm.password == '111111' &&
          //   this.loginForm.verificationCode == '123456'
          // ) {
          //   this.$store.commit('UPDATE_TOKEN', { token: 'dasjdqdhqdiqd' })
          //   this.loading = false
          //   this.$router.push({ path: this.redirect || '/' })
          // } else {
          //   this.$message({
          //     type: 'error',
          //     message: '账号/密码/验证码错误'
          //   })
          // }
        } else {
          this.loading = false
          this.$message({
            type: 'error',
            message: '请输入正确的用户名和密码'
          })
          // console.log('error submit!!')
          return false
        }
      })
    },
    async verificationCodeRefresh() {
      // console.log('ddd')
      try {
        const res = await this.$api.Account.verificationCode()
        // console.log(res);
        this.verificationCodeUrl = `data:image/jpeg;base64,${res.base64Img}`
        this.token = res.randomToken
      } catch (e) {
        // console.error('似乎是出错了');
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    }
  },
  computed:{
    systemName(){
      return this.$store.state.siteTitle
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
// $bg: #4458d1;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      // css解决浏览器输入框记住账号密码后的背景色
      &:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
        -webkit-text-fill-color: #ededed !important;
        box-shadow: 0 0 0px 1000px transparent inset !important; // -webkit-box-shadow
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // height: 100%;
  // background-color: $bg;
  background-image: url(../../assets/404_images/loginImage.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 500px;
    max-width: 100%;
    padding: 0px 50px;
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid rgba(0,184,255,0.2);
    margin-bottom: 235px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    padding: 100px 0px 20px 0px;

    .title {
      font-size: 40px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .el-button {
    width:100%;
    margin-bottom:30px;
    color: #fef4e9;
    border: none;
    background-image: linear-gradient(to bottom, #00B8FF, #0177E4);
  }

  .userLogin {
    padding: 0px;
    .titles {
      font-size: 25px;
      color: $light_gray;
      // margin: 40px auto 40px auto;
      margin: 15px 0;
      text-align: center;
      font-weight: normal;
    }
  }

  .left-top {
    position: relative;
    top: -103px;
    left: -50px;
    width: 40px;
    height: 45px;
    border-top: 4px solid #00B8FF;
    border-left: 4px solid #00B8FF;
  }
  .right-top {
    position: relative;
    top: 0px;
    right: -408px;
    width: 40px;
    height: 45px;
    border-top: 4px solid #00B8FF;
    border-right: 4px solid #00B8FF;
  }
  .left-bottom {
    position: relative;
    bottom: -44px;
    left: -50px;
    width: 40px;
    height: 45px;
    border-bottom: 4px solid #00B8FF;
    border-left: 4px solid #00B8FF;
  }
  .right-bottom {
    position: relative;
    bottom: 0px;
    right: -408px;
    width: 40px;
    height: 45px;
    border-bottom: 4px solid #00B8FF;
    border-right: 4px solid #00B8FF;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .verification-code {
    position: absolute;
    right: 43px;
    top: 12px;
  }
}
</style>
