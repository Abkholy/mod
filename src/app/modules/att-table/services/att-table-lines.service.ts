import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/API_URLS';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { attTableLines } from 'src/app/shared/models/attTableLines';
import { APIDataService } from 'src/app/shared/services/api-data.service';

@Injectable({
  providedIn: 'root'
})
export class AttTableLinesService {
  allattTableLiness;
  attTableLines: any;
  constructor(private APIService: APIDataService) {

  }

  save(attTableLines: attTableLines): Observable<any> {
    if (attTableLines) {
      return this.APIService.add(API_URLS.attTableLines.add, attTableLines).pipe(map(res => res));
    }
  }
  update(attTableLines, attTableLinesId: string): Observable<any> {
    if (attTableLines) {
      var url = API_URLS.attTableLines.getOne.replace('{attTableLinesId}', attTableLinesId)
      return this.APIService.update(url, attTableLines).pipe(map(res => res));
    }
  }
  delete(attTableLinesId: string): Observable<any> {
    var url = API_URLS.attTableLines.deleteOne.replace('{attTableLinesId}', attTableLinesId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allattTableLiness = [];
    return this.APIService.getData(API_URLS.attTableLines.getAll).pipe(
      map((res) => {
        this.allattTableLiness = res.body;
        return res;
      })
    )
  }
  getOne(attTableLinesId) {
    var url = API_URLS.attTableLines.getOne.replace('{attTableLinesId}', attTableLinesId)

    return this.APIService.getData(url).pipe(map(res => {
      this.attTableLines = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
