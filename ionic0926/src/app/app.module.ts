import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import { MyApp } from './app.component';
import { home } from '../pages/home/home';
import { user } from '../pages/user/user';
import { share } from '../pages/share/share';
import { fans } from '../pages/fans/fans';
import { write } from '../pages/write/write';
import { follows } from '../pages/follows/follows';
import { login } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { userInfo } from '../pages/userInfo/userInfo';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { getPicService } from '../providers/getPicService';
import { BackButtonService } from '../providers/goBackBtn';
import { imgload } from '../providers/imgload';
import { imgLoading } from '../providers/imgLoading';
import { imgCut } from '../providers/picShow';
//新组件要放declarations和entryComponents，新组件的import命名和他的ts的classname一致
@NgModule({
	declarations: [
		MyApp,
        TabsPage,
		home,
		user,
		share,
		fans,
		follows,
		write,
		login,
		userInfo,
		imgLoading,
		imgCut
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp,{
			tabsHideOnSubPages: 'true',
			mode:'md'
		})		
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		TabsPage,
		home,
		user,
		share,
		fans,
		follows,
		write,
		login,
		userInfo
	],
	providers: [
		StatusBar,
		SplashScreen,
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		},
		getPicService,
		BackButtonService,
		imgload,
		imgLoading,
		imgCut		
	]
})
export class AppModule {}