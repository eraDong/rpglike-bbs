<script setup>
import { ref } from 'vue'

import { Search } from '@element-plus/icons-vue'
const search = ref('')
const isLogin = ref(false)

// 导航被选中时 呈现激活状态
</script>

<template>
  <el-header class="header">
    <!-- logo and logo-text -->
    <div class="logo">
      <a href="/post/popular">
        <img class="logo-img" src="@/assets/logo/logo.png" alt="" />
        <img class="logo-text" src="@/assets/logo/text.png" alt="" />
      </a>
    </div>
    <!-- search-bar -->
    <div class="search-bar">
      <span class="bar"
        ><el-input
          v-model="search"
          placeholder="Search"
          class="header-input"
          :prefix-icon="Search"
        ></el-input>
      </span>
    </div>
    <!-- login这需要写一个逻辑 有token的时候显示用户名 无token的时候显示login -->
    <div class="login">
      <router-link to="/login" v-if="isLogin === false">Log In</router-link>
      <router-link to="/user" v-else>Info</router-link>
    </div>
  </el-header>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  margin: 0 30px;
  padding: 0 8px;
  background-color: #0b1416;
  z-index: 100;

  width: 96%;
  height: 56px;

  // background-color: pink;

  border-bottom: 1px solid #242c2e;

  .logo {
    margin-left: 15px;

    .logo-img {
      margin-right: 7px;
      height: 32px;
      width: 32px;

      border-radius: 50%;
    }

    .logo-text {
      height: 17px;
      width: 60px;
      margin-bottom: 7px;
    }
  }
  .search-bar {
    display: flex;
    .bar {
      :deep(.el-input__wrapper) {
        width: 756px;
        height: 40px;
        background-color: #1a282d;
        box-shadow: none;
        border-radius: 20px;
      }
      :deep(.el-input__inner) {
        color: #fff;
      }
    }
  }
  .login {
    margin-right: 45px;
    height: 40px;
    width: 66px;
    border-radius: 20px;
    line-height: 40px;
    text-align: center;
    font-weight: 700;
    background-color: #d93a00;
    a {
      color: #fff;
    }
  }
}
</style>
