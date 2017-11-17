import { Component, ChangeDetectorRef } from '@angular/core';
import av from '../../app/getData';

@Component({
    selector: 'fans',
    templateUrl: 'fans.html'
})
export class fans{
    Fans:any[] = [];
    constructor(public ctf: ChangeDetectorRef) {
        const _this = this;
        const fans = av.User.current().followerQuery();
        fans.include('follower');
        fans.find().then(function(res){
        //粉丝列表
        _this.Fans = res;
        console.log(res)
        _this.ctf.detectChanges(); 
        });
    }
}