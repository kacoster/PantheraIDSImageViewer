/***************************************************************************
      @version ViewerComponent v1.3.7
      @author Valentine Tawira
      @Copyright (C) 2019 | Panthera Corporation
***************************************************************************/
    class ViewerComponent {

      constructor(batnum,imgNumb,columnSize,moduleId,csvfile)
      {
          this.columnSize = columnSize;
          this.batnum = batnum;
          this.imgNumb = imgNumb;
          this.moduleId =moduleId;
          this.csvfile = csvfile;
          this.imgArray = [];
          this.selected_images = [];
          this.nextPrev = "0";
          this.result = [];
          this.tempRemoved ="";
          this.currentDisplayedImgs = [];
          this.prevSelectedImgs = [];
          this.hotKeysIndx = [];
      }


      readServerData(response) {
        console.log('readServerData 12-06-20 16:54');
        let mdid = (this.moduleId).substring(0,27);

        let respArray = [];
        if(response === null )
        {
          alert(" Error in reading your images.Please check if all requirements are provided.");
        }
        else{
          // this.imgArray = response.split(',');
          // this.imgArray.splice(0, 1);
          // this.imgArray[0] = this.imgArray[0].replace("Source", "");
          // this.imgArray[0] = this.imgArray[this.imgArray.length - 1] + this.imgArray[0];
          // this.imgArray.splice(this.imgArray.length - 1, 1);
          respArray = response.split("\n");

          respArray.shift();
          console.log("Resp Array : " + respArray);
          //respArray[0] = respArray[0].replace("Source", "");

          if(respArray[respArray.length-1]==""){
            //console.log('pop');
            respArray.pop();
          }

          for(let i = 0 ; i < respArray.length; i++ ){
            let src = respArray[i].substring(respArray[i].indexOf('/'),respArray[i].lastIndexOf('/'))+'/'+respArray[i].substring(0,respArray[i].indexOf('/'));
            this.imgArray.push(src.replace(',',''));
           }
  
          console.log(this.moduleId + 'Total Imgs : ' + (this.imgArray.length));
          console.log("first : " + this.imgArray[0] + " last : " +  this.imgArray[this.imgArray.length-1] );

          if(this.moduleId === "img_clssfctn_ud")
          {
            Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
            1 + " / " + this.getBatchNumber());
          }
        }
        if(this.moduleId === "img_clssfctn_ud"){
          this.clearImages();
          this.imgloop(this.displayImages(this.imgNumb,0));
        }
        if(this.moduleId === "spcs_idntfctn_pttrn_rcgntn_mn_pnl"){
          this.clearImages();
          this.imgloop(this.imgArray);
        }
        if(mdid === 'ct_vldt_img_trggr_tbl_vldtn'){
          this.clearImages();
          console.log('ct_vldt_img_trggr_tbl_vldtn');
          this.imgloop(this.imgArray);
        }
        
      }

      ulClassName(){

        if(this.moduleId === "img_clssfctn_ud"){
          return 'pictures';
        }
        if(this.moduleId === "spcs_idntfctn_pttrn_rcgntn_mn_pnl"){
          return 'rcgntn_pictures';
        }   
      }

      highliter(elementID)
      {
        let ulclassname = this.ulClassName();
          $('#' + elementID + '').css({
              'opacity': '0.4',
              'filter': 'alpha(opacity=40)'
          });
          $('.'+ulclassname+'> li').css("background-color", "yellow");
      }

      removeHighlight(elementID)
      {
          $('#' + elementID + '').css({
              'opacity': '',
              'filter': ''
              });
      }

      /** Not Yet Generic */
      setCol(){

          $('.pictures > li').css({
                  'width' : 'calc(100% /' + this.columnSize +')'
              });
      }

      // clssfctn_slctd_img
      getCurrClckdImg(state, imgsrc)
      {
          Shiny.onInputChange(state,imgsrc);
      }

      sendAllImages(){
        this.getCurrClckdImg(this.selectedImgShinyRef(),this.getTrimedSelectedImages().toString());
      }

      selectedImgShinyRef(){
        //console.log('selectedImgShinyRef');
        if(this.moduleId === "img_clssfctn_ud"){
          return "clssfctn_slctd_img";
        }
        if(this.moduleId === "spcs_idntfctn_pttrn_rcgntn_mn_pnl"){
          return "pttrn_rcgntn_mn_pnl_slctd_img";
        }
      }

      /** Not Yet Generic */
      handleExistance(params,src,id)
      {
        let ref = this.selectedImgShinyRef();

          if(params.includes(src))
          {
              this.tempRemoved =  (params.splice(params.indexOf(src),1))[0];
              this.removeHighlight(id);
              if(params.length > 0)
              {
                  this.getCurrClckdImg(ref,this.getTrimedSelectedImages().toString());
              }else{
                  this.getCurrClckdImg(ref,""); //""
              }
          }
          else{
            if(this.isPlacveHolder(src))
            {
              console.log("Cant Process Place Holder Image orig");
              this.callSelectionFind(true);
            }
            else{
              params.push(src);
              this.highliter(id);
              this.getCurrClckdImg(ref,this.getTrimedSelectedImages().toString());
            }
          }
      }

      callSelectionFind(value){
        if(this.moduleId === "img_clssfctn_ud"){
          selectionFind(value);
        }
        if(this.moduleId === "spcs_idntfctn_pttrn_rcgntn_mn_pnl"){
          selectionfind(value);
        }

      }

      isPlacveHolder(src)
      {
        return (src.split('/').pop() === 'PantheraIDS_image_not_found_2.jpg');
      }

      removedRef()
      {
          return this.tempRemoved;
      }

      displayImages(imgnumb,bat) {
          this.clearImages();
          let start ,end;
          start = bat * imgnumb;
          end = start + imgnumb;
          this.result = this.imgArray.slice(start, end);
          return this.result;
      }

      getBatchNumber()
      {
          if((this.imgArray.length %  this.imgNumb)===0){
              return (this.imgArray.length / this.imgNumb);
          }
          else{
          return ((Math.floor(this.imgArray.length / this.imgNumb)) + 1);
          }
      }
      // We need a function that maps to diff modules
      next() {
          nextPrevClicked("1");

          if(this.batnum < this.getBatchNumber()-1){
                this.batnum++;
                Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
                (this.batnum+1) + " / " + this.getBatchNumber());
                this.imgloop(this.displayImages(this.imgNumb, this.batnum));
                this.selected_images.length = 0;
                this.getCurrClckdImg("clssfctn_slctd_img","");

            }else{
              Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              this.getBatchNumber() + " / " + this.getBatchNumber());
              this.imgNumb(this.displayImages(this.imgNumb, this.getBatchNumber()-1));
              this.batnum = this.getBatchNumber()-1;
              this.selected_images.length = 0;
              this.getCurrClckdImg("clssfctn_slctd_img","");
            }
      }

      prev() {
          console.log("Prev Clicked");
            nextPrevClicked("1");
            this.batnum--;
          if (this.batnum > 0 ) {
            Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
                (this.batnum+1) + " / " + this.getBatchNumber());
            this.imgloop(this.displayImages(this.imgNumb ,this.batnum));
            this.selected_images.length = 0;
            this.getCurrClckdImg("clssfctn_slctd_img","");
          }else{
            Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              1 + " / " + this.getBatchNumber());
            this.imgloop(this.displayImages(this.imgNumb, 0));
            this.selected_images.length = 0;
            this.getCurrClckdImg("clssfctn_slctd_img","");
            this.batnum = 0;
          }
      }

      trimSRC(selctdImgAry)
      {
          let i = 0;
          let tempArray = [];
          for(i;i < this.selected_images.length;i++)
          {
              let newSRC = selctdImgAry[i].substring(selctdImgAry[i].lastIndexOf("/") + 1,
                  selctdImgAry[i].length );
              tempArray[i] = newSRC;
          }
          return tempArray;
      }

      clearImages() {
          $('#' + this.moduleId + '').html("");
      }

      // See if this indeed should var
      vjs(elementID) {
          var elementID = new Viewer(document.getElementById(elementID), {
              url: 'data-original',
              title: function (image) {
              return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
              },
          });
      }

      getSelectedImages()
      {
          return this.selected_images;
      }

      getTrimedSelectedImages()
      {
          return this.trimSRC(this.getSelectedImages());
      }

      invertSelection(){
        console.log("invertSelection")
        let notSelected;
      
        if((this.selected_images).length > 0){
          notSelected = this.arryCompliment(this.currentDisplayedImgs,this.selected_images);
          this.deSelectAll();
        }
        else{
          notSelected = this.arryCompliment(this.currentDisplayedImgs,this.prevSelectedImgs)
        }
        
        this.highlightInverse(notSelected);

      }

      arryCompliment(ar1,ar2) { 
        if(ar1.length == 0 || ar2.length ==0){
          return
        }
        var elmts = ar1.filter(f => !ar2.includes(f)); 
        return elmts;
      } 

      highlightInverse(ar){
        this.selected_images = 0;
        let slctdimgs = [];
        let ulclassname = this.ulClassName();

        $('#' + this.moduleId + ' img').each(function(){
          if(ar.includes($(this).attr('src'))){

            $('#' + this.id + '').css({
              'opacity': '0.4',
              'filter': 'alpha(opacity=40)'
            });
            slctdimgs.push($(this).attr('src'));
          }
          $('.'+ulclassname+'> li').css("background-color", "yellow");
          

        });
        this.selected_images = [...slctdimgs];
        this.sendAllImages();

      }

      selectAll() {
        this.selected_images = 0;
        let slctdimgs = [];
        let ulclassname = this.ulClassName();
        $('#' + this.moduleId + ' img').each(function(){

          $('#' + this.id + '').css({
            'opacity': '0.4',
            'filter': 'alpha(opacity=40)'
          });
          $('.'+ulclassname+'> li').css("background-color", "yellow");
          slctdimgs.push($(this).attr('src'));
        });
        this.selected_images = [...slctdimgs];
        this.sendAllImages();

      }


      deSelectAll() {
        $('#' + this.moduleId + ' img').each(function(){
          $('#' + this.id + '').css({
            'opacity': '',
            'filter': ''
          });
      
        });
        (this.prevSelectedImgs).length = 0;
        this.prevSelectedImgs = [...this.selected_images];
        this.selected_images.length = 0;
        this.getCurrClckdImg(this.selectedImgShinyRef(),"");
    
      }

      sendDataToShinny(){
        if (this.selected_images === undefined || this.selected_images.length === 0) {
          console.log("No Images Selected !!");
          return ;
        }
        else{
          const copy_selected_images = [...this.selected_images];
          this.deSelectAll();
          return copy_selected_images;
        }
      }

      // Checks if the an image exist on the server
      placeHolder(imgURL)
      {
        let xmlhttp = new XMLHttpRequest();
        let url = imgURL;
          xmlhttp.open("GET", url, false);
          xmlhttp.send();
          if (xmlhttp.status==200) {
            return true;
          }
          else{
          return false;
          } 
      }

      // Depreciated
      checkImageExistance(arry) {
        let count = 0;
        for(let i= 0; i< arry.length ; i++)
        {
          let url = ((arry[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("GET", url, false);
          xmlhttp.send();
          if (xmlhttp.status==200) {
          }
          else{
            count++;
          } 
        }
        return count; 
      }

      // Creates bilds the images in the panel 
      imgloop(ar) {

        (this.currentDisplayedImgs).length = 0;
        (this.prevSelectedImgs).length = 0;
        
          let ul = document.getElementById(this.moduleId);
          for (let i = 0; i < ar.length; i++) {
              let liId = i+'_' + this.moduleId;
              let img = new Image();
              img.src = ((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
              this.currentDisplayedImgs.push(img.src);
              img.alt = "Camera Trap";
              img.datamarked = 0;
              if(this.placeHolder(img.src)){
                ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' + img.src + '"onerror="'+ "this.style.display='none'" +'"  alt="' + img.alt + '" /> </li>';
              }
              else{
                img.src = '/srv/shiny-server/www/PantheraIDS_image_not_found_2.jpg';
                ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' + img.src +'"  alt="' + img.alt + '" /> </li>';

              }
            
              this.setCol();
          }
      }

      // reset missing images handler (Depreciated)
      resetHandlers(msg)
      {
        if(msg === 'noImages'){
          Shiny.setInputValue('no_srv_imgs', null);
        }
        else{
          Shiny.setInputValue('mssng_srv_imgs', null);
        }
      }

      changeCSS(element)
      {
        $('.'+ element ).css("list-style", none);
        $('.'+ element ).css("margin", 0);
        $('.'+ element ).css("max-width", "500rem");
        $('.'+ element ).css("padding", 0);

        $('.'+ element + '> li').css("border", "2px solid white");
        $('.'+ element + '> li').css("float", "left");
        $('.'+ element + '> li').css("float", "left");

        $('.'+ element + '> li').css({
          'border' : '2px solid white',
          'float' : 'left',
          'width' : 'calc(100% /' + this.columnSize +')',
          'height' : 'calc(100% /' + this.columnSize +')',
          'margin' : '0 -1px -1px 0',
          'overflow' : 'hidden',
        });

        $('.'+ element + '> li > img').css({
          'cursor' : 'pointer',
          'width' : '100%',
          'overflow' : 'hidden'
        });
      }

      // revert to white panel background
      liWhiteBackground()
      {
        let ulclassname = this.ulClassName();
        $('.'+ulclassname+' > li').css("background-color", "white");
      }

      /**
       * @description - indirect call to the vjs() function
       * @returns image view myFunction
       */
      callvjs(elementId) {
        this.vjs(elementId);
        return;
      }

      // HokKey selection 
      keySelection(){

          console.log('keySelection');
          let slctdimgs = [];
          let ulclassname = this.ulClassName();
          let imgs = $('#' + this.moduleId + ' img');
          let start = Math.min.apply(Math,this.hotKeysIndx),
              end = Math.max.apply(Math,this.hotKeysIndx);

          for(let i = start ; i <= end ; i++ ){
            $('#' + imgs[i].id + '').css({
              'opacity': '0.4',
              'filter': 'alpha(opacity=40)'
            });
            $('.'+ulclassname+'> li').css("background-color", "yellow");
            slctdimgs.push(imgs[i].src);
          }
          (this.selected_images).push(...slctdimgs);
          this.selected_images = [...new Set(this.selected_images)]; // remove duplicates
          this.sendAllImages();
          (this.hotKeysIndx).length = 0;
      }

}

