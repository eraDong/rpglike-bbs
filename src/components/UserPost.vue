<script setup>
import {} from '@element-plus/icons-vue'
import { ref } from 'vue'

// 临时变量名
const value = ref('')
const options = ref('')
const onCreate = () => {}
</script>

<template>
  <div class="header">
    <!-- 创建新帖子 -->
    <div class="create">
      <el-button round @click="onCreate">Create a Post</el-button>
    </div>

    <!-- 排序帖子 -->
    <div class="sort">
      <el-select
        v-model="value"
        class="m-2"
        placeholder="Select"
        popper-class="drop-menu"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <!-- 钉子热门sub -->
  </div>

  <div class="main">
    <!-- 批量生产帖子 -->
    <Post-item></Post-item>
    <Post-item></Post-item>
    <Post-item></Post-item>
  </div>
</template>

<style lang="less">
// 独立出来修改dropdown样式
/* 全局化dropdown样式 */
.drop-menu,
.el-select-dropdown {
  background-color: #0b1416;
  border: none;
}
</style>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-left: 165px;
  width: 750px;

  .create {
    .el-button {
      background-color: transparent;
      color: #fff;
      border-color: #888c8d;
      &:hover {
        border-color: #fff;
      }
    }
  }

  .sort {
    max-width: 95px;

    :deep(.el-input__wrapper) {
      background-color: #0b1416;
    }

    :deep(.el-popper) {
      border: none;
    }

    // 选择器边框删除
    :deep(.el-input) {
      --el-input-focus-border: #0b1416;
      --el-input-transparent-border: 0 0 0 0px;
      --el-input-border-color: #0b1416;
      --el-input-hover-border: 0px !important;
      --el-input-hover-border-color: #0b1416;
      --el-input-focus-border-color: #0b1416;
      --el-input-clear-hover-color: #0b1416;
      box-shadow: 0 0 0 0px !important;
      --el-input-border: 0px;
    }
    :deep(.el-select .el-input__wrapper.is-focus) {
      box-shadow: 0 0 0 0px !important;
    }
    :deep(.el-select .el-input.is-focus .el-input__wrapper) {
      box-shadow: 0 0 0 0px !important;
    }
    :deep(.el-select) {
      --el-select-border-color-hover: #0b1416;
    }
  }
}
</style>
