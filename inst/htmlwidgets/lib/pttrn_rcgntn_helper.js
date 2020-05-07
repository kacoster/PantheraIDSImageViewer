    /****************************************************************************
     code included inside $(document).ready() will only run once the page is
      ready for JavaScript code to execute
    ***************************************************************************/

     //var imgClssfctnObj = new ViewerComponent(0,50,5,"spcs_idntfctn_pttrn_rcgntn_mn_pnl");
     //var imgClssfctnObj = new ViewerComponent(0,50,5,"spcs_idntfctn_pttrn_rcgntn_mn_pnl");
     /*$(document).ready(function () {
    
        $("#apply").on("click", function () {
          // send message to Shiny
          console.log("classificationHelper.js line 22");
          Shiny.onInputChange("sources", imgClssfctnObj.sendDataToShinny());
        });

        $("#spcs_idntfctn_pttrn_rcgntn_mn_pnl_slct_all_imgs_bttn").on("click", function () {
   
          imgClssfctnObj.selectAll();
        });

        $("#spcs_idntfctn_pttrn_rcgntn_mn_pnl_dslct_all_imgs_bttn").on("click", function () {
          imgClssfctnObj.deSelectAll();
        });

        $("#spcs_idntfctn_pttrn_rcgntn_mn_pnl_nxt_bttn").on("click", function () {
           Shiny.onInputChange("next", imgClssfctnObj.next());
        });

        $("#spcs_idntfctn_pttrn_rcgntn_mn_pnl_prvs_bttn").on("click", function () {
          Shiny.onInputChange("prev", imgClssfctnObj.prev());
        });

  });*/

  var pttrn_rcgntn_obj = new ViewerComponent(0,50,5,
                                            'spcs_idntfctn_pttrn_rcgntn_mn_pnl',
                                            'spcs_idntfctn_pttrn_rcgntn_mn_pnl.csv');

  /**
  * Handles all image panel click events
  * @parameter - event click/shiftKey
  *
  * Checks if event is shiftKey/click
  * Execute appropriate instructions based on event
  * @return void
  */
  function isKeyPressed(event,id) {

        arrayClone(pttrn_rcgntn_obj.selected_images);
        if (event.shiftKey) {
          
          if(pttrn_rcgntn_obj.selected_images.includes(event.target.src))
          {
            selectionFind(true);
          }
          pttrn_rcgntn_obj.handleExistance( pttrn_rcgntn_obj.selected_images, 
                                            event.target.src, event.target.id);

        } else {
          objectOf("imgClassification");
          pttrn_rcgntn_obj.callvjs(pttrn_rcgntn_obj.moduleId+"_divId");
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
    //console.log('classificationHelper.js saveButtonListerner()');
    imgClssfctnObj.liWhiteBackground();
    imgClssfctnObj.deSelectAll();
    imgClssfctnObj.getCurrClckdImg("clssfctn_slctd_img","");
    imgClssfctnObj.getCurrClckdImg("clssfctn_vw_curr_img","");
  }


  function clearImages() {
    $("#spcs_idntfctn_pttrn_rcgntn_mn_pnl").html("");
  }


  function highlightAll(){
    console.log("In highlightAll()");
    let arry = [];
    $('#spcs_idntfctn_pttrn_rcgntn_mn_pnl img').each(function(){
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


  




