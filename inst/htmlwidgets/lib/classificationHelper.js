
    /***************************************************************************
    @version Viewer.js v1.3.6
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

        $("#img_clssfctn_ud_slct_all_imgs_bttn").on("click", function () {
   
          imgClssfctnObj.selectAll();
        });

        $("#img_clssfctn_ud_dslct_all_imgs_bttn").on("click", function () {
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

        console.log(event.keyCode);
        arrayClone(imgClssfctnObj.selected_images);
        if(event.keyCode == '18' ){
            console.log('alt / option');
            let id = event.target.id;
            let indx = parseInt(id.substring(0,id.indexOf('_')));

            if((imgClssfctnObj.hotKeysIndx).length == 2){
              imgClssfctnObj.keySelection();
            }else{
              (imgClssfctnObj.hotKeysIndx).push(indx);
              imgClssfctnObj.highliter(id);
            }
            //return;
        }
        else if (event.shiftKey) {
          
          if(imgClssfctnObj.selected_images.includes(event.target.src))
          {
            selectionFind(true);
          }
          imgClssfctnObj.handleExistance(imgClssfctnObj.selected_images, event.target.src, event.target.id);

        }else {
          objectOf("imgClassification");
          imgClssfctnObj.callvjs(imgClssfctnObj.moduleId+"_divId");
        }
  }

  function resetProps()
  {
    console.log('new resetProps()');
    (imgClssfctnObj.selected_images).length = 0;
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
    console.log('classificationHelper.js saveButtonListerner()');
    imgClssfctnObj.liWhiteBackground();
    imgClssfctnObj.deSelectAll();
    imgClssfctnObj.getCurrClckdImg("clssfctn_slctd_img","");
    imgClssfctnObj.getCurrClckdImg("clssfctn_vw_curr_img","");
  }


  function clearImages() {
    $("#img_clssfctn_ud").html("");
  }


  function highlightAll(){
    console.log("In highlightAll()");
    let arry = [];
    $('#img_clssfctn_ud img').each(function(){
      console.log("imgs loop");
      console.log($(this).attr('src'));
      console.log(this.id);

      $('#' + this.id + '').css({
        'opacity': '0.4',
        'filter': 'alpha(opacity=40)'
      });
      $(".pictures > li").css("background-color", "yellow");
      arry.push($(this).attr('src'));
    });

    console.log("SRC : " + arry.toString());
    console.log("arry : " + arry.length);

    return arry;
  }


  




