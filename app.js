//canvas는 HTML의 한 요소이며, context를 가진다.
//context는 요소 안에서 픽셀에 접근할 수 있는 방법이며, 이론적으로는 태그안에 있는 픽셀들에 접근하는 것을 의미한다. (canvas안에서 픽셀을 다루는 것)

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;

  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  }else{
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event){
  //console.log(event.target.style); //컬러 클릭 시 Array를 가지게 된다.
  const color = event.target.style.backgroundColor; //클릭 하는 색의 RGB 값을 가지고 온다.
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handelRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  }else{
    filling = true;
    mode.innerText = "Paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanvasClick(){
  if(filling){ //fasle
  ctx.fillRect(0, 0, canvas.width, canvas.height) //x, y, width, height
  }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

//console.log(Array.from(colors)); //Arraylist 확인
//forEach로 color를 돌려 서 이벤트를 호출하고 color 색을 변경한다.
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input", handelRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}

/*
- 이미지 저장
1. canvas의 data를 image 처럼 얻는다. (canvas todataURL: 지정된 포맷의 이미지 표현을 포함한 data URI를 반환함)
2. 
*/
