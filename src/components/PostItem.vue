<script setup>
import {
  ChatSquare,
  Share,
  CaretTop,
  CaretBottom
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { getPlateIdService, userJoinPlateService } from '@/api/plate'
import { getUserIdService } from '@/api/user'
const userStore = useUserStore()
const router = useRouter()

// 阻止冒泡
const onPlate = (name) => {
  router.push({
    path: '/post/platecontent',
    query: {
      name: name
    }
  })
}
const onJoin = async (item) => {
  const plateId = await getPlateIdService(item.plate)
  const userId = await getUserIdService(item.author)
  // console.log(userId.id)
  // console.log(plateId.id)
  await userJoinPlateService(plateId.id, userId.id)
  userStore.joinedPlate = true
}
const onPost = (item) => {
  console.log(item)
  router.replace({
    path: '/postcontent',
    query: {
      id: item.id
    }
  })
}

const props = defineProps({
  itemVal: {
    required: true
  }
})

// console.log(props.itemVal.likes)
//如果读取到plate就是plate 如果是topic就是topic 如果都没有就是普遍
</script>

<template>
  <div class="content">
    <div class="router-to-post" @click="onPost(itemVal)">
      <!-- 头部导航内容 -->
      <div class="header">
        <div class="left">
          <div class="plate">
            <span class="plateImg"
              ><img :src="`/rpglike-server/${props.itemVal.avatar}`" alt=""
            /></span>
            <div class="onplate" @click.stop="onPlate(props.itemVal.plate)">
              {{ props.itemVal.plate }}
            </div>
          </div>
          <div
            v-if="userStore.joinedPlate === false"
            class="join"
            @click.stop="onJoin(itemVal)"
          >
            Join
          </div>
        </div>
      </div>
      <!-- 主要内容 -->
      <!-- 图片非必须 -->
      <div class="main">
        <h3>{{ props.itemVal.title }}</h3>
        <span v-if="props.itemVal.image !== null" class="postImg">
          <img :src="`/rpglike-server/${props.itemVal.image}`" />
          {{ props.itemVal.content }}
        </span>
        <span v-else> {{ props.itemVal.content }} </span>
      </div>
      <!-- 底部点赞内容 -->
      <div class="footer">
        <div class="btn-special">
          <div class="like">
            <el-icon><CaretTop /></el-icon>
          </div>
          <div class="count" v-if="props.itemVal.likes === 0">Vote</div>
          <div class="count" v-else>{{ props.itemVal.likes }}</div>
          <div class="unlike">
            <el-icon><CaretBottom /></el-icon>
          </div>
        </div>
        <div class="btn">
          <div class="comment">
            <el-icon><ChatSquare /></el-icon>
            <!-- 超过999后显示999+防止溢出 -->
            <div class="count" v-if="props.itemVal.comments > 999">999+</div>
            <div class="count" v-else>{{ props.itemVal.comments }}</div>
          </div>
        </div>
        <div class="btn">
          <div class="share">
            <el-icon><Share /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  margin-left: 165px;
  margin-bottom: 15px;
  width: 720px;

  &:hover {
    width: 720px;
    height: auto;
    background-color: #1a282d;
    border-radius: 15px;
    cursor: pointer;
  }

  a {
    color: #fff;
  }
  .header {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    width: 720px;

    .left {
      display: flex;
      justify-content: space-between;
      width: 720px;
      height: auto;
      .plate {
        display: flex;
        .plateImg {
          padding-right: 7px;
          img {
            width: 25px;
            height: 25px;
            border-radius: 25px;
          }
        }
        color: #888c8d;
        font-size: 15px;
        font-weight: 700;
        &:hover {
          color: #4a8ef3;
        }
      }

      .join {
        background-color: #0045ac;
        text-align: center;
        width: 45px;
        height: 25px;
        line-height: 25px;
        border-radius: 10px;
        &:hover {
          background-color: #295dac;
        }
      }
    }
  }

  .main {
    padding: 5px;
    overflow: hidden;
    h3 {
      font-size: 24px;
    }
    .postImg {
      img {
        margin: 5px 35px;
        width: 650px;
        height: 275px;
        border-radius: 30px;
      }
    }
  }

  .footer {
    padding: 5px;
    display: flex;

    .btn {
      margin: 10px;
      width: 80px;
      height: 30px;
      border-radius: 30px;
      text-align: center;
      background-color: #24363d;
      &:hover {
        background-color: #2f4750;
      }

      .comment {
        display: flex;
        padding: 0 15px;
        align-items: center;
        justify-content: space-between;
        line-height: 30px;
        .el-icon {
          font-size: 20px;
        }
        .count {
          margin-right: 10px;
          font-size: 12px;
          font-weight: 700;
        }
      }

      .share {
        padding: 5px 15px;

        .el-icon {
          font-size: 20px;
        }
      }
    }

    .btn-special {
      margin: 10px;
      padding: 0 5px;
      align-items: center;
      justify-content: space-between;

      width: 80px;
      height: 30px;
      border-radius: 30px;
      text-align: center;
      background-color: #24363d;
      font-size: 16px;

      display: flex;
      justify-content: space-between;
      .like {
        width: 20px;
        height: 20px;

        border-radius: 20px;

        &:hover {
          background-color: #3b5763;
        }
      }

      .count {
        font-size: 12px;
        font-weight: 700;
      }

      .unlike {
        width: 20px;
        height: 20px;

        border-radius: 20px;

        &:hover {
          background-color: #3b5763;
        }
      }
    }
  }
}
</style>
