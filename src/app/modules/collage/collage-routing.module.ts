import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollageComponent } from './collage.component';
import { AllCollagesComponent } from './all-collages/all-collages.component';
import { CollageControlComponent } from './collage-control/collage-control.component';
import { pages } from 'src/app/shared/pages';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CollageComponent,
    children: [
      {
        path: '',
        component: AllCollagesComponent,
      },
      {
        path: pages.collage.all.path,
        component: AllCollagesComponent
      },
      {
        path: pages.collage.add.path,
        component: CollageControlComponent
      },
      {
        path: pages.collage.edit.path,
        component: CollageControlComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollageRoutingModule { }
