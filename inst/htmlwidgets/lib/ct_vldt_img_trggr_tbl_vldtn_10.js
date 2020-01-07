var ct_vldt_img_trggr_tbl_vldtn_10 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_10","ct_vldt_img_trggr_tbl_vldtn_10.csv");

  function prepArrayvldtn_10(resp)
  {
    //console.log("In prepArray");
    ct_vldt_img_trggr_tbl_vldtn_10.readServerData(resp);
  }

  function ct_vldt10_event(event) {
    //console.log("getEvent(event)");
    //console.log("event.target.src : " + event.target.src);
    //console.log("ct_vldt10_event");
    ct_vldt_img_trggr_tbl_vldtn_10.columnSize = 5;
    ct_vldt_img_trggr_tbl_vldtn_10.imgNumb = 30;
    ct_vldt_img_trggr_tbl_vldtn_10.setCol();
    //objectOf("ct_vldt_img_trggr_tbl_vldtn_10");
    ct_vldt_img_trggr_tbl_vldtn_10.callvjs(ct_vldt_img_trggr_tbl_vldtn_10.moduleId+"_divId");
  }


