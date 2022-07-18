<!--
 * @Author: luo_h603
 * @Date: 2022-07-14 16:32:50
 * @LastEditTime: 2022-07-18 19:36:52
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-header flex-flaot">
        <div class="flex">
          <img class="common-logo" src="../assets/logo.png" alt="" />
          <span class="common-title">不知道是啥系统</span>
        </div>
        <el-dropdown trigger="click">
          <span
            class="el-dropdown-link"
            style="color: #fff; font-weight: bold; cursor: pointer"
          >
            个人中心<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>项目地址</el-dropdown-item>
              <el-dropdown-item @click="loginOut"> 退出 </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container class="box">
        <el-aside width="200px" class="common-aside">
          <el-menu
            background-color="#2c3e50"
            text-color="#fff"
            :router="true"
            :unique-opened="true"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Platform /></el-icon>
                <span>账户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/users">账户列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Avatar /></el-icon>
                <span>角色管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/roles">角色列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><GoodsFilled /></el-icon>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/goods">商品列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><WalletFilled /></el-icon>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/power">权限列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "layout",
  setup() {
    const store = useStore();
    const router = useRouter();
    function loginOut() {
      localStorage.removeItem("loginData");
      store.commit("setUserInfo", {});
      router.push({
        path: "/login",
      });
    }
    return {
      loginOut,
    };
  },
};
</script>

<style>
.el-container {
  height: 100vh;
  overflow: hidden;
}
.common-header {
  background-color: #1c2e41;
  padding: 0 20px;
  line-height: 60px;
  cursor: default;
}
.common-logo {
  width: 40px;
  height: 40px;
}
.common-title {
  color: #fff;
  font-size: 16px;
}
.common-aside {
  background: #2c3e50;
  color: #ffffff;
}
.el-menu-item-group__title {
  display: none;
}
.el-main {
  background-color: #ededed;
}
</style>
