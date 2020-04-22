
    function fetchServerData(csvfile,moduleId)
    { 
        //loadFile(file).then(data => this.setImageArray(data));
        /*if(moduleId === "img_clssfctn_ud"){setImageArray(loadFile(csvfile))}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_9") {setValidationArray(loadFile(csvfile),9)}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_10"){setValidationArray(loadFile(csvfile),10)}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_11"){setValidationArray(loadFile(csvfile),11)}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_12"){setValidationArray(loadFile(csvfile),12)}*/

        if(moduleId === "img_clssfctn_ud"){loadFile(csvfile).then(data => setImageArray(data))}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_9") {loadFile(csvfile).then(data => setValidationArray(data,9))}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_10") {loadFile(csvfile).then(data => setValidationArray(data,10))}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_11") {loadFile(csvfile).then(data => setValidationArray(data,11))}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_12") {loadFile(csvfile).then(data => setValidationArray(data,12))}
    }
    /*function loadFile(filename) {
        //console.log("In loadFile");
        let result = null;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filename, false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
        result = (xmlhttp.responseText).replace(/^\s*$[\n\r]{1,}/gm, '');
        return result;
        }
        return result;
    }*/

    function observeClick(event)
    {
        mapObject(event);
    }

    function clcsfcnSave()
    {
      //console.log("In clcsfcnSave()");
      saveButtonListerner();
    }

//console.log("viewerHelper.js  panwidgts");
async function loadFile(filename) {
    //console.log("getFile(filename)");
    let response = await fetch(filename,{cache: "no-cache"});
              //proceed once the first promise is resolved.
      if(response.ok){
        let data = await response.text();
        //console.log("In new getFile : " + data);
        return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
      }
      return 0;
  }