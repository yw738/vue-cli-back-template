<template>
  <el-dialog title="用户" :visible.sync="dictDialog" width="30%" :before-close="cancel">
    <div>
      <el-form ref="dictForm" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-form-item label="键值" prop="name">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="name">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="name">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="用户描述" prop="name">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="name" style="width:100%">
          <el-input-number v-model="form.sort" controls-position="right" :min="-100" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit('dictForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { dictAddlApi} from "@/api/api";

export default {
  name: "",
  data() {
    return {
      dictDialog: false,
      rules: {
        name: [{ required: false, message: "请输入活动名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date2: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        resource: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        desc: [{ required: true, message: "请选择活动区域", trigger: "change" }]
      }
    };
  },
  props: {
    form: { type: Object, default: {} }
  },
  methods: {
    init() {
      this.dictDialog = true;
    },
    cancel() {
      this.dictDialog = false;
    },
    submit(formName) {
      let {add} = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          add()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    add(){
      let { form, cancel, $parent } = this;
      dictAddlApi(form)
        .then(res => {
          if (res == "") {
            elMsg("操作成功");
            cancel();
            $parent.init();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
.el-input-number {
  width: 100%;
}
</style>