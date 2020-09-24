import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload'
import { from } from 'rxjs';
import { AlertifyService } from '../services/alertify-service.service';
import { AuthService } from '../services/auth.service';
import {ActivatedRoute} from '@angular/router'
import { Photo } from '../models/Photo';
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private alertifyService:AlertifyService,private authService:AuthService,private activatedRoute:ActivatedRoute) { }

  photos:Photo[] =[];
  uploader:FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver:boolean;
  baseUrl='https://localhost:44360/api/';
  currentMain:Photo;
  currentCity:any;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.currentCity = params["cityId"]
    })
    this.initializeUploader();
  }

 initializeUploader(){
    this.uploader =new FileUploader({
      url:this.baseUrl +'cities/'+this.currentCity+'/photos',
      authToken: 'Bearer ' +localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType : ['image'],
      autoUpload:false,
      removeAfterUpload: true,
      maxFileSize:10*1024*1024
    })


    this.uploader.onSuccessItem = (item, response, status, headers)=>{
      if(response){
        const res :Photo = JSON.parse(response);
        const photo ={
          id:res.id,
          url:res.url,
          dateAdded:res.dateAdded,
          description:res.description,
          isMain:res.isMain,
          cityId:res.cityId
        }
        this.photos.push(photo)
      }
    }
 
 }

 public fileOverBase(e:any):void {
  this.hasBaseDropZoneOver = e;
}

public fileOverAnother(e:any):void {
  this.hasAnotherDropZoneOver = e;
}

}