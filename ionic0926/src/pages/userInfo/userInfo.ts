import { Component ,ChangeDetectorRef } from '@angular/core';
import { NavController, ToastController, AlertController, NavParams,Tabs,Platform } from 'ionic-angular';
import av from '../../app/getData';
import { home } from '../home/home';
import { imgLoading } from '../../providers/imgLoading';
import { imgload } from '../../providers/imgload';

@Component({
	selector: 'page-userInfo',
	templateUrl: 'userInfo.html'
})
export class userInfo {
    username:string = '';
    uicon:string = '';
    uid:string = '';
    Fans:string = '';
    basePath:string;
    forceThen:String = '关注';
	constructor(private imgUinfo:imgload,public uidparam:NavParams,public cdsx: ChangeDetectorRef,public uidnav:NavController) {
        let that = this;
        this.basePath = imgUinfo.imgUrl();
        const myUid = JSON.parse(localStorage.getItem('user'));
        if(uidparam.get('uid')){
            this.uid = uidparam.get('uid');
            const getUser = new av.Query('_User');
            getUser.get(this.uid).then(function(res) {
                that.uid = res.id;
                that.username = res.attributes.username;
                if(res.attributes.uIcon){
                    that.uicon = res.attributes.uIcon;
                    console.log(that.uicon)
                }
                that.cdsx.detectChanges();
            }, function(error) {
    
            });           
            const fans = av.User.current().followerQuery();//new av.Query('_Follower');           
            fans.include('follower');
            fans.equalTo('user',{className:'_User',objectId:this.uid,__type:'Pointer'});
            console.log(fans)
            fans.find().then(function(follow){
                that.Fans = follow.length; 
                for(let i in follow){
                     if(follow[i].id==myUid.uid){
                        that.forceThen = '已关注';
                     }
                }
            }).then(function(){})
        }else{
            this.uidnav.pop();
        }
		
	}
    showQuan (){
		
    }
    toForce(){
        const _this = this;
        av.User.current().follow(this.uid).then(function(res){
           if(res){
              _this.forceThen = '已关注';
              console.log(res)         
           }
        }, function(err){
          console.dir(err);
        });
      }
}
