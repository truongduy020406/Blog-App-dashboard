import { Injectable } from '@angular/core';
import {  AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:AngularFirestore , private toastr:ToastrService) { }

  saveData(data:Category){
    this.afs.collection('category').add(data).then(docRef =>{
      console.log(docRef)
      this.toastr.success('Data insert success')
    })
    .catch(err => console.log(err))
  }

  loadData (){
   return this.afs.collection('category').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { data ,id} 
        })
      })
    )
  }

  updateData(id:string , data:Category){
    this.afs.doc(`category/${id}`).update(data).then(docRef =>{
      this.toastr.success('Data update success !')
    })
  }

  deteleData(id:string ){
    this.afs.doc(`category/${id}`).delete().then(docRef =>{
      this.toastr.success('Data delete success !')
    })
  }
}
