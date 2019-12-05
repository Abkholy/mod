import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { AllLocationsComponent } from './all-locations/all-locations.component';
import { LocationControlComponent } from './location-control/location-control.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { LocationRoutingModule } from './location-routing/location-routing.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/location/', '.json');
}
@NgModule({
  declarations: [LocationComponent, AllLocationsComponent, LocationControlComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqQZukuqiPG12VkNYG0JWLf6jXa8bqPfU'
    }),
    LocationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule,
    NgbModalModule,
    AgGridModule.withComponents([AllLocationsComponent]),
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
export class LocationModule { }
