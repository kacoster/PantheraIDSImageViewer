var ar = [];
var resetSel = [];
var numb = 0;
var result;
var factor = 9;
var start, end;
var viewer;

/******************************************************************************************* */
/* Takes - Uses an Array ar[] */
$(function () {
    //var n = 0;
  readSeverData();
  $("#apply").on("click", function(){
    
    // increment the counter each time we click on the Rstudio logo
    n++;
   
    // send message to Shiny
    Shiny.onInputChange("count", n);
  });
});

/**********************************************************************************************/

/* Function to read Server Data from Server-Side */
function readSeverData() {

  loadDoc('S18_20160902_20160923_tbl.csv', myFunction1);
}

function loadDoc(url, cFunction) {

  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function myFunction1(xhttp) {

  ar = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
  ar.splice(0, 1);
  ar[0] = ar[0].replace("Source","");
  ar[0] = ar[ar.length-1] + ar[0];
  ar.splice(ar.length-1, 1);
  initial();
}

/******************************************************************************************* */

function initial() {
  start = numb * factor;
  end = start + factor;
  result = ar.slice(start, end);
  numb++;
  //clearImages();
  callImges(result);
}

/* Takes - Uses an Array ar[] */
function next() {
   //viewer.destroy();
  if (numb * factor <= ar.length) {
    //console.log("Batch Number " + numb);
    start = numb * factor;
    end = start + factor;
    result = ar.slice(start, end);
    numb++;
  } else {
    if (isNaN(ar * factor)) {
      result = ar.slice(numb * factor, ar.length);
    }
    // alert("In the next else " + ar*factor);
    result = ar.slice((numb - 1) * factor, ar.length);
  }
  clearImages();
  callImges(result);
  // document.getElementById("demo").innerHTML = result; 
  console.log("Next Out");
}

/* Takes - Uses an Array ar[] */
function prev() {
   //viewer.destroy();
  console.log("Im in the Prev");
  if (numb <= 1) {
    initial();
  } else(numb != 0 || numb < 0) 
  {
    //console.log("Batch Number " + numb);
    end = start;
    start = start - factor;
    numb--;
    result = ar.slice(start, end);
    clearImages();
    callImges(result);
  }
}

/* Takes - Uses an Array ar[] */
function imgloop(ar) {
  for (i = 0; i < ar.length; i++) {
    var liId = i;
    var img = new Image();
    var ul = document.getElementById('x');
    // img.onload = function() {
    img.src = ((ar[i].trim()).replace(/['"]+/g, '')); // Triming the double quotes passed on each image src
    console.log("Image Source : " + img.src);
    img.alt = "Historic";
    ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '" src="' + img.src + '" alt="' + img.alt + '" /> </li>'; // inserting an list of images uinside the ul tag 
  }
}

function clearImages() {
  $("#x").html("");
}

/* Takes - Uses an Array ar[] */
function callImges(arry) {
  imgloop(arry);
}

var obj = {
  selected: [{
    src: ""
  }]
};
var selected_images = []; // array to store selected images

function myFunction() {
  console.log("In myFunction");
  vjs();
  return;
}

//Function that creates the viewer component that 
function vjs() {
  console.log("In ViewerJS ");
   viewer = new Viewer(document.getElementById('galley'), {
    url: 'data-original',
    title: function (image) {
      return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')'; // write image props here
    },
  });
  console.log("Outside Viewer Object");
}

/* Function that checks for the fired event (click / shift click) */
/* Takes - Uses an Array selectedImages[] */
function isKeyPressed(event) {
  var x = event.key;
  if (event.shiftKey) {
    
    tid = event.target.id;

    $('').addClass('highlight');
    var imgsrc = $('#imgSrc').val(event.target.src);
    if (selected_images.includes(event.target.src)) {
      selected_images.splice(selected_images.indexOf(imgsrc), 1);
      $('#' + tid + '').css({
        'opacity': '',
        'filter': ''
      });
      console.log(selected_images);
    } else {
      // getID(event);
      console.log("The ID  :" + event.target.id);
      console.log("The ID  :" + tid);
      selected_images.push(event.target.src); // jquery - fetching the src of the image and pushing it to an array
      $('#' + tid + '').css({
        'opacity': '0.4',
        'filter': 'alpha(opacity=40)'
      });
      resetSel.push(tid);
      console.log(selected_images);
    }
     viewer.destroy();
  } else {
    console.log("SHIFT KEY IS NOT PRESSED");
    myFunction();
  }
}

/* Function to select all the images */
function selectAll() {
  $("img").each(function (index) {
    $('#' + $(this).attr('id') + '').css({
      'opacity': '0.4',
      'filter': 'alpha(opacity=40)'
    });
    selected_images.push($(this).attr('src'));
    //console.log( index + " : " + "The SRC is : " + $( this ).attr('src'));
  });
  //console.log(selected_images);
  return selected_images; // I might not want to return an array here ? Think about it clearly 
}


/* Function to de-select all the images */
function deSelectAll() {
  $("img").each(function (index) {
    $('#' + $(this).attr('id') + '').css({
      'opacity': '',
      'filter': ''
    });
    // selected_images.splice(selected_images.indexOf($( this ).attr('src')), 1);
  });
  //console.log(selected_images);
  //return  selected_images;
}

/*Function to empty our selected images*/
/* Takes - Uses an Array selected_images[] */
function resetSelected() {
  if (selected_images === undefined || selected_images.length  == 0) {
    alert("No Images Selected");
  } else {
    for (var idIndex in resetSel) {
      $('#' + resetSel[idIndex] + '').css({
        'opacity': '',
        'filter': ''
      });
    }
    
  resetSel.length = 0;
  selected_images.length = 0;
  }
}

function myJson(params) {
  alert("In myJson");
  var myJSON = JSON.stringify(params);
  resetSelected();
  console.log("After Reseting ...", selected_images);
   Shiny.setInputValue(id, myJSON);
  console.log(myJSON);
 Shiny.onInputChange("count", myJSON);
 return myJSON;
}
/* Convert the Array of Serlected Images to a JSON object*/

/* Takes - Uses an Array selected_images[] */
function toJSON() {
  console.log(selected_images);
  myJson(selected_images);
}

/*Function to get the Details of Selected Images */


/***********************************************************************************************************/
