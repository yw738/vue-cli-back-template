<template>
  <div class="bgWhite">
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
      :pagination="pagination"
      @refresh="init"
    ></cesTable>

    <fb ref="fb" :form="form" />
  </div>
</template>
    <!-- 反馈管理 -->
<script>
import bread from "@/components/Module/Bread";
import searchForm from "@/components/Module/From";
import cesTable from "@/components/Module/Table";
import fb from "./Module/FBack/FBack";
import { fbListApi, dictListApi } from "@/api/api";

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
          name: "反馈管理"
        }
      ],
      searchData: {
        userName: "",
        dealFlag: ""
      },
      searchForm: [
        {
          type: "input",
          label: "客户名称",
          prop: "userName",
          width: "180px",
          placeholder: "请输入客户名称",
          change: () => {}
        },
        {
          type: "select",
          label: "是否处理",
          prop: "dealFlag",
          width: "180px",
          options: [
            { label: "全部", value: "" },
            { label: "是", value: "0" },
            { label: "否", value: "1" }
          ],
          placeholder: "请选择是否处理",
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
        { label: "客户", prop: "userName" },
        { label: "提交日期", prop: "createDate2" },
        { label: "反馈对象", prop: "feedbackTargetName" },
        { label: "反馈意见", prop: "content" },
        { label: "是否处理", prop: "dealFlag2" },
        { label: "处理结果", prop: "dealResult" },
        {
          label: "操作",
          type: "Button",
          width: "180px",
          btnList: [
            {
              label: "处理反馈",
              type: "info",
              isShow:(row, i)=>row.dealFlag==="0"?false:true,
              handle: (row, i) => this.feedBack(row, i)
            }
          ]
        }
      ],
      pagination: {
        pageSize: 15,
        pageNum: 1,
        total: 0
      },
      form: {}
    };
  },
  methods: {
    async feedBack(v, i) {
      await (this.form = {});
      await (this.form = JSON.parse(JSON.stringify(v)));
      this.$refs.fb.init();
    },
    async init() {
      let {
        pagination: { pageSize, pageNum },
        searchData: { userName = "", dealFlag = "" }
      } = this;
      let arr = [];
      await dictListApi({
        page: 1,
        rows: 999,
        start: 0
      }).then(res => {
        let { data, count } = res;
        data.forEach(v => {
          if (v.type == "feedback_target") {
            arr.push(v);
          }
        });
      });

      await fbListApi({
        userName: userName,
        dealFlag: dealFlag,
        page: pageNum,
        rows: pageSize,
        start: 0
      })
        .then(res => {
          let { data, count } = res;
          data.map(v => {
            if (v.dealFlag === "0") {
              v.dealFlag2 = "是";
            } else if (v.dealFlag === "1") {
              v.dealFlag2 = "否";
            }
            arr.forEach((item, index) => {
              if (item.id === v.feedbackTargetId) {
                v.feedbackTargetName = item.label;
              }
            });
            v.createDate2 = timestampToTime(v.createDate, "m");
          });

          this.pagination.total = parseInt(count);
          this.tableData = data;
        })
        .catch(err => {});
    }
  },
  created() {
    this.init();
  },
  components: {
    bread,
    searchForm,
    cesTable,
    fb
  }
};
</script>

<style lang='less' scoped>
</style>