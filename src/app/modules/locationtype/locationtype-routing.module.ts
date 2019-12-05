import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LocationtypeControlComponent } from './locationtype-control/locationtype-control.component';
import { AllLocationTypesComponent } from './all-location-types/all-location-types.component';
import { LocationtypeComponent } from './locationtype.component';
import { pages } from 'src/app/shared/pages';

const routes: Routes = [
  {
    path: '',
    component: LocationtypeComponent,
    children: [
      {
        path: '',
        component: AllLocationTypesComponent,
      },
      {
        path: pages.locationType.all.path,
        component: AllLocationTypesComponent
      },
      {
        path: pages.locationType.add.path,
        component: LocationtypeControlComponent
      },
      {
        path: pages.locationType.edit.path,
        component: LocationtypeControlComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationtypeRoutingModule { }
