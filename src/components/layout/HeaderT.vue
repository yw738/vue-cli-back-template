<template>
  <div class="headerT">
    <el-row>
      <el-col :span="22">
        <div class="page-logo">
          <h1 class="floatF padR20">
            <router-link to="/HomePage" title="首页">
              <img class="floatF" alt="这里放logo" />
            </router-link>
          </h1>
          <span class="floatF">{{title}}</span>
        </div>
      </el-col>
      <el-col :span="2">
        <el-dropdown>
          <div class="el-dropdown-link">
            <img :src="headPortrait" class="head-portrait floatF" />
            <span class="floatF">{{userObj.name||'用户名'}}</span>
            <i class="el-icon-arrow-down floatF"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="dropdown-menu">
            <el-dropdown-item class="dropdown-item">
              <i class="el-icon-user"></i>我的信息
            </el-dropdown-item>
            <el-dropdown-item class="dropdown-item">
              <i class="el-icon-setting"></i>主题设置
            </el-dropdown-item>
            <el-dropdown-item class="dropdown-item" divided >
              <i class="el-icon-edit-outline"></i>退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "",
  data() {
    return {
      title: "XX商城后台管理系统",
      headPortrait:
        "http://images.qihelc.com/dingcheng/avatar/1451667769247.jpg"
    };
  },
  computed:{
    ...mapState(['userObj'])
  }
};
</script>

<style lang="less" scoped>
@headerH: 40px;
@height: 30px;
@txtColor: "#ffffff";

.headerT {
  padding: (@headerH - @height) / 2 0;
  box-sizing: border-box;
  height: @headerH;
  color: @txtColor;
}
.el-row,
.page-logo {
  height: @height;
}
.page-logo img {
  height: 25px;
  width: 150px;
}
.page-logo h1 {
  width: 250px;
  padding: 2.5px 0;
  text-align: center;
}
.page-logo a{
  display: inline-block;
}
.page-logo span {
  font-size: 18px;
  line-height: @height;
}
.head-portrait {
  height: @height;
  width: @height;
  border-radius: 50%;
}
.el-dropdown-link span,
.el-dropdown-link i {
  line-height: @height;
  margin-left: 8px;
  color: #fff;
  cursor: pointer;
}
</style>