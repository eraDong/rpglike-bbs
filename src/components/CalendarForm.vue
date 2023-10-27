<script setup>
import { ref } from 'vue'
const calendarValue = ref(new Date())
</script>

<template>
  <div class="content">
    <el-calendar v-model="calendarValue" />
  </div>
</template>

<style scoped lang="less">
.content {
  margin-left: 165px;
  .el-calendar {
    width: 250px;
    height: 250px;
  }
}
</style>
