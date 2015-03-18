/**
 * app.js
 * main javascript file
 * @authors qv
 * @date    2015-02-27 15:44:20
 * @version 0.1
 */

! function() {
    Init();

    // 旧版时候的
    // $('#userImage')[0].onchange = function() {

    // 	var image = new Image();

    // 	// FileReader
    // 	var reader = new FileReader();
    // 	reader.onload = (function(theImg) {
    // 		return function(evt) {
    // 			theImg.src = evt.target.result;
    // 		};
    // 	}(image));
    // 	reader.readAsDataURL(this.files[0]);


    // 	//iamge onload canvas initialization
    // 	image.onload = function() {

    // 		if (image.width != canvas.width) {
    // 			canvas.parentElement.style.width = canvas.width = image.width;
    // 		}
    // 		if (image.height != canvas.height) {
    // 			canvas.parentElement.style.height = canvas.height = image.height;
    // 		}


    // 		ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 		ctx.drawImage(image, 0, 0);


    // 		eDrop(canvas.parentElement.children[0]);
    // 		eDrop(canvas.parentElement.children[1]);

    // 		cutList.push(canvas.parentElement.children[0]);
    // 		cutList.push(canvas.parentElement.children[1]);
    // 		//A =[] B =[]  A+B A=A.concat(B)
    // 	}

    // }

}();

var onmove;

function Init() {
    //initialization;
    var imgfile = $('#upload-image')[0];
    imgfile.onchange = function() {
        var image = new Image();
        var reader = new FileReader();

        reader.onload = (function(theImg) {
            return function(evt) {
                //文件读取器读取到了文件
                theImg.src = evt.target.result;
            }
        }(image));

        //开始读取文件
        reader.readAsDataURL(this.files[0]);
        image.onload = function() {
            //读取完文件后，这个图片加载完成
            var files = $('#workplace-upload')[0].children;
            var file = files[1];
            var wk = $('#workplace')[0];
            var tb = $('#side-content')[0];
            var h = wk.children[0];
            var canvas = wk.children[2];
            var depiction = $('#image-depiction')[0];
            var help = $('#help')[0];

            help.innerHTML = '尝试用鼠标在图片上拖拖看。';
            depiction.innerHTML = file.files[0].name;

            wk.children.hide();
            tb.children.show();

            canvas.style.display = 'block';
            canvas.width = this.width;
            canvas.height = this.height;
            wk.style.width = canvas.width + 'px';
            wk.style.height = canvas.height + 'px';

            //屏幕自动下滚
            // 也许，以后做编辑器需要一个这样的跳转函数
            location.href = location.origin + location.pathname + '#workplace';

            //canvas load image
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this, 0, 0);

            //鼠标拖动生成裁剪选择框
            /*wk.on('mousedown', function(e) {
                flag = true;
                try {
                    var evt = window.event || e;
                    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                    startX = evt.clientX + scrollLeft;
                    startY = evt.clientY + scrollTop;
                    index++;
                    var d = document.createElement('d');
                    d.style.cssText = 'position:absolute;background:rgba(0,0,0,0.2);width:0px;height:0px;border:1px dashed #ccc;top:' + (startY) + 'px;left:' + (startX) + 'px';
                    this.appendChild(d);
            } catch (e) {
                alert("a");
            }
            });
            wk.on('mouseup', function(e) {
                try {
                document.body.removeChild($(wId + index));
                var d = document.createElement('d');
                d.className = "retc";
                d.style.Left = retcLeft;
                d.style.Top = retcTop;
                d.style.width = retcWidth;
                d.style.height = retcHeight;
                this.appendChild(d);
                } catch (e) {
                    alert("b");
                }
                flag = false;
            });
            wk.on('mousemove', function(e){
                if (flag) {
                    try {
                        var evt = window.event || e;
                        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                        retcLeft = (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX) + "px";
                        retcTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY) + "px";
                        retcHeight = Math.abs(startY - evt.clientY - scrollTop) + "px";
                        retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + "px";
                        $(wId + index).style.Left = retcLeft;
                        $(wId + index).style.Top = retcTop;
                        $(wId + index).style.width = retcWidth;
                        $(wId + index).style.height = retcHeight;
                    } catch (e) {
                        //alert("c");
                    }
                }
            });
            var $ = function (id) {
                return document.getElementById(id);
            }*/
            wk.on('mousedown', function(e) {
                 e = e || event;
                 var d = document.createElement('div');
                 d.style.cssText = 'position:absolute;background:rgba(0,0,0,0.2);width:0px;height:0px;border:1px dashed #ccc;top:' + (e.pageY - this.offsetTop) + 'px;left:' + (e.pageX - this.offsetLeft) + 'px';
                 onmove = d;
                 onmove.x = e.pageX;
                 onmove.y = e.pageY;
                 this.appendChild(d);
                 document.on('mousemove', function(e) {
                     e = e || event;
                     //var a= Math.abs(e.pageX - onmove.x + 'px');
                     onmove.style.width = e.pageX - onmove.x + 'px';
                     onmove.style.height = e.pageY - onmove.y + 'px';
                     return false;
                 });
                 document.on('mouseup', function(e) {
                     document.onmousemove = null;
                     document.onmouseup = null;
                     eDrop(onmove);
                     onmove = null;
                 })
                 return false;
             });
        }
    }
}

//裁剪生成图片

function demofinish() {
    var gt = unescape('%3e');
    var popup = null;
    var over = "Launch Pop-up Navigator";
    popup = window.open('harvest.html','popupnav', "height=768,width=1366,top=200,left=200;toolbar=no,menubar=no,scrollbars=no,resizable=auto, location=no,status=no");
    if (popup != null) {
        if (popup.opener == null) {
            popup.opener = self; }
        popup.location.href = 'harvest.html';
    }
    var nx = 0;
    var ny = 0;
    for (var i = 0, t; t = cutList[i]; i++) {
        var x = t.offsetLeft,
            y = t.offsetTop,
            w = t.offsetWidth,
            h = t.offsetHeight;

        var data = ctx.getImageData(x, y, w, h);

        ctx2.putImageData(data, nx, ny);

        nx += w + 2;
    }
}