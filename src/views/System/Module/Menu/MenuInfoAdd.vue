<template>
  <section>
    <el-dialog :title="title" :visible.sync="diaLogName" append-to-body width="30%">
      <!-- :close-on-click-modal='false' -->
      <section>
        <el-form
          :model="ruleForm"
          :rules="rules"
          size="mini"
          ref="addFrom"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-model="ruleForm.accessUrl"></el-input>
          </el-form-item>
          <el-form-item label="code" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="请求方式" prop="httpMethod">
            <el-input v-model="ruleForm.httpMethod"></el-input>
          </el-form-item>
          <el-form-item label="动作">
            <el-input v-model="ruleForm.actionName"></el-input>
          </el-form-item>
          <el-form-item label="按钮名称">
            <el-input v-model="ruleForm.buttonName"></el-input>
          </el-form-item>
          <el-form-item label="icon">
            <el-input v-model="ruleForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="所属菜单">
            <el-input v-model="ruleForm.menuText" disabled></el-input>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFrom')">保 存</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { qxAddApi, qxPutApi } from "@/api/api";

export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入code", trigger: "blur" }],
        httpMethod: [
          { required: true, message: "请输入请求方式", trigger: "blur" }
        ]
      },
      diaLogName: false
    };
  },
  props: {
    title: { type: String },
    ruleForm: { type: Object, default: () => {} }
  },
  methods: {
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          if (that.ruleForm.id) {
            that.update();
          } else {
            that.add();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    add() {
      let {
        ruleForm,
        cancel,
        $parent: { $parent }
      } = this;
      qxAddApi(ruleForm).then(res => {
        console.log(res);
        cancel();
        $parent.addCb();
      });
    },
    update() {
      let { ruleForm, cancel ,$parent: { $parent }} = this;
      let {
        name,
        accessUrl,
        code,
        httpMethod,
        actionName,
        buttonName,
        icon,
        description,
        menuText,
        id,
        menuId
      } = ruleForm;
      let json2 = {
        name: name,
        accessUrl: accessUrl,
        code: code,
        httpMethod: httpMethod,
        actionName: actionName,
        buttonName: buttonName,
        icon: icon,
        description: description,
        menuText: menuText,
        id: id,
        menuId: menuId
      };
      qxPutApi(id, json2).then(res => {
        console.log(res);
        cancel();
        $parent.addCb();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
    init() {
      this.diaLogName = true;
    },
    cancel() {
      this.diaLogName = false;
    }
  }
};
</script>

<style lang='less' scoped>
</style>