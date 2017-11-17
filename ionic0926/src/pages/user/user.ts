import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, Tabs,ActionSheetController,ViewController } from 'ionic-angular';
import av from '../../app/getData';
import { home } from '../home/home';
import { fans } from '../fans/fans';
import { follows } from '../follows/follows';
import { login } from '../login/login';
import { getPicService } from '../../providers/getPicService';


@Component({
	selector: 'user',
	templateUrl: 'user.html'
})
export class user {
	MyFollow:any[] = [];
	Fans:any[] = [];
	baseImg = JSON.parse(localStorage.getItem('user')).image?JSON.parse(localStorage.getItem('user')).image:'';
	userName = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).username:'';
	userPhone =  localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).tel:'';
	@ViewChild('mainTabs') tabRef: Tabs;
	tab1Root: any = home;
	constructor(private viewCtrl: ViewController,private GetPicUser: getPicService,public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public changeDetectorRef: ChangeDetectorRef) {		
		this.getFans();	
	}
	getFans(){
		const _this = this;
		const myFollow = av.User.current().followeeQuery();
		myFollow.include('followee');
		myFollow.find().then(function(res){
		  //我关注的
		  _this.MyFollow = res;
		  console.log(res)
		  _this.changeDetectorRef.detectChanges(); 
		});
		const fans = av.User.current().followerQuery();
		console.log(fans)
		fans.include('follower');
		fans.find().then(function(res){
		  //粉丝列表
		  _this.Fans = res;
		  console.log(res)
		  _this.changeDetectorRef.detectChanges(); 
		});
	}
	gotofans(){
		this.navCtrl.push(fans,{
			item1:''
		  });
	}	
	gotofollows(){
		this.navCtrl.push(follows,{
			item1:''
		  });
	}
	gotologin(){
		this.navCtrl.push(login,{
			isRelogin:true
		  });
	}
	doRefreshMy(refresh){
		const _this = this;
        setTimeout(()=>{
			_this.getFans()
			_this.changeDetectorRef.detectChanges(); 
			refresh.complete();
		},1800)
	}
	selectImg(img64) {
		const userSes = localStorage.getItem('user');
		const userLocal = localStorage.getItem('userLocal');
		const uInfo = JSON.parse(userSes);
		const that = this;
    const imgName = new Date().getFullYear() + 'img' + Math.ceil(Math.random() * 20000 + 10000) + '.jpeg';
		let fileUser = new av.File(imgName, { base64: img64});
		fileUser.save().then(function (res) {                  
			that.baseImg = res.url();
			const uLocal = JSON.parse(userSes);
			if(res.url()){				
				if(uLocal.iconId){
					let file = av.File.createWithoutData(uLocal.iconId);
					file.destroy().then(function (success) {						
					}, function (error) {
					});									
				}
				uLocal.image = res.url();
				uLocal.iconId = res.id;				
				const userinfos = av.Object.createWithoutData('_User',uLocal.uid);
				userinfos.set('uIcon', res.url());			
				userinfos.save().then(function(res) {
					
				}, function(error) {
					
				});
				const userLocals = JSON.stringify(uLocal);
				localStorage.setItem('user',userLocals);
			}               
		}, function (error) {
		// 异常处理
		}); 

	}
	presentActionSheet(event) {      
		let that = this;
		let actionSheet = this.actionSheetCtrl.create({
		  title: '选择相册或拍照',
		  buttons: [
			{
			  text: '从相册选择',
			  handler: () => {
				that.getPicture(0);             
			  }
			},{
			  text: '拍照',
			  handler: () => {
				that.getPicture(1);            
			  }
			},{
			  text: '取消',
			  handler: () => {
				that.baseImg = JSON.parse(localStorage.getItem('user')).image?JSON.parse(localStorage.getItem('user')).image:'';;
			  }
			}
		  ]
		});     
		actionSheet.present();
	  }
	  getPicture(type) {//1拍照,0从图库选择
		  let options = {
			 targetWidth: 3000,
		   targetHeight: 3000
		  };
		  if (type == 1) {
			this.GetPicUser.getPictureByCamera(options).then(imageBase64 => {
			  this.baseImg = 'data:image/jpeg;base64,'+ imageBase64;
			  this.selectImg(this.baseImg);
			});
		 } else {
			this.GetPicUser.getPictureByPhotoLibrary(options).then(imageBase64 => {
			  this.baseImg = 'data:image/jpeg;base64,'+ imageBase64;
			  this.selectImg(this.baseImg);
			});
		  }
		  this.changeDetectorRef.detectChanges();
		}
}