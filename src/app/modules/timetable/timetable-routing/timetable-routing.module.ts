import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimetableControlComponent } from '../timetable-control/timetable-control.component';
import { pages } from 'src/app/shared/pages';
import { AllTimetablesComponent } from '../all-timetables/all-timetables.component';
import { TimetableComponent } from '../timetable.component';
import { StudentGuard } from 'src/app/guards/student.guard';
const routes: Routes = [
  {
    path: '',
    component: TimetableComponent,
    children: [
      {
        path: '',
        component: AllTimetablesComponent,
      },
      {
        path: pages.timetable.all.path,
        component: AllTimetablesComponent
      },
      {
        path: pages.timetable.add.path,
        component: TimetableControlComponent
        	, canActivate: [StudentGuard]
      },
      {
        path: pages.timetable.edit.path,
        component: TimetableControlComponent
        	, canActivate: [StudentGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
