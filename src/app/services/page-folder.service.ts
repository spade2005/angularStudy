import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Response} from "../models/response";
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class PageFolderService {

  constructor(private http: CommonService) {
  }

  itemType(id: number): Observable<Response> {
    return this.http.get('/api/v1/item-type', {id: id})
  }

}
