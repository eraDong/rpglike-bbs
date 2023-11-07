<script setup>
import { ref } from 'vue'
//变量
const centerDialogVisible = ref(false)

const open = () => {
  centerDialogVisible.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="centerDialogVisible" width="1080px" center>
    <span>
      <!-- It should be noted that the content will not be aligned in center by
      default -->
    </span>
  </el-dialog>
</template>

<style lang="less" scoped>
:deep(.el-input__wrapper) {
  border-radius: 25px;
  background-color: #374346;
  box-shadow: none;
}

:deep(.el-input__inner) {
  color: #fff;
}

.register {
  .text {
    margin-right: 6px;
  }
  .goRegister {
    font-size: 12px;
  }
}

.el-form {
  .el-button {
    background-color: #d93a00;
    --el-button-active-color: #ffffff00;
    --el-button-border-color: #ffffff00;
    --el-button-active-border-color: #ffffff00;
    --el-button-active-bg-color: #ffffff00;
  }
  .el-checkbox {
    --el-checkbox-checked-text-color: none;
    --el-checkbox-checked-bg-color: #fff;
    --el-checkbox-checked-icon-color: #000;
    --el-checkbox-checked-input-border-color: #ffffff00;
  }
}

.dialog-footer {
  color: #fff;
}
</style>
