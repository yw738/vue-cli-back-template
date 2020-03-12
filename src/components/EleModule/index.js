import { Message, MessageBox } from 'element-ui'
let { confirm, alert, prompt, msgbox } = MessageBox;
window.elMsg = (msg = '恭喜你，这是一条成功消息', type = 'success') => {
    Message({
        message: msg,
        type: type
    });
}// msg 消息提示

window.elMsgBox = (msg = '此操作将永久删除该文件, 是否继续?', type = 'warning') => {
    switch (type) {
        case 'del':
            return new Promise((reject, resolve) => {
                confirm(msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                }).then(() => {
                    reject()
                }).catch(() => {
                    resolve();
                    Message({
                        message: '已取消',
                        type: 'info'
                    });
                });
            })
            break;
        case 'info':
            return new Promise((reject, resolve) => {
                confirm(msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info',
                }).then(() => {
                    reject()
                }).catch(() => {
                    resolve();
                    Message({
                        message: '已取消',
                        type: 'info'
                    });
                });
            })
            break;
        case 'warning':
            return new Promise((reject, resolve) => {
                confirm(msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    reject()
                }).catch(() => {
                    resolve();
                    Message({
                        message: '已取消',
                        type: 'info'
                    });
                });
            })
            break;
        default:
            alert(msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                   
                }
            });
    }
}
//elMsgBox 确认消息为异步 。 提示 就是普通框。
//type 可选参数 'del'
window.setCookie = (name, value, iDay) => {
    if (iDay) { //有过期时间
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate + ';path=/';
    } else {
        document.cookie = name + '=' + value + ';path=/'; //没有过期时间
    }
}
window.getCookie = (name) => {
    let token = null;
    if (document.cookie.length > 0) {
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == name) {
                token = arr2[1]; //保存到保存数据的地方
            }
        }
    }
    return token
}
window.delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 10000);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=123;path=/;expires=" + exp.toGMTString();
}

window.timestampToTime = (timestamp, type = 'd') => {
    // type:有两个参数 d （年月日）, m （年月日 时分秒）
    const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
    const year = dateObj.getFullYear() < 10 ? '0' + dateObj.getFullYear() : dateObj.getFullYear(); // 获取年，
    const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;// 获取月，必须要加1，因为月份是从0开始计算的
    const date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate(); // 获取日，记得区分getDay()方法是获取星期几的。
    const hours = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours();  // 获取时, pad函数用来补0
    const minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes(); // 获取分
    const seconds = dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getSeconds();// 获取秒

    if (type === 'd') {
        return year + '-' + month + '-' + date;
    }
    else {
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    }
}

window.downloadFile = (data, name) => {
    if (!data) return;
    let url = window.URL.createObjectURL(new Blob([data]));
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    url = null;
    link = null;
}