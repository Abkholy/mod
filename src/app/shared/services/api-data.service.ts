import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class APIDataService  {
  headers: HttpHeaders;

  config: Config;
  configUrl = 'assets/config.json';

  data: any;
  credintial: any;
  error: any;
  userID: string;
  httpOptions: { headers: HttpHeaders, observe: 'response' };

  constructor(private http: HttpClient) {
  
  }


  add(url, body, headers?: HttpHeaders): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'Application/json',
        'userId': localStorage.getItem('userId'),
        'Authorization': "Bearer " + localStorage.getItem('token')
      }),
      observe: 'response'
    };
    if (url && body) {
      return this.http.post<Config>(url, body, this.httpOptions)
        .pipe(
          retry(1),
          map(
          data => {
            this.data = data;
            return this.data
          },
          error => {
            console.log('oops', error);
            this.error = error
            return this.error;
          }
        ));
    }
  }

  login(url, body): Observable<any> {

    if (url && body) {
      return this.http.post<Config>(url, body,{observe:'response'})
        .pipe(
          retry(1),
          map(
          data => {
            localStorage.setItem("userId",data.body.userId);
            localStorage.setItem("token",data.body.token);
          
            return data.body
          },
          error => {
           
            console.log('oops', error);
            this.error = error;
            return this.error;
          }
        ));



    }

  }

  update(url, body, headers?: HttpHeaders): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'Application/json',
        'userId': localStorage.getItem('userId'),
        'Authorization': "Bearer " + localStorage.getItem('token')
      }),
      observe: 'response'
    };
    if (url && body) {
      return this.http.put(url, body, this.httpOptions)
        .pipe(
          retry(1),
          map(
          data => {
            this.data = data;
              return this.data
          },
          error => {
            console.log('oops', error);
            this.error = error;
            return this.error;
          }
        ));
    }
  }

  delete(url, headers?: HttpHeaders): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'Application/json',
        'userId': localStorage.getItem('userId'),
        'Authorization': "Bearer " + localStorage.getItem('token')
      }),
      observe: 'response'
    };
    if (url) {
      return this.http.delete<Config>(url, this.httpOptions)
        .pipe(
          retry(1),
          map(
          data => {
            this.data = data
            return this.data
          },
          error => {
            console.log('oops', error);
            this.error
            return this.error;
          }));
    }
  }



  getData(url, headers?: HttpHeaders): Observable<any> {

    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'Application/json',
        'userId': localStorage.getItem('userId'),
        'Authorization': "Bearer " + localStorage.getItem('token')
      }),
      observe: 'response'
    };

    if (url) {
      return this.http.get<Config>(url, this.httpOptions )
        .pipe(
          retry(1),
          map(
          
          data => {
            this.data = data;
            return data
          },
          error => {
            
            console.log('oops', error);
            this.error = error
            return this.error;
          }))

    }
  }


}
