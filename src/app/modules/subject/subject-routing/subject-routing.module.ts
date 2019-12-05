import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { pages } from 'src/app/shared/pages';
import { SubjectControlComponent } from '../subject-control/subject-control.component';
import { AllSubjectsComponent } from '../all-subjects/all-subjects.component';
import { SubjectComponent } from '../subject.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectComponent,
    children: [
      {
        path: '',
        component: AllSubjectsComponent,
      },
      {
        path: pages.subject.all.path,
        component: AllSubjectsComponent
      },
      {
        path: pages.subject.add.path,
        component: SubjectControlComponent
      },
      {
        path: pages.subject.edit.path,
        component: SubjectControlComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
