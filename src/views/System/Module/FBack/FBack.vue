<template>
  <div class>
    <el-dialog title="请输入反馈意见" :visible.sync="fdDialog" width="20%" >
      <el-form ref="fdForm" :model="form" :rules="rules" label-width="0">
        <el-form-item label prop="input">
          <!-- <span class="title">请输入反馈意见</span> -->
          <el-input type="textarea" v-model="form.dealResult"  :rows="5" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">取 消</el-button>
        <el-button type="primary" @click="submit('fdForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fbPutApi } from "@/api/api";

export default {
  name: "",
  data() {
    return {
      fdDialog: false,
      rules: {
        input: [
          { required: false, message: "请输入活动名称", trigger: "blur" },
        ]
      }
    };
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    init() {
      this.fdDialog = true;
    },
    cancel() {
      this.fdDialog = false;
    },
    submit(formName) {
      let { put } = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          put();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    put() {
      let { $parent, cancel,form:{id,dealResult} } = this;
      fbPutApi({
        id:id,
        dealResult:dealResult
      })
        .then(res => {
          if (res == "") {
            elMsg("处理成功");
          } else {
            elMsg("处理失败");
          }
          cancel();
          $parent.init();
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang='less' scoped>
</style>