<template>
  <div>
    <bread :data="bread" />
    <searchForm :searchData="searchData" :searchForm="searchForm" :searchHandle="searchHandle" />

    <cesTable
      size="mini"
      :isSelection="false"
      :isIndex="true"
      :isPagination="true"
      :loading="false"
      :isHandle="true"
      :tableData="tableData"
      :tableCols="tableCols"
      :tableHandles="tableHandles"
      :pagination="pagination"
      @refresh="init"
    />

    <userAdd ref="userAdd" :form="form" />
  </div>
</template>
    <!-- 用户管理 -->
<script>
import bread from "@/components/Module/Bread";
import cesTable from "@/components/Module/Table";
import searchForm from "@/components/Module/From";
import userAdd from "./Module/User/UserAdd";

import { userListApi, userDelApi, resetPassApi } from "@/api/api";

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
          name: "用户管理"
        }
      ],
      searchData: {
        name: null,
        mobile: null,
        userType: null
      },
      searchForm: [
        {
          type: "input",
          label: "姓名",
          prop: "name",
          width: "180px",
          placeholder: "请输入姓名",
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
      searchHandle: [
        {
          label: "查询",
          type: "primary",
          icon: "el-icon-search",
          handle: row => this.init()
        }
      ],
      tableData: [],
      tableCols: [
        { label: "登录名", prop: "loginName" },
        { label: "姓名", prop: "name" },
        { label: "手机号码", prop: "mobile" },
        { label: "用户类型", prop: "userType2" },
        { label: "销售code", prop: "code" },
        { label: "创建时间", prop: "createDate2" },
        {
          label: "操作",
          type: "Button",
          width: "250px",
          btnList: [
            { label: "修改", handle: (row, i) => this.update(row, i) },
            {
              type: "danger",
              label: "删除",
              handle: (row, i) => this.del(row, i)
            },
            {
              type: "primary",
              label: "重置密码",
              handle: (row, i) => this.resetPass(row, i)
            }
          ]
        }
      ],
      tableHandles: [
        { label: "新增", type: "primary", handle: row => this.add() }
      ],
      pagination: {
        pageSize: 15,
        pageNum: 1,
        total: 0,
      },
      form: {}
    };
  },
  methods: {
    async update(v, i) {
      this.form = {};
      await (this.form = JSON.parse(JSON.stringify(v)));
      this.$refs.userAdd.init();
    },
    del(v, i) {
      let { id } = v;
      let { init } = this;
      elMsgBox("您确定要删除这个用户吗？", "del").then(res => {
        userDelApi(id).then(res => {
          if (res == "") {
            elMsg("删除成功");
            init();
          } else {
            elMsg("删除失败", "error");
          }
        });
      });
    },
    async add() {
      await (this.form = {});
      this.$refs.userAdd.init();
    },
    resetPass(v, i) {
      let { id } = v;
      elMsgBox("您确定要重置该用户密码吗？", "warning").then(res => {
        resetPassApi(id).then(res => {
          if (res == "") {
            elMsg("重置成功");
          }
        });
      });
    },
    init() {
      let {
        pagination: { pageSize, pageNum },
        searchData: { name = "", mobile = "", userType = "" }
      } = this;
      userListApi({
        name: name,
        mobile: mobile,
        page: pageNum,
        rows: pageSize,
        start: 0
      })
        .then(res => {
          let { data, count } = res;
          data.map(v => {
            if (v.userType === "Other") {
              v.userType2 = "其他";
            } else if (v.userType === "Distributor") {
              v.userType2 = "经销商";
            } else if (v.userType === "Sales") {
              v.userType2 = "销售员";
            }
            v.createDate2 = timestampToTime(v.createDate);
          });
          this.pagination.total = parseInt(count);
          this.tableData = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.init();
  },
  components: {
    bread,
    cesTable,
    userAdd,
    searchForm
  }
};
</script>

<style lang='less' scoped>
</style>