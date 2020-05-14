
    function fetchServerData(csvfile,moduleId)
    { 
        console.log('fetchServerData');
        if(moduleId === "spcs_idntfctn_pttrn_rcgntn_mn_pnl"){setimgarry(loadFile(csvfile))}
        if(moduleId === "img_clssfctn_ud"){setImageArray(loadFile(csvfile))}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_9") {setValidationArray(loadFile(csvfile),9)}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_10"){setValidationArray(loadFile(csvfile),10)}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_11"){setValidationArray(loadFile(csvfile),11)}
        if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_12"){setValidationArray(loadFile(csvfile),12)}
    }

    function loadFile(filename) {
        console.log("In loadFile");
        let result = null;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filename, false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
        result = (xmlhttp.responseText).replace(/^\s*$[\n\r]{1,}/gm, '');
        return result;
        }
        return result;
    }

    function observeClick(event)
    {
        mapObject(event);
    }

    function clcsfcnSave()
    {
      //console.log("In clcsfcnSave()");
      saveButtonListerner();
    }