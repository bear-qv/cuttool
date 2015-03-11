/**
 * app.js
 * main javascript file
 * @authors qv
 * @date    2015-02-27 15:44:20
 * @version 0.1
 */

!function () {
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

function Init() {
    //initialization;
    var imgfile = $('#upload-image')[0];
    imgfile.onchange = function () {
        var image = new Image();
        var reader = new FileReader();

        reader.onload = (function (theImg) {
            return function (evt) {
                //文件读取器读取到了文件
                theImg.src = evt.target.result;
            }
        }(image));

        //开始读取文件
        reader.readAsDataURL(this.files[0]);
        image.onload = function () {
            //读取完文件后，这个图片加载完成
            var files = $('#workplace-upload')[0].children;
            var file = files[1];
            var wk = $('#workplace')[0];
            var h = wk.children[0];
            var canvas = wk.children[2];
            var depiction = $('#image-depiction')[0];
            var help = $('#help')[0];

            help.innerHTML = '尝试用鼠标在上面拖拖看。';
            depiction.innerHTML = file.files[0].name;

            wk.children.hide();


            canvas.style.display = 'block';
            canvas.width = this.width;
            canvas.height = this.height;
            wk.style.width = canvas.width + 'px';
            wk.style.height = canvas.height + 'px';

            //canvas load image
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this, 0, 0);


        }
    }

}

function demofinish() {
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