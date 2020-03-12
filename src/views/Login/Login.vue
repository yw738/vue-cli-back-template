<template>
  <div class="bg">
    <div class="bg_mask">
      <div class="login_box">
        <div class="top">
          <!-- <div class="left">
            <img  />
          </div> -->
          <div class="right">
            <div>管理系统</div>
            <div>
              管理系统
              <span>V1.0.0</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="box">
            <el-row>
              <el-col :span="12" class="left">
                <img src="../../assets/img/img_page@2x.png" alt />
              </el-col>
              <el-col :span="12" class="right">
                <div class="content">
                  <el-form
                    label-width="60px"
                    :model="userForm"
                    status-icon
                    ref="userForm"
                    class="login-ruleForm"
                    size="small"
                  >
                    <el-form-item
                      label="账号"
                      class="marBot12 inputSty"
                      prop="loginName"
                      :rules="{required: true, message: '用户名不能为空', trigger: 'blur'}"
                    >
                      <el-input
                        placeholder="请输入账号"
                        type="text"
                        v-model="form.loginName"
                        auto-complete="off"
                        @keyup.enter.native="submitForm()"
                      />
                    </el-form-item>
                    <el-form-item
                      label="密码"
                      class="marBot12 inputSty"
                      prop="password"
                      :rules="{required: true, message: '密码不能为空', trigger: 'blur'}"
                    >
                      <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="form.password"
                        auto-complete="off"
                        @keyup.enter.native="submitForm()"
                      />
                    </el-form-item>
                    <div>
                      <el-checkbox class="marBot6" >记住我</el-checkbox>
                      <div>
                        <button type="button" @click="submitForm()" class="btn">登录</button>
                      </div>
                    </div>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="box_mask1"></div>
          <div class="box_mask2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { loginApi, isQxApi } from "@/api/api";
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      form: {
        loginName: "",
        password: ""
      },
      isShow: false
    };
  },

  methods: {
    ...mapActions(["setUser"]),
    submitForm() {
      let {
        form: { loginName, password },
        form,
        $router,
        setUser
      } = this;
      let that = this;
      // if (loginName.trim() == "" || password.trim() == "") {
      //   this.isShow = true;
      //   return;
      // }
      let loading = this.$loading();

      setTimeout(()=>{
        $router.replace({
          path: "homepage"
        });
        elMsg("登陆成功");
        loading.close();
      },1000)
      // loginApi(form).then(Response => {
      //   let { success, message } = Response;
      //   if (success === false) {
      //     that.form = {};
      //     elMsg(message, "error");
      //     loading.close();
      //   } else {
      //   }
      // });
    }
  },
};
</script>
    
<style lang="less" scoped>
.bg {
  background: #2098e9;
}
.bg_mask,
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
}
.bg_mask {
  background: url("../../assets/img/bg_mask.png") no-repeat;
  z-index: 10;
  background-size: 100% 100%;
}
.login_box {
  width: 580px;
  position: fixed;
  left: calc(50% - 290px);
  top: calc(40% - 189px);
}
.login_box .content {
  width: 224px;
  margin: 40px auto 0;
}
.login_box .top {
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  height: 64px;
  margin-bottom: 20px;
}
.login_box .top .left {
  margin-right: 8px;
}
.login_box .top .left img {
  height: 64px;
  width: 64px;
}
.login_box .top .right div:nth-of-type(2) {
  font-size: 12px;
  letter-spacing: 11px;
}
.login_box .top .right div:nth-of-type(2) span {
  letter-spacing: 1px;
}
.bottom {
  position: relative;
}
.bottom > div {
  position: absolute;
  height: 300px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 11px -5px #000;
}
.bottom .box {
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}
.bottom .box_mask1,
.bottom .box_mask2 {
  opacity: 0.8;
}
.bottom .box_mask1 {
  width: 540px;
  top: 8px;
  left: 20px;
  z-index: 99;
}
.bottom .box_mask2 {
  width: 500px;
  top: 14px;
  left: 40px;
  z-index: 98;
}
.bottom .left img {
  width: 212px;
  height: 212px;
  margin: 40px 0 0 50px;
}
.bottom .right .btn {
  width: 100%;
  height: 36px;
  background: #2098e9;
  border-radius: 18px;
  box-shadow: 0px 0px 7px -5px #000;
  color: #fff;
  border: none;
  font-size: 14px;
  letter-spacing: 2px;
  outline: none;
  cursor: pointer;
}
.code_right {
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>