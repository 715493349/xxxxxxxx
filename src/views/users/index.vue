<!--
 * @Author: luo_h603
 * @Date: 2022-07-14 16:31:35
 * @LastEditTime: 2022-07-19 19:22:13
 * @LastEditors: luo_h603
 * @Description: 用户列表
 * God help those who help themselves
-->
<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <!-- 头部搜索、按钮 -->
    <div class="header_box">
      <el-input placeholder="请输入搜索关键字..." class="input_box">
        <template #append>
          <el-button :icon="Search" @click="searchList" />
        </template>
      </el-input>
      <el-button type="primary" plain @click="dialogFormVisible = true"
        >新增用户</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table
      class="table_form"
      :data="userList"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column type="index" label="#" align="center" width="" />
      <el-table-column prop="username" label="姓名" align="center" width="" />
      <el-table-column prop="email" label="邮箱" align="center" width="" />
      <el-table-column prop="mobile" label="电话" align="center" width="" />
      <el-table-column prop="role_name" label="角色" align="center" width="" />
      <el-table-column prop="mg_state" label="状态" align="center" width="">
        <template #default="scope">
          <!-- style=" --el-switch-on-color: #13ce66; --el-switch-off-color: #94c3d9; " -->
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeState(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            plain
            @click="editUser(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            plain
            @click="deleteUser(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- @size-change="handleSizeChange"
    @current-change="handleCurrentChange" -->
    <!-- <el-pagination
      v-model:currentPage="searchParams.pagenum"
      :page-sizes="[1, 3, 5, 10]"
      v-model:page-size="searchParams.pagesize"
      layout="sizes, prev, pager, next, jumper"
      :total="total"
      background
      align="center"
    >
    </el-pagination> -->
  </el-card>
  <!-- 对话框 -->
  <el-dialog v-model="dialogFormVisible" title="新增用户">
    <el-form
      ref="userFormRef"
      :model="formData"
      :rules="formRules"
      label-width="250px"
      style="width: 650px"
    >
      <el-form-item label="用户名称" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名称..."
        ></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入用户密码..."
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="formData.email"
          placeholder="请输入用户邮箱..."
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入手机号..."
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(userFormRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs, ref } from "vue-demi";
import { ArrowRight, Search } from "@element-plus/icons-vue";
import { getUserList, addUser, userState } from "@/util/requset";
import { ElMessage } from "element-plus";
export default {
  name: "users",
  setup() {
    // 自定义邮箱验证规则
    const checkEmail = (rule, value, cd) => {
      //  验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        //  合法的邮箱
        return cd();
      }
      cd(new Error("请输入合法的邮箱"));
    };
    // 自定义手机号验证规则
    const mobileRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const data = reactive({
      keyWord: "",
      searchParams: {
        query: "",
        pagesize: 10,
        pagenum: 1,
      },
      userList: [],
      dialogFormVisible: false,
      formData: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      total: 0,
      formRules: {
        username: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入用户密码",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: false,
            message: "请输入用户邮箱",
            trigger: "blur",
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: false,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            validator: mobileRule,
            trigger: "blur",
          },
        ],
      },
    });
    // 方法初始化
    searchList();

    const userFormRef = ref(null);
    function searchList() {
      getUserList(data.searchParams).then((res) => {
        data.userList = res.data.users;
      });
    }

    // 编辑
    function editUser(row) {
      alert(`编辑用户 ${row.username}`);
    }

    // 删除
    function deleteUser(id) {
      alert(`删除用户 ${id}`);
    }

    // 新增用户
    function submitForm(formEl) {
      formEl.validate((valid) => {
        if (valid) {
          // alert("submit!");
          addUser(data.formData).then((res) => {
            if (res.data) {
              data.dialogFormVisible = false;
              data.formData = {
                username: "",
                password: "",
                email: "",
                mobile: "",
              };
              ElMessage({
                message: "新增用户成功!",
                type: "success",
              });
              searchList();
            }
          });
          data.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    }

    // 用户状态
    function changeState(row) {
      userState(row).then((res) => {
        res.data.mg_state
          ? ElMessage({
              message: `${row.username} ${res.meta.msg}`,
              type: "success",
            })
          : ElMessage({
              message: `${row.username} ${res.meta.msg}`,
              type: "info",
            });
      });
      console.log(row);
    }
    return {
      ...toRefs(data),
      Search,
      ArrowRight,
      getUserList,
      searchList,
      editUser,
      deleteUser,
      submitForm,
      userFormRef,
      changeState,
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
.table_form {
  margin-top: 20px;
  border-radius: 10px;
}
</style>
