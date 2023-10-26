<script setup>
import { ref } from 'vue'

import { Search, Opportunity, Location } from '@element-plus/icons-vue'
const search = ref('')
const isLogin = ref(false)

// 导航被选中时 呈现激活状态
</script>

<template>
  <el-container class="wrapper">
    <el-backtop class="backtop" :right="100" :bottom="100" />

    <el-header class="header">
      <!-- logo and logo-text -->
      <div class="logo">
        <a href="#">
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

    <el-container>
      <el-aside class="side">
        <!-- 返回头顶 -->

        <!-- pop-plate -->
        <ul class="pop-plate">
          <li>
            <router-link to="/post/popular"
              ><el-icon><Opportunity /></el-icon
              ><span class="text"> Popular</span>
            </router-link>
          </li>
          <li>
            <router-link to="/post/plate"
              ><el-icon><Location /></el-icon><span class="text"> Plate</span>
            </router-link>
          </li>
        </ul>
        <div class="under-line-icons"></div>

        <div class="topic">
          <el-menu
            default-active="2"
            router="true"
            :background-color="'transparent'"
            :text-color="'#fff'"
          >
            <el-sub-menu index="1">
              <template #title>
                <span class="title">Topic</span>
              </template>
              <el-menu-item-group title="Gaming">
                <el-menu-item index="/topic/valorant">Valorant</el-menu-item>
                <el-menu-item index="/topic/counterstrike"
                  >Counter-Strike</el-menu-item
                >
              </el-menu-item-group>
              <el-menu-item-group title="Sports">
                <el-menu-item index="/topic/football">Football</el-menu-item>
                <el-menu-item index="/topic/basketball"
                  >Basketball</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </div>
      </el-aside>

      <el-main class="main"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.under-line-icons {
  margin-left: 30px;
  border-bottom: 1px solid #242c2e;
}
.wrapper {
  background-color: #0b1416;
  height: 1980px;

  .backtop {
    background-color: #242c2e;
    color: #fff;
  }

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

  .side {
    position: fixed;
    margin-left: 100px;
    margin-top: 56px;
    z-index: 100;

    border-right: 1px solid #242c2e;

    color: #fff;

    background-color: #0b1416;
    height: 870px;
    .pop-plate {
      margin-left: 135px;
      text-align: center;

      li {
        margin-top: 10px;
        width: 150px;
        position: relative;
        .text {
          position: absolute;
          top: 50%;
          transform: translate(0, -35%);
        }

        .el-icon {
          font-size: 25px;
          margin-top: 10px;
        }

        a {
          color: #fff;
          //   cursor: pointer;
        }

        .router-link-active {
          display: inline-block;
          width: 150px;
          height: 40px;
          background-color: #242c2e;
          border-radius: 15px;
        }
        &:hover {
          background-color: #242c2e;
          border-radius: 15px;
        }
        &:last-child {
          margin-bottom: 10px;
        }
      }
    }

    .topic {
      margin-left: 135px;
      margin-top: 10px;

      .title {
        color: #888c8d;
        font-weight: 400;
        font-size: 16px;
      }
      .el-menu {
        border-right: 0 !important;
      }
    }
  }

  .main {
    margin-top: 56px;
    margin-left: 300px;
    width: 1396px;

    color: #fff;
    background-color: #0b1416;
  }
}
</style>
