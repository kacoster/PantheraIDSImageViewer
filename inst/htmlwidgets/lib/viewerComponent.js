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
  }


  readServerData(response) {
    if(response === null )
    {
      alert(" Error in reading your images.Please check if all requirements are provided.");
    }
    else{
      this.imgArray = response.split(',');
      this.imgArray.splice(0, 1);
      this.imgArray[0] = this.imgArray[0].replace("Source", "");
      this.imgArray[0] = this.imgArray[this.imgArray.length - 1] + this.imgArray[0];
      this.imgArray.splice(this.imgArray.length - 1, 1);
      if(this.moduleId === "img_clssfctn_ud")
      {
        Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
        1 + " / " + this.getBatchNumber());
      }
    }
    this.imgloop(this.displayImages(this.imgNumb,0));
  }

  initializeImgArray(array)
  {
    this.imgArray = [...arr];
  }

  highliter(elementID)
  {
      $('#' + elementID + '').css({
          'opacity': '0.4',
          'filter': 'alpha(opacity=40)'
      });
      $(".pictures > li").css("background-color", "yellow");
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

   //console.log("ul class Name : " + $("ul").attr("class"));
      $('.pictures > li').css({
              'width' : 'calc(100% /' + this.columnSize +')'
          });
  }

  getCurrClckdImg(state, imgsrc)
  {
      Shiny.onInputChange(state,imgsrc);
  }

  /** Not Yet Generic */
  handleExistance(params,src,id)
  {
      if(params.includes(src))
      {
          this.tempRemoved =  (params.splice(params.indexOf(src),1))[0];
          this.removeHighlight(id);
          if(params.length > 0)
          {
              this.getCurrClckdImg("clssfctn_slctd_img",this.getTrimedSelectedImages().toString());
          }else{
              this.getCurrClckdImg("clssfctn_slctd_img",""); 
          }
      }
      else{
        if(this.isPlacveHolder(src))
        {
          console.log("Cant Process Place Holder Image orig");
          selectionFind(true);
        }
        else{
          params.push(src);
          this.highliter(id);
          this.getCurrClckdImg("clssfctn_slctd_img",this.getTrimedSelectedImages().toString());
        }
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

  // This is specific to tag #
  selectAll() {
    $("img").each(function (index) {
      $('#' + $(this).attr('id') + '').css({
        'opacity': '0.1',
        'filter': 'alpha(opacity=40)'
      });
      this.selected_images.push($(this).attr('src'));
    });
    return this.selected_images;

  }

  deSelectAll() {
    $("img").each(function (index) {
      $('#' + $(this).attr('id') + '').css({
        'opacity': '',
        'filter': ''
      });
      // selected_images.splice(selected_images.indexOf($( this ).attr('src')), 1);
    });
    this.selected_images.length = 0;
  }

  sendDataToShinny(){
    if (this.selected_images === undefined || this.selected_images.length === 0) {
      alert("No Images Selected !!");
      return ;
    }
    else{
      const copy_selected_images = [...this.selected_images];
      this.deSelectAll();
      return copy_selected_images;
    }
  }

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

  imgloop(ar) {
    this. placeHolder();
    console.log("PantheraIDSImageViewer : " );
    if(this.checkImageExistance(ar) == ar.length)
    {
      if(this.moduleId === "img_clssfctn_ud"){
        console.log('no_srv_imgs');
        Shiny.setInputValue('no_srv_imgs', 'no imgs')
      }
       
    }
    else if(this.checkImageExistance(ar) > 0 && this.checkImageExistance(ar) < ar.length)
    {
      if(this.moduleId === "img_clssfctn_ud"){
        console.log('mssng_srv_imgs');
        Shiny.setInputValue('mssng_srv_imgs', 'missing imgs');
      }

      let ul = document.getElementById(this.moduleId);
      for (let i = 0; i < ar.length; i++) {
          let liId = i + this.moduleId;
          let img = new Image();
          img.src = ((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
          img.alt = "Camera Trap";
          img.datamarked = 0;
          if(this.placeHolder(img.src)){
            ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' + img.src + '"onerror="'+ "this.style.display='none'" +'"  alt="' + img.alt + '" /> </li>';
          }
          else{
            img.src = '/srv/shiny-server/www/PantheraIDS_image_not_found_2.jpg';
            ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' + img.src +'"  alt="' + img.alt + '" /> </li>';

          }
          //ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' + img.src + '"onerror="'+ "this.style.display='none'" +'"  alt="' + img.alt + '" /> </li>';
          this.setCol();
      }
    }
   else{

      let ul = document.getElementById(this.moduleId);
      for (let i = 0; i < ar.length; i++) {
          let liId = i + this.moduleId;
          let img = new Image();
          img.src = ((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
          img.alt = "Camera Trap";
          img.datamarked = 0;
          ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' + img.src + '"onerror="'+ "this.style.display='none'" +'"  alt="' + img.alt + '" /> </li>';
          this.setCol();
      }
    }
  }

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

  liWhiteBackground()
  {
    $(".pictures > li").css("background-color", "white");
  }

  /**
 * @description - indirect call to the vjs() function
 * @returns image view myFunction
 */
 callvjs(elementId) {
  this.vjs(elementId);
  return;
}

/*isKeyPressed(event) {
  console.log(" isKeyPressed(event)");
  console.log("event.target.src : " + event.target.src);
   //arrayClone(this.selected_images);
  if (event.shiftKey) {
    console.log(" isKeyPressed : event.shiftKey");
    this.handleExistance(this.selected_images, event.target.src, event.target.id);
  } else {
    console.log(" isKeyPressed : " + event.click);
    objectOf("imgClassification");
    this.callvjs();
  }
}*/
}

