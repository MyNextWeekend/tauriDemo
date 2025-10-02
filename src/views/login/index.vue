<script setup>
import { ref } from "vue";
let username = ref('admin')
let password = ref('admin')

import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

async function login() {
  try {
    await userStore.login({
      username: username.value,
      password: password.value
    })
    console.log('登录成功')
    router.push({ path: '/' })
  } catch (err) {
    console.error('登录失败', err)
  }
}

</script>

<template>
  <div class="login">
    <h2>XX平台</h2>
    <div class="login-form">
      <div class="form-item">
        <label for="username">用户名:</label>
        <input id="username" v-model="username" type="text" placeholder="请输入用户名" />
      </div>
      <div class="form-item">
        <label for="password">密码:</label>
        <input id="password" v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #f0f2f5;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }

  .login-form {
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 300px;

    .form-item {
      margin-bottom: 15px;

      label {
        display: block;
        margin-bottom: 5px;
        color: #555;
      }

      input {
        width: 60%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;

        &:focus {
          border-color: #409eff;
          outline: none;
        }
      }
    }

    button {
      width: 40%;
      padding: 10px;
      background-color: #409eff;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background-color: #66b1ff;
      }
    }
  }
}
</style>