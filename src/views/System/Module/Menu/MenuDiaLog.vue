<template>
  <section id="menuDiaLog">
    <el-dialog :title="title" :visible.sync="diaLogName" width="30%">
      <section>
        <el-form
          :model="form"
          :rules="rules"
          size="mini"
          ref="addFrom"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="菜单名" prop="name">
            <el-input v-model="form.text"></el-input>
          </el-form-item>
          <el-form-item label="图标名称" prop="delivery">
            <el-input v-model="form.icon"></el-input>
          </el-form-item>
          <el-form-item label="view" prop="desc">
            <el-input v-model="form.nodeId"></el-input>
          </el-form-item>
          <el-form-item label="controller" prop="desc">
            <el-input v-model="form.qtitle"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="desc">
            <el-input-number
              v-model="form.priority"
              controls-position="right"
              class="width100"
              @change="handleChange"
              :min="-100"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="级数" prop="desc">
            <el-select v-model="form.level" placeholder="请选择" class="width100">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否功能菜单" prop="desc">
            <el-radio v-model="form.isLeaf" label="1" style="line-height: 28px;">是</el-radio>
            <el-radio v-model="form.isLeaf" label="0" style="line-height: 28px;">否</el-radio>
          </el-form-item>
          <el-form-item label="父菜单" prop="desc">
            <el-select v-model="form.desc" placeholder="请选择" class="width100">
              <el-option v-for="item in options" :key="item.id" :label="item.text" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFrom')">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

 <!-- 菜单新增 与修改 -->


<script>
import { menusApi,menuPutApi,menuAddApi } from "@/api/api";

export default {
  data() {
    return {
      diaLogName: false,
      rules: {
        name: [
          { required: false, message: "请输入活动名称", trigger: "blur" }
        ],
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
        desc: [{ required: false, message: "请选择活动区域", trigger: "change" }]
      },
      options: []
    };
  },
  props: {
    title: { type: String },
    form: { type: Object, default: () => {} }
  },
  methods: {
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          if (that.form.id) {
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
    async init(res) {
      if (res) {
        await menusApi({
          _dc: res.id,
          level: 1,
          start: 0,
          rows: 100,
          page: 1
        }).then(res => {
          this.options = res.data;
        });
      }

      this.diaLogName = true;
    },
    cancel() {
      this.diaLogName = false;
    },
    add() {
      let {
        form,
        cancel,
        $parent
      } = this;

      return;
      menuAddApi(form).then(res => {
        cancel();
        elMsg('新增成功');
        $parent.getData();
      });
    },
    update() {
      let {
        form:{id},
        form,
        cancel,
        $parent
      } = this;
      menuPutApi(id, form).then(res => {
        cancel();
        elMsg('修改成功');
        $parent.getData();
      });
    }
  }
};
</script>

<style lang='less' scoped></style>