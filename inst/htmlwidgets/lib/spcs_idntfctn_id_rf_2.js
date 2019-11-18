
    /***************************************************************************
      @version Viewer.js v1.3.5
      @author Valentine Tawira
      @description PantheraImageViewer Script for handling the processing of the
                  file data and rendering of the viewer panel
      Copyright (C) 2019 | Panthera Corporation
     ***************************************************************************/


    console.log("IN IMGINDENTIFICATION.JS");
    var imageArray_rf2 = [];
    var highlighted_images_rf2 = [];
    var resultsArray_rf2;
    var startIndex, endIndex;
    //var batnum  = 0 ; // default batch Number
    //var imgNumb = 0; // default image size


     /* Function to read Server Data from Server-Side
     * @parameter msg A message from Shiny indication the csv file
     *
     */
    function fetchServerData_rf2(msg) {  // datapath , batchNumber , loadSize
      var csvfile = "" + msg + "";
      console.log("readServerData : " +  csvfile);
      getData_rf2( csvfile, processXHTTPResponse_rf2);
    }

    function getData_rf2(url, cFunction) {
      console.log("In getData_rf2() imgIdentification");
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

    function processXHTTPResponse_rf2(xhttp) {
      //console.log("processXHTTPResponse_rf2()");
      //imgIdentification
      imageArray_rf2 = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
      imageArray_rf2.splice(0, 1);
      imageArray_rf2[0] = imageArray_rf2[0].replace("Source", "");
      imageArray_rf2[0] = imageArray_rf2[imageArray_rf2.length - 1] + imageArray_rf2[0];
      imageArray_rf2.splice(imageArray_rf2.length - 1, 1);
      console.log("Number of Images : " + imageArray_rf2.length );
      displayImages_rf2(20,0);

    }

    /**
    * Handles all image panel click events
    * @parameter - event click/shiftKey
    *
    * Checks if event is shiftKey/click
    * Execute appropriate instructions based on event
    * @return void
    */
    function observeClick_rf2(event) {

      console.log("In observeClick_rf2 imgIdentification");
      objectOf("imgIdentification_rf2");
        vjsCall_rf2();
    }

    /**
     * @function displayImages_rf2(a,b)
     * @description determines the images to be rendered
     * @parameter - number of images of render
     *           - batch number of the image lot
     * @returns void
     *
    */
    function displayImages_rf2(imgnumb,bat) {
      console.log("In displayImages_rf2() imgIdentification");
        removeImages_rf2();
        startIndex = bat * imgnumb;
        endIndex = startIndex + imgnumb;
        resultsArray_rf2 = imageArray_rf2.slice(startIndex, endIndex);
        dispImages_rf2(resultsArray_rf2);
    }

    /************************************************************************/

    /************************************************************************/

    /**
     * @description - creates html component to display the images
     * @param {String} imageArray_rf2 - an array of images
     * @returns {void} var src = ( ( imageArray_rf2[0].trim()).replace(/['"]+/g, ''));
    someText = src.replace(/(\r\n|\n|\r)/gm,"");

     */
    function pasteImages_rf2(imageArray_rf2) {

      console.log("In pasteImages_rf2 imgIdentification");
      for (i = 0; i < imageArray_rf2.length; i++) {
        var liId = i;
        var imageObject = new Image();
        var ul = document.getElementById('spcs_idntfctn_id_rf_2');
        //imageObject.onload = function() {
       imageObject.src = ((imageArray_rf2[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
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
     * @description clears inner html components identified by elementId 'spcs_idntfctn_id_rf_2'
     *
     */
    function removeImages_rf2() {
      console.log("In removeImages_rf2() imgIdentification");
      //$("#x").html("");
      $("#spcs_idntfctn_id_rf_2").html("");
    }

    /**
     *
     * @param {String} arry
     */
    function dispImages_rf2(arry) {
      console.log("IN dispImages_rf2() imgIdentification");
      pasteImages_rf2(arry);
    }

    /**
     * @description - indirect call to the createViewerComponent_rf2() function
     * @returns image view
     */
    function vjsCall_rf2() {
      console.log("In vjsCall_rf2() imgIdentification");
      //confirm.log("In observeClick_rf2 imgIdentification");
      createViewerComponent_rf2();
      return;
    }

    /**
     * @function createViewerComponent_rf2()
     * @description Function that creates the viewer component to view images
     * @returns viewer component
     */
    function createViewerComponent_rf2() {
      console.log("In ViewerJS() imgIdentification ");
      var viewer = new Viewer(document.getElementById('spcs_idntfctn-galley_rf2'), {
        url: 'data-original',
        title: function (image) {
          return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
        },
      });
    }



    /**
     * @function SelectedImages_rf2()
     * @returns an array with the currently selected images
    */
    function SelectedImages_rf2()
    {
      return highlighted_images_rf2;
    }

