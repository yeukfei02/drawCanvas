<script lang="ts">
    import { onMount } from "svelte";
    import { addSquareCheckedStore, addCircleCheckedStore, addFlagCheckedStore } from '../store';
    import CheckBoxAndButtonView from './CheckBoxAndButtonView.svelte';

    let mousePos = '';
    let sliderValue = 5;

    let canvas;

    let colorPicker;
    let canvas2;
    let canvas2ImageData;

    let bgColocPicker;
    let canvas3;
    let canvas3ImageData;

    let lastMouse = {
        x: 0,
        y: 0
    };

    let mouse = {
        x: 0,
        y: 0
    };

    let dragging = false;

    let addSquareChecked = false;
    let addCircleChecked = false;
    let addFlagChecked = false;
    addSquareCheckedStore.subscribe((value) => {
        addSquareChecked = value;
    })
    addCircleCheckedStore.subscribe((value) => {
        addCircleChecked = value;
    })
    addFlagCheckedStore.subscribe((value) => {
        addFlagChecked = value;
    })

    let circle = {
        x: 90,
        y: 200,
        radius: 10,
        startPoint: 0,
        endPoint: 2 * Math.PI,
        fillStyle: 'rgba(204, 255, 0, 0.7)',
        strokeStyle: 'black'
    };

    onMount(async () => {
        drawThings();

        setCanvas2();
        setCanvas3();
    });

    const handleCanvasMouseMove = (e: any) => {
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;

        mouse.x = e.clientX - canvas.offsetLeft;
        mouse.y = e.clientY - canvas.offsetTop;

        if (dragging) {
            const context = canvas.getContext('2d');
            draw(context);
        }

        if (e.target) {
            e.target.setAttribute('style', 'cursor: crosshair');

            const mouseX = e.clientX - e.target.offsetLeft;
			const mouseY = e.clientY - e.target.offsetTop;
			mousePos = `x: ${mouseX} y: ${mouseY}`;
        }
    }

    const handleCanvasMouseDown = () => {
        dragging = true;
    }

    const handleCanvasMouseUp = () => {
        dragging = false;
    }

    const draw = (context: any) => {
        context.beginPath();
        context.moveTo(lastMouse.x, lastMouse.y);
        context.lineTo(mouse.x, mouse.y);
        context.lineWidth = sliderValue;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = colorPicker.style.backgroundColor ? colorPicker.style.backgroundColor : 'black';
        context.stroke();
    }

    const handleCanvasKeyDown = (e: any) => {
        const context = canvas.getContext('2d');

		context.beginPath();

		setCanvasCircle(context, circle);
        
        switch (e.keyCode) {
            case 87:
                console.log('up');

                context.beginPath();
                context.clearRect(0, 0, canvas.width, canvas.height);

                circle.y -= 10;
                console.log(circle.y);

                setCanvasCircle(context, circle);
                break;
            case 83:
                console.log('down');

                context.beginPath();
                context.clearRect(0, 0, canvas.width, canvas.height);

                circle.y += 10;
                console.log(circle.y);

                setCanvasCircle(context, circle);
                break;
            case 65:
                console.log('left');

                context.beginPath();
                context.clearRect(0, 0, canvas.width, canvas.height);

                circle.x -= 10;
                console.log(circle.x);

                setCanvasCircle(context, circle);
                break;
            case 68:
                console.log('right');

                context.beginPath();
                context.clearRect(0, 0, canvas.width, canvas.height);

                circle.x += 10;
                console.log(circle.x);

                setCanvasCircle(context, circle);
                break;
            default:
                
        }
    }

    const setCanvasCircle = (context: any, circle: any) => {
        context.arc(circle.x, circle.y, circle.radius, circle.startPoint, circle.endPoint);
		context.fillStyle = circle.fillStyle;
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = circle.strokeStyle;
		context.stroke();
        context.closePath();
    } 

    const handleCanvasDoubleClick = (e: any) => {
        const mouseX = e.clientX - canvas.offsetLeft;
        const mouseY = e.clientY - canvas.offsetTop;

        console.log('mouseX = ', mouseX);
        console.log('mouseY = ', mouseY);

        if (addSquareChecked) {
            drawRect(mouseX, mouseY, 20, 20, 'rgba(144, 238, 144, 0.5)', 'red');
        }

        if (addCircleChecked) {
            drawCircle(mouseX, mouseY, 10, 0, 2 * Math.PI, 'rgba(241, 119, 193, 0.7)', 'limegreen');
        }

        if (addFlagChecked) {
            const image = new Image();
            image.onload = () => {
                const context = canvas.getContext('2d');
                context.drawImage(image, mouseX, mouseY);
            };
            image.src = '/images/flagIcon.png';
        }
    }

    const handleSliderChange = (e: any) => {
        sliderValue = e.target.value;
    }

    const handleCanvas2MouseMove = (e: any) => {
        const rect = canvas2.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const context2 = canvas2.getContext('2d');
        canvas2ImageData = context2.getImageData(mouseX, mouseY, 1, 1).data;

        console.log('mouseX = ', mouseX);
        console.log('mouseY = ', mouseY);
        console.log('canvas2ImageData = ', canvas2ImageData);
    }

    const handleCanvas2Click = (e: any) => {
        const red = canvas2ImageData[0];
        const green = canvas2ImageData[1];
        const blue = canvas2ImageData[2]
        const alpha = canvas2ImageData[3];
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        colorPicker.setAttribute('style', `background-color: ${color}`);
    }

    const handleCanvas3MouseMove = (e: any) => {
        const rect = canvas3.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const context3 = canvas3.getContext('2d');
        canvas3ImageData = context3.getImageData(mouseX, mouseY, 1, 1).data;

        console.log('mouseX = ', mouseX);
        console.log('mouseY = ', mouseY);
        console.log('canvas3ImageData = ', canvas3ImageData);
    }

    const handleCanvas3Click = (e: any) => {
        const red = canvas3ImageData[0];
        const green = canvas3ImageData[1];
        const blue = canvas3ImageData[2];
        const alpha = canvas3ImageData[3];
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        canvas.setAttribute('style', `background-color: ${color}`);
        bgColocPicker.setAttribute('style', `background-color: ${color}`);
    }

    const setCanvas2 = () => {
        const context2 = canvas2.getContext('2d');

        const image2 = new Image();
        image2.onload = () => {
            canvas2.width = image2.width;
            canvas2.height = image2.height;
            context2.drawImage(image2, 0, 0, canvas2.width, canvas2.height);
        };
        image2.src = '/images/colorPicker.png';
    }

    const setCanvas3 = () => {
        const context3 = canvas3.getContext('2d');

		const image3 = new Image();
		image3.onload = () => {
			canvas3.width = image3.width;
			canvas3.height = image3.height;
			context3.drawImage(image3, 0, 0, canvas3.width, canvas3.height);
		};
		image3.src = '/images/colorPicker.png';
    }

    const drawThings = () => {
        drawText();
        drawLine();

        const x1 = Math.floor(Math.random() * 450);
        const x2 = Math.floor(Math.random() * 400);
        const y1 = Math.floor(Math.random() * 250);
        const y2 = Math.floor(Math.random() * 200);
        const x3 = Math.floor(Math.random() * 650);
        const y3 = Math.floor(Math.random() * 350);

        const width1 = Math.floor(Math.random() * 80) + 10;
        const width2 = Math.floor(Math.random() * 100) + 10;
        const height1 = Math.floor(Math.random() * 100) + 10;
        const height2 = Math.floor(Math.random() * 150) + 10;

        const redColor1 = Math.floor(Math.random() * 255);
        const redColor2 = Math.floor(Math.random() * 200);
        const redColor3 = Math.floor(Math.random() * 150);
        const greenColor1 = Math.floor(Math.random() * 255);
        const greenColor2 = Math.floor(Math.random() * 200);
        const greenColor3 = Math.floor(Math.random() * 150);
        const blueColor1 = Math.floor(Math.random() * 255);
        const blueColor2 = Math.floor(Math.random() * 200);
        const blueColor3 = Math.floor(Math.random() * 150);
        const opacity1 = Math.random() * (1.0 - 0.2) + 0.1;
        const opacity2 = Math.random() * (0.9 - 0.3) + 0.1;
        const opacity3 = Math.random() * (0.5 - 0.1) + 0.1;

        const randomColor1 = `rgba(${redColor1}, ${greenColor1}, ${blueColor1}, ${opacity1.toFixed(1)})`
        const randomColor2 = `rgba(${redColor2}, ${greenColor2}, ${blueColor2}, ${opacity2.toFixed(1)})`
        const randomColor3 = `rgba(${redColor3}, ${greenColor3}, ${blueColor3}, ${opacity3.toFixed(1)})`

        drawCircle(x1, y1, 15, 0, 2 * Math.PI, randomColor3, 'green');
        drawRect(x2, y2, width1, height1, randomColor1, 'red');
	    drawRect(x3, y3, width2, height2, randomColor2, 'blue');
    }

    const drawText = () => {
		const context = canvas.getContext('2d');

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
    }

    const drawLine = () => {
		const context = canvas.getContext('2d');

		context.beginPath();
		context.moveTo(10, 10);
		context.lineTo(150, 150);
		context.lineWidth = 5;
		context.strokeStyle = 'cyan';
		context.stroke();
		context.closePath();
    }

    const drawCircle = (x: number, y: number, radius: number, startPoint: number, endPoint: number, fillStyle: string, strokeStyle: string) => {
		const context = canvas.getContext('2d');

		context.beginPath();
		context.arc(x, y, radius, startPoint, endPoint);
		context.fillStyle = fillStyle;
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = strokeStyle;
		context.stroke();
		context.closePath();
    };
    
    const drawRect = (x: number, y: number, width: number, height: number, fillStyle: string, strokeStyle: string) => {
		const context = canvas.getContext('2d');

		context.beginPath();
		context.rect(x, y, width, height);
		context.fillStyle = fillStyle;
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = strokeStyle;
		context.stroke();
		context.closePath();
	};
