<template>
  <div>
    <bread :data="bread" />
    <cesTable
      size="mini"
      :isSelection="false"
      :isIndex="true"
      :isPagination="false"
      :loading="false"
      :isHandle="true"
      :tableData="tableData"
      :tableCols="tableCols"
      :tableHandles="tableHandles"
      :pagination="pagination"
    />

    <roleAdd ref="roleAdd" :form="form" />
  </div>
</template>
<!-- 角色管理 -->
<script>
import bread from "@/components/Module/Bread";
import cesTable from "@/components/Module/Table";
import roleAdd from "./Module/Role/RoleAdd";
import { rolesApi,roleDelApi } from "@/api/api";

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
          name: "角色管理"
        }
      ],
      tableData: [],
      tableCols: [
        { label: "角色名称", prop: "name" },
        { label: "描述", prop: "description" },
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
        pageSize: 10,
        pageNum: 1,
        total: 21
      },
      form: {}
    };
  },
  methods: {
   async update(v, i) {
      this.form = {};
      await (this.form = v);
      this.$refs.roleAdd.init();
    },
    del(v, i) {
      let {id} =v;
      let {getData} = this;
      elMsgBox("您确定要删除这个角色吗？", "del").then(res => {
        roleDelApi(id).then(res=>{
          elMsg('删除成功');
          getData();
        })
      });
    },
    async add() {
     await (this.form = {});
      this.$refs.roleAdd.init();
    },
    getData(){
      let {pagination:{pageSize,pageNum}} = this
      rolesApi({
        rows:pageSize,
        start:pageNum
      }).then(res=>{
        let { data,count} = res;
        this.pagination.total = count;
        this.tableData = data;
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  created(){
    this.getData();
  },
  components: {
    bread,
    cesTable,
    roleAdd
  }
};
</script>

<style lang="" scoped>
</style>