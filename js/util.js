/**
 *
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
NodeList.prototype.on = function(event, fn) {　　　　
	[]['forEach'].call(this, function(el) {　　　　　　
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