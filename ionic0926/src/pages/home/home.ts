import { Component, ChangeDetectorRef,ViewChild } from '@angular/core';
import { NavController,Tabs,Slides } from 'ionic-angular';
import av from '../../app/getData';
import { write } from '../write/write';
import { login } from '../login/login';
import { userInfo } from '../userInfo/userInfo';
import { imgload } from '../../providers/imgload';
//import { imgLoading } from '../../providers/imgLoading';
//import { imgShow } from '../../providers/showImg';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class home {
  @ViewChild('mainTabs') tabRef: Tabs;
  @ViewChild(Slides) slides: Slides;
  forces:any[] = [];
  slideIndex:number = 0;
  basePath:string;
  disView:string = '';
  constructor(public imghome:imgload, public navCtrl: NavController, public cd: ChangeDetectorRef) {    
    this.basePath = imghome.imgUrl();
    const nUser = new av.Query('uArtive');
    const that = this;
    const loginTime = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).time:'0';
    const nTime = new Date().getTime();
    if(loginTime<nTime||!loginTime||!localStorage.getItem('user')){
      setTimeout(()=>{        
        that.navCtrl.push(login,{
          item1:''
        });             
      },200)
    }  
    nUser.find().then(function(res){
       that.forces = res.reverse();
       that.cd.detectChanges();
    },function(err){
    });
     
  }
  discussBtn(uid,tid){
    this.disView = tid;
    console.log(tid,uid)
  }
  gotoUserInfo(uid){
    this.navCtrl.push(userInfo,{
      uid:uid
    });
  }
  gotocreate(){
    this.navCtrl.push(write,{
			item1:''
		});
  }
  slideChanged(){
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex>2){
      currentIndex = 2;
    }
    this.slideIndex = currentIndex;
  }
  gotoSlide(i){
    this.slides.slideTo(i, 200, true);
  }
}
