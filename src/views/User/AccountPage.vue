<script setup></script>

<template>
  <div class="wrapper">
    <div class="main">
      <div class="text">
        <div class="nickname"><el-input></el-input></div>
        <div class="username"><el-input></el-input></div>
        <div class="password"><el-input></el-input></div>
        <div class="short">
          <el-input
            type="textarea"
            maxlength="30"
            show-word-limit
            placeholder="Breif Introduction..."
            resize="none"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  .main {
    .text {
      margin-top: 100px;
      .nickname,
      .username,
      .password {
        margin-bottom: 30px;
        width: 350px;
      }
      .short {
        margin-right: 30px;
      }
    }
  }
}
</style>
