import { Injectable } from '@angular/core';
import { APIDataService } from 'src/app/shared/services/api-data.service';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/API_URLS';
import { map } from 'rxjs/operators';
import { semester } from 'src/app/shared/models/semester';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  allsemesters;
  semester: any;
  constructor(private APIService: APIDataService) {

  }

  save(semester: semester): Observable<any> {
    if (semester) {
      return this.APIService.add(API_URLS.semester.add, semester).pipe(map(res => res));
    }
  }
  update(semester, semesterId: string): Observable<any> {
    if (semester) {
      var url = API_URLS.semester.getOne.replace('{semesterId}', semesterId)
      return this.APIService.update(url, semester).pipe(map(res => res));
    }
  }
  delete(semesterId: string): Observable<any> {
    var url = API_URLS.semester.deleteOne.replace('{semesterId}', semesterId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allsemesters = [];
    return this.APIService.getData(API_URLS.semester.getAll).pipe(
      map((res) => {
        this.allsemesters = res.body;
        return res;
      })
    )
  }
  getOne(semesterId) {
    var url = API_URLS.semester.getOne.replace('{semesterId}', semesterId)

    return this.APIService.getData(url).pipe(map(res => {
      this.semester = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
