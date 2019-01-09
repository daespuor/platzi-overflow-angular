import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzi-overflow';

  constructor(private authService:AuthService, private router:Router){}

  isLogged(){
    return this.authService.isLogin();
  }

  fullName(){
    return this.authService.currentUser.getFullName();
  }

  logout(){
    this.authService.logout(this.router);
  }
}
