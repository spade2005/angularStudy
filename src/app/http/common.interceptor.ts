import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {CommonService} from "../services/common.service";

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonService,) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.commonService.getConfig('token')
      }
    });//这里可以在请求中加参数
    return next.handle(req).pipe(tap(() => {
      // console.log(`tag message`,r)
      // console.log(r)
    }),);
  }
}
