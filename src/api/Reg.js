
/*手机号*/
export let vaPhone = (rule, value, callback) => {
  if (/^1[34578]{1}\d{9}$/.test(value) == false) {
    callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
};
/*发票账号*/
export let vaPhone2 = (rule, value, callback) => {
  if (/^1[34578]{1}\d{9}$/.test(value) == false) {
    callback(new Error("请输入正确的账号"));
  } else {
    callback();
  }
};
/*验证码*/
export let vaNum4 = (rule, value, callback) => {

  if (/^\d{4}$/.test(value) == false) {
    callback(new Error("请输入4位数字验证码"));
  } else {
    callback();
  }
};
/*密码*/
export let vaPass = (rule, value, callback) => {
  /*密码1 ： 请输入6-20位密码，必须包含大小写字母和数字  ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$*/
  if (/^(\w){6,20}$/.test(value) == false) {
    callback(new Error("请输入6-20位密码，可以包含大小写字母和数字"));
  } else {
    callback();
  }
};

// 确认密码
export let vaPass2 = (rule, value, callback) => {
  if (/^(\w){6,20}$/.test(value) == false) {
    callback(new Error("只能输入6-20个字母、数字、下划线"));
  } else if (value !== this.ruleForm.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
// 用户名
export let vaUsername = (rule, value, callback) => {
  if (/^[0-9a-zA-Z\u4e00-\u9fa5_]{2,10}$/.test(value) == false) {
    callback(
      new Error("用户名可包含2-10位汉字、数字、字母、下划线!")
    );
  } else {
    callback();
  }
};
// 账号
export let vaAccount = (rule, value, callback) => {
  if (/^[0-9a-zA-Z]{2,10}$/.test(value) == false) {
    callback(
      new Error("账号可包含2-10位数字、字母!")
    );
  } else {
    callback();
  }
};

// 账号和手机号
export let vaAccountOrPhone = (rule, value, callback) => {
  if (/^[0-9a-zA-Z]{2,13}$/.test(value) == false) {
    callback(
      new Error("请输入正确格式的账号或者手机号!")
    );
  } else {
    callback();
  }
};
/*姓名*/
export let vaName = (rule, value, callback) => {
  if (/^[\u4E00-\u9FFF]+$/.test(value) == false) {
    callback(
      new Error("姓名只可以是中文!")
    );
  } else {
    callback();
  }
};
/*邮箱*/
export let vaEmail = (rule, value, callback) => {
  if (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value) == false) {
    callback(
      new Error("请输入正确的邮箱格式!")
    );
  } else {
    callback();
  }
};
/*公司名称*/
export let vaCompanyName = (rule, value, callback) => {
  if (/^[0-9a-zA-Z\u4e00-\u9fa5_]{2,10}$/.test(value) == false) {
    callback(
      new Error("公司名称!")
    );
  } else {
    callback();
  }
};
/*税号验证*/
export let vaCName = (rule, Code, callback) => {
  if (/^[A-Z0-9]{15}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(Code) == false) {
    callback(
      new Error("税号长度不符合规范!")
    );
  } else {
    callback();
  }
};
/*数字验证*/
export let vaNum = (rule, value, callback) => {
  if (/^[0-9]*$/.test(value) == false) {

    callback(new Error("请输入纯数字"));
  } else {
    callback();
  }
};
/*邮编验证*/
export let vaPost = (rule, value, callback) => {
  if (/[1-9]\d{5}(?!\d)/.test(value) == false) {
    callback(new Error("请输入邮编"));
  } else {
    callback();
  }
};

