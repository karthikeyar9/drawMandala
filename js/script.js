var canvas, context, w, h,
    prevX = 0, currX = 0, prevY = 0, currY = 0,
    draw = false;

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.onpointermove = handlePointerMove;
    canvas.onpointerdown = handlePointerDown;
    canvas.onpointerup = stopDrawing;
    canvas.onpointerout = stopDrawing;
    document.querySelector(".clear").onclick = clearCanvas;
}

function recordPointerLocation(e) {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
}

function handlePointerMove(e) {
    if (draw) {
        recordPointerLocation(e);
        drawLine();
    }
}

function handlePointerDown(e) {
    recordPointerLocation(e);
    draw = true;
}

function drawLine() {
    var a = prevX, a_ = a,
        b = prevY, b_ = h-b,
        c = currX, c_ = c,
        d = currY, d_ = h-d;
  
    context.strokeStyle = getColor();
    context.lineWidth = 4;
    context.lineCap = "round";
  
    context.beginPath();
  
    context.moveTo(a, b);
    context.lineTo(c, d);
  
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);
  
    a_ = w-a; b_ = b;
    c_ = w-c; d_ = d;
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);
  
    a_ = w-a; b_ = h-b;
    c_ = w-c; d_ = h-d;
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);
  
    a_ = w/2+h/2-b; b_ = w/2+h/2-a;
    c_ = w/2+h/2-d; d_ = w/2+h/2-c;
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);
  
    a_ = w/2+h/2-b; b_ = h/2-w/2+a;
    c_ = w/2+h/2-d; d_ = h/2-w/2+c;
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);
  
    a_ = w/2-h/2+b; b_ = w/2+h/2-a;
    c_ = w/2-h/2+d; d_ = w/2+h/2-c;
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);
  
    a_ = w/2-h/2+b; b_ = h/2-w/2+a;
    c_ = w/2-h/2+d; d_ = h/2-w/2+c;
    context.moveTo(a_, b_);
    context.lineTo(c_, d_);
  
    context.stroke();
    context.closePath();
}

function stopDrawing() {
    draw = false;
}

function clearCanvas() {
    if (confirm("Want to clear?")) {
        context.clearRect(0, 0, w, h);
    }
}

function getColor() {
    return document.querySelector(".color").value;
}