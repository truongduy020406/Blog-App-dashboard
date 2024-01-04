import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail!: string;
  isLoggedin$: Observable<boolean> | undefined;

  constructor(private auth:AuthService , private router:Router) { }

  ngOnInit(): void {
    
    
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      this.userEmail = JSON.parse(storedUser).email;
      
    }
    setTimeout(()=>{
      this.isLoggedin$ = this.auth.isLoggedin()
    },0)
  }
  Logout(){
    this.auth.logout();
  }

}
