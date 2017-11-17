import { Injectable } from '@angular/core';
import { Platform, ToastController, App, NavController, Tabs,Keyboard } from 'ionic-angular';
import { home } from '../pages/home/home';
import { share } from '../pages/share/share';
import { user } from '../pages/user/user';

@Injectable()
export class BackButtonService {
  //控制硬件返回按钮是否触发，默认false
  backButtonPressed: boolean = false;
  //构造函数 依赖注入
  checkPage: boolean = false;
  constructor(public keyboard:Keyboard,public platform: Platform,public appCtrl: App,public toastCtrl: ToastController) {
     
  }
  getPageChange(){
    let currentCmp = this.appCtrl.getActiveNav().getActive().component;  
    let isPage1= currentCmp === home; 
    let isPage2= currentCmp === share;
    let isPage3= currentCmp === user;
    if (isPage1 || isPage2 || isPage3 ) {  
        this.checkPage = true  
      } else {  
        this.checkPage = false  
      } 
  }
  //注册方法
  registerBackButtonAction(tabRef: Tabs): void {    
    //registerBackButtonAction是系统自带的方法
    this.platform.registerBackButtonAction(() => {
        this.getPageChange();
    if (this.checkPage||tabRef==null) {  
        //如果是根目则按照需求1处理  
            this.showExit()  
          } else {  
        //非根目录返回上一级页面  
            if(this.keyboard.isOpen()){
                this.keyboard.close();
            }else{
                if(this.appCtrl.getActiveNav().canGoBack()){
                    this.appCtrl.goBack();
                }else{
                    this.appCtrl.goBack();
                }
            }  
          }
    },20);
  }
  private showExit(): void {
    //如果为true，退出
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
        //第一次按，弹出Toast
        this.toastCtrl.create({
            message: '再按一次退出应用',
            duration: 2000,
            position: 'top'
        }).present();
      //标记为true
      this.backButtonPressed = true;
      //两秒后标记为false，如果退出的话，就不会执行了
      setTimeout(() => this.backButtonPressed = false, 2000);
    }
  }
}