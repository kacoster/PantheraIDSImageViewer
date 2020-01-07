var ct_vldt_img_trggr_tbl_vldtn_11 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_11","ct_vldt_img_trggr_tbl_vldtn_11.csv");

  function prepArrayvldtn_11(resp)
  {
    //console.log("In prepArray");
    ct_vldt_img_trggr_tbl_vldtn_11.readServerData(resp);
  }

  function ct_vldt11_event(event) {
    console.log("ct_vldt10_event");
    ct_vldt_img_trggr_tbl_vldtn_11.columnSize = 5;
    ct_vldt_img_trggr_tbl_vldtn_11.imgNumb = 30;
    ct_vldt_img_trggr_tbl_vldtn_11.setCol();
    //objectOf("ct_vldt_img_trggr_tbl_vldtn_11");
    ct_vldt_img_trggr_tbl_vldtn_11.callvjs(ct_vldt_img_trggr_tbl_vldtn_11.moduleId+"_divId");
  }

