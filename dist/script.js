var fgimg=null, bgimg=null;
//Start with the foreground image Upload (fgimg)
function fUpload(){
  var canvas = document.getElementById("can1");
  var textinput = document.getElementById("finput");
  fgimg = new SimpleImage(textinput);
  fgimg.drawTo(canvas);
}
//Upload background image (bgimg)
function bUpload(){
  var canvas = document.getElementById("can2");
  var textinput = document.getElementById("binput");
  bgimg = new SimpleImage(textinput);
  bgimg.drawTo(canvas);
}

//Function for combine both fgimg and bgimg
function Greenscr(){
  //Check if both images are uploaded successfully
  if(fgimg==null || !fgimg.complete()){
    alert("Please select Foreground Image")
  }
  if(bgimg==null || !bgimg.complete()){
    alert("Please select Background Image")
  }
  else{
    //Set the size of bgimg same as fgimg
    if(fgimg.getWidth() > bgimg.getWidth() || fgimg.getHeight() > bgimg.getHeight()){
    var fgWidth = fgimg.getWidth();
    var fgHeight = fgimg.getHeight();
    bgimg.setSize(fgWidth+1,fgHeight+1);
    }
    //Create blank image (output) with Same Size of fgimg using SimpleImage API in dukelearntoprogram package 
    var output = new SimpleImage(fgimg.getWidth(),fgimg.getHeight());
    //For each pixel (pixel) in fgimg 
    for (var pixel of fgimg.values()){
      //Look at pixel and if it is green,
     if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()){
//Look at same position in bgimg
    var x = pixel.getX();
    var y = pixel.getY();
  var bgpix = bgimg.getPixel(x,y);
//and set output's corresponding pixel to bgImage's pixel
  output.setPixel(x,y,bgpix);
  }
else{
  //Otherwise: set output's corresponding pixel to currentPixel
  output.setPixel(pixel.getX(),pixel.getY(),pixel);
}
    
  }
  // Call the function Clearscr to clear the canvas and draw output image
  Clearscr();
  var canvas1 = document.getElementById("can1");
   output.drawTo(canvas1);
  }
}
//Craete Clearscr Function to clear canvas
 function Clearscr(){
   var canvas1 = document.getElementById("can1");
//Get 2d context of canvas to drawing shapes, text, images, and other objects.
  var ctx1 = can1.getContext("2d");  
  var canvas2 = document.getElementById("can2");
   var ctx2 = can2.getContext("2d")
//Use clearRect(x position, y position, width,height) function to clear the Images on both  canvas
   ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
   //set both Image variable and both file tag value to null 
   fgimg=null;
   bgimg=null;
   var fginput = document.getElementById("finput");
   var bginput = document.getElementById("binput");
   fginput.value=null;
   bginput.value=null;
 }