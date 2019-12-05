import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemesterComponent } from './semester.component';
import { AllSemestersComponent } from './all-semesters/all-semesters.component';
import { SemesterControlComponent } from './semester-control/semester-control.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ResizeOptions, ImageCompressService } from 'ng2-image-compress';
import { NgbModalModule, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SemesterRoutingModule } from './semester-routing/semester-routing.module';
import { AgmCoreModule } from '@agm/core';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/location/', '.json');
}
@NgModule({
  declarations: [SemesterComponent, AllSemestersComponent, SemesterControlComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqQZukuqiPG12VkNYG0JWLf6jXa8bqPfU'
    }),
    SemesterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule,
    NgbModalModule,
    AgGridModule.withComponents([AllSemestersComponent]),
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
export class SemesterModule { }
