import { Component, ChangeDetectorRef,ViewChild } from '@angular/core';
import { NavController, ToastController, AlertController, NavParams,Tabs,Platform,ViewController } from 'ionic-angular';
import av from '../../app/getData';
import { user } from '../user/user';
import { home } from '../home/home';
import { BackButtonService } from '../../providers/goBackBtn';
import { getPicService } from '../../providers/getPicService';
const User = av.Object.extend('_User');
const addUser = new User();


@Component({
    selector: 'login',
    templateUrl: 'login.html'
  })
  export class login {
	signIn = true;
	username = '';
	password = '';
	tel = '';
	email = '';
	isSignIn:boolean = true;
	fromUser:boolean = false;
	getIcon:boolean = true;
	uImg:string = '';
	@ViewChild('mainTabs') tabRef: Tabs;	
    constructor(private viewCtrl: ViewController,private GetPicLogin: getPicService,public backButtonService: BackButtonService,public platform:Platform,public navparam:NavParams,public navHome: NavController,public alertCtrl: AlertController, public toastCtrl: ToastController, public sf: ChangeDetectorRef) {
			if(navparam.get('isRelogin')){
				this.fromUser = navparam.get('isRelogin');
			}
			platform.ready().then(() => {
				this.backButtonService.registerBackButtonAction(null);
			});
	}
	presentAlert(text) {
		const alert = this.alertCtrl.create({
			title: '',
			subTitle: text,
			buttons: ['好的']
		});
		alert.present();
	}
	presentToast(text) {
		const toast = this.toastCtrl.create({
			message: text,
			duration: 1000,
			position: 'bottom'
		});
		toast.present();
	}
	isUlogin() {
		this.signIn = false;
	}
	backUser(){
		this.signIn = true;		
	}
	getUser() {
		const that = this;
		addUser.set('username', this.username);
		addUser.set('password', this.password);
		addUser.set('mobilePhoneNumber', this.tel);
		addUser.set('email', this.email);
		if(this.username == '' || this.password == '' || this.tel == '' || this.email == '') {
			this.presentAlert('请输入正确的信息');
		} else {
			addUser.save().then(function(res) {
				that.presentToast('注册成功');
				that.signIn = true;
				that.isSignIn = false;
			}, function(error) {
				that.presentAlert(error.message);
			});
		}
	}
	ulogin() {
		const that = this;
		if(this.username == '' || this.password == '') {
			this.presentAlert('请输入正确的信息');
		} else {
			av.User.logIn(this.username, this.password).then(function(res) {
				if(res) {
					console.log(res)					
					const uid = res.id;
					const username = res.attributes.username;
					const tel = res.attributes.mobilePhoneNumber;
					const email = res.attributes.email;
					const image = res.attributes.uIcon?res.attributes.uIcon:'';
					const time = new Date().getTime()+2592000000;
					const userInfo = {
						uid,
						username,
						tel,
						email,
						image,
						time
					};										
					that.presentToast('登录成功');
					setTimeout(function(){
						const uinfo = JSON.stringify(userInfo);
						localStorage.setItem('user', uinfo);					
						if(image==''){
							that.getIcon = false;							
						}else{							
							if(that.fromUser){
								that.navHome.setRoot(user);
								that.sf.detectChanges();
							}else{
								that.navHome.setRoot(home);
								that.sf.detectChanges();
							}							
						}					
					},300)
				}
			}, function(error) {});
		}
	}
	selectImg() {
		const userSes = localStorage.getItem('user');
		const userLocal = localStorage.getItem('userLocal');
		const uInfo = JSON.parse(userSes);
		const that = this;
		const imgName = new Date().getFullYear() + 'img' + Math.ceil(Math.random() * 20000 + 10000) + '.jpeg';
		if(this.uImg==''){
            that.presentAlert('请选择图片作为头像');
		}else{
			let fileUser = new av.File(imgName, { base64: this.uImg});
			fileUser.save().then(function (res) {
				const uLocal = JSON.parse(userSes);
				if(res.url()){
					that.presentToast('更换成功,正在返回首页');				
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
					userinfos.save().then(function(send) {
						const userLocals = JSON.stringify(uLocal);
						localStorage.setItem('user',userLocals);					
						setTimeout(()=>{
							that.navHome.setRoot(home);
							that.sf.detectChanges();
						},300)
					}, function(error) {
						
					});
					
				}               
			}, function (error) {
			// 异常处理
			}); 
		}		
	}
	getUicon(type) {//1拍照,0从图库选择
		let options = {
		  targetWidth: 400,
		 targetHeight: 400
		};
		if (type == 1) {
		  this.GetPicLogin.getPictureByCamera(options).then(imageBase64 => {
			this.uImg = 'data:image/jpeg;base64,'+ imageBase64;
		  });
	   } else {
		  this.GetPicLogin.getPictureByPhotoLibrary(options).then(imageBase64 => {
			this.uImg = 'data:image/jpeg;base64,'+ imageBase64;
		  });
		}
		this.sf.detectChanges();
	  }
	onKeyUsername(event: any) {
		this.username = event.target.value;
	}
	onKeyPassword(event: any) {
		this.password = event.target.value;
	}
	onKeyEmail(event: any) {
		this.email = event.target.value;
	}
	onKeyTel(event: any) {
		this.tel = event.target.value;
	}
}