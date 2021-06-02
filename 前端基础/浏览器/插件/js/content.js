// 返回按钮
var imgURL = chrome.extension.getURL("images/back.png"),
    a = document.createElement("a");
a.className = "oscar-back";
a.href = "http://localhost:8080/";
a.innerHTML = '<img src="' + imgURL + '">';
document.body.appendChild(a)

var limit = 0;
var fnc = function () {
    // 执行超过50次 5S
    if (limit >= 50) {
        return document.body.style.opacity = 1;
    }
    limit++;
    // 从头播放按钮
    var dom = $(".wpp-cmd-bar .cmb-tab-wrap").eq(3).find(".component-icon-text-btn").eq(1);
    // 如果找到了按钮
    if (dom[0]) {
        // console.log("success");
        dom[0].click();
        document.body.style.opacity = 1;
    }
    // 如果一直找不到按钮
    else {
        // console.log(dom[0]);
        setTimeout(function () {
            fnc();
        }, 100)
    }
}
fnc()