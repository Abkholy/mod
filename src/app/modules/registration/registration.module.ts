import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RegistrationControlComponent } from './registration-control/registration-control.component';
import { AllRegistrationComponent } from './all-registration/all-registration.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { NgbModalModule, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import 'ag-grid-enterprise';

import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { RegistrationRoutingModule } from './registration/registration-routing.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/registation/', '.json');
}
@NgModule({
  declarations: [RegistrationComponent, RegistrationControlComponent, AllRegistrationComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqQZukuqiPG12VkNYG0JWLf6jXa8bqPfU'
    }),
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule,
    NgbModalModule,
    AgGridModule.withComponents([AllRegistrationComponent, RegistrationControlComponent]),
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
export class RegistrationModule { }
