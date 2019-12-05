import { Injectable } from '@angular/core';
import { APIDataService } from 'src/app/shared/services/api-data.service';
import { Subject, Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/API_URLS';
import { map } from 'rxjs/operators';
import { subject } from 'src/app/shared/models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  allsubjects;
  subject: any;
  constructor(private APIService: APIDataService) {

  }

  save(subject: subject): Observable<any> {
    if (subject) {
      return this.APIService.add(API_URLS.subject.add, subject).pipe(map(res => res));
    }
  }
  update(subject, subjectId: string): Observable<any> {
    if (subject) {
      var url = API_URLS.subject.getOne.replace('{subjectId}', subjectId)
      return this.APIService.update(url, subject).pipe(map(res => res));
    }
  }
  delete(subjectId: string): Observable<any> {
    var url = API_URLS.subject.deleteOne.replace('{subjectId}', subjectId)

    return this.APIService.delete(url).pipe(map(res => res));
  }

  getAll() {
    this.allsubjects = [];
    return this.APIService.getData(API_URLS.subject.getAll).pipe(
      map((res) => {
        this.allsubjects = res.body;
        return res;
      })
    )
  }
  getOne(subjectId) {
    var url = API_URLS.subject.getOne.replace('{subjectId}', subjectId)

    return this.APIService.getData(url).pipe(map(res => {
      this.subject = res;
      return res;
    }))
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
