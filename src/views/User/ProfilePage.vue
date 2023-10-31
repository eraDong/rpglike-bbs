<script setup></script>

<template>
  <div class="wrapper">
    <div class="main">
      <el-card class="recent-post">
        <template #header>
          <div class="card-header">
            <span class="title">Recent Posts</span>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </el-card>
      <el-card class="voted-post">
        <template #header>
          <div class="card-header">
            <span class="title">Voted Posts</span>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </el-card>
      <el-card class="commented-post">
        <template #header>
          <div class="card-header">
            <span class="title">Commented Posts</span>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  .main {
    color: #fff;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        color: #879999;
        font-weight: 700;
        font-size: 20px;
      }
    }

    .text {
      color: #879999;
      font-size: 16px;
    }

    .item {
      margin-bottom: 18px;
    }

    .recent-post,
    .voted-post,
    .commented-post {
      margin-right: 30px;
      margin-bottom: 15px;
      width: auto;
      border: none;
      --el-card-border-color: none;
      background-color: #202e33;

      &:hover {
        background-color: #32474e;
      }
    }
  }
}
</style>
