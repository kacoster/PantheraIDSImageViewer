HTMLWidgets.widget({

  name: 'ct_vldt_trggr_tbl_vldtn_10',

  type: 'output',

  factory: function (el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function (x) {
        Shiny.addCustomMessageHandler("ct_vldt_trggr_tbl_vldtn_10_pll_spcs_button",
          function (mesg) {
            let src = JSON.stringify(mesg);
            pullSpecClicked("1");
            fetchServerData(src, x.componentID);
          }
        );

      },

      resize: function (width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});