import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Tabs, NavController, Nav, AlertController, ToastController } from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import { home } from '../pages/home/home';
import { user } from '../pages/user/user';
import { share } from '../pages/share/share';
import { login } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import av from './getData';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage = TabsPage;	
	@ViewChild('myNav') nav: Nav;	
	backButtonPressed: boolean = false;
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public ssx: ChangeDetectorRef) {
		
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
	
}