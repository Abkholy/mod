import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/API_URLS';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { locationType } from 'src/app/shared/models/locationType';
import { APIDataService } from 'src/app/shared/services/api-data.service';

@Injectable({
  providedIn: 'root'
})
export class locationTypeService {
  alllocationTypes;
  locationType: any;
  constructor(private APIService: APIDataService) {

  }

  save(locationType: locationType): Observable<any> {
    if (locationType) {
      return this.APIService.add(API_URLS.locationType.add, locationType).pipe(map(res => res));
    }
  }
  update(locationType, locationTypeId: string): Observable<any> {
    if (locationType) {
      var url = API_URLS.locationType.getOne.replace('{locationTypeId}', locationTypeId)
      return this.APIService.update(url, locationType).pipe(map(res => res));
    }
  }
  delete(locationTypeId: string): Observable<any> {
    var url = API_URLS.locationType.deleteOne.replace('{locationTypeId}', locationTypeId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.alllocationTypes = [];
    return this.APIService.getData(API_URLS.locationType.getAll).pipe(
      map((res) => {
        this.alllocationTypes = res.body;
        return res;
      })
    )
  }
  getOne(locationTypeId) {
    var url = API_URLS.locationType.getOne.replace('{locationTypeId}', locationTypeId)

    return this.APIService.getData(url).pipe(map(res => {
      this.locationType = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
