<!--
 * @Author: luo_h603
 * @Date: 2022-07-19 15:42:33
 * @LastEditTime: 2022-07-19 15:58:51
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
-->
<template>
  <el-dialog v-model="dialogFormVisible" title="新增">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  setup() {
    const data = reactive({
      dialogFormVisible: false,
    });
    function addUser() {
      data.dialogFormVisible = true;
    }
    return {
      ...toRefs(data),
      addUser,
    };
  },
};
</script>

<style></style>
