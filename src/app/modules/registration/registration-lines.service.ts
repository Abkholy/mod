import { Injectable } from '@angular/core';
import { APIDataService } from 'src/app/shared/services/api-data.service';
import { registrationLines } from 'src/app/shared/models/registrationLines';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/API_URLS';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class registrationLinesLinesService {
  allregistrationLiness;
  registrationLines: any;
  constructor(private APIService: APIDataService) {

  }

  save(registrationLines: registrationLines): Observable<any> {
    if (registrationLines) {
      return this.APIService.add(API_URLS.registrationLines.add, registrationLines).pipe(map(res => res));
    }
  }
  update(registrationLines, registrationLinesId: string): Observable<any> {
    if (registrationLines) {
      var url = API_URLS.registrationLines.getOne.replace('{registrationLinesId}', registrationLinesId)
      return this.APIService.update(url, registrationLines).pipe(map(res => res));
    }
  }
  delete(registrationLinesId: string): Observable<any> {
    var url = API_URLS.registrationLines.deleteOne.replace('{registrationLinesId}', registrationLinesId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allregistrationLiness = [];
    return this.APIService.getData(API_URLS.registrationLines.getAll).pipe(
      map((res) => {
        this.allregistrationLiness = res.body;
        return res;
      })
    )
  }
  getOne(registrationLinesId) {
    var url = API_URLS.registrationLines.getOne.replace('{registrationLinesId}', registrationLinesId)

    return this.APIService.getData(url).pipe(map(res => {
      this.registrationLines = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
