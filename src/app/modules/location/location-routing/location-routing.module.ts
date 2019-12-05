import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pages } from 'src/app/shared/pages';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from '../location.component';
import { AllLocationsComponent } from '../all-locations/all-locations.component';
import { LocationControlComponent } from '../location-control/location-control.component';

const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
    children: [
      {
        path: '',
        component: AllLocationsComponent,
      },
      {
        path: pages.location.all.path,
        component: AllLocationsComponent
      },
      {
        path: pages.location.add.path,
        component: LocationControlComponent
      },
      {
        path: pages.location.edit.path,
        component: LocationControlComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LocationRoutingModule { }
