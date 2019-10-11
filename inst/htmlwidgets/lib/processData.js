/**
 *  JS Script handling the processing of the file data and rendering of the viewer panel
 *
 *  Viewer.js v1.3.5
 */


/**
 * code included inside $(document).ready() will only run once the page is ready for JavaScript code to execute
*/
$(document).ready(function () {

  //alert("Factor : " + factor);
  //readSeverData("csv",1,350);
  readSeverData();
  $("#goButton").on("click", function () {
    // send message to Shiny
    Shiny.onInputChange("sources", sendDataToShinny());
  });

  $("#apply").on("click", function () {
    // send message to Shiny
    Shiny.onInputChange("sources", sendDataToShinny());
  });

  $("#selectAll").on("click", function () {
    selectAll();
  });

  //goButton

  $("#deSelectAll").on("click", function () {
    deSelectAll();
  });

  $("#next").on("click", function () {
    next();
  });

  $("#tester").on("click", function () {
    tester();
  });

});

/**
 *
*/
var ar = [];
var resetSel = [];
var selected_images = [];
var tempRemoved ;
var numb = 0;
var result;
var factor = 45;
var start, end;
var path;

var batnum = 0;
var imgNumb = 9;
 // array to store selected images
//var viewer;

/******************************************************************************************* */
  /*Shiny.addCustomMessageHandler("testmessage",
                                  function(message) {
                                    factor = parseInt(JSON.stringify(message));
                                    alert("Factor in Custom : " + factor);
                                    alert(JSON.stringify(message));
                                    initial(parseInt(JSON.stringify(message)));

                                  }
  );*/
/**********************************************************************************************/

  /* Function to read Server Data from Server-Side */
  function readSeverData() {  // datapath , batchNumber , loadSize

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

  //var batnum , fact;

  ar = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
  ar.splice(0, 1);
  ar[0] = ar[0].replace("Source", "");
  ar[0] = ar[ar.length - 1] + ar[0];
  ar.splice(ar.length - 1, 1);
  //var imgNumb = 30;


  Shiny.addCustomMessageHandler("testmessage",
    function(message) {
      imgNumb =  parseInt(JSON.stringify(message));
    }
  );

  Shiny.addCustomMessageHandler("testmsg",
    function(message) {
      batnum =  parseInt(JSON.stringify(message));
      initial(imgNumb,batnum);
    }
  );
}

/******************************************************************************************* */
 /**
  * Highlights a selected image
  * @parameter selected image id
  * Applies opacity 0.4
  * @return void
 */
  function highliter(elementID)
  {
    $('#' + elementID + '').css({
          'opacity': '0.4',
          'filter': 'alpha(opacity=40)'
        });
  }

  /**
  * Removes Highlights a unselected image
  * @parameter selected image id
  * Removes opacity - reverts to original opacity
  * @return void
 */
  function removeHighlight(elementID)
  {
    $('#' + elementID + '').css({
          'opacity': '',
          'filter': ''
        });
  }

  /**
  * Helper function for isKeyPressed()
  * @parameter - array of selected images - selected_images
  *            - target image src
  *            - target element id
  * Checks if target image has already been selected
  * @return void
 */
  function handleExistance(params,src,id)
  {
    if(params.includes(src))
    {
      //console.log("already marked");
      //console.log("Index of src : " + params.indexOf(src));
      //console.log("src : "  + src);
    tempRemoved =  (params.splice(params.indexOf(src),1))[0];
    console.log("Removed Element");
    //tempRemoved  = params.splice(params.indexOf(src),1);
    removeHighlight(id);
    }
    else{
      //console.log("Not marked");
      params.push(src);
      highliter(id);
    }
    console.log("Selected Images");
    console.log(params);
  }

  function removedRef()
  {

    return tempRemoved;
  }
  /**
  * Handles all image panel click events
  * @parameter - event click/shiftKey
  *
  * Checks if event is shiftKey/click
  * Execute appropriate instructions based on event
  * @return void
 */
  function isKeyPressed(event)
  {

    if(event.shiftKey)
    {

      console.log(selected_images.length);
      // console.log("shiftKey Pressed");
      console.log("Target src :" + event.target.src);
      handleExistance(selected_images,event.target.src,event.target.id);

    }
    else{
     console.log("Clicked");
      myFunction();

    }

    console.log("selected_images");
    console.log(selected_images);
  }


  function initial(imgnumb,bat) {
    // alert("Initail Factor : " + factor);
    clearImages();
    start = bat * imgnumb;
    end = start + imgnumb;
    result = ar.slice(start, end);
    //numb++;
    //clearImages();
    callImges(result);
    //checkParams();
  }

