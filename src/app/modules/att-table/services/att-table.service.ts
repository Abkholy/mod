import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/API_URLS';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { attTable } from 'src/app/shared/models/attTable';
import { APIDataService } from 'src/app/shared/services/api-data.service';

@Injectable({
  providedIn: 'root'
})
export class AttTableService {
  allattTables;
  attTable: any;
  constructor(private APIService: APIDataService) {

  }

  save(attTable: attTable): Observable<any> {
    if (attTable) {
      return this.APIService.add(API_URLS.attTable.add, attTable).pipe(map(res => res));
    }
  }
  update(attTable, attTableId: string): Observable<any> {
    if (attTable) {
      var url = API_URLS.attTable.getOne.replace('{attTableId}', attTableId)
      return this.APIService.update(url, attTable).pipe(map(res => res));
    }
  }
  delete(attTableId: string): Observable<any> {
    var url = API_URLS.attTable.deleteOne.replace('{attTableId}', attTableId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allattTables = [];
    return this.APIService.getData(API_URLS.attTable.getAll).pipe(
      map((res) => {
        this.allattTables = res.body ;
        return res;
      })
    )
  }
  getOne(attTableId) {
    var url = API_URLS.attTable.getOne.replace('{attTableId}', attTableId)

    return this.APIService.getData(url).pipe(map(res => {
      this.attTable = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
