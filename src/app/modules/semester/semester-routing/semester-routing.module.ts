import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { pages } from 'src/app/shared/pages';
import { SemesterControlComponent } from '../semester-control/semester-control.component';
import { SemesterComponent } from '../semester.component';
import { AllSemestersComponent } from '../all-semesters/all-semesters.component';


const routes: Routes = [
  {
    path: '',
    component: SemesterComponent,
    children: [
      {
        path: '',
        component: AllSemestersComponent,
      },
      {
        path: pages.semester.all.path,
        component: AllSemestersComponent
      },
      {
        path: pages.semester.add.path,
        component: SemesterControlComponent
      },
      {
        path: pages.semester.edit.path,
        component: SemesterControlComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SemesterRoutingModule { }
