import { Directive, ElementRef,Input,HostListener } from '@angular/core';

@Directive({
    selector:'div[showImg]'
  })
  export class imgShow{   
    @Input('showImg')imgArr:HTMLElement;
    constructor(el:ElementRef){
         
    }
    @HostListener('click')
    onClick(){
      console.log(this.imgArr);
    }
  }