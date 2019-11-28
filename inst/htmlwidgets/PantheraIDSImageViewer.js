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
          $("#img_clssfctn_ud_fltr_button").on("click", function () {
            Shiny.onInputChange("next",  readServerData(x.message));
          });


        }
        else if (x.componentID === "spcs_idntfctn_id_rf_1")
        {
          fetchServerData(x.message);
        }
        else
        {
          fetchServerData_rf2(x.message);
        }

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
