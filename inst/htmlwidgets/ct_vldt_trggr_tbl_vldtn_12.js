HTMLWidgets.widget({

  name: 'ct_vldt_trggr_tbl_vldtn_12',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {
           
          Shiny.addCustomMessageHandler("ct_vldt_trggr_tbl_vldtn_12_pll_indvdl_button",
                function(mesg) {
                  //console.log("Handler ct_vldt_trggr_tbl_vldtn_12_pll_indvdl_button");
                  pullSpecClicked("1");
                  fetchServerData(x.message,x.componentID);
                }
            );
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
