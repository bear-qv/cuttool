/*!
 * @Name ElementDrop 创建一个拖拽元素对象
 * @authors Qv (four.fy@gmail.com)
 * @date    2015-02-09 10:19:19
 */

"use strict";

function eDrop(obj) {
	return obj.drag = new Drag(obj, {
		ODD: function(self) {
			self.style.zIndex = ++Drop.zIndex;
			Drop.tensile.poss(self);
		}
	}, true).init();
}


//#region Tensile 
//缩放裁剪对象
function Tensile() {};
Tensile.prototype = {

	e: null, //be tensiled element

	//这个地方，所有的拉伸对象都会指向这个队列
	//有个想法就是。是所有共用这个容器还是这个对象重新实例化
	//Date: 2015-02-17 16:35
	anchorList: [],

	//锚点的样式，哪天看着不顺眼改改改 
	defaultStyle: 'width:6px;height:6px;position:absolute;background-color:blue;cursor:move',

	//初始化函数把8个锚点实例化,后面大概是要给锚点加一些坏坏的东西啦。
	init: function() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (i !== 1 || j !== 1) {
					var d = document.createElement('div');
					d.style.cssText = this.defaultStyle;
					d.id = 'anchor:' + i + '-' + j;
					d.positionX = this.anchorList.length;
					this.anchorList.push(d);

				}
			}
		}
		return this;
	},

	//啊啊啊啊，附体了。找到要缩放的元素附体啦
	//参数 object
	//(0,0) (0,1) (0,2) 
	//(1,0)       (1,2)
	//(2,0) (2,1) (2,2)
	poss: function(obj) {
		if (!obj.nodeName) {
			error('the element is Null.');
		} else {
			this.e = obj;
			//Correction I  Correction J
			for (var i = 0, d; d = this.anchorList[i]; i++) {
				var ci = d.id.split(':')[1];
				var cj = ci.split('-')[1];
				ci = ci.split('-')[0];

				d.style.top = ci * this.e.offsetHeight / 2 + (2 - ci) * -3 + 'px';
				d.style.left = cj * this.e.offsetWidth / 2 + (2 - cj) * -3 + 'px';
				this.e.appendChild(d);

				d.drag = new Drag(d, this.CB, false).init();

			}
		}
	},
	CB: {
		ODD: function(self) {},
		ODM: function(self) {
			var parStyle = self.parentElement.style;
			var sStyle = self.style;
			// var anchorList = Drop.tensile.anchorList;
			var coordinate = self.id.split(':')[1];
			var x = Int(coordinate.split('-')[0]),
				y = Int(coordinate.split('-')[1]);

			if (y === 0) {
				parStyle.width = Int(parStyle.width) - Int(sStyle.left) - 6 + 'px';
				parStyle.left = Int(parStyle.left) + Int(sStyle.left) + 6 + 'px';
			}
			if (y === 2) {
				parStyle.width = Int(sStyle.left) + 'px';
			}


			if (x === 0) {
				parStyle.top = Int(parStyle.top) + Int(sStyle.top) + 6 + 'px';
				parStyle.height = Int(parStyle.height) - Int(sStyle.top) - 6 + 'px';
			}
			if (x === 2) {
				parStyle.height = Int(sStyle.top) + 'px';
			}

			// hehe 
			// Remember the shame !!
			// if (x === 1) {
			// 	if (y === 0) {} else {}
			// 	// Correction of X coordinates
			// 	// sStyle.top = self.parentElement.offsetHeight / 2 - 3 + 'px';
			// 	//  Correction of the X brothers coordinates
			// 	// anchorList[pX + 2].style.left = anchorList[pX - 3].style.left = sStyle.left;

			// } else if (y === 1) {} else {}

			// Correction everything!!!!!!!!!!! yo y oy oy oy 
			Drop.tensile.poss(self.parentElement);
		}
	}
}

//#end


//#region
//T0DO: 拖拽对象

function Drag(obj, CB, unfree) {
	this.element = obj;
	this.CB = CB;
	this.free = !unfree;
}

Drag.prototype = {
	version: "1.0.0",
	element: null, //drop元素
	free: false,
	CB: {},
	//拖拽对象初始化函数，给拖拽对象加拖拽的基本事件
	//Initialization the Drag Object
	init: function() {
		var e = this.element;
		if (!e.nodeName) {
			error('the element is Null.');
		} else {
			e.on('mousedown', this.ODD);
		}
		e.Drag = this;
		return e;
	},
	ODM: function() {

		var e = e || event; //鼠标事件对象
		var self = Drop.onDrag;
		var Drag = self.Drag;
		var par = self.parentElement; //element's papanelement

		(!self.style.left) && (self.style.left = 0);
		(!self.style.top) && (self.style.top = 0);
		//var lx =  e.pageX - self.ox + Int(self.style.left);
		//var ly =  e.pageY - self.oy + Int(self.style.top);

		var lx = Int(self.style.left) + e.movementX; //
		var ly = Int(self.style.top) + e.movementY;

		log(e.movementX);


		if (Drag.free) {
			self.style.left = lx + 'px';
			self.style.top = ly + 'px';
		} else {

			//父元素必须有高宽..
			var bx = par.offsetWidth - self.offsetWidth;
			var by = par.offsetHeight - self.offsetHeight;

			self.style.left = (lx <= 0 ? 0 : (lx >= bx ? bx : lx)) + 'px';
			self.style.top = (ly <= 0 ? 0 : (ly >= by ? by : ly)) + 'px';
			//console.log(self.style.left, self.style.top);

		}

		(Drag.CB.ODM) && (Drag.CB.ODM(self));

		return false;
	},
	ODU: function() {
		var self = Drop.onDrag;
		var Drag = self.Drag;

		(Drag.CB.ODU) && (Drag.CB.ODU(self));


		Drop.context.off('mousemove', Drag.ODM);
		Drop.context.off('mouseup', Drag.ODU);
		Drop.onDrag = null;

		return false;
	},
	//开始拖拽动作触发的事件
	ODD: function() {
		var e = e || event; //鼠标事件对象
		e.stopPropagation();

		var Drag = this.Drag;

		//保存鼠标坐标
		//log(4);
		this.ox = e.pageX - e.offsetX;
		this.oy = e.pageY - e.offsetY;

		Drop.onDrag = this;

		//移动开始 
		Drop.context.on('mousemove', Drag.ODM);

		//拖拽事件结束
		Drop.context.on('mouseup', Drag.ODU);;


		(Drag.CB.ODD) && (Drag.CB.ODD(this));

		return false;
	}
}

//#end

//#region
//全局对象
var Drop = {
	zIndex: 99, //顶定位
	onDrag: null,
	tensile: new Tensile().init(),
	context: window.document //上下文
};

//#end