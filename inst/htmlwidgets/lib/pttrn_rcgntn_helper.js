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
                                            'pttrn_rcgntn_fltrd_rslts.csv');

  /**
  * Handles all image panel click events
  * @parameter - event click/shiftKey
  *
  * Checks if event is shiftKey/click
  * Execute appropriate instructions based on event
  * @return void
  */
  function isKeyPressed(event,id) {

        let flag = pttrn_rcgntn_obj.selected_images.includes(event.target.src)
        console.log('Already Selected : ' + flag );

        arrayClone(pttrn_rcgntn_obj.selected_images);
        if (event.shiftKey) {
          console.log("Shift Key");
          
          if(pttrn_rcgntn_obj.selected_images.includes(event.target.src))
          {
            selectionFind(true);
          }
          pttrn_rcgntn_obj.handleExistance( pttrn_rcgntn_obj.selected_images, 
                                            event.target.src, event.target.id);

        } else {
          console.log("clicked")
          objectOf("pttrn_rcgntn_vwr");
          pttrn_rcgntn_obj.callvjs(pttrn_rcgntn_obj.moduleId+"_divId");
        }
  }


  // Look at this 
  function resetProps()
  {
    console.log('new resetProps()');
    (pttrn_rcgntn_obj.selected_images).length = 0;
    pttrn_rcgntn_obj.batnum = 0;
    //pttrn_rcgntn_obj.getCurrClckdImg("clssfctn_slctd_img","");
  }

  function resetMsnImgsInputs(msg)
  {
    pttrn_rcgntn_obj.resetHandlers(msg);
  }

  function setColumnNumb(numb)
  {
    pttrn_rcgntn_obj.columnSize = numb;
    pttrn_rcgntn_obj.setCol();
  }
  function setImagesNumber(numb)
  {
    pttrn_rcgntn_obj.imgNumb = numb;
  } 

  function setImageArray(resp)
  {
    pttrn_rcgntn_obj.readServerData(resp);
  }

  function saveButtonListerner()
  {
    //console.log('classificationHelper.js saveButtonListerner()');
    pttrn_rcgntn_obj.liWhiteBackground();
    pttrn_rcgntn_obj.deSelectAll();
    pttrn_rcgntn_obj.getCurrClckdImg("clssfctn_slctd_img","");
    pttrn_rcgntn_obj.getCurrClckdImg("clssfctn_vw_curr_img","");
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


  




