<!--
 * @Author: luo_h603
 * @Date: 2022-07-14 16:31:35
 * @LastEditTime: 2022-07-18 20:06:30
 * @LastEditors: luo_h603
 * @Description: 用户列表
 * God help those who help themselves
-->
<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <div class="header_box">
      <el-input placeholder="搜索关键字..." class="input_box">
        <template #append>
          <el-button :icon="Search" @click="searchList" />
        </template>
      </el-input>
      <el-button type="primary" plain @click="addUser">新增用户</el-button>
    </div>
  </el-card>
</template>

<script>
import { reactive, toRefs } from "vue-demi";
import { ArrowRight, Search } from "@element-plus/icons-vue";
export default {
  name: "users",
  setup() {
    const data = reactive({});
    function searchList() {
      console.log("searchList");
    }
    function addUser() {
      alert("新增用户");
    }
    return {
      ...toRefs(data),
      Search,
      ArrowRight,
      searchList,
      addUser,
    };
  },
};
</script>

<style scoped>
.header_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card {
  margin-top: 20px;
}
.input_box {
  width: 300px;
}
</style>
