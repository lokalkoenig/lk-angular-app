import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { ResultSet } from './result-set';
import {KampagnenEntity} from './entity/KampagnenEntity';

@Injectable()

export class KampagnenSearchService {
  public set:ResultSet;

  constructor(private http: Http) {}

  getId(id: number): Observable<KampagnenEntity> {
    var url = `http://lk-prod.dev/ng-test/?id=` + id;
    return Observable.create(observer => {
      this.http.get(url)
          .map(res => res.json())
          .subscribe((data) => {
             observer.next(data);
             observer.complete();
          });
   });
  }

  search(options: object): Observable<ResultSet> {
    let params: URLSearchParams = new URLSearchParams();
    Object.keys(options).forEach(function(key) {
      params.set(key, options[key]);
    });
 
    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    var url = `http://lk-prod.dev/ng-test/`;
    return Observable.create(observer => {
      this.http.get(url, requestOptions)
          .map(res => res.json())
          .subscribe((data) => {
             this.set = data;
             
             observer.next(this.set);
             observer.complete();
          });
   });
  }
}
