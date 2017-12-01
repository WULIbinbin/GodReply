import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Nav, AlertController, ToastController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';

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