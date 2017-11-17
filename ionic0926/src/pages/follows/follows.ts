import { Component, ChangeDetectorRef } from '@angular/core';
import av from '../../app/getData';

@Component({
    selector: 'follows',
    templateUrl: 'follows.html'
})
export class follows{
    MyFollow:any[] = [];
    constructor(public cef: ChangeDetectorRef) {
        const _this = this;
        const myFollow = av.User.current().followeeQuery();
		myFollow.include('followee');
		myFollow.find().then(function(res){
		  //我关注的
		  _this.MyFollow = res;
		  console.log(res)
		  _this.cef.detectChanges(); 
		});
    }
}