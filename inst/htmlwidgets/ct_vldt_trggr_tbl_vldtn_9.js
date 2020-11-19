HTMLWidgets.widget({

  name: 'ct_vldt_trggr_tbl_vldtn_9',

  type: 'output',

  factory: function (el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function (x) {

        Shiny.addCustomMessageHandler("ct_vldt_trggr_tbl_vldtn_9_button",
          function (mesg) {
            let src = JSON.stringify(mesg);
            fetchServerData(src, x.componentID);
          }
        );

      },

      resize: function (width, height) {}

    };
  }
});