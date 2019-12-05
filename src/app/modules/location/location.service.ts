import { Injectable } from '@angular/core';
import { APIDataService } from 'src/app/shared/services/api-data.service';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/API_URLS';
import { map } from 'rxjs/operators';
import { location } from 'src/app/shared/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  alllocations;
  location: any;
  constructor(private APIService: APIDataService) {

  }

  save(location: location): Observable<any> {
    if (location) {
      return this.APIService.add(API_URLS.location.add, location).pipe(map(res => res));
    }
  }
  update(location, locationId: string): Observable<any> {
    if (location) {
      var url = API_URLS.location.getOne.replace('{locationId}', locationId)
      return this.APIService.update(url, location).pipe(map(res => res));
    }
  }
  delete(locationId: string): Observable<any> {
    var url = API_URLS.location.deleteOne.replace('{locationId}', locationId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.alllocations = [];
    return this.APIService.getData(API_URLS.location.getAll).pipe(
      map((res) => {
        this.alllocations = res.body;
        return res;
      })
    )
  }
  getOne(locationId) {
    var url = API_URLS.location.getOne.replace('{locationId}', locationId)

    return this.APIService.getData(url).pipe(map(res => {
      this.location = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
