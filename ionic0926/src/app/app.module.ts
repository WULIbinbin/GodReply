import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { hello } from '../pages/hello-ionic/hello-ionic';
import { user } from '../pages/user/user';
import { share } from '../pages/share/share';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//新组件要放declarations和entryComponents，新组件的import命名和他的ts的classname一致
@NgModule({
	declarations: [
		MyApp,
		hello,
		user,
		share
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp)		
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		hello,
		user,
		share
	],
	providers: [
		StatusBar,
		SplashScreen,
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		}
	]
})
export class AppModule {}