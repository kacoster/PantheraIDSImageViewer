
    /***************************************************************************
    @version Viewer.js v1.3.5
    @author Valentine Tawira
    @description PantheraImageViewer Script for handling the processing of the
            file data and rendering of the viewer panel
    Copyright (C) 2019 | Panthera Corporation
    ***************************************************************************/

    /****************************************************************************
     code included inside $(document).ready() will only run once the page is
      ready for JavaScript code to execute
    ***************************************************************************/

     //var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud");
     //var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud");
     
     $(document).ready(function () {
    
        $("#apply").on("click", function () {
          // send message to Shiny
          console.log("classificationHelper.js line 22");
          Shiny.onInputChange("sources", imgClssfctnObj.sendDataToShinny());
        });

        $("#selectAll").on("click", function () {
          console.log("classificationHelper.js line 27");
          Shiny.onInputChange("sources", imgClssfctnObj.selectAll());

        });

        $("#img_clssfctn_ud_slct_all_img_bttn").on("click", function () {
          console.log("classificationHelper.js line 33");
          console.log("clicked selectAll");
          //Shiny.onInputChange("sources", imgClssfctnObj.selectAll(imgClssfctnObj));
        });

        $("#deSelectAll").on("click", function () {
          imgClssfctnObj.deSelectAll();
        });

        $("#img_clssfctn_ud_nxt_bttn").on("click", function () {
           Shiny.onInputChange("next", imgClssfctnObj.next());
        });

        $("#img_clssfctn_ud_prvs_bttn").on("click", function () {
          Shiny.onInputChange("prev", imgClssfctnObj.prev());
        });

  });

  var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv");
  //var ct_vldt_img_trggr_tbl_vldtn_9 = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv");

  /**
  * Handles all image panel click events
  * @parameter - event click/shiftKey
  *
  * Checks if event is shiftKey/click
  * Execute appropriate instructions based on event
  * @return void
  */
  function isKeyPressed(event,id) {

        arrayClone(imgClssfctnObj.selected_images);
        if (event.shiftKey) {
          
          if(imgClssfctnObj.selected_images.includes(event.target.src))
          {
            selectionFind(true);
          }
          imgClssfctnObj.handleExistance(imgClssfctnObj.selected_images, event.target.src, event.target.id);

        } else {
          objectOf("imgClassification");
          imgClssfctnObj.callvjs(imgClssfctnObj.moduleId+"_divId");
        }
  }

  function resetProps()
  {
    imgClssfctnObj.selected_images.length = 0;
    imgClssfctnObj.batnum = 0;
    imgClssfctnObj.getCurrClckdImg("clssfctn_slctd_img","");
  }

  function resetMsnImgsInputs(msg)
  {
    imgClssfctnObj.resetHandlers(msg);
  }

  function setColumnNumb(numb)
  {
    imgClssfctnObj.columnSize = numb;
    imgClssfctnObj.setCol();
  }
  function setImagesNumber(numb)
  {
    imgClssfctnObj.imgNumb = numb;
  } 

  function setImageArray(resp)
  {
    imgClssfctnObj.readServerData(resp);
  }

  function saveButtonListerner()
  {
    imgClssfctnObj.liWhiteBackground();
    imgClssfctnObj.deSelectAll();
    imgClssfctnObj.getCurrClckdImg("clssfctn_slctd_img","");
    imgClssfctnObj.getCurrClckdImg("clssfctn_vw_curr_img","");
  }


  function clearImages() {
    $("#img_clssfctn_ud").html("");
  }


  




