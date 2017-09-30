import { Component } from '@angular/core';
import av from '../../app/getData';


@Component({
	selector: 'page-hello-ionic',
	templateUrl: 'share.html'
})
export class share {
	qinfo = [];
	constructor() {
		const getQuan = new av.Query('uQuan');
		getQuan.find().then(function(res) {
			console.log(res)
			const item = {};
			const qimg:String = '';
			const qctx:String = '';
			const qtit:String = '';
			item = {qimg,qctx,qtit}
			for(let i=0;i<res.length;i++){
				qimg = res[i].attributes.image.attributes.url;
				qctx = res[i].attributes.context;
				qtit = res[i].attributes.title;			
				qinfo.push(item);				
			}
			console.log(qinfo)
		}, function(error) {

		});
	}

}