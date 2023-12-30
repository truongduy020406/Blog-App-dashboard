import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail!:string | null ;
  isLoggedin$: Observable<boolean> | undefined;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if(userString){
       this.userEmail = JSON.parse(userString).email
    }
    console.log(this.userEmail)

  }
  Logout(){
    this.auth.logout();
    console.log("ddmmm")
  }

}
