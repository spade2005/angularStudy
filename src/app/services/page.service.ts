import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Response} from "../models/response";
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: CommonService) { }

  item(id: number): Observable<Response> {
    return this.http.get('/api/v1/item', {id: id})
  }

  create(data: any): Observable<Response> {
    return this.http.post('/page/create', data)
  }

  update(data: any): Observable<Response> {
    return this.http.post('/page/update', data)
  }

  del(data: any): Observable<Response> {
    return this.http.post('/page/del', data)
  }

  one(id: number): Observable<Response> {
    return this.http.get('/page/one', {id: id})
  }

}
