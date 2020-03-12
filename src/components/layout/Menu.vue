<template>
  <div class>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :default-active="defaultActive"
      unique-opened
    >
      <el-menu-item class="tab">
        <div class="sidebar-toggler" @click="collapse">
          <i :class="[isCollapse?'el-icon-arrow-right':'el-icon-arrow-left']"></i>
        </div>
      </el-menu-item>
      <!-- ------ menu ------- -->
      <el-submenu :index="item.path" v-for="(item,index) in menu" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.text}}</span>
        </template>

        <el-menu-item-group>
          <el-menu-item :index="v.path" v-for="(v,i) in item.child" :key="i">
            <router-link :to="v.path">
              <i :class="v.icon"></i>
              {{v.text}}
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { menuListApi } from "@/api/api";
export default {
  name: "",
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          text: "系统管理",
          path: "/setting",
          icon: "el-icon-setting",
          child: [
            {
              text: "菜单管理",
              icon: "el-icon-menu",
              path: "/Menu"
            },
            {
              text: "角色管理",
              icon: "el-icon-user",
              path: "/Role"
            },
            {
              text: "用户管理",
              icon: "el-icon-s-custom",
              path: "/User"
            },
            {
              text: "字典管理",
              icon: "el-icon-notebook-2",
              path: "/Dict"
            },
            {
              text: "意见反馈",
              icon: "el-icon-notebook-1",
              path: "/FeedBack"
            }
          ]
        },
      ],
      defaultActive: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    collapse() {
      this.isCollapse = !this.isCollapse;
      let oBoxR = document.querySelector("#container_right");
      let oBoxL = document.querySelector("#container_left");
      if (this.isCollapse) {
        oBoxL.classList.add("active");
        oBoxR.classList.add("active");
        oBoxL.style.transition = "all ease .43s";
        oBoxR.style.transition = "all ease .43s";
      } else {
        oBoxL.classList.remove("active");
        oBoxR.classList.remove("active");
      }
    } //不用管 ， 这是侧边栏收缩的平滑效果
  },
  created() {
    this.defaultActive = window.location.href.split("?")[0].split("#")[1];
    // menuListApi().then(res => {
      
    // });
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.sidebar-toggler {
  border-radius: 4px;
  cursor: pointer;
  display: block;
  float: right;
  margin: 0;
  border: 0;
  margin: 8px 0;
  width: 24px;
  height: 24px;
  margin-right: -1px;
  background-color: #409eff;
  line-height: 24px;
}
.sidebar-toggler i {
  color: #fff !important;
}
/* 选中状态 */
.is-active > a {
  color: #409eff !important;
}
a {
  text-decoration: none;
  color: #333;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.tab {
  height: 40px !important;
  color: #242527 !important;
}
.el-submenu__title {
  height: 36px !important;
  line-height: 36px !important;
  border: 1px solid red !important;
}
.el-menu-item {
  height: 34px !important;
  line-height: 34px !important;
  color: #333 !important;
}
</style>