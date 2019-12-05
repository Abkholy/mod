import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from '../student.component';
import { AllStudentsComponent } from '../all-students/all-students.component';
import { pages } from 'src/app/shared/pages';
import { StudentControlComponent } from '../student-control/student-control.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: AllStudentsComponent,
      },
      {
        path: pages.student.all.path,
        component: AllStudentsComponent
      },
      {
        path: pages.student.add.path,
        component: StudentControlComponent
      },
      {
        path: pages.student.edit.path,
        component: StudentControlComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
