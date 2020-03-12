<template>
  <div class="breadStyle">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: v.link }" v-for='(v,i) in data'>{{v.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<!-- 面包屑组件 -->
<script>
export default {
  props: ['data'],
};
</script>

<style lang="less" scoped>
  .breadStyle{
    margin-bottom: 20px;
  }
</style>