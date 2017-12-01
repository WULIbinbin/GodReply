import { Directive, ElementRef,Input,HostListener } from '@angular/core';

@Directive({
    selector:'img[lazyImg]'
  })
  export class imgLoading{   
    @Input('lazyImg')imgUrl:string;
    constructor(el:ElementRef){       
        setTimeout(()=>{          
          let elp:HTMLElement = el.nativeElement.parentNode;         
          el.nativeElement.style = 'opacity:1;';          
          let img = new Image();
          let styles:string;
          let h_w:number;
          img.src = this.imgUrl;
          img.onload =()=>{
            el.nativeElement.style = 'opacity:0;transition:all .2s ease-out;';
            if(img.width>img.height||img.width==img.height){
              h_w = -((img.width/img.height*elp.clientWidth)-elp.clientWidth)*0.5;
              styles = 'opacity:1;transition:all 1.5s ease-out;height:100%;left:'+h_w+'px;';
            }else{
              h_w = -((img.height/img.width*elp.clientHeight)-elp.clientHeight)*0.5;
              styles = 'opacity:1;transition:all 1.5s ease-out;width:100%;top:'+h_w+'px;';
            }
            setTimeout(()=>{
              el.nativeElement.style = styles;
              el.nativeElement.src = this.imgUrl;
            },200)
          }
        },800)   
    }
    @HostListener('click')
    onClick(){
      console.log(this.imgUrl)
      let img = new Image();
      img.src = this.imgUrl
    }
  }