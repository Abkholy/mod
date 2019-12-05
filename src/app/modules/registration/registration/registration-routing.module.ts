import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationControlComponent } from '../registration-control/registration-control.component';
import { pages } from 'src/app/shared/pages';
import { AllRegistrationComponent } from '../all-registration/all-registration.component';
import { RegistrationComponent } from '../registration.component';
const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    children: [
      {
        path: '',
        component: AllRegistrationComponent,
      },
      {
        path: pages.registration.all.path,
        component: AllRegistrationComponent
      },
      {
        path: pages.registration.add.path,
        component: RegistrationControlComponent
      },
      {
        path: pages.registration.edit.path,
        component: RegistrationControlComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
