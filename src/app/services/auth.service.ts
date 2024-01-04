import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggerIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private afAuth : AngularFireAuth , private toastr:ToastrService , private router:Router) { }


  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password).then(logref =>{
      this.loadUser();
    }).catch(e=>{ 
      this.toastr.warning(e)
    })
  }
  loadUser(){
    this.afAuth.authState.subscribe(user =>{
      localStorage.setItem('user',JSON.stringify(user))
      this.loggerIn.next(true)
      this.router.navigate(['/'])
      this.toastr.success("login is successfully")
      
      
    })
  }
  
  logout(){   
      localStorage.removeItem('user');
      this.loggerIn.next(false)
      this.router.navigate(['/login'])
      this.toastr.success('user logout successfully') 
  }
  isLoggedin(){
    let userId = localStorage.getItem('user')
    if(userId){
      this.loggerIn.next(true)
    }else {
      this.loggerIn.next(false)
    }
    return this.loggerIn.asObservable();
  }
  
}
 