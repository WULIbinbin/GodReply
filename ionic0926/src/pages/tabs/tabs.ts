import { Component, ViewChild } from '@angular/core';
import { Tabs,Platform } from 'ionic-angular';
import { home } from '../home/home';
import { share } from '../share/share';
import { user } from '../user/user';
import { BackButtonService } from '../../providers/goBackBtn';

@Component({
    selector: 'tabs',
    templateUrl: 'tabs.html'
  })
export class TabsPage {
    @ViewChild('mainTabs') tabRef: Tabs;
    tab1Root: any = home;
	tab2Root: any = share;
	tab3Root: any = user;
    constructor(public platform:Platform,public backButtonService: BackButtonService){       
        platform.ready().then(() => {
            this.backButtonService.registerBackButtonAction(this.tabRef);
        });
    }
}