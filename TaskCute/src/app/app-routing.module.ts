import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing'
import { TasckComponent } from './tasck/tasck.component';
import { TaskTabComponent } from './task-tab/task-tab.component';


const routes: Routes = [
  { path: 'tareas', component: TasckComponent },
  {path: 'list-tareas', component:TaskTabComponent},
  {path: '', pathMatch : 'full', redirectTo: 'users/register'},
  {path: '**', pathMatch : 'full', redirectTo: 'users/inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
