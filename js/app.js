/**
 * app.js
 * main javascript file
 * @authors qv
 * @date    2015-02-27 15:44:20
 * @version 0.1
 */

var cutList = [];
var canvas = $('canvas')[0];
var ctx = canvas.getContext('2d');
var ctx2 = $('canvas')[1].getContext('2d');
! function() {
	//initialization;
	$('#userImage')[0].onchange = function() {

		var image = new Image();

		// FileReader
		var reader = new FileReader();
		reader.onload = (function(theImg) {
			return function(evt) {
				theImg.src = evt.target.result;
			};
		}(image));
		reader.readAsDataURL(this.files[0]);


		//iamge onload canvas initialization
		image.onload = function() {

			if (image.width != canvas.width) {
				canvas.parentElement.style.width = canvas.width = image.width;
			}
			if (image.height != canvas.height) {
				canvas.parentElement.style.height = canvas.height = image.height;
			}


            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);


			eDrop(canvas.parentElement.children[0]);
			eDrop(canvas.parentElement.children[1]);

			cutList.push(canvas.parentElement.children[0]);
			cutList.push(canvas.parentElement.children[1]);
			//A =[] B =[]  A+B A=A.concat(B)
		}

	}

}();

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