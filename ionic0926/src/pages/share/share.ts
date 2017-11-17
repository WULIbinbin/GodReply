import { Component ,ChangeDetectorRef } from '@angular/core';
import av from '../../app/getData';


@Component({
	selector: 'page-hello-ionic',
	templateUrl: 'share.html'
})
export class share {
    Data:any = [];
	constructor(public cds: ChangeDetectorRef) {
		var _this = this;
		const getQuan = new av.Query('uQuan');
		getQuan.find().then(function(res) {
			console.log(res);
			_this.Data = res;
			_this.cds.detectChanges();
		}, function(error) {

		});
	}
    showQuan (){
		
	}
}
