<script setup></script>

<template>
  <div class="content">
    <div class="header">
      <div class="title">MainLand</div>
    </div>
    <div class="main">
      <el-card shadow="hover" v-for="o in 4" :key="o">
        <div>
          {{ '列表内容' + o }}
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
