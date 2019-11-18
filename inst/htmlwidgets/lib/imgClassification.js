
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
       /**********************************************************************/
        // For Testing Purposes
        $("#prev").on("click", function () {
            prev();
       });
       $("#next").on("click", function () {
           next();
       });
      /**********************************************************************/
      });

      /**Program Global Variables */
      var ar = [];
      var resetSel = [];
      var selected_images = [];
      var tempRemoved ;
      var nextPrev = "0";
      var batnum  = 0 ; // default batch Number
      var imgNumb = 0; // default image size


       async function processClsfctnResponseText(csvfile) {
         console.log("In ProcessResponse");
        var textResult = await fetchServerFile(csvfile);
        console.log("In PR : " + textResult);
        ar = (textResult).split(',');
        ar.splice(0, 1);
        ar[0] = ar[0].replace("Source", "");
        ar[0] = ar[ar.length - 1] + ar[0];
        ar.splice(ar.length - 1, 1);


      // Read the batch Image Number from from slider : img_clssfctn_ud_btch_img_thrshld
      Shiny.addCustomMessageHandler("img_clssfctn_ud_batch_image_size",
        function(message) {
           imgNumb =  parseInt(JSON.stringify(message));
                Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              1 + " / " + getBatchNumber());
             displayImages(imgNumb,0,'img_clssfctn_ud',ar);
          }
      );

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
        console.log("Highting the Image");
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


      function getCurrClckdImg(state, imgsrc)
      {
        Shiny.onInputChange(state,imgsrc);
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

        console.log("Line : " + 181);
        if(params.includes(src))
        {
          tempRemoved =  (params.splice(params.indexOf(src),1))[0];
          removeHighlight(id);
          if(params.length > 0)
          {
            getCurrClckdImg("clssfctn_slctd_img",
            params[params.length -1].substring(
              src.lastIndexOf("/") + 1, src.length ));
          }else{
            getCurrClckdImg("clssfctn_slctd_img","");
          }


        }
        else{
          console.log("Line : " + 188);
          params.push(src);
          $(".pictures > li").css("background-color", "yellow");
          highliter(id);
           getCurrClckdImg("clssfctn_slctd_img",
            src.substring(src.lastIndexOf("/") + 1, src.length ));
        }
      }

      /**
       * Function inprogress to fix the previous image Reference
      */
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
        //console.log("is KeyPressed imgClsfctn");
           arrayClone(selected_images);
          // send message to Shiny
          var imageName = event.target.src;

          if (event.shiftKey) {
            handleExistance(selected_images, event.target.src, event.target.id);

          } else {
            //clickEventStatus("0");
            objectOf("imgClassification");
             myFunction();

          }
      }

      /**
       * @function getBatchNumber()
       * @description computes the total number of available batches
       * @constrains the number of images per batchimgNumb()
       * @return the total number of batches
      */
      function getBatchNumber()
      {
        if((ar.length %  imgNumb)===0){
            return (ar.length / imgNumb);
        }
        else{
          return ((Math.floor(ar.length / imgNumb)) + 1);
        }
      }

      /**
       * @description computes and displays the next image batch
       *
      */
      function next() {
        nextPrevClicked("1");

      if(batnum < getBatchNumber()-1){
               batnum++;
               //console.log("Tester : " +   batnum + "/" + getBatchNumber());
              Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              (batnum+1) + " / " + getBatchNumber());
              //clearImages('x');
              displayImages(imgNumb,batnum,'img_clssfctn_ud',ar);

        }else{
           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
             getBatchNumber() + " / " + getBatchNumber());
             //clearImages('x');
             displayImages(imgNumb,getBatchNumber()-1,'img_clssfctn_ud',ar);
             batnum = getBatchNumber()-1;
        }

      }

       /**
       * @description computes and displays the previous image batch
       *
      */
      function prev() {
        nextPrevClicked("1");
        batnum--;
        if (batnum > 0 ) {
           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              (batnum+1) + " / " + getBatchNumber());
              //clearImages('x');
              displayImages(imgNumb,batnum,'img_clssfctn_ud',ar);
        }else{

           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
             1 + " / " + getBatchNumber());
             //clearImages('x');
             displayImages(imgNumb,0,'img_clssfctn_ud',ar);
             batnum = 0;

        }

      }

      /**
       * @description - indirect call to the vjs() function
       * @returns image view
       */
      function myFunction() {
        //console.log("In myFunction()");
        vjs();
        return;
      }

      /**
       * @function vjs()
       * @description Function that creates the viewer component to view images
       * @returns viewer component
       */
      function vjs() {
        //console.log("In ViewerJS() ");
          var viewer = new Viewer(document.getElementById('galley'), {
          url: 'data-original',
          title: function (image) {
            return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
          },
        });


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
          return selected_images;

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
