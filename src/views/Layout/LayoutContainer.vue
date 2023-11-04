<script setup>
import { Opportunity, Location, Message } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { topicRenderService } from '@/api/topic'
import { useRouter } from 'vue-router'

const router = useRouter()
// 导航被选中时 呈现激活状态

const topicArr = ref([])

const topicRender = async () => {
  topicArr.value = await topicRenderService()
}
topicRender()

const toTopic = (item) => {
  router.push({
    path: '/post/topic',
    query: {
      name: item.name
    }
  })
}
</script>

<template>
  <el-container class="wrapper">
    <el-backtop class="backtop" :right="100" :bottom="100" />

    <el-container>
      <el-aside class="side">
        <!-- 返回头顶 -->

        <!-- pop-plate -->
        <ul class="icon-shine">
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
              <el-menu-item-group>
                <el-menu-item
                  @click="toTopic(item)"
                  v-for="item in topicArr"
                  :key="item.id"
                  >{{ item.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </div>
        <div class="under-line-icons"></div>

        <div class="contact">
          <div class="icon-shine">
            <ul>
              <li>
                <router-link to="/contact">
                  <el-icon><Message /></el-icon>
                  <span class="text"> Contact</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </el-aside>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
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
  width: 100%;
  min-height: 1080px;
  height: 100%;

  .backtop {
    background-color: #242c2e;
    color: #fff;
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
    .icon-shine {
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
      margin-bottom: 10px;

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
