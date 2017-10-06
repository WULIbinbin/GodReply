import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Tabs, NavController, Nav, AlertController, ToastController } from 'ionic-angular';
import { hello } from '../pages/hello-ionic/hello-ionic';
import { user } from '../pages/user/user';
import { share } from '../pages/share/share';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import av from './getData';
const User = av.Object.extend('_User');
const addUser = new User();
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	login = true;
	signIn = true;
	username = '';
	password = '';
	tel = '';
	email = '';
	@ViewChild('mainTabs') tabRef: Tabs;
	tab1Root: any = hello;
	tab2Root: any = share;
	tab3Root: any = user;
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController) {
		if(localStorage.getItem('user')) {
			this.login = true;
		} else {
			this.login = false;
		}
	}
	presentAlert(text) {
		const alert = this.alertCtrl.create({
			title: 'binbin',
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
	getUser() {
		const _this = this;
		addUser.set('username', this.username);
		addUser.set('password', this.password);
		addUser.set('mobilePhoneNumber', this.tel);
		addUser.set('email', this.email);
		if(this.username == '' || this.password == '' || this.tel == '' || this.email == '') {
			this.presentAlert('请输入正确的信息');
		} else {
			addUser.save().then(function(res) {
				_this.presentToast('注册成功');
				this.signIn = true;
			}, function(error) {
				console.error(error.message);
			});
		}
	}
	ulogin() {
		const _this = this;
		if(this.username == '' || this.password == '') {
			this.presentAlert('请输入正确的信息');
		} else {
			av.User.logIn(this.username, this.password).then(function(res) {
				if(res) {
					console.log(res)					
					const uid = res.id;
					const username = res.attributes.username;
					const tel = res.mobilePhoneNumber;
					const email = res.attributes.email;
					const image = res.attributes.image.attributes.url;
					const userInfo = {
						uid,
						username,
						tel,
						email,
						image
					};
					const uinfo = JSON.stringify(userInfo);
					localStorage.setItem('user', uinfo);					
					_this.presentToast('登录成功');
					setInterval(function(){
						_this.login = true;
					},300)
				}
			}, function(error) {});
		}
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