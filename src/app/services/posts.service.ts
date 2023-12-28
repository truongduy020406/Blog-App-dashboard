import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage:AngularFireStorage,
    private afs:AngularFirestore , 
    private toastr:ToastrService,
    private router: Router
    ) { }

  UploadImg(selectedImg:string , postData:Post , formStatus:string , id:string){
    const filePath = `postIMG/${Date.now()}`;
    this.storage.upload(filePath,selectedImg).then(()=>{

      // tao link img 
      this.storage.ref(filePath).getDownloadURL().subscribe(URL =>{
        postData.postImgPath = URL

        if(formStatus === 'Edit'){
          this.updateData(id,postData)
        }else if(formStatus==='Add New'){
          this.saveData(postData)
        }
       
       
      })
    })
  }

  saveData(postData:Post){
    this.afs.collection('posts').add(postData).then(()=>{
      this.toastr.success("Data insert success !")
      this.router.navigate(['/posts'])
    })
  }

  
  loadData (){
    return this.afs.collection('posts').snapshotChanges().pipe(
       map(actions =>{
         return actions.map(a =>{
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { data  ,id} 
         })
       })
     )
   }

   loadOneData(id:string){
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id:string , postData:Post){
    this.afs.doc(`posts/${id}`).update(postData).then(()=>{

      this.toastr.success('data update successfully!');
      this.router.navigate(['/posts'])
    })
  }

  DeleteImage(postIMGpath:string,id : string){
    this.storage.storage.refFromURL(postIMGpath).delete().then(()=>{
      this.DeleteData(id)
    })
  }
  DeleteData(id:string ){
    this.afs.doc(`posts/${id}`).delete().then(()=>{
      this.toastr.success('data delete successfully!');
      this.router.navigate(['/posts'])
    })
  }


  markFeature( id : string ,featureData:any){
      this.afs.doc(`posts/${id}`).update(featureData).then(()=>{
         this.toastr.info('Featured Status Update')
      })
  }
}
