import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, Tabs,Platform } from 'ionic-angular';
import { home } from '../home/home';
import { fans } from '../fans/fans';
import { follows } from '../follows/follows';
import { login } from '../login/login';
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