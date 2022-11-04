import {Injectable} from '@angular/core';
import {CommonService} from "./common.service";
import {Observable} from "rxjs";
import {Response} from "../models/response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: CommonService) {
  }

  login(user: any): Observable<Response> {
    return this.http.post('/auth/login', user)
  }

  logout(): Observable<Response> {
    return this.http.get('/auth/logout')
  }

  register(user: any): Observable<Response> {
    return this.http.post('/auth/register', user)
  }


  info(): Observable<Response> {
    return this.http.get('/user/info')
  }


  save(user: any): Observable<Response> {
    return this.http.post('/user/save', user)
  }


}
