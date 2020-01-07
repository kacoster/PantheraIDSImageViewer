HTMLWidgets.widget({

  name: 'PantheraIDSImageViewer',

  type: 'output',


  /**
   * Factory Function
   * @params el -  , width , height
  */

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        /**
         * Calling readServerData function
         * Passing the filePath parameter as an argument
        */

        if(x.componentID === "img_clssfctn_ud")
        {
          console.log("case classification module ");
           //readServerData(x.message);
           Shiny.addCustomMessageHandler("img_clssfctn_ud_batch_image_size",
              function(message) {
                setImagesNumber(parseInt(JSON.stringify(message)));
                }
            );

            Shiny.addCustomMessageHandler("img_clssfctn_ud_img_clmn_numb",
              function(message) {
                setColumnNumb(parseInt(JSON.stringify(message)));
                //console.log("Handler img_clssfctn_ud_img_clmn_numb : " + parseInt(JSON.stringify(message)));
                }
            );

            Shiny.addCustomMessageHandler("img_clssfctn_ud_fltr_button",
                function(mesg) {
                  console.log("Handler img_clssfctn_ud_fltr_button");
                  readServerData(x.message);
                }
            );
        }

        if (x.componentID === "ct_vldt_img_trggr_tbl_vldtn_9")
        {
          //console.log("ct_vldt_img_trggr_tbl_vldtn_9");
          readServerData_ct_vldt(x.message);
          Shiny.addCustomMessageHandler("ct_vldt_trggr_tbl_vldtn_9_button",
                function(mesg) {
                  console.log("Handler ct_vldt_trggr_tbl_vldtn_9_button");
                  readServerData_ct_vldt(x.message);
                }
          );
        }
        /*else if (x.componentID === "spcs_idntfctn_id_rf_1")
        {
          fetchServerData(x.message);
        }
        else
        {
          fetchServerData_rf2(x.message);
        }*/

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
