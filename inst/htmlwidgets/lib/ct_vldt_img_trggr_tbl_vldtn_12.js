var ct_vldt_img_trggr_tbl_vldtn_12 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_12","ct_vldt_img_trggr_tbl_vldtn_12.csv");

  function prepArrayvldtn_12(resp)
  {
    console.log("In prepArray");
    ct_vldt_img_trggr_tbl_vldtn_12.readServerData(resp);
  }

  function ct_vldt12_event(event) {
    ct_vldt_img_trggr_tbl_vldtn_12.columnSize = 5;
    ct_vldt_img_trggr_tbl_vldtn_12.imgNumb = 30;
    ct_vldt_img_trggr_tbl_vldtn_12.setCol();
    //objectOf("ct_vldt_img_trggr_tbl_vldtn_12");
    ct_vldt_img_trggr_tbl_vldtn_12.callvjs(ct_vldt_img_trggr_tbl_vldtn_12.moduleId+"_divId");
  }


