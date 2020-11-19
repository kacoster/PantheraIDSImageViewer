function fetchServerData(src, csvfile, moduleId) {
    console.log('fetchServerData');
    console.log("src -> " + src);
    if (moduleId === "spcs_idntfctn_pttrn_rcgntn_mn_pnl") {
        //setimgarry(loadFile(csvfile))
        setimgarryTest(src);
    }
    if (moduleId === "img_clssfctn_ud") {
        //setImageArray(loadFile(csvfile))
        setImageArrayTest(src);
    }
    if (moduleId === "ct_vldt_img_trggr_tbl_vldtn_9") {
        console.log("ct_vldt_img_trggr_tbl_vldtn_9");
        // setValidationArrayTest(loadFile(csvfile), 9)
        setValidationArrayTest(src, 9);
    }
    if (moduleId === "ct_vldt_img_trggr_tbl_vldtn_10") {
        console.log("ct_vldt_img_trggr_tbl_vldtn_10");
        // setValidationArrayTest(loadFile(csvfile), 10)
        setValidationArrayTest(src, 10);
    }
    if (moduleId === "ct_vldt_img_trggr_tbl_vldtn_11") {
        console.log("ct_vldt_img_trggr_tbl_vldtn_11");
        // setValidationArrayTest(loadFile(csvfile), 11)
        setValidationArrayTest(src, 11);
    }
    if (moduleId === "ct_vldt_img_trggr_tbl_vldtn_12") {
        console.log("ct_vldt_img_trggr_tbl_vldtn_12");
        // setValidationArrayTest(loadFile(csvfile), 12)
        setValidationArrayTest(src, 12);
    }
}

function fetchServerDataTest(csvfile, moduleId) {
    console.log('fetchServerData 16/11/20');
    if (moduleId === "spcs_idntfctn_pttrn_rcgntn_mn_pnl") {
        //setimgarry(loadFile(csvfile))
        setimgarryTest(src);
    }
    if (moduleId === "img_clssfctn_ud") {
        //setImageArray(loadFile(csvfile))
        setImageArrayTest(src);
    }
    if (moduleId === "ct_vldt_img_trggr_tbl_vldtn_9") {
        setValidationArray(loadFile(csvfile), 9)
    }
    if (moduleId === "ct_vldt_img_trggr_tbl_vldtn_10") {
        setValidationArray(loadFile(csvfile), 10)
    }
    if (moduleId === "ct_vldt_img_trggr_tbl_vldtn_11") {
        setValidationArray(loadFile(csvfile), 11)
    }
    if (moduleId === "ct_vldt_img_trggr_tbl_vldtn_12") {
        setValidationArray(loadFile(csvfile), 12)
    }
}


function loadFile(filename) {
    console.log("In loadFile");
    let result = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filename, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = (xmlhttp.responseText).replace(/^\s*$[\n\r]{1,}/gm, '');
        return result;
    }
    return result;
}

function observeClick(event) {
    mapObject(event);
}

function clcsfcnSave() {
    saveButtonListerner();
}