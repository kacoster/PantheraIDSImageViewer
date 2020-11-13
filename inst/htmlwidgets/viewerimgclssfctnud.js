HTMLWidgets.widget({

  name: 'viewerimgclssfctnud',

  type: 'output',


  factory: function (el, width, height) {


    // TODO: define shared variables for this instance

    return {

      renderValue: function (x) {

        console.log("viewerimgclssfctnud 13-1-20 13:17");

        Shiny.addCustomMessageHandler("img_clssfctn_ud_batch_image_size",
          function (message) {
            setImagesNumber(parseInt(JSON.stringify(message)));
          }
        );

        Shiny.addCustomMessageHandler("img_clssfctn_ud_srvr_batch_image_size",
          function (message) {
            setImagesNumber(parseInt(JSON.stringify(message)));
          }
        );

        Shiny.addCustomMessageHandler("img_clssfctn_ud_img_clmn_numb",
          function (message) {
            setColumnNumb(parseInt(JSON.stringify(message)));
          }
        );

        Shiny.addCustomMessageHandler("img_clssfctn_srver_ud_img_clmn_numb",
          function (message) {
            setColumnNumb(parseInt(JSON.stringify(message)));
          }
        );

        Shiny.addCustomMessageHandler("img_clssfctn_ud_fltr_button",
          function (msg) {
            console.log("------------------------------------------");
            console.log(JSON.stringify(msg));
            console.log("------------------------------------------");
            nextPrevClicked("1");
            fetchServerData(x.message, x.componentID);
            resetProps();
          }
        );

        Shiny.addCustomMessageHandler("img_clssfctn_ud_fltr_srvr_button",
          function (mesg) {
            nextPrevClicked("1");
            fetchServerData(x.message, x.componentID);
            resetProps();
          }
        );

        Shiny.addCustomMessageHandler("img_clssfctn_ud_sv_edt_button",
          function (msg) {
            //console.log("In Handler img_clssfctn_ud_sv_edt_button");
            saveButtonListerner();
            //console.log("Handler img_clssfctn_ud_fltr_button");
            //fetchServerData(x.message,x.componentID);
          }
        );

        Shiny.addCustomMessageHandler("img_clssfctn_ud_srvr_sv_edt_button",
          function (msg) {
            //console.log("In Handler img_clssfctn_ud_sv_edt_button");
            saveButtonListerner();
            //console.log("Handler img_clssfctn_ud_fltr_button");
            //fetchServerData(x.message,x.componentID);
          }
        );

        Shiny.addCustomMessageHandler("mssng_srv_imgs_handler",
          function (msg) {
            resetMsnImgsInputs(msg);
          }
        );

        Shiny.addCustomMessageHandler("no_srv_imgs_handler",
          function (msg) {
            resetMsnImgsInputs(msg);
          }
        );
      },

      resize: function (width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});