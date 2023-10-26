<script setup></script>

<template>
  <div class="content">
    <router-link to="#">
      <div class="header">
        <div class="left">
          <div class="plate">
            <router-link to="#">Plate I</router-link>
          </div>
          <div class="join">Join</div>
        </div>
      </div>
      <!-- 图片非必须 -->
      <div class="main">
        <h3>Lakers vs Nuggets</h3>
        <span class="postImg"
          ><img src="@/assets/post-test1.png" alt=""
        /></span>
      </div>
      <div class="footer">底部</div>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.content {
  margin: 0 110px;
  margin-bottom: 15px;
  width: 720px;

  &:hover {
    width: 720px;
    height: auto;
    background-color: #1a282d;
    border-radius: 15px;
  }

  a {
    color: #fff;
  }
  .header {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    width: 720px;

    .left {
      display: flex;
      justify-content: space-between;
      width: 720px;
      height: auto;
      .plate {
      }

      .join {
        background-color: #0045ac;
        text-align: center;
        width: 45px;
        height: 25px;
        line-height: 25px;
        border-radius: 10px;
      }
    }
  }

  .main {
    padding: 5px;
    h3 {
      font-size: 24px;
    }
    .postImg {
      width: 720px;
      img {
        margin: 5px 35px;
        width: 650px;
        height: 100%;
        border-radius: 30px;
      }
    }
  }

  .footer {
    padding: 5px;
  }
}
</style>