</script>

<style>
	.drawCanvas {
        margin: 3em auto;
        text-align: center;
	}

	.drawCanvas .canvas2,
	.drawCanvas .canvas3 {
        cursor: crosshair;
	}

	.drawCanvas .canvas,
	.drawCanvas .canvas2,
	.drawCanvas .canvas3 {
        border: 0.1em black solid;
        max-width: 100%;
        height: auto;
	}

	.drawCanvas .slider {
        width: 15em;
        margin: 0.5em auto;
	}

	.drawCanvas .colorPicker {
        width: 1em;
        height: 1em;
        padding: 1em;
        margin: 0.5em auto;
        border: 0.1em black solid;
        background-color: black;
	}

	.drawCanvas .bgColorPicker {
        width: 1em;
        height: 1em;
        padding: 1em;
        margin: 0.5em auto;
        border: 0.1em black solid;
        background-color: white;
	}
</style>

<svelte:window on:keydown={handleCanvasKeyDown} />

<div>
    <div class="drawCanvas">
        <canvas 
            class="canvas" 
            width="800" 
            height="450"
            bind:this={canvas} 
            on:mousemove={handleCanvasMouseMove} 
            on:mousedown={handleCanvasMouseDown} 
            on:mouseup={handleCanvasMouseUp}
            on:dblclick={handleCanvasDoubleClick}>
        </canvas>

        <div class="my-2"><b>{mousePos}</b></div>
        
        <div class="my-3">Press WASD to move circle. Hold mouse to draw. Double click to add item.</div>

        <input type="range" class="form-range slider my-2" on:change={handleSliderChange}>

        <div class="my-2">
            <div>Choose pencil color:</div>
            <div class="colorPicker my-3" bind:this={colorPicker}></div>
            <canvas class="canvas2" bind:this={canvas2} on:mousemove={handleCanvas2MouseMove} on:click={handleCanvas2Click}></canvas>
        </div>

        <div class="my-2">
            <div>Choose background color:</div>
            <div class="bgColorPicker my-3" bind:this={bgColocPicker}></div>
            <canvas class="canvas3" bind:this={canvas3} on:mousemove={handleCanvas3MouseMove} on:click={handleCanvas3Click}></canvas>
        </div>

        <CheckBoxAndButtonView 
            addSquareChecked={addSquareChecked} 
            addCircleChecked={addCircleChecked} 
            addFlagChecked={addFlagChecked}
            canvas={canvas}
        />
    </div>
</div>