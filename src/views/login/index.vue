<template>
  <div class="login-container">
    <el-form class="login-form" auto-complete="on" label-position="left" :model="loginForm" :rules="rules">

      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/logo.png" alt="">
        </h3>
      </div>
      <div class="pens">
        <el-form-item prop="mobile">
          <span class="svg-container el-icon-mobile" />
          <el-input v-model="loginForm.loginName" />
        </el-form-item>
        <el-form-item prop="password">
          <!-- <span class="svg-container el-icon-user-solid" /> -->
          <!-- 左侧图标 -->
          <span class="svg-container el-icon-lock">
            <!-- <svg-icon icon-class="password" /> -->
          </span>
          <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" />
          <!-- 右侧图标 -->
          <span class="svg-container" @click="isShow">
            <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
          </span>
        <!-- <span class="svg-container el-icon-user-solid" /> -->
        </el-form-item>
        <!-- 验证码 -->

        <div class="auto">
          <div class="left">
            <el-form-item class="inputitem" prop="code">
              <span class="svg-container"><svg-icon icon-class="yanzhengma" /></span>
              <el-input v-model="loginForm.code" placeholder="请输入验证码" maxlength="4" />
            </el-form-item>
          </div>
          <div class="right" @click="getcode">
            <img :src="imgUrl" alt="">
          </div>
        </div>
        <el-button :loading="loading" type="primary" class="button" style="width:100%;margin-bottom:30px;" @click="login">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { validPhone } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    // const phonevalid = (ruls, val, callback) => {
    //   if (!validPhone(val)) {
    //     callback(new Error('账号格式错误'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      passwordType: 'password',
      loading: false,
      imgUrl: '',
      loginForm: {

        loginName: 'admin',
        password: 'admin',
        clientToken: '',
        loginType: '0',
        code: ''

      },
      rules: {
        mobile: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          // { validator: phonevalid, trigger: 'blur' }
          { pattern: /^[a-zA-Z]\w{4,15}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 16, message: '密码格式错误', trigger: 'blur' }
        ]

      }
    }
  },
  watch: {

  },
  created() {
    this.getcode()
  },
  methods: {
    isShow() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },

    async login() {
      console.log(1)
      try {
        // await this.$refs.loginForm.validate()
        this.loading = true
        // 接口请求
        await this.$store.dispatch('user/setlogin', this.loginForm)
        if (this.$store.state.user.message.success) {
          this.$message('登录成功')
          this.$router.replace('/dashboard')
        } else {
          this.$message('登录失败')
        }
      } finally {
        this.loading = false
      }
    },
    // 获取验证码
    async  getcode() {
      this.loginForm.clientToken = Math.floor(Math.random() * 10)
      await this.$store.dispatch('user/setCode', this.loginForm.clientToken)
      this.imgUrl = window.URL.createObjectURL(this.$store.state.user.code)

      // console.log(11, this.imgUrl)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: #fff;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

}
  .el-form-item {

    border: 1px solid #eee;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  .pens{
    margin-top: -40px;
    .auto{
      display: flex;
      width: 448px;
      .left{
        width: 70%;
      }
      .right{
        width: 30%;
        img{
          width: 100%;
        }
      }
    }
  }
  .button{
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {

    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0rgba(30,111,72,.35);
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 16px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      img{
            position: absolute;
    width: 96px;
    height: 96px;
    top: -156px;
    left: 50%;
    margin-left: -48px;
      }
    }
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
}
</style>
