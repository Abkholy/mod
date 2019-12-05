import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users.component';
import { AllUsersComponent } from '../all-users/all-users.component';
import { UsersControlComponent } from '../users-control/users-control.component';
import { pages } from 'src/app/shared/pages';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: AllUsersComponent,
      },
      {
        path: pages.users.all.path,
        component: AllUsersComponent
      },
      {
        path: pages.users.add.path,
        component: UsersControlComponent
      },
      {
        path: pages.users.edit.path,
        component: UsersControlComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
