<template>
  <el-dialog title="菜单" :visible.sync="roleDialog" width="30%" :before-close="cancel">
    <div>
      <el-form ref="roleForm" :model="form" label-width="80px" size="mini">
        <el-form-item label="角色名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div class="tree_box">
        <el-tree
          :data="data"
          ref="roleAddTree"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="checkedArr"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="data.children" class="el-icon-folder-opened"></span>
            <span v-if="!data.children" class="el-icon-document"></span>
            <span>{{ data.text }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="roleDialog = false">取 消</el-button>
      <el-button type="primary" @click="submit('roleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { roleGetApi, roleInitApi } from "@/api/api";
import { reject } from "q";

export default {
  name: "",
  data() {
    return {
      roleDialog: false,
      data: [],
      checkedArr: []
    };
  },
  props: {
    form: { type: Object, default: {} }
  },
  methods: {
    init() {
      this.data = [];
      this.checkedArr = [];
      let {
        form: { id = "" },
        form
      } = this;
      this.roleDialog = true;
      this.getData(id);
    },
    // 获取树
    async getData(id = "") {
      let arr = []; //总数据
      let arr2 = []; //所有异步操作
      let arr3 = []; //所有被选中的id
      await roleGetApi({
        node: 0,
        roleId: id
      }).then(res => {
        arr = res;
      });
      let p = new Promise(resolve => {
        arr.forEach((v, i) => {
          if (v.checked) {
            arr3.push(v.id);
          }
          roleGetApi({
            node: v.id,
            roleId: id
          }).then(res => {
            v.children = res;
            res.forEach((item, key) => {
              if (item.checked) {
                arr3.push(item.id);
              }
              roleGetApi({
                node: item.id,
                roleId: id
              }).then(response => {
                item.children = response;
                response.forEach((element, index) => {
                  if (element.checked) {
                    arr3.push(element.id);
                  }
                  if (
                    index + 1 >= response.length &&
                    key + 1 >= res.length &&
                    i + 1 >= arr.length
                  ) {
                    resolve();
                  }
                });
              });
            });
          });
        });
      });

      let that = this;

      p.then(() => {
        console.log(arr, arr3);
        that.data = arr;
        that.checkedArr = arr3;
      });
    },
    cancel() {
      this.roleDialog = false;
    },
    submit(formName) {
      let { add } = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.roleDialog = false;
    },
    add() {
      let arr = this.$refs.roleAddTree.getCheckedNodes();
      let privilegeIds = "";
      let arr2 = [];
      arr.forEach((v,i)=>{
        if(v.children == null){
          arr2.push(v.id);
        }
      })
      arr2.forEach((v, i) => {
        if(v[v.length - 1] === 'M'){
          v = v.substring(0,v.length - 1);
        }
        privilegeIds = privilegeIds + v + ",";
        if (i + 1 >= arr.length) {
          privilegeIds = privilegeIds.substring(0, privilegeIds.length - 1);
        }
      });
      let {
        cancel,
        form: { description, name, id = "" },
        $parent
      } = this;
      roleInitApi({
        id: id,
        name: name,
        description: description,
        privilegeIds: privilegeIds
      }).then(res => {
        if (res == "") {
          elMsg("操作成功");
          cancel();
          $parent.getData();
        }
      });
    },

  }
};
</script>

<style lang='less' scoped>
.tree_box {
  border: 1px solid #dcdfe6;
  padding: 6px;
  max-height: 500px;
  overflow-y:auto; 
}
.tree_box span {
  margin: 0 3px;
}
</style>