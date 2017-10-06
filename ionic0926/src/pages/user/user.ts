import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import av from '../../app/getData';
import { hello } from '../hello-ionic/hello-ionic';

const User = av.Object.extend('_User');
const addUser = new User();
const userSes = localStorage.getItem('user');
const userLocal = localStorage.getItem('userLocal');

@Component({
	selector: 'page-hello-ionic',
	templateUrl: 'user.html'
})
export class user {
	baseImg = localStorage.getItem('userLocal')?JSON.parse(localStorage.getItem('userLocal')).icon:'';
	userName = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).username:'';
	@ViewChild('mainTabs') tabRef: Tabs;
	tab1Root: any = hello;
	constructor(public navCtrl: NavController, public changeDetectorRef: ChangeDetectorRef) {
		this.baseImg = JSON.parse(userLocal).icon;
	}	
	selectImg(event) {
		const _this = this;
		const file = event.srcElement.files[0];
		const reader = new FileReader();
		const uInfo = JSON.parse(userSes);
		if(!/image\/\w+/.test(file.type)) {
			return false;
		}
		if(file.size <= 105000) {
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				_this.baseImg = this.result;
				const imgName = new Date().getFullYear() + 'img' + Math.ceil(Math.random() * 2000 + 1000) + '.png';
				const fileUser = new av.File(imgName, file);				
				var todo = av.Object.createWithoutData('_User', uInfo.uid);
				todo.set('image', fileUser);
				todo.save().then(function (res) {
					if(userLocal) {
						const uLocal = JSON.parse(userLocal);
						uLocal.icon = res.attributes.image.attributes.url;
						const userLocals = JSON.stringify(uLocal);
						localStorage.setItem('userLocal',userLocals);
					}else{
						const icon = res.attributes.image.attributes.url;
						const userLocal = {icon}
						const userLocals = JSON.stringify(userLocal);
						localStorage.setItem('userLocal',userLocals);
					}
				  }, function (error) {
					// 异常处理
				  });			
			}
		} else {
			alert('图片不能大于100k')
		}

	}
}