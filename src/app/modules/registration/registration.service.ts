import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/API_URLS';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { registration } from 'src/app/shared/models/registration';
import { APIDataService } from 'src/app/shared/services/api-data.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  allregistrations;
  registration: any;
  constructor(private APIService: APIDataService) {

  }

  save(registration: registration): Observable<any> {
    if (registration) {
      return this.APIService.add(API_URLS.registration.add, registration).pipe(map(res => res));
    }
  }
  update(registration, registrationId: string): Observable<any> {
    if (registration) {
      var url = API_URLS.registration.getOne.replace('{registrationId}', registrationId)
      return this.APIService.update(url, registration).pipe(map(res => res));
    }
  }
  delete(registrationId: string): Observable<any> {
    var url = API_URLS.registration.deleteOne.replace('{registrationId}', registrationId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allregistrations = [];
    return this.APIService.getData(API_URLS.registration.getAll).pipe(
      map((res) => {
        this.allregistrations = res.body;
        return res;
      })
    )
  }
  getOne(registrationId) {
    var url = API_URLS.registration.getOne.replace('{registrationId}', registrationId)

    return this.APIService.getData(url).pipe(map(res => {
      this.registration = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
