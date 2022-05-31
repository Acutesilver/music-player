function remSize() {
    //获取设备宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    deviceWidth >= 750 ? deviceWidth = 750 : deviceWidth;
    deviceWidth <= 320 ? deviceWidth = 320 : deviceWidth;
    // 1rem=100px:750px
    //1rem=50px:375px 
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
    //设置字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem';
}
remSize();
window.onresize = function () {
    //窗口大小发生变化时进行适配
    remSize();
}