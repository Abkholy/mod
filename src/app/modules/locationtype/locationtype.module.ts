import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocationtypeComponent } from './locationtype.component';
import { AllLocationTypesComponent } from './all-location-types/all-location-types.component';
import { LocationtypeControlComponent } from './locationtype-control/locationtype-control.component';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { LocationtypeRoutingModule } from './locationtype-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { NgModule } from '@angular/core';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/locationType/', '.json');
}
@NgModule({
  declarations: [LocationtypeComponent, AllLocationTypesComponent, LocationtypeControlComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqQZukuqiPG12VkNYG0JWLf6jXa8bqPfU'
    }),
    LocationtypeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule,
    NgbModalModule,
    AgGridModule.withComponents([AllLocationTypesComponent]),
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
export class LocationtypeModule { }
