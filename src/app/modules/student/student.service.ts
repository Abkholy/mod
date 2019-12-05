import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/API_URLS';
import { Observable } from 'rxjs';
import { APIDataService } from 'src/app/shared/services/api-data.service';
import { map } from 'rxjs/operators';
import { student } from 'src/app/shared/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  allstudents;
  student: any;
  constructor(private APIService: APIDataService) {

  }

  save(student: student): Observable<any> {
    if (student) {
      return this.APIService.add(API_URLS.student.add, student).pipe(map(res => res));
    }
  }
  update(student, studentId: string): Observable<any> {
    if (student) {
      var url = API_URLS.student.getOne.replace('{studentId}', studentId)
      return this.APIService.update(url, student).pipe(map(res => res));
    }
  }
  delete(studentId: string): Observable<any> {
    var url = API_URLS.student.deleteOne.replace('{studentId}', studentId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allstudents = [];
    return this.APIService.getData(API_URLS.student.getAll).pipe(
      map((res) => {
        this.allstudents = res.body;
        return res;
      })
    )
  }
  getOne(studentId) {
    var url = API_URLS.student.getOne.replace('{studentId}', studentId)

    return this.APIService.getData(url).pipe(map(res => {
      this.student = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
