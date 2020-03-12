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
    ></cesTable>

    <dictAdd ref="dictAdd" :form="form" />
  </div>
</template>
<!-- 字典管理 -->
<script>
import bread from "@/components/Module/Bread";
import searchForm from "@/components/Module/From";
import cesTable from "@/components/Module/Table";
import dictAdd from "./Module/Dict/DictAdd";

import { dictListApi, dictDelApi } from "@/api/api";

export default {
  name: "",
  data() {
    let sexs = [{ label: "男", value: "M" }, { label: "女", value: "F" }];
    let sexProps = { label: "label", value: "value" };
    let intersts = [
      { label: "羽毛球", value: "badminton" },
      { label: "篮球", value: "basketball" }
    ];
    let interstProps = { label: "label", value: "value" };
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
          name: "字典管理"
        }
      ],
      searchData: {
        description: null
      },
      searchForm: [
        {
          type: "input",
          label: "字典描述",
          prop: "description",
          width: "180px",
          placeholder: "请输入描述",
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
        { label: "键值", prop: "value" },
        { label: "标签", prop: "label" },
        { label: "类型", prop: "type" },
        { label: "描述", prop: "description" },
        { label: "排序", prop: "sort" },
        {
          label: "操作",
          type: "Button",
          width: "180px",
          btnList: [
            { label: "修改", handle: (row, i) => this.update(row, i) },
            {
              type: "danger",
              label: "删除",
              handle: (row, i) => this.del(row, i)
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
        total: 0
      },
      form: {}
    };
  },
  methods: {
    async update(v, i) {
      this.form = {};
      await (this.form = JSON.parse(JSON.stringify(v)));
      this.$refs.dictAdd.init();
    },
    del(v, i) {
      let { id } = v;
      let { init } = this;
      elMsgBox("您确定要删除这个字典吗？", "del").then(res => {
        dictDelApi(id).then(res => {
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
      this.$refs.dictAdd.init();
    },
    init() {
      let {
        pagination: { pageSize, pageNum },
        searchData: { description = "" }
      } = this;
      dictListApi({
        description: description,
        page: pageNum,
        rows: pageSize,
        start: 0
      })
        .then(res => {
          let { data, count } = res;
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
    searchForm,
    bread,
    cesTable,
    dictAdd
  }
};
</script>

<style lang="" scoped>
</style>