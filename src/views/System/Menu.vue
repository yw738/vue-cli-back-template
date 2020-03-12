<template>
  <div class="bgWhite">
    <bread :data="bread" />
    <searchForm :searchHandle="handle" :searchData="searchData" :searchForm="searchForm" />
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      size="mini"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="text" label="菜单名" sortable width="200"></el-table-column>
      <el-table-column prop="nodeId" label="view" sortable></el-table-column>
      <el-table-column prop="qtitle" label="controller" sortable></el-table-column>
      <el-table-column prop="level" label="级数" sortable></el-table-column>
      <el-table-column prop="priority" label="排序" sortable></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="upload(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="info" @click="handleInfo(scope.$index, scope.row)">查看权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <DiaLog title="标题" :searchForm="searchForm" />
    <!-- <MenuDiaLog ref="MenuDiaLog" :form="form" :title="title" /> -->
    <MenuInfo ref="power" />
  </div>
</template>
<!-- 菜单管理 -->
<script>
import bread from "@/components/Module/Bread";
import searchForm from "@/components/Module/From";
import cesTable from "@/components/Module/Table";
import MenuDiaLog from "./Module/Menu/MenuDiaLog";
import MenuInfo from "./Module/Menu/MenuInfo";
import { menuListApi } from "@/api/api";

import DiaLog from "@/components/Module/DiaLog";
export default {
  name: "",
  data() {
    return {
      bread: [
        {
          link: "",
          name: "首页"
        },
        {
          link: "",
          name: "系统管理"
        },
        {
          link: "",
          name: "菜单管理"
        }
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      title: "",
      searchData: {
        name: null,
        mobile: null,
        userType: null
      },
      searchHandle: [
        {
          label: "新增",
          type: "primary",
          handle: row => this.add()
        }
      ],
      searchForm: [
        {
          type: "input",
          label: "姓名",
          prop: "name",
          width: "180px",
          placeholder: "请输入姓名",
          required: true,
          change: () => {}
        },
        {
          type: "input",
          label: "电话",
          prop: "mobile",
          width: "180px",
          placeholder: "请输入电话",
          change: () => {}
        },
        {
          type: "select",
          label: "用户类型",
          prop: "userType",
          width: "180px",
          options: [
            {
              label: "全部",
              value: ""
            },
            {
              label: "销售员",
              value: "Sales"
            },
            {
              label: "经销商",
              value: "Distributor"
            },
            {
              label: "其他",
              value: "Other"
            }
          ],
          placeholder: "请输入用户类型",
          change: () => {}
        }
      ],
      handle: [
        {
          label: "确定",
          type: "primary",
          icon: "el-icon-search",
          handle: row => this.init()
        }
      ],
      tableData: []
    };
  },
  methods: {
    add() {
      this.title = "新增菜单";
      this.$refs.MenuDiaLog.init();
    },
    upload(i, v) {
      this.title = "修改菜单";
      this.form = v;
      this.$refs.MenuDiaLog.init(v);
    },
    del(index, row) {
      elMsgBox("您确定要删除这条记录吗？", "del").then(res => {});
    },
    //查看权限
    handleInfo(index, row) {
      this.$refs.power.init(row);
    },
    getData() {
      menuListApi().then(res => {
        console.log(res);
        this.tableData = res;
      });
    },
    init() {}
  },
  created() {
    this.getData();
  },
  components: {
    bread,
    searchForm,
    cesTable,
    MenuDiaLog,
    MenuInfo,
    DiaLog
  }
};
</script>

<style lang="less" scoped>
ul {
  display: inline-block;
  width: 100%;
  height: 48px;
  padding: 12px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
li {
  float: left;
  width: 20%;
  padding: 0 10px;
  box-sizing: border-box;
  color: #909399;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 14px;
  padding-right: 8px;
}
</style>