import { Injectable } from '@angular/core';
import { APIDataService } from 'src/app/shared/services/api-data.service';
import { API_URLS } from 'src/app/shared/API_URLS';
import { Observable } from 'rxjs';
import { collage } from 'src/app/shared/models/collage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollageService {

  allCollages;
  collage: any;
  constructor(private APIService: APIDataService) {

  }

  save(collage: collage): Observable<any> {
    if (collage) {
      return this.APIService.add(API_URLS.collage.add, collage).pipe(map(res => res));
    }
  }
  update(collage, collageId: string): Observable<any> {
    if (collage) {
      var url = API_URLS.collage.getOne.replace('{collageId}', collageId)
      return this.APIService.update(url, collage).pipe(map(res => res));
    }
  }
  delete(collageId: string): Observable<any> {
    var url = API_URLS.collage.deleteOne.replace('{collageId}', collageId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allCollages = [];
    return this.APIService.getData(API_URLS.collage.getAll).pipe(
      map((res) => {
        this.allCollages = res.body;
        return res;
      })
    )
  }
  getOne(collageId) {
    var url = API_URLS.collage.getOne.replace('{collageId}', collageId)

    return this.APIService.getData(url).pipe(map(res => {
      this.collage = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
