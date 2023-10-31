<script setup>
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { userLoginService, userRegisterService } from '../api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'

//变量
const centerDialogVisible = ref(false)
const isLogin = ref(false)
const form = ref()
const userStore = useUserStore()
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const rules = {
  username: [
    { required: true, message: 'Pless input username', trigger: 'change' },
    {
      min: 5,
      max: 10,
      message: 'Username must be 5-10 characters',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: 'Pless input password', trigger: 'change' },
    {
      pattern: /^\S{6,15}$/,
      message: 'Password must be 6-15 non-blank characters',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: 'Pless input repassword', trigger: 'change' },
    {
      pattern: /^\S{6,15}$/,
      message: 'Password must be 6-15 non-blank characters',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('The password entered twice is inconsistent'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

//方法
const register = async () => {
  await form.value.validator
  await userRegisterService(formModel.value)
  ElMessage.success('Success')
  isLogin.value = false
}

const login = async () => {
  await form.value.validator
  const res = await userLoginService(formModel.value)
  ElMessage.success('Success')
  // console.log(res)

  userStore.setToken(res.token)
  emit('isLogined', true)
  centerDialogVisible.value = false
}

const emit = defineEmits(['isLogined'])

const open = () => {
  centerDialogVisible.value = true
  isLogin.value = false
}

// 监测
watch(isLogin, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

defineExpose({
  open
})
</script>

<template>
  <!-- <el-button text @click="centerDialogVisible = true">
    Click to open the Dialog
  </el-button> -->

  <el-dialog v-model="centerDialogVisible" width="400px" center>
    <span>
      <!-- It should be noted that the content will not be aligned in center by
      default -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isLogin === false"
        class="LoginForm"
      >
        <el-form-item>
          <h3>Login</h3>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="Username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            v-model="formModel.password"
            placeholder="Password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>Remeber me</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="login"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        :model="formModel"
        :rules="rules"
        v-else
      >
        <el-form-item>
          <h3>Register</h3>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="Username"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="Password"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="Repassword"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            @click="register"
            auto-insert-space
          >
            Register
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isLogin = false">
            ← Back
          </el-link>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <div class="register" v-if="isLogin === false">
          <!-- 注册弹窗... -->
          <span class="text">New?</span>
          <el-button link @click="isLogin = true" class="goRegister"
            >Go Register!</el-button
          >
        </div>
        <!-- 忘记密码 也许可以补充 -->
      </span>
    </template>
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
