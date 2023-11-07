<script setup>
import { plateRenderService } from '@/api/plate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const plateArr = ref()

const plateRender = async () => {
  plateArr.value = await plateRenderService()
}
plateRender()

const toPlate = (item) => {
  const correctedName = item.name.replace(/\s+/g, '')
  router.replace({
    path: '/post/platecontent',
    query: {
      name: correctedName
    }
  })
}
</script>

<template>
  <div class="content">
    <div class="header">
      <div class="title">MainLand</div>
    </div>
    <div class="main">
      <el-card
        shadow="hover"
        v-for="item in plateArr"
        :key="item.id"
        @click="() => toPlate(item)"
      >
        <img :src="`/rpglike-server/${item.avatar}`" alt="" />
        <div>
          {{ item.name }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  // 默认走出来165px
  margin-left: 165px;
  .header {
    margin-bottom: 30px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
  }

  .main {
    width: 500px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .el-card {
      margin: 20px 0;
      color: #888c8d;
      background-color: #1a282d;
      border: none;
      cursor: pointer;

      &:hover {
        background-color: #263b42;
      }
    }
  }
}
</style>
