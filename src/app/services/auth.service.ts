import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggerIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isLoggerInGuard: boolean = false;

  constructor(private afAuth : AngularFireAuth , private toastr:ToastrService , private router:Router) { }


  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password).then(logref =>{
      this.toastr.success("login is successfully")
      this.loadUser();
      
      this.loggerIn.next(true)
      this.router.navigate(['/'])

    }).catch(e=>{ 
      this.toastr.warning(e)
    })
  }
  loadUser(){
    this.afAuth.authState.subscribe(user =>{
      console.log(JSON.parse(JSON.stringify(user)))
      localStorage.setItem('user',JSON.stringify(user))
    })
  }

  logout(){
    this.afAuth.signOut().then(()=>{
      this.toastr.success('user logout successfully')
      localStorage.removeItem('user');
      this.loggerIn.next(false)
      this.isLoggerInGuard = false
      this.router.navigate(['/login']);
    })
  }

  isLoggedin(){
    return this.loggerIn.asObservable();
  }
}
 