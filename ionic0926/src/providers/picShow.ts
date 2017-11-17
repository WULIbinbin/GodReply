import { Injectable,Directive, ElementRef,Input,HostListener } from '@angular/core';
import { Platform } from 'ionic-angular';

@Directive({
    selector:'img[imgCut]'
  })
  export class imgCut{
    @Input('imgCut')imgUrl:string;
    constructor(el:ElementRef){
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf("Linux") > -1; //android终端        
          
    }
  }