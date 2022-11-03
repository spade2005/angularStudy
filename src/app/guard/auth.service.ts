import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
// import {tap, delay} from 'rxjs/operators';
import {CommonService} from "../services/common.service";
import {UserService} from "../services/user.service";
import {Response} from "../models/response";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  redirectUrl: string | null = null;

  tokenName = "jdoc_token";

  constructor(private httpService: UserService, private commonService: CommonService) {
  }

  login(form: any): Observable<Response> {
    return this.httpService.login(form);
    /*
    return of(true).pipe(
      delay(100),
      tap(() => this.isLoggedIn = true)
    );
     */
  }

  logout(): void {
    this.httpService.logout();
    this.isLoggedIn = false;
    this.commonService.setConfig("token", "");
    localStorage.setItem(this.tokenName, "");
  }

  loginAfter(resp: Response) {
    if (resp.data?.token) {
      this.commonService.setConfig("token", resp.data.token);
      localStorage.setItem(this.tokenName, resp.data.token);
      this.isLoggedIn = true;
    }
  }

  autoLogin() {
    let token = localStorage.getItem(this.tokenName)
    if (token) {
      this.isLoggedIn = true
      this.commonService.setConfig("token", token)
    }
  }
}
