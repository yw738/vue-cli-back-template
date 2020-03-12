// 公共方法
let setCookie = (name, value, iDay) => {
    if (iDay) {
        //有过期时间
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie =
            name + "=" + value + ";expires=" + oDate + ";path=/";
    } else {
        //没有过期时间
        document.cookie = name + "=" + value + ";path=/";
    }
}

export {setCookie}