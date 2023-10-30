<script lang="ts" setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

const centerDialogVisible = ref(false)
const isLogin = ref(false)

const open = () => {
  centerDialogVisible.value = true
}

defineExpose({
  open
})
</script>

<template>
  <!-- <el-button text @click="centerDialogVisible = true">
    Click to open the Dialog
  </el-button> -->

  <el-dialog v-model="centerDialogVisible" title="Login" width="400px" center>
    <span>
      <!-- It should be noted that the content will not be aligned in center by
      default -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isLogin === false"
      >
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space
            >Login</el-button
          >
        </el-form-item>
      </el-form>
      <el-form ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isLogin = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <div class="register" v-if="isLogin === false">
          <!-- 注册弹窗... -->
          New?
          <el-button @click="isLogin = true">Go Register!</el-button>
        </div>
        <!-- 忘记密码 也许可以补充 -->
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.dialog-footer {
  color: #fff;

  button {
    margin-bottom: 10px;
  }
  button:first-child {
    margin-right: 10px;
  }
}
</style>
