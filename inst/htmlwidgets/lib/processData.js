
    /***************************************************************************
      @version Viewer.js v1.3.5
      @author Valentine Tawira
      @description PantheraImageViewer Script for handling the processing of the
                  file data and rendering of the viewer panel
      Copyright (C) 2019 | Panthera Corporation
     ***************************************************************************/

      /**
       * code included inside $(document).ready() will only run once the page is
       * * ready for JavaScript code to execute
      */
      $(document).ready(function () {

        //readSeverData();
        $("#goButton").on("click", function () {
          // send message to Shiny
          Shiny.onInputChange("sources", sendDataToShinny());
        });

        $("#apply").on("click", function () {
          // send message to Shiny
          Shiny.onInputChange("sources", sendDataToShinny());
        });

        $("#selectAll").on("click", function () {
           Shiny.onInputChange("sources", selectAll());
          //selectAll();
        });

        $("#deSelectAll").on("click", function () {
          deSelectAll();
        });

        $("#img_clssfctn_ud_nxt_bttn").on("click", function () {
         Shiny.onInputChange("next", next());
       });

       $("#img_clssfctn_ud_prvs_bttn").on("click", function () {
         Shiny.onInputChange("prev", prev());
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

      var totalImgBatches;

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
        //console.log("myFunction1 called  :" + tracker++);
        ar = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
        ar.splice(0, 1);
        ar[0] = ar[0].replace("Source", "");
        ar[0] = ar[ar.length - 1] + ar[0];
        ar.splice(ar.length - 1, 1);
        console.log("Number of Images : " + ar.length );

       /* Shiny.addCustomMessageHandler("testmessage",
          function (message) {
            imgNumb = parseInt(JSON.stringify(message));
          }
        );

        Shiny.addCustomMessageHandler("testmsg",
          function (message) {
            batnum = parseInt(JSON.stringify(message));
            initial(imgNumb, batnum);
          }
        );*/
      // Read the batch Image Number from from slider
      Shiny.addCustomMessageHandler("batchImageSize",
        function(message) {
          imgNumb =  parseInt(JSON.stringify(message));
          }
      );
      // Start at batch Number 0 possibly :: img_clssfctn_ud_srvr_btch_img_thrshld
      //Shiny.addCustomMessageHandler("btch_num_msg",

      //Shiny.addCustomMessageHandler("img_clssfctn_ud_srvr_btch_img_thrshld",
      //    function(message) {
      //      batnum =  parseInt(JSON.stringify(message));
      //      initial(imgNumb,batnum);
      //    }
      //);


      }
      /************************************************************************/
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
         // console.log("Removed Element");
          //tempRemoved  = params.splice(params.indexOf(src),1);
          removeHighlight(id);
          }
          else{
            //console.log("Not marked");
            params.push(src);
            highliter(id);
          }
          //console.log("Selected Images");
          //console.log(params);
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
      function isKeyPressed(event) {

        if (event.shiftKey) {

          //console.log(selected_images.length);
          // console.log("shiftKey Pressed");
          //console.log("Target src :" + event.target.src);
          handleExistance(selected_images, event.target.src, event.target.id);

        } else {
          //console.log("Clicked");
          //lastViewed = event.target.src;
          //console.log(event.target.src);
          myFunction();

        }

      }

      /**
       * @function initial(a,b)
       * @description determines the images to be rendered
       * @argument - number of images of render
       *           - batch number of the image lot
       * @returns void
       *
      */
      function initial(imgnumb,bat) {
          clearImages();
          start = bat * imgnumb;
          end = start + imgnumb;
          result = ar.slice(start, end);
          callImges(result);

      }

      function tester()
      {
        initial(9,0);
      }

      /**
       * @function getBatchNumber()
       * @description computes the total number of available batches
       * @constrains the number of images per batchimgNumb()
       * @return the total number of batches
      */
      function getBatchNumber()
      {
        if((ar.length %  imgNumb)==0){
            return (ar.length / imgNumb);
        }
        else{
          return ((Math.floor(ar.length / imgNumb)) + 1);
        }
      }
        /* Takes - Uses an Array ar[] */
      function next() {
       // alert("Total Number of Batches : " + getBatchNumber());
      if(batnum > getBatchNumber()){
        //alert("End of Batches " +  totalImgBatches-1) ;
        initial(imgNumb, totalImgBatches);
        }else{
          batnum++;
          initial(imgNumb, batnum);
        }
      }
    /* Takes - Uses an Array ar[] */
      function prev() {
        batnum--;
        if (getBatchNumber() -  batnum >= 0 ) {
          initial(imgNumb ,batnum);
        }else{
          initial(imgNumb, 0);
        }
      }
      /************************************************************************/

      /************************************************************************/

        /**
         * @description - creates html component to display the images
         * @param {String} ar - an array of images
         * @returns {void}
         */
        function imgloop(ar) {
          for (i = 0; i < ar.length; i++) {
            var liId = i;
            var img = new Image();
            var ul = document.getElementById('x');
            // img.onload = function() {
            img.src = ((ar[i].trim()).replace(/['"]+/g, ''));
            // Triming the double quotes passed on each image src
            img.alt = "Historic";
            img.datamarked = 0;
            ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' +
            img.src + '"  marked="' + img.datamarked + '" src="' +
            img.src + '" alt="' + img.alt + '" /> </li>';
            // inserting an list of images uinside the ul tag
        }
      }

      /**
       * @description clears inner html components identified by elementId 'x'
       *
       */
      function clearImages() {
        $("#x").html("");
      }

      /**
       *
       * @param {String} arry
       */
      function callImges(arry) {
        imgloop(arry);
      }

      /**
       *
       */
      function myFunction() {
        vjs();
        return;
      }

      /**
       * @function vjs()
       * @description Function that creates the viewer component to view images
       * @returns viewer component
       */
      function vjs() {
        //console.log("In ViewerJS ");
        var viewer = new Viewer(document.getElementById('galley'), {
          url: 'data-original',
          title: function (image) {
            return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
            // write image props here
          },
        });
       // console.log("Outside Viewer Object");
      }



      /**
       * @function getSelectedImages()
       * @returns an array with the currently selected images
      */
      function getSelectedImages()
      {
        return selected_images;
      }

      /**
       * @function selectAll()
       * @description selects all the panel images
       * @return selected_images
      */
        function selectAll() {
          $("img").each(function (index) {
            $('#' + $(this).attr('id') + '').css({
              'opacity': '0.1',
              'filter': 'alpha(opacity=40)'
            });
            selected_images.push($(this).attr('src'));
            //console.log( index + " : " + "The SRC is : " + $( this ).attr('src'));
          });
          //console.log(selected_images);
          return selected_images; // I might not want to return an array here ?
                                  //Think about it clearly
        }

      /**
       * @function deSelectAll()
       * @description deselects the currently selected images
       * @returns void
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
        }

      /**
       * @function sendDataToShinny()
       * @returns an array of selected images
       * @description sends the client selected image data back to server (Shinny)
      */
        function sendDataToShinny(){
          if (selected_images === undefined || selected_images.length === 0) {
            alert("No Images Selected !!");
            return ;
          }
          else{
            const copy_selected_images = [...selected_images];
            deSelectAll();
            return copy_selected_images;
          }
        }
