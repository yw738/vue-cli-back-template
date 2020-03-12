<template>
  <el-dialog title="用户" :visible.sync="userDialog" width="30%" :before-close="cancel">
    <div>
      <el-form ref="userForm" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="name">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="name">
          <el-select v-model="form.userType" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="name">
          <el-select v-model="form.roleIds" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="userDialog = false">取 消</el-button>
      <el-button type="primary" @click="submit('userForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { rolesApi, userAddApi, userPutApi } from "@/api/api";

export default {
  name: "",
  data() {
    return {
      userDialog: false,
      options: [], //角色列表
      options2: [
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
      ], //用户类型
      rules: {
        name: [{ required: false, message: "请输入活动名称", trigger: "blur" }],
        region: [
          { required: false, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          { required: false, message: "请选择活动区域", trigger: "change" }
        ],
        date2: [
          { required: false, message: "请选择活动区域", trigger: "change" }
        ],
        type: [
          { required: false, message: "请选择活动区域", trigger: "change" }
        ],
        resource: [
          { required: false, message: "请选择活动区域", trigger: "change" }
        ],
        desc: [
          { required: false, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  props: {
    form: { type: Object, default: {} }
  },
  methods: {
    init() {
      this.userDialog = true;
    },
    cancel() {
      this.userDialog = false;
    },
    submit(formName) {
      let {
        add,
        update,
        form: { id }
      } = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (id) {
            update();
          } else {
            add();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    update() {
      let {
        form: { id, loginName, name, mobile, userType, roleIds },
        form,
        cancel,
        $parent
      } = this;
      let json = {
        id: id,
        loginName: loginName,
        name: name,
        mobile: mobile,
        userType: userType,
        roleIds: roleIds
      };
      userPutApi(id, json).then(res => {
        if (res == "") {
          elMsg("修改成功");
          cancel();
          $parent.init();
        }
      });
    },
    add() {
      let { form, cancel, $parent } = this;
      userAddApi(form)
        .then(res => {
          if (res == "") {
            elMsg("新增成功");
            cancel();
            $parent.init();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*
     * 获取角色类型列表
     */
    getRolesType() {
      rolesApi({
        page: 1,
        start: 0,
        rows: 999
      })
        .then(res => {
          let { data } = res;
          data.map(v => {
            v.label = v.name;
            v.value = v.id;
          });
          this.options = data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getRolesType();
  }
};
</script>

<style lang='less' scoped>
.tree_box {
  border: 1px solid #dcdfe6;
  padding: 6px;
}
.tree_box span {
  margin: 0 3px;
}
</style>