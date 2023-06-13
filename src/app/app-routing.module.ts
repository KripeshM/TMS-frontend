import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import RegisterComponent from './register/register.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignedTaskComponent } from './assigned-task/assigned-task.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'task-manager',component:TaskManagerComponent
  },
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'assigned-task',component:AssignedTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
