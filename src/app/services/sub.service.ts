import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor(private afs : AngularFirestore , private router:Router , private toastr:ToastrService) { }

  
  loadData (){
    return this.afs.collection('subscribers').snapshotChanges().pipe(
       map(actions =>{
         return actions.map(a =>{
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { data  ,id} 
         })
       })
     )
   }

   DeleteSub(id:string ){
    this.afs.doc(`subscribers/${id}`).delete().then(()=>{
      // this.router.navigate(['/subscribers'])
      this.toastr.success('delete sub successfully!')
    })
  }
}
