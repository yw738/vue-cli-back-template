var mobileReg = /^1[3456789]\d{9}$/
var isvalidateMobile = (rule, value, callback) => {
    if (!value) {
        // return callback(new Error('请输入手机号'));
        return callback();
    }else if (!mobileReg.test(value)) {
        return callback(new Error('请输入正确手机号'));
    } else {
        return callback();
    }

};
const filter_rules = function (item) {
    let rules = [];
    let trigger = item.trigger ? item.trigger : 'blur';
    if (item.required) {
        rules.push({required: true, message: '该输入项为必填项!', trigger: trigger});
    }
    if (item.maxLength) {
        rules.push({min: 1, max: item.maxLength, message: '最多输入' + item.maxLength + '个字符!', trigger: trigger})
    }
    if (item.min && item.max) {
        rules.push({
            min: item.min,
            max: item.max,
            message: '字符长度在' + item.min + '至' + item.max + '之间!',
            trigger: trigger
        })
    }
    if (item.type) {
        let type = item.type;
        switch (type) {
            case 'email':
                rules.push({type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'});
                break;
            case 'mobile':
                rules.push({validator: isvalidateMobile, trigger: 'blur'});
                break;
            case 'number':
                rules.push({type: 'number', message: '该项输入必须为数字', trigger: 'blur'});
                break;
            default:
                rules.push({});
                break;
        }
    }


    return rules;
};
export default filter_rules;
