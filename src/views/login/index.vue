<!--
 * @Author: luo_h603
 * @Date: 2022-07-14 20:00:33
 * @LastEditTime: 2022-07-19 10:45:32
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div class="login-weap">
    <h1 class="header-title">不知道啥系统</h1>
    <div class="login-form">
      <el-form
        ref="formRef"
        :model="loginData"
        label-width="110px"
        class="demo-dynamic"
        style="max-width: 389px"
      >
        <el-form-item
          prop="username"
          label="用户名"
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ]"
        >
          <el-input placeholder="请输入用户名" v-model="loginData.username" />
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input
            placeholder="请输入密码"
            show-password
            v-model="loginData.password"
          />
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button type="info" @click="login">登录</el-button>
      </div>
      <span style="color: #fff">账户: admin</span>
      <span style="margin-left: 20px; color: #fff">密码: admin</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue-demi";
import { useStore } from "vuex";
import router from "@/router";
import { loginApi } from "@/util/requset";
export default {
  name: "login",
  setup() {
    const store = useStore();
    const count = store.state.number.count;
    const data = reactive({
      loginData: { username: "admin", password: "123456" },
      num: count,
    });
    // console.log("修改前", store.getters["number/countStatus"]);

    // const login = () => {
    // store.commit("setCount", 100);
    // store
    //   .dispatch("number/setCountPrimise", 10)
    //   .then(() => {
    //     // alert("修改成功");
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
    // console.log(store.state.number.count);
    // console.log("修改后", store.getters["number/countStatus"]);
    // };
    function login() {
      // let dataLogin = JSON.stringify(data.loginData);
      // 请求接口
      loginApi(data.loginData).then((res) => {
        // console.log(res);
        if (res.data) {
          store.commit("setUserInfo", res.data);
          // 登录成功存储到本地存储中
          localStorage.setItem("loginData", JSON.stringify(res.data));
          // 跳转
          router.push({
            path: "/",
          });
        }
      });
    }
    return {
      ...toRefs(data),
      login,
    };
  },
};
</script>

<style>
.header-title {
  text-align: center;
  margin-top: 100px;
  /* 字体大小 */
  font-size: 40px;
  /* 字体 */
  font-family: "幼圆";
  color: #fff;
}
.login-weap {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/3.jpg");
}
.login-form {
  position: absolute;
  width: 450px;
  height: 250px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 50px;
  border-radius: 8px;
  background: linear-gradient(to right, #36003326, #0b889326);
}
.el-form {
  margin-top: 80px;
}
.login-btn {
  text-align: center;
  margin: 20px 0;
}
.el-button--info {
  width: 110px;
}
.el-form-item__label {
  color: #fff;
}
</style>