function tester()
{
  initial(9,0);
}
/*function initial(imgnumb) {
  // alert("Initail Factor : " + factor);
  clearImages();
  start = 1 * imgnumb;
  end = start + imgnumb;
  result = ar.slice(start, end);
  //numb++;
  //clearImages();
  callImges(result);
}*/

  /* Takes - Uses an Array ar[] */
  function next() {
      console.log("Clicked next()");
      batnum++;
      initial(imgNumb, batnum);
    //viewer.destroy();
   /* if (numb * factor <= ar.length) {
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
    //console.log("Next Out");*/

  }

/* Takes - Uses an Array ar[] */
  function prev() {
    //viewer.destroy();
    //console.log("Im in the Prev");
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
/***************************************************************************/

/*****************************************************************************/

  /* Takes - Uses an Array ar[] */
  function imgloop(ar) {
    for (i = 0; i < ar.length; i++) {
      var liId = i;
      var img = new Image();
      var ul = document.getElementById('x');
      // img.onload = function() {
      img.src = ((ar[i].trim()).replace(/['"]+/g, '')); // Triming the double quotes passed on each image src
      //console.log("Image Source : " + img.src);
      img.alt = "CameraTrap";
      img.datamarked = 0;
      ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' +
      img.src + '" alt="' + img.alt + '" /> </li>'; // inserting an list of images uinside the ul tag
  }
}

function clearImages() {
  $("#x").html("");
}

/* Takes - Uses an Array ar[] */
function callImges(arry) {
  imgloop(arry);
}


function myFunction() {
  //console.log("In myFunction");
  vjs();
  return;
}

//Function that creates the viewer component that
function vjs() {
  //console.log("In ViewerJS ");
  var viewer = new Viewer(document.getElementById('galley'), {
    url: 'data-original',
    title: function (image) {
      return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')'; // write image props here
    },
  });
 // console.log("Outside Viewer Object");
}




/*function isKeyPressed(event)
{

  //$('').addClass('highlight');
  //var imgsrc = $('#imgSrc').val(event.target.src);
  console.log("Checking : " + $('#imgSrc').val(event.target.src));

  if(event.shiftKey)
  {
    tid = event.target.id;
    console.log("Key Pressed");
    console.log("SRC : " + event.target.alt);
   // console.log("DO : " + event.target.marked);

     console.log("SRC included : " + selected_images.includes(event.target.src));

    if (selected_images.includes(event.target.src)) // Its already marked
    {
      $('#' + tid + '').css({
        'opacity': '',
        'filter': ''
       });
       selected_images.splice(selected_images.indexOf(imgsrc), 1);
    }else
    {
        console.log("SRC included : " + selected_images.includes(event.target.src));

        selected_images.push(event.target.src); // jquery - fetching the src of the image and pushing it to an array
        $('#' + tid + '').css({
          'opacity': '0.4',
          'filter': 'alpha(opacity=40)'
        });
        //resetSel.push(tid);


    }
    console.log("Current Selected Images");
    console.log(selected_images);


  }
  else{
    console.log("Key Not Pressed");
    console.log("Current Selected Images");
    console.log(selected_images);
     myFunction();
  }
}
*/
/* Function that checks for the fired event (click / shift click) */
/* Takes - Uses an Array selectedImages[] */
/*

function isKeyPressed(event) {

  var x = event.key;

  if (event.shiftKey) {
    console.log("SHIFT KEY IS PRESSED");

    tid = event.target.id;

    $('').addClass('highlight');
    var imgsrc = $('#imgSrc').val(event.target.src);
if (selected_images.includes(event.target.src)) {
  var temp = selected_images.splice(selected_images.indexOf(imgsrc), 1)[0];
  marked.push(temp);
  // console.log(temp);
  $('#' + tid + '').css({
    'opacity': '',
    'filter': ''
  });
  console.log(selected_images);

} else {

  selected_images.push(event.target.src); // jquery - fetching the src of the image and pushing it to an array
  $('#' + tid + '').css({
    'opacity': '0.4',
    'filter': 'alpha(opacity=40)'
  });
  resetSel.push(tid);
  //console.log(selected_images);
}
      } else {
        console.log("SHIFT KEY IS NOT PRESSED");
        myFunction();
      }
    } */

/*function getMarked()
{
  console.log("Marked Images : " + marked);
  return marked;

}*/

function getSelectedImages()
{
  return selected_images;
}
/**
 * Function to select all the images
 * Tested ----> (1/1)
 * @return selected_images
*/
  function selectAll() {
    deSelectAll();
    $("img").each(function (index) {
      $('#' + $(this).attr('id') + '').css({
        'opacity': '0.4',
        'filter': 'alpha(opacity=40)'
      });
      selected_images.push($(this).attr('src'));
      //console.log( index + " : " + "The SRC is : " + $( this ).attr('src'));
    });
    console.log(selected_images);
    return selected_images; // I might not want to return an array here ? Think about it clearly
  }


/**
 * Function to de-select all the images
 * Tested ----> (1/1)
*/
  function deSelectAll() {
    $("img").each(function (index) {
      $('#' + $(this).attr('id') + '').css({
        'opacity': '',
        'filter': ''
      });
      // selected_images.splice(selected_images.indexOf($( this ).attr('src')), 1);
    });
    selected_images.length = 0;
    console.log(selected_images);
    //return  selected_images;
  }


  function sendDataToShinny()
  {

    if (selected_images === undefined || selected_images.length === 0) {
      alert("No Images Selected");
      return ;
    }
    else{

      const copy_selected_images = [...selected_images];
      console.log("copy_selected_images");
      console.log(copy_selected_images);
      deSelectAll();
      return copy_selected_images;
    }

  }

/*Function to empty our selected images*/
  /* Takes - Uses an Array selected_images[]
  function resetSelected() {
    if (selected_images === undefined || selected_images.length == 0) {
      alert("No Images Selected");
    } else {
      for (var idIndex in resetSel) {
        $('#' + resetSel[idIndex] + '').css({
          'opacity': '',
          'filter': ''
        });
      }
      //alert("Applied " + resetSel.length + " Selected Images ");
      resetSel.length = 0;
      selected_images.length = 0;
    }
  }

  */
/*
function myJson(params) {
  //alert("In myJson");
  var myJSON = JSON.stringify(params);
  resetSelected();
  console.log("After Reseting ...", selected_images);
  // Shiny.setInputValue(id, myJSON);
  console.log(myJSON);
  //Shiny.onInputChange("count", myJSON);
  return myJSON;
}*/


/* Convert the Array of Serlected Images to a JSON object*/

  /* Takes - Uses an Array selected_images[]
  function toJSON() {
    console.log(selected_images);
    var myJSON = JSON.stringify(selected_images);
    const tempSelected = [...selected_images];
    resetSelected();
    return tempSelected;

    //myJson(selected_images);
  }
*/
/*Function to get the Details of Selected Images */


  /***********************************************************************************************************/
