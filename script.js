const canvasElement = document.querySelector('#draw');
	const ctx = canvasElement.getContext('2d');	// returns an object that provides methods and properties for drawing on the canvas.cd

	// set W*H of canvas acc to the window W*H
	canvasElement.width = window.innerWidth;
	canvasElement.height = window.innerHeight;

	// default color
	ctx.strokeStyle = '#BADA55';
	// set type of corner created, when two lines meet
	ctx.lineJoin = 'round';  // miter(pointed) // bevel(squared)
	// set the style of end cap for a line
	ctx.lineCap = 'round';	//butt //square
	ctx.lineWidth = 100;

	let isDrawing = false;
	let lastX = 0;
	let lastY = 0;
	let hue = 0;	// hsl(hue, saturation, light) color
	let direction = true;
	function draw(e){
		if(!isDrawing) return;	// stop fn when no mouse down

		ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`;

		ctx.beginPath();	//begin or reset current path
		// start from
		ctx.moveTo(lastX, lastY);
		// go to
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();	// draw it
		[lastX, lastY] = [e.offsetX, e.offsetY];

		hue++;
		if(hue >= 360) hue=0;

		if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction;
		direction === true ? ctx.lineWidth++ : ctx.lineWidth--;
	}
	// add listener to mouse events
	canvasElement.addEventListener('mousedown', (e) => {
		isDrawing = true;
		[lastX, lastY] = [e.offsetX, e.offsetY];
	});	
	canvasElement.addEventListener('mousemove', draw);		
	canvasElement.addEventListener('mouseup', () => isDrawing = false);
	canvasElement.addEventListener('mouseout', () => isDrawing = false);