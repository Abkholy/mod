import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollageComponent } from './collage.component';
import { AllCollagesComponent } from './all-collages/all-collages.component';
import { CollageControlComponent } from './collage-control/collage-control.component';
import { CollageRoutingModule } from './collage-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import { AgmCoreModule } from '@agm/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/collage/', '.json');
}
@NgModule({
  declarations: [CollageComponent, AllCollagesComponent, CollageControlComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqQZukuqiPG12VkNYG0JWLf6jXa8bqPfU' 
    }),
    CollageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule,
    NgbModalModule,
    AgGridModule.withComponents([AllCollagesComponent]),
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
export class CollageModule { }
