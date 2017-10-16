'use strict';


$(document).ready(function () {

	// canvas
	function Canvas () {

	}

	Canvas.prototype.changeCursor = function() {
		$('#canvas').mousemove(function () {
			$(this).css('cursor', 'crosshair');
		});
	};

	Canvas.prototype.getMouse = function() {
		$('#canvas').mousemove(function (e) {
			var canvas = document.querySelector('#canvas');
			var mouseX = e.clientX - canvas.offsetLeft;
			var mouseY = e.clientY - canvas.offsetTop;
			$('#mousePos').html(mouseX + ' ' + mouseY);
		});
	};


	// slider
	function Slider(value) {
		this.value = value;
	}


	Slider.prototype.changeSlider = function() {
		$('#slider').slider({
			min: 1,
			max: 20,
			value: this.value,
			change: function(event, ui) { 
		       this.value = ui.value;
		       console.log(this.value);
		    }
		    
		});

	};


	// colorPicker
	function ColorPicker() {
		
	}

	ColorPicker.prototype.selectPencilColor = function() {
		$('#colorPicker').click(function () {
			$('#canvas2').toggle();
		});


		var canvas2 = document.querySelector('#canvas2');
		var context2 = canvas2.getContext('2d');

		var image2 = new Image();

		image2.onload = function () {
			canvas2.width = image2.width;
			canvas2.height = image2.height;
			context2.drawImage(image2, 0, 0, canvas2.width, canvas2.height);
		};

		image2.src = '../public/images/colorPicker.png';

		$('#canvas2').mousedown(function () {
			$(this).hide();
		}).mousemove(function (e) {
			var rect = canvas2.getBoundingClientRect();
			var mouseX = parseInt(e.clientX - rect.left);
			var mouseY = parseInt(e.clientY - rect.top);
        	var imageData = context2.getImageData(mouseX, mouseY, 1, 1).data;

        	console.log(mouseX + ' ' + mouseY);
        	console.log(imageData);

        	var red = imageData[0];
        	var green = imageData[1];
        	var blue = imageData[2];
        	var alpha = imageData[3];
        	var color = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
        	$('#colorPicker').css('background-color', color);
		});

	};

	ColorPicker.prototype.selectBackgroundColor = function() {
		$('#bgColorPicker').click(function () {
			$('#canvas3').toggle();
		});


		var canvas3 = document.querySelector('#canvas3');
		var context3 = canvas3.getContext('2d');

		var image3 = new Image();

		image3.onload = function () {
			canvas3.width = image3.width;
			canvas3.height = image3.height;
			context3.drawImage(image3, 0, 0, canvas3.width, canvas3.height);
		};

		image3.src = '../public/images/colorPicker.png';

		$('#canvas3').mousedown(function () {
			$(this).hide();
		}).mousemove(function (e) {
			var rect = canvas3.getBoundingClientRect();
			var mouseX = parseInt(e.clientX - rect.left);
			var mouseY = parseInt(e.clientY - rect.top);
        	var imageData = context3.getImageData(mouseX, mouseY, 1, 1).data;

        	console.log(mouseX + ' ' + mouseY);
        	console.log(imageData);

        	var red = imageData[0];
        	var green = imageData[1];
        	var blue = imageData[2];
        	var alpha = imageData[3];
        	var color = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
        	$('#bgColorPicker, #canvas').css('background-color', color);
		});

	};


	// shape
	function Shape() {
		
	}

	Shape.prototype.drawText = function() {
		var canvas = document.querySelector('#canvas');
		var context = canvas.getContext('2d');

		context.beginPath();
		context.fillStyle = 'blue';
		context.font = '2em arial';
		context.fillText('Hello world!', 150, 60);
		context.closePath();

		context.beginPath();
		context.strokeStyle = 'green';
		context.font = '3em arial';
		context.strokeText('Draw something', 180, 150);
		context.stroke();
		context.closePath();
	};

	Shape.prototype.drawLine = function() {
		var canvas = document.querySelector('#canvas');
		var context = canvas.getContext('2d');

		context.beginPath();
		context.moveTo(10, 10);
		context.lineTo(150, 150);
		context.lineWidth = 5;
		context.strokeStyle = 'cyan';
		context.stroke();
		context.closePath();
	};

	Shape.prototype.drawCircle = function(x, y, radius, startPoint, endPoint, fillStyle, strokeStyle) {
		var canvas = document.querySelector('#canvas');
		var context = canvas.getContext('2d');

        context.beginPath();
        context.arc(x, y, radius, startPoint, endPoint);
        context.fillStyle = fillStyle;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = strokeStyle;
        context.stroke();
        context.closePath();
	};

	Shape.prototype.drawRect = function(x, y, width, height, fillStyle, strokeStyle) {
		var canvas = document.querySelector('#canvas');
		var context = canvas.getContext('2d');

        context.beginPath();
        context.rect(x, y, width, height);
        context.fillStyle = fillStyle;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = strokeStyle;
        context.stroke();
        context.closePath();

	};


	// keyboardEvent
	function KeyboardEvent() {
		var canvas = document.querySelector('#canvas');
		var context = canvas.getContext('2d');

        context.beginPath();

        var circle = {
        	x: 90,
        	y: 200,
        	radius: 10,
        	startPoint: 0,
        	endPoint: 2 * Math.PI,
        	fillStyle: 'rgba(204, 255, 0, 0.7)',
        	strokeStyle: 'black'
        };

        context.arc(circle.x, circle.y, circle.radius, circle.startPoint, circle.endPoint);
        context.fillStyle = circle.fillStyle;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = circle.strokeStyle;
        context.stroke();
        context.closePath();

		$('body').keydown(function (e) {
			switch (e.keyCode) {
				case 87:
					console.log('up');

					context.beginPath();
					context.clearRect(0, 0, 500, 300);

					circle.y -= 5;
					console.log(circle.y);

					context.arc(circle.x, circle.y, circle.radius, circle.startPoint, circle.endPoint);
			        context.fillStyle = circle.fillStyle;
			        context.fill();
			        context.lineWidth = 1;
			        context.strokeStyle = circle.strokeStyle;
			        context.stroke();
					context.closePath();
					break;
				case 83:
					console.log('down');

					context.beginPath();
					context.clearRect(0, 0, 500, 300);

					circle.y += 5;
					console.log(circle.y);
					
					context.arc(circle.x, circle.y, circle.radius, circle.startPoint, circle.endPoint);
			        context.fillStyle = circle.fillStyle;
			        context.fill();
			        context.lineWidth = 1;
			        context.strokeStyle = circle.strokeStyle;
			        context.stroke();
					context.closePath();
					break;
				case 65:
					console.log('left');

					context.beginPath();
					context.clearRect(0, 0, 500, 300);

					circle.x -= 5;
					console.log(circle.x);
					
					context.arc(circle.x, circle.y, circle.radius, circle.startPoint, circle.endPoint);
			        context.fillStyle = circle.fillStyle;
			        context.fill();
			        context.lineWidth = 1;
			        context.strokeStyle = circle.strokeStyle;
			        context.stroke();
					context.closePath();
					break;
				case 68:
					console.log('right');

					context.beginPath();
					context.clearRect(0, 0, 500, 300);

					circle.x += 5;
					console.log(circle.x);
					
					context.arc(circle.x, circle.y, circle.radius, circle.startPoint, circle.endPoint);
			        context.fillStyle = circle.fillStyle;
			        context.fill();
			        context.lineWidth = 1;
			        context.strokeStyle = circle.strokeStyle;
			        context.stroke();
					context.closePath();
					break;
				default:
					return false;
			}
		});
	}


	// mouseEvent
	function MouseEvent() {
		
		var canvas = document.querySelector('#canvas');
		var context = canvas.getContext('2d');

        var lastMouse = {
    		x: 0,
    		y: 0
    	};

    	var mouse = {
    		x: 0,
    		y: 0
    	};

        var dragging = false;

        function draw() {

			context.beginPath();
			context.moveTo(lastMouse.x, lastMouse.y);
			context.lineTo(mouse.x, mouse.y);
			context.lineWidth = $('#slider').slider('value');
			context.lineCap = 'round';
			context.lineJoin = 'round';
			context.strokeStyle = $('#colorPicker').css('background-color');
			context.stroke();

        }

        
		$('#canvas').mousedown(function () {
			dragging = true;
		});

		
		$('#canvas').mousemove(function (e) {
			lastMouse.x = mouse.x;
			lastMouse.y = mouse.y;
			
			mouse.x = e.clientX - canvas.offsetLeft;
			mouse.y = e.clientY - canvas.offsetTop;

			if (dragging) {
				draw();
			}

		});
		

		$('#canvas').mouseup(function () {
			dragging = false;
		});
		
	}

	MouseEvent.prototype.addSquare = function () {
		$('#square').click(function () {
			if ($(this).is(':checked')) {
				$(this).attr('checked', 'checked');
				$('#circle, #flag').attr('disabled', true);

				console.log('square checked');

				if ($(this).attr('checked', true)) {
					$('#canvas').dblclick(function (e) {
						var canvas = document.querySelector('#canvas');
						var mouseX = e.clientX - canvas.offsetLeft;
						var mouseY = e.clientY - canvas.offsetTop;

						console.log(mouseX + ' ' + mouseY);

						var shape = new Shape();
						shape.drawRect(mouseX, mouseY, 20, 20, 'rgba(144, 238, 144, 0.5)', 'red');
						

					});
				}

			} else {
				console.log('square canceled');
				$('#square').removeAttr('checked');
				$('#circle, #flag').removeAttr('disabled');
				$('#canvas').unbind('dblclick');
			}
		});
	};


	MouseEvent.prototype.addCircle = function() {
		$('#circle').click(function () {
			if ($(this).is(':checked')) {
				$(this).attr('checked', 'checked');
				$('#square, #flag').attr('disabled', true);

				console.log('circle checked');

				if ($(this).attr('checked', true)) {
					$('#canvas').dblclick(function (e) {
						var canvas = document.querySelector('#canvas');
						var mouseX = e.clientX - canvas.offsetLeft;
						var mouseY = e.clientY - canvas.offsetTop;

						console.log(mouseX + ' ' + mouseY);

						var shape = new Shape();
						shape.drawCircle(mouseX, mouseY, 10, 0, 2 * Math.PI, 'rgba(241, 119, 193, 0.7)', 'limegreen');
						

					});
				}

			} else {
				console.log('circle canceled');
				$('#circle').removeAttr('checked');
				$('#square, #flag').removeAttr('disabled');
				$('#canvas').unbind('dblclick');
			}
		});
	};


	MouseEvent.prototype.addFlag = function() {
		$('#flag').click(function () {
			if ($(this).is(':checked')) {
				$(this).attr('checked', 'checked');
				$('#square, #circle').attr('disabled', true);

				console.log('flag checked');

				if ($(this).attr('checked', true)) {
					$('#canvas').dblclick(function (e) {
						var canvas = document.querySelector('#canvas');
						var context = canvas.getContext('2d');

						var mouseX = e.clientX - canvas.offsetLeft;
						var mouseY = e.clientY - canvas.offsetTop;

						console.log(mouseX + ' ' + mouseY);



						var image = new Image();

					    image.onload = function() {
					        context.drawImage(image, mouseX, mouseY);
					    };

					    image.src = '../public/images/flagIcon.png';
						

					});
				}

			} else {
				console.log('flag canceled');
				$('#flag').removeAttr('checked');
				$('#square, #circle').removeAttr('disabled');
				$('#canvas').unbind('dblclick');
			}
		});
	};


	// buttonEvent
	function ButtonEvent() {

	}

	ButtonEvent.prototype.clearButton = function() {
		$('#clear').click(function () {
			var canvas = document.querySelector('#canvas');
			var context = canvas.getContext('2d');

	        context.beginPath();
	       	context.clearRect(0, 0, 500, 300);
	        context.closePath();

	        $('#square, #circle, #flag').removeAttr('checked disabled');
	        $('#canvas').css('background-color', 'white');
	        $('#canvas').unbind('dblclick');
	        
		});
	};
	


	// start to initial drawboard ------------------------------------------
	var canvas = new Canvas();
	canvas.changeCursor();
	canvas.getMouse();

	var slider = new Slider(5);
	slider.changeSlider();

	var colorPicker = new ColorPicker();
	colorPicker.selectPencilColor();
	colorPicker.selectBackgroundColor();


	var shape = new Shape();
	shape.drawText();
	shape.drawLine();
	shape.drawCircle(400, 250, 15, 0, 2 * Math.PI, 'rgba(255, 102, 102, 0.5)', 'black');


	var x1 = Math.floor(Math.random() * 450);
	var x2 = Math.floor(Math.random() * 400);
	var y1 = Math.floor(Math.random() * 250);
	var y2 = Math.floor(Math.random() * 200);

	var width1 = Math.floor(Math.random() * 80) + 10;
	var width2 = Math.floor(Math.random() * 100) + 10;
	var height1 = Math.floor(Math.random() * 100) + 10;
	var height2 = Math.floor(Math.random() * 150) + 10;

	var redColor1 = Math.floor(Math.random() * 255);
	var redColor2 = Math.floor(Math.random() * 200);
	var greenColor1 = Math.floor(Math.random() * 255);
	var greenColor2 = Math.floor(Math.random() * 200);
	var blueColor1 = Math.floor(Math.random() * 255);
	var blueColor2 =  Math.floor(Math.random() * 200);
	var opacity1 = Math.random() * (1.0 - 0.2) + 0.1;
	var opacity2 = Math.random() * (0.9 - 0.3) + 0.1;

	var randomColor1 = 'rgba(' + redColor1 + ', ' + greenColor1 + ', ' + blueColor1 + ', ' + opacity1.toFixed(1) + ')';
	var randomColor2 = 'rgba(' + redColor2 + ', ' + greenColor2 + ', ' + blueColor2 + ', ' + opacity2.toFixed(1) + ')';

	shape.drawRect(x1, y1, width1, height1, randomColor1, 'red');
	shape.drawRect(x2, y2, width2, height2, randomColor2, 'blue');
	


	var keyboardEvent = new KeyboardEvent();


	var mouseEvent = new MouseEvent();
	mouseEvent.addSquare();
	mouseEvent.addCircle();
	mouseEvent.addFlag();

	var buttonEvent = new ButtonEvent();
	buttonEvent.clearButton();

	// end to initial drawboard ------------------------------------------

});

