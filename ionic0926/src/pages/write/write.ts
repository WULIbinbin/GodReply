import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ToastController,LoadingController,ViewController,ActionSheetController } from 'ionic-angular';
import av from '../../app/getData';
import { home } from '../home/home';
import {Camera} from 'ionic-native';
import { getPicService } from '../../providers/getPicService';
import { imgload } from '../../providers/imgload';

@Component({
    selector: 'write',
    templateUrl: 'write.html'
  })
  export class write {
    imgArr:any[] = []; 
    events:object = {};
    artInfo:String = '';
    location:String = location.href;
    doNotOpen = false;
    isChange: boolean = false;//头像是否改变标识
    avatarPath: string = '';//用户默认头像
    imageBase64: string;//保存头像base64,用于上传
    choImg:string = '';
    basePath:string = '';  
    constructor(private imgwrite:imgload,private viewCtrl: ViewController,private GetPicService: getPicService,public toastCtrl: ToastController,private loadingCtrl: LoadingController,public nav: NavController,public cdw: ChangeDetectorRef,public actionSheetCtrl: ActionSheetController) {
        this.basePath = imgwrite.imgUrl();
    }
    presentToast(msg) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 3000
        });
        toast.present();
    }
    getImg(e){
        const userSes = localStorage.getItem('user');
        const Artive = av.Object.extend('uArtive');
        const addArtive = new Artive();
        const iArr = [];
        const mgArr = [];
        const that = this;
        const imgName = new Date().getFullYear() + 'img' + Math.ceil(Math.random() * 20000 + 10000) + '.jpeg';
        const imgEle = document.getElementsByClassName('imgCho');
        const uinfo = JSON.parse(userSes);
        for(let i=0;i<imgEle.length;i++){            
            if((imgEle[i] as HTMLInputElement).src.indexOf('data:image/jpeg;base64')>-1){
                iArr.push((imgEle[i] as HTMLInputElement).src)
            }
            
        }
        console.log(iArr)
        if(iArr.length>0){
            for(let j=0;j<iArr.length;j++){
                let fileUser = new av.File(imgName, { base64: iArr[j]});               
                if(j==iArr.length-1){
                    fileUser.save().then(function (res) {                  
                        mgArr.push(res.url());
                        that.imgArr = mgArr;            
                        setTimeout(()=>{
                            sendArt(uinfo.uid,uinfo.username,that.imgArr,uinfo.image,that.doNotOpen,that.artInfo);
                        },400);               
                    }, function (error) {
                    // 异常处理
                    });
                }else{
                    fileUser.save().then(function (res) {                  
                        mgArr.push(res.url());
                        that.imgArr = mgArr;                   
                    }, function (error) {
                    // 异常处理
                    });
                }
            }  
        }else{
            sendArt(uinfo.uid,uinfo.username,[],uinfo.image,that.doNotOpen,that.artInfo);
        }
        function sendArt(uId,uname,actImg,uImg,doNotOpen,artInfo){
            addArtive.set('uId', uId);
            addArtive.set('uname',uname);
            addArtive.set('artImg',actImg);
            addArtive.set('uImg',uImg);
            addArtive.set('doNotOpen', doNotOpen);
            addArtive.set('artInfo',artInfo);                    
            addArtive.save().then(function(res) {
                console.log(res);                
                if(res){
                    that.presentToast('发布成功');
                    setTimeout(()=>{
                        that.nav.setRoot(home);//进行跳转回首页，直接重新将home创建设置为根目录，然后刷新;
                        that.cdw.detectChanges();
                    },600)
                }
            }, function(error) {
               
            });
        }                 
    }
    presentActionSheet(event) {      
      let that = this;
      let actionSheet = this.actionSheetCtrl.create({
        title: '选择相册或拍照',
        buttons: [
          {
            text: '从相册选择',
            handler: () => {
              that.getPicture(0,event);             
            }
          },{
            text: '拍照',
            handler: () => {
              that.getPicture(1,event);            
            }
          },{
            text: '取消',
            handler: () => {
              this.choImg = '';
            }
          }
        ]
      });     
      actionSheet.present();
    }
    getPicture(type,event) {//1拍照,0从图库选择
        let options = {
          //targetWidth: 3000,
          //targetHeight: 3000
        };
        if (type == 1) {
          this.GetPicService.getPictureByCamera(options).then(imageBase64 => {
            // this.getPictureSuccess(imageBase64);
            this.choImg = 'data:image/jpeg;base64,'+ imageBase64;
            event.path[1].children[0].src = this.choImg;
          });
       } else {
          this.GetPicService.getPictureByPhotoLibrary(options).then(imageBase64 => {
            // this.getPictureSuccess(imageBase64);
            this.choImg = 'data:image/jpeg;base64,'+ imageBase64;
            event.path[1].children[0].src = this.choImg;
          });
        }
        this.cdw.detectChanges();
      }   
  }