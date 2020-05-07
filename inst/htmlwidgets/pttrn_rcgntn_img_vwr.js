HTMLWidgets.widget({

  name: 'pttrn_rcgntn_img_vwr',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        console.log("pttrn_rcgntn_img_vwr");
        console.log("Element ID " + el.id);

        Shiny.addCustomMessageHandler("spcs_idntfctn_pttrn_rcgntn_indvdl_fltr_button",
                function(mesg) {
                  console.log("Handler spcs_idntfctn_pttrn_rcgntn_indvdl_fltr_button");
                  //nextPrevClicked("1");
                  reset_props();
                  fetchServerData(x.filePath,x.componentID);
                  
                }
            );


        // TODO: code to render the widget, e.g.
        // el.innerText = x.message;

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
