import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../guard/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {username: 'test1', password: 'test1'};
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.goHome();
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login(this.user).subscribe((res) => {
      if (res.data?.token) {
        this.message = "login success";
        this.authService.loginAfter(res);
      } else {
        this.message = "login error:" + res.message;
      }
      this.goHome();
    });
  }

  goHome() {
    if (this.authService.isLoggedIn) {
      let redirectUrl = '/admin/book';
      if (this.authService.redirectUrl) {
        redirectUrl = this.authService.redirectUrl;
        this.authService.redirectUrl = '';
      }
      console.log("go home go to xxx", redirectUrl);
      this.router.navigate([redirectUrl]);
    }
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }

}
