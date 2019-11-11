
    /***************************************************************************
      @version Viewer.js v1.3.5
      @author Valentine Tawira
      @description PantheraImageViewer Script for handling the processing of the
                  file data and rendering of the viewer panel
      Copyright (C) 2019 | Panthera Corporation
     ***************************************************************************/


    console.log("IN IMGINDENTIFICATION.JS");
    var imageArray = [];
    var highlighted_images = [];
    var resultsArray;
    var startIndex, endIndex;
    //var batnum  = 0 ; // default batch Number
    //var imgNumb = 0; // default image size


     /* Function to read Server Data from Server-Side
     * @parameter msg A message from Shiny indication the csv file
     *
     */
    function fetchServerData(msg) {  // datapath , batchNumber , loadSize
      var csvfile = "" + msg + "";
      console.log("readServerData : " +  csvfile);
      getData( csvfile, processXHTTPResponse);
    }

    function getData(url, cFunction) {
      console.log("In getData() imgIdentification");
      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          //console.log("readyState 4 and status 200 : " + this);
          cFunction(this);
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    }

    function processXHTTPResponse(xhttp) {
      //console.log("processXHTTPResponse()");
      //imgIdentification
      imageArray = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
      imageArray.splice(0, 1);
      imageArray[0] = imageArray[0].replace("Source", "");
      imageArray[0] = imageArray[imageArray.length - 1] + imageArray[0];
      imageArray.splice(imageArray.length - 1, 1);
      console.log("Number of Images : " + imageArray.length );
      displayImages(20,0);
    
    }

   
   

    /**
    * Handles all image panel click events
    * @parameter - event click/shiftKey
    *
    * Checks if event is shiftKey/click
    * Execute appropriate instructions based on event
    * @return void
    */
    function observeClick(event) {

      console.log("In observeClick imgIdentification");
      objectOf("imgIdentification");
        vjsCall();
    }

    /**
     * @function displayImages(a,b)
     * @description determines the images to be rendered
     * @parameter - number of images of render
     *           - batch number of the image lot
     * @returns void
     *
    */
    function displayImages(imgnumb,bat) {
      console.log("In displayImages() imgIdentification");
        removeImages();
        startIndex = bat * imgnumb;
        endIndex = startIndex + imgnumb;
        resultsArray = imageArray.slice(startIndex, endIndex);
        dispImages(resultsArray);
    }

    /************************************************************************/

    /************************************************************************/

    /**
     * @description - creates html component to display the images
     * @param {String} imageArray - an array of images
     * @returns {void} var src = ( ( imageArray[0].trim()).replace(/['"]+/g, ''));
    someText = src.replace(/(\r\n|\n|\r)/gm,"");

     */
    function pasteImages(imageArray) {

      console.log("In pasteImages imgIdentification");
      for (i = 0; i < imageArray.length; i++) {
        var liId = i;
        var imageObject = new Image();
        var ul = document.getElementById('spcs_idntfctn_id_rf_1');
        //imageObject.onload = function() {
       imageObject.src = ((imageArray[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
        console.log("img.src " +imageObject.src);
        // Triming the double quotes passed on each image src
       imageObject.alt = "Camera Trap";
       imageObject.datamarked = 0;
        ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' +
       imageObject.src + '"  marked="' +imageObject.datamarked + '" src="' +
       imageObject.src + '" alt="' +imageObject.alt + '" /> </li>';
        // inserting an list of images uinside the ul tag
      }
    }

    /**
     * @description clears inner html components identified by elementId 'x'
     *
     */
    function removeImages() {
      console.log("In removeImages() imgIdentification");
      $("#x").html("");
    }

    /**
     *
     * @param {String} arry
     */
    function dispImages(arry) {
      console.log("IN dispImages() imgIdentification");
      pasteImages(arry);
    }

    /**
     * @description - indirect call to the createViewerComponent() function
     * @returns image view
     */
    function vjsCall() {
      console.log("In vjsCall() imgIdentification");
      //confirm.log("In observeClick imgIdentification");
      createViewerComponent();
      return;
    }

    /**
     * @function createViewerComponent()
     * @description Function that creates the viewer component to view images
     * @returns viewer component
     */
    function createViewerComponent() {
      console.log("In ViewerJS() imgIdentification ");
      var viewer = new Viewer(document.getElementById('spcs_idntfctn-galley'), {
        url: 'data-original',
        title: function (image) {
          return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
        },
      });
    }



    /**
     * @function SelectedImages()
     * @returns an array with the currently selected images
    */
    function SelectedImages()
    {
      return highlighted_images;
    }

    