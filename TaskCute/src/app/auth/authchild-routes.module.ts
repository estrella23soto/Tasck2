//import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";

const childRoutes:Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent}

  // Auth routes for authenticated users

]


@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class AuthChildRoutesModule{}
