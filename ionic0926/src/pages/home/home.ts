import { Component, ChangeDetectorRef,ViewChild } from '@angular/core';
import { NavController,Tabs } from 'ionic-angular';
import av from '../../app/getData';
import { write } from '../write/write';
import { login } from '../login/login';
import { userInfo } from '../userInfo/userInfo';
import { imgload } from '../../providers/imgload';
import { imgLoading } from '../../providers/imgLoading';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class home {
  @ViewChild('mainTabs') tabRef: Tabs;
  forces:any[] = [];
  forceThen:String = '关注';
  HOME:String = 'HOT';
  basePath:string;
  constructor(private imghome:imgload, public navCtrl: NavController, public cd: ChangeDetectorRef) {    
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
       console.log(that.forces)
       that.cd.detectChanges();
    },function(err){
    });    
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
}
