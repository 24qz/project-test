<template>
  <div class="login-page">
    <cy-nav-bar @btnRight="$router.push('/register')" :rigText="rigText"></cy-nav-bar>
    <div class="nav-top">
      <div>
        <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      </div>
      <div @click="isPass = !isPass">
        {{ isPass ? '短信验证码登录' : '密码登录' }}
        <van-icon name="arrow" />
      </div>
    </div>

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="ruleFrom.mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请填写用户名' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机格式不正确' }
          ]"
        />

        <!-- 账号密码登录 -->
        <van-field
          v-if="isPass"
          v-model="ruleFrom.password"
          name="password"
          placeholder="请输入密码"
          :type="show ? 'password' : 'text'"
          :rules="[
            { required: true, message: '请填写密码' },
            { pattern: /^\w{8,24}$/, message: '密码格式不正确' }
          ]"
        >
          <template #button>
            <svgIcon @click="show = !show" :show="show"></svgIcon>
          </template>
        </van-field>

        <!-- 短信验证码登录 -->
        <van-field
          v-else
          v-model="ruleFrom.code"
          name="code"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <span @click="getCode">{{
              codeTime > 0 ? `${codeTime}s后再次发送` : '发送验证码'
            }}</span>
          </template>
        </van-field>

        <van-field>
          <template #input>
            <van-checkbox v-model="ruleFrom.arge" icon-size="14px"
              >我已同意 <span class="cy-nav">用户协议 </span>及
              <span class="cy-nav">隐私条款</span></van-checkbox
            >
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px; margin-top: 0">
        <van-button round block type="primary" native-type="submit"> 登录 </van-button>
        <span class="cy-psw">忘记密码?</span>
      </div>
    </van-form>

    <div class="cy-bot">
      <van-divider>第三方登录</van-divider>
      <img class="cy-svgqq" src="../../assets/qq.svg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/counter'
import { loginByPsw, loginByMobile, setMobileCode } from '@/services/user'
import { ref, reactive } from 'vue'
import { showToast } from 'vant'
import { useRouter, useRoute } from 'vue-router'
const store = useStore()
const router = useRouter()
const route = useRoute()
const show = ref(true)
const isPass = ref(true)
const rigText = '注册'
const codeTime = ref(0)

interface Ilogin {
  mobile: string
  password: string
  arge: boolean
  code: string
}

const ruleFrom: Ilogin = reactive({
  mobile: '13211112222',
  password: 'abc12345',
  arge: false,
  code: ''
})

// 获取验证码
let codeTimer: number = 0
const getCode = async () => {
  if (codeTime.value > 0) return
  let res = await setMobileCode(ruleFrom.mobile, 'login')
  // console.log(res, '验证码')
  ruleFrom.code = res.data.code
  showToast(res.message)

  codeTime.value = 60
  clearInterval(codeTimer)
  codeTimer = setInterval(() => {
    codeTime.value--
    if (codeTime.value <= 0) clearInterval(codeTimer)
  }, 1000)
}

// 点击登录
const onSubmit = async () => {
  // console.log('submit', ruleFrom)
  if (!ruleFrom.arge) {
    showToast('请阅读并勾选用户协议')
    return
  }
  try {
    const res = isPass.value
      ? await loginByPsw(ruleFrom.mobile, ruleFrom.password)
      : await loginByMobile(ruleFrom.mobile, ruleFrom.code)
    // console.log(res, '数据')
    store.setUser(res.data)
    showToast('登录成功')
    router.replace((route.query.returnUrl as string) || '/user')
  } catch (error) {
    console.log(error, 'err')
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  overflow: hidden;
}
.nav-top {
  display: flex;
  justify-content: space-between;
  padding: 25px;
  margin-bottom: 20px;
}
.cy-nav {
  color: #40be9f;
}
.cy-psw {
  display: inline-block;
  margin-top: 15px;
}
.cy-bot {
  padding: 0 30px;
  margin: 100px auto;
  text-align: center;
}
.cy-svgqq {
  width: 50px;
  height: 50px;
}
</style>
