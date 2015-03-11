/**
 * Util.js
 * @authors Qv(foru.fy@gmail.com)
 * @date    2015-02-09 10:19:19
 * @version 0.1
 */


/**
 * $ 选择器 用法和jq的相似，没有扩展功能
 *
 * 参数 : type
 * return  array[obj]
 */
function $(type) {
    return document.querySelectorAll(type);
};

/**
 * style , 返回一个结点对联调整样式函数
 *
 * 参数 : name , value
 * return  function
 */

function style(name, value) {
    return function () {
        for (var i = 0, t; t = this[i]; i++) {
            t.style[name] = value;
        }
    }
}

/**
 * show/hide 让结点队列隐藏/SHOW
 *
 * 参数 : NULL
 * return  NULL
 */

HTMLCollection.prototype.hide = NodeList.prototype.hide = style('display', 'none');
HTMLCollection.prototype.show = NodeList.prototype.show = style('display', 'block');

/**
 * log : console.log
 *
 * 提高效率
 */
function log(s) {
    console.log(s);
}

/**
 * Int : parseInt(,10);
 *
 * 提高效率
 */
function Int(s) {
    return parseInt(s, 10);
}


/**
 * element.on / $().on 事件监听器
 * element.off 取消事件
 * 给原生对象添加方法
 */
document.on = Element.prototype.on = Element.prototype.addEventListener;
NodeList.prototype.on = function (event, fn) {
    []['forEach'].call(this, function (el) {
        el.on(event, fn);
    });
    return this;
};
document.off = Element.prototype.off = Element.prototype.removeEventListener;

/**
 * error 抛出错误对象
 *
 * 参数 : *
 * return null
 */
function error(msg) {
    throw new Error(msg);
};

/**
 * 关于~特殊用法
 * 按位非运算符
 * 2015/3/2 : 简单的理解就是改变运算数的符号并减去1
 *
 *  ~[1,2,3,4,5].indexOf(9) 在这个中，返回值就可以直接if了
 */
 