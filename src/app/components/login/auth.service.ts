import { Injectable } from '@angular/core';
import { APIDataService } from 'src/app/shared/services/api-data.service';
import { API_URLS }  from 'src/app/shared/API_URLS';
import { authentication } from 'src/app/shared/models/authentication';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private APIService: APIDataService) { }
 
  login(authentication: authentication): Observable<any> {
    if (authentication) {
      return this.APIService.login(API_URLS.auth.add, authentication).pipe(map(res => res));
  }
 }

 
}