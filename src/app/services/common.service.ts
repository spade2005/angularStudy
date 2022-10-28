import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Response} from "../models/response";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  host: string = "http://localhost:8080";
  config: any = {}

  constructor(private http: HttpClient) {
  }

  getConfig(key: string): any {
    return this.config[key] ?? '';
  }

  setConfig(key: string, val: any): void {
    this.config[key] = val
  }

  get(url: string, data?: any): Observable<Response> {
    url = this.host + url;
    return this.http.get<Response>(url, {params: new HttpParams({fromObject: data})}).pipe(
      catchError(this.handleError<Response>("get:" + url))
    );
  }

  post(url: string, data?: any): Observable<Response> {
    url = this.host + url;
    return this.http.post<Response>(url, data).pipe(
      catchError(this.handleError<Response>("post:" + url))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      /*
      let d = this.dialog.open(CommonDialogComponent, {"width": "500px", "height": "180px", data: {"content": error}});
      setTimeout(() => {
        d.close()
      }, 2000);
       */

      // TODO: send the error to remote logging infrastructure
      console.log(operation)
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
