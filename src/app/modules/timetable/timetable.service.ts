import { Injectable } from '@angular/core';
import { APIDataService } from 'src/app/shared/services/api-data.service';
import { API_URLS } from 'src/app/shared/API_URLS';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { timetable } from 'src/app/shared/models/timetable';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
 alltimetables;
  timetable: any;
  constructor(private APIService: APIDataService) {

  }

  save(timetable: timetable): Observable<any> {
    if (timetable) {
      return this.APIService.add(API_URLS.timetable.add, timetable).pipe(map(res => res));
    }
  }
  update(timetable, timetableId: string): Observable<any> {
    if (timetable) {
      var url = API_URLS.timetable.getOne.replace('{timetableId}', timetableId)
      return this.APIService.update(url, timetable).pipe(map(res => res));
    }
  }
  delete(timetableId: string): Observable<any> {
    var url = API_URLS.timetable.deleteOne.replace('{timetableId}', timetableId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.alltimetables = [];
    return this.APIService.getData(API_URLS.timetable.getAll).pipe(
      map((res) => {
        this.alltimetables = res.body;
        return res;
      })
    )
  }
  getOne(timetableId) {
    var url = API_URLS.timetable.getOne.replace('{timetableId}', timetableId)

    return this.APIService.getData(url).pipe(map(res => {
      this.timetable = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
