import {Injectable} from '@angular/core';
import {HttpClient, HttpParams,HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Response} from "../models/response";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  host: string = "http://localhost:8080";
  config: any = {}

  constructor(private http: HttpClient, public router: Router) {
  }

  getConfig(key: string): any {
    return this.config[key] ?? '';
  }

  setConfig(key: string, val: any): void {
    this.config[key] = val
  }

  /*
    get(url: string, data?: any): Observable<Response> {
      url = this.host + url;
      return this.http.get<Response>(url, {params: new HttpParams({fromObject: data})}).pipe(
        catchError(this.handleError<Response>("get:" + url))
      );
    }
    */
  get(url: string, data?: any): Observable<Response> {
    url = this.host + url;
    let str = this.formatParams(data);
    /*
    console.log(p, "post 2 data");
    console.log(new HttpParams({fromObject: data}), "post 3 data");
    return of({
      code: 1,
      message: 'fuck',
      data: null
    });
    */
    return this.http.get<Response>(url, {params: new HttpParams({fromString: str})}).pipe(
      catchError(this.handleError<Response>("get:" + url))
    );
  }

  post(url: string, data?: any): Observable<Response> {
    url = this.host + url;
    return this.http.post<Response>(url, data).pipe(
      catchError(this.handleError<Response>("post:" + url))
    );
  }

  formatParams(data: any): string {
    let str = '';
    if (!data) {
      return str;
    }
    for (let k in data) {
      // console.log(k, data[k], typeof data[k], "--");
      if (typeof data[k] != 'object') {
        str += k + "=" + data[k];
        str += '&';
      } else {
        for (let kk in data[k]) {
          // console.log(kk, data[k][kk], typeof data[k][kk], "--2");
          str += k + '[' + kk + ']=' + data[k][kk];
          str += '&';
        }
      }
    }
    return str.substring(0, str.length - 1);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {

      /*
      let d = this.dialog.open(CommonDialogComponent, {"width": "500px", "height": "180px", data: {"content": error}});
      setTimeout(() => {
        d.close()
      }, 2000);
       */

      // TODO: send the error to remote logging infrastructure
      console.log("clog",operation)
      console.error("clog",error); // log to console instead
      if(error.status==401){
        this.router.navigate(['/logout']);
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
