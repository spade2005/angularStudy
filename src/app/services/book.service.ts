import {Injectable} from '@angular/core';
import {CommonService} from "./common.service";
import {Observable} from "rxjs";
import {Response} from "../models/response";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: CommonService) {
  }

  create(book: any): Observable<Response> {
    return this.http.post('/book/create', book)
  }

  update(book: any): Observable<Response> {
    return this.http.post('/book/update', book)
  }

  del(book: any): Observable<Response> {
    return this.http.post('/book/del', book)
  }

  one(id: number): Observable<Response> {
    return this.http.get('/book/one', {id: id})
  }

  list(form: any): Observable<Response> {
    return this.http.get('/book/list', form)
  }


}
