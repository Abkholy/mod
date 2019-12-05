import { Injectable } from '@angular/core';
import { APIDataService } from './api-data.service';
import { users } from '../models/users';
import { Observable } from 'rxjs';
import { API_URLS } from '../API_URLS';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  allUsers: [];
  user: any;
  constructor(private APIService: APIDataService) { 
   
  }

  save(user: users): Observable<any> {
    if (user) {
      return this.APIService.add(API_URLS.users.add, user).pipe(map(res => res));
    }
  }
  update(user, userId: string): Observable<any> {
    if (user) {
      var url = API_URLS.users.editOne.replace('{usersId}', userId)
      return this.APIService.update(url, user).pipe(map(res => res));
    }
  }
  delete(userId: string): Observable<any> {
    var url = API_URLS.users.deleteOne.replace('{usersId}', userId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allUsers = [];
    return this.APIService.getData(API_URLS.users.getAll).pipe(
      map(res =>res)
    )
  }
  getOne(userId) {
    var url = API_URLS.users.getOne.replace('{usersId}', userId)
console.log(url)
    return this.APIService.getData(url).pipe(map(res =>res))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }

}
