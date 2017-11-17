import { Injectable } from '@angular/core';
import {  App, NavController } from 'ionic-angular';


@Injectable()
export class imgload {
    constructor() {
        
    }
    imgUrl(){
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf("Linux") > -1; //android终端
        if(isAndroid){
            return 'assets/'
        }else{
            return '../assets/'
        }
    }

}