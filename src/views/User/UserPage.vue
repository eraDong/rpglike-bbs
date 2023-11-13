<template>
  <div class="wrapper">
    <el-container class="container">
      <!-- header占个位置 -->

      <el-container>
        <el-aside width="450px">
          <div class="avatar"><img src="@/assets/test1.png" alt="" /></div>
          <div class="text">
            <div class="nickname">ISO</div>
            <div class="profile">
              <router-link to="/user/profile">Profile</router-link>
            </div>
            <div class="account">
              <router-link to="/user/account">Account</router-link>
            </div>
          </div>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  background-color: #0b1416;
  margin-top: 56px;
  .container {
    .el-aside {
      .avatar {
        padding-top: 20px;
        img {
          margin-left: 100px;
          width: 250px;
          height: 250px;
          border-radius: 50%;

          box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.205);
        }
      }

      .text {
        cursor: pointer;
        text-align: center;
        font-size: 35px;
        color: #435155;
        .account {
          a {
            color: #435155;
          }
          .router-link-active {
            color: #738a91;
          }
        }

        .profile {
          a {
            color: #435155;
          }
          .router-link-active {
            color: #738a91;
          }
        }
      }
    }
  }
}
</style>
