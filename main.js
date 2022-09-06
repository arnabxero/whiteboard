function downloadImage(data, filename = 'untitled.jpg') {
	var a = document.createElement('a');
	a.href = data;
	a.download = filename;
	a.target = '_blank';
	document.body.appendChild(a);
	a.click();
}

window.onload = function () {
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");
	var clearbtn = document.getElementById("clear");
	var savebtn = document.getElementById("down")



	// Fill Window Width and Height
	myCanvas.width = window.innerHeight - 100;
	myCanvas.height = window.innerHeight - 100;

	// Set Background Color
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);




	///////////////////////////
	clearbtn.addEventListener('click', function () {
		ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
	});
	savebtn.addEventListener('click', function () {
		var dataURL = myCanvas.toDataURL("image/jpeg")
		downloadImage(dataURL, 'loldown.jpg');
	});


	//////////////////////////////////////////////////
	// Mouse Event Handlers
	if (myCanvas) {
		var isDown = false;
		var canvasX, canvasY;
		ctx.lineWidth = 20;

		$(myCanvas)
			.mousedown(function (e) {
				isDown = true;
				ctx.beginPath();
				canvasX = e.pageX - myCanvas.offsetLeft;
				canvasY = e.pageY - myCanvas.offsetTop;
				ctx.moveTo(canvasX, canvasY);
			})
			.mousemove(function (e) {
				if (isDown !== false) {
					canvasX = e.pageX - myCanvas.offsetLeft;
					canvasY = e.pageY - myCanvas.offsetTop;
					ctx.lineTo(canvasX, canvasY);
					ctx.strokeStyle = "#000";
					ctx.stroke();
				}
			})
			.mouseup(function (e) {
				isDown = false;
				ctx.closePath();
			});
	}

	// Touch Events Handlers
	draw = {
		started: false,
		start: function (evt) {

			ctx.beginPath();
			ctx.moveTo(
				evt.touches[0].pageX,
				evt.touches[0].pageY
			);

			this.started = true;

		},
		move: function (evt) {

			if (this.started) {
				ctx.lineTo(
					evt.touches[0].pageX,
					evt.touches[0].pageY
				);

				ctx.strokeStyle = "#000";
				ctx.lineWidth = 5;
				ctx.stroke();
			}

		},
		end: function (evt) {
			this.started = false;
		}
	};

	// Touch Events
	myCanvas.addEventListener('touchstart', draw.start, false);
	myCanvas.addEventListener('touchend', draw.end, false);
	myCanvas.addEventListener('touchmove', draw.move, false);

	// Disable Page Move
	document.body.addEventListener('touchmove', function (evt) {
		evt.preventDefault();
	}, false);
};