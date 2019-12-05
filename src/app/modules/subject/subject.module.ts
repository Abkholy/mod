import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject.component';
import { SubjectControlComponent } from './subject-control/subject-control.component';
import { AllSubjectsComponent } from './all-subjects/all-subjects.component';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { NgbModalModule, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SubjectRoutingModule } from './subject-routing/subject-routing.module';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/subject/', '.json');
}
@NgModule({
  declarations: [SubjectComponent, SubjectControlComponent, AllSubjectsComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqQZukuqiPG12VkNYG0JWLf6jXa8bqPfU'
    }),
    SubjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule,
    NgbModalModule,
    AgGridModule.withComponents([AllSubjectsComponent]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    })
  ],
  exports: [
    NgbModule,
    NgbTypeaheadModule,
    NgbModalModule
  ], providers: [ImageCompressService, ResizeOptions]
})
export class SubjectModule { }
