import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentGuard } from './guards/student.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		component: ContainerComponent,
		children: [
			{
				path: '',
				component: DashboardComponent,
				pathMatch: 'full'

			},
						{
				path: 'login',
				component: LoginComponent,
				pathMatch: 'full'
			},

			{
				path: 'collage',
				loadChildren: './modules/collage/collage.module#CollageModule'
				,canActivate: [StudentGuard]
			},
			{
				path: 'locationType',
				loadChildren: './modules/locationtype/locationtype.module#LocationtypeModule'
				, canActivate: [StudentGuard]
			},
			{
				path: 'location',
				loadChildren: './modules/location/location.module#LocationModule'
				, canActivate: [StudentGuard]
			},
			{
				path: 'semester',
				loadChildren: './modules/semester/semester.module#SemesterModule'
				, canActivate: [StudentGuard]
			},	
				{
				path: 'users',
				loadChildren: './modules/users/users.module#UsersModule'
					, canActivate: [StudentGuard]
			},		{
				path: 'student',
				loadChildren: './modules/student/student.module#StudentModule'
					, canActivate: [StudentGuard]
			},	{
				path: 'subject',
				loadChildren: './modules/subject/subject.module#SubjectModule'
					, canActivate: [StudentGuard]
			},	{
				path: 'registration',
				loadChildren: './modules/registration/registration.module#RegistrationModule'
					, canActivate: [StudentGuard]
			},{
					path: 'attTable',
					loadChildren: './modules/att-table/att-table.module#AttTableModule'
					, canActivate: [StudentGuard]
			},{
				path: 'timetable',
					loadChildren: './modules/timetable/timetable.module#TimetableModule'
				, canActivate: [AuthGuard]
			},
			{
				path: '**',
				component: NotFoundComponent,
				pathMatch: 'full'
			}
		]
	}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
