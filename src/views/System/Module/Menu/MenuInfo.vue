<template>
  <section>
    <el-dialog title="权限列表" :visible.sync="powerList" :close-on-click-modal="false">
      <div>
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
          :pagination="pagination"/>
        <menuInfoAdd ref="menuInfoAdd" :ruleForm="form" :title="title" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="powerList = false">关闭</el-button>
      </div>
    </el-dialog>
   
  </section>
</template>
 <!-- 查看权限 -->
<script>
import cesTable from "@/components/Module/Table";
import menuInfoAdd from "./MenuInfoAdd";
import { qxListApi, qxDelApi } from "@/api/api";

export default {
  name: "",
  data() {
    return {
      powerList: false,
      tableData: [],
      tableCols: [
        { label: "权限名称", prop: "name" },
        { label: "url", prop: "accessUrl" },
        { label: "描述", prop: "description" },
        {
          label: "操作",
          type: "Button",
          btnList: [
            {
              label: "修改权限",
              handle: (row, i) => this.update(row, i)
            },
            {
              type: "danger",
              label: "删除权限",
              handle: (row, i) => this.del(row, i)
            }
          ]
        }
      ],
      tableHandles: [
        { label: "添加权限", type: "primary", handle: row => this.add() }
      ],
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 10
      },
      form: {},
      title: "",
      menuJson: {},
      row: {}
    };
  },

  methods: {
    add() {
      let { menuText, menuId } = this.menuJson;
      this.title = "添加权限";
      this.form = {};
      this.form = {
        menuText:menuText,
        menuId:menuId
      };
      this.$refs.menuInfoAdd.init();
    },
    update(v, i) {
      let { menuText, menuId } = this.menuJson;
      this.title = "修改权限";
      this.form = {};
      this.form = JSON.parse(JSON.stringify(v));
      this.form.menuText = menuText;
      this.form.menuId = menuId;
      this.$refs.menuInfoAdd.init();
    },
    del(v, i) {
      let { id } = v;
      elMsgBox("您确定要删除这个权限？", "del").then(res => {
        qxDelApi(id).then(res => {
          elMsg("删除成功");
          this.addCb();
        });
      });
    },
    addCb(){
      this.getData(this.row);
    },
    getData(row){
      let { text, id } = row; //文本 ， id 
      this.menuJson={
        menuText:text,
        menuId:id
      };
      qxListApi({
        _dc: 1568708905460,
        menuId: id,
        page: 1,
        start: 0,
        rows: 25
      }).then(res => {
        this.tableData = res.data;
        console.log(res);
      });
    },
    init(row) {
      this.row = row;
      this.powerList = true;
      this.addCb()
    }
  },
  components: {
    cesTable,
    menuInfoAdd
  }
};
</script>

<style lang='less' scoped>
</style>