import { Injectable, EventEmitter } from '@angular/core';
import { API_URLS } from 'src/app/shared/API_URLS';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { users } from 'src/app/shared/models/users';
import { APIDataService } from 'src/app/shared/services/api-data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  allusers;
  users: any;
  public isUser: EventEmitter<any> = new EventEmitter();
  public isStudent: EventEmitter<any> = new EventEmitter();


  constructor(private APIService: APIDataService) {
  }

  save(users: users): Observable<any> {
    if (users) {
      return this.APIService.add(API_URLS.users.add, users).pipe(map(res => res));
    }
  }
  update(users, usersId: string): Observable<any> {
    if (users) {
      var url = API_URLS.users.getOne.replace('{usersId}', usersId)
      return this.APIService.update(url, users).pipe(map(res => res));
    }
  }
  delete(usersId: string): Observable<any> {
    var url = API_URLS.users.deleteOne.replace('{usersId}', usersId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allusers = [];
    return this.APIService.getData(API_URLS.users.getAll).pipe(
      map((res) => {
        this.allusers = res.body;
        return res;
      })
    )
  }
  getOne(usersId) {
    var url = API_URLS.users.getOne.replace('{usersId}', usersId)

    return this.APIService.getData(url).pipe(map(res => {
      this.users = res;
      return res;
    }))
  }
  getIfStuddent(usersId) {
    var url = API_URLS.users.getOne.replace('{usersId}', usersId)
    return this.APIService.getData(url).pipe(map(res => {
      this.users = res.body;
      if (this.users.firstName.substring(0, 7) != 'student') {
        return true;
      } else{
        return false;
      }
    }))
  }
  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
  
  public setIsUser(value) {
    this.isUser.emit(value);
  }
  public setIsStudent(value) {
    this.isStudent.emit(value);
  }

}
