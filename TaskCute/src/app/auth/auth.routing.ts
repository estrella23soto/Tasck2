import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
//import { AuthGuard } from 'app/core/auth/guards/auth.guard';

const routes:Routes = [

  {
      path: 'users',
      //canActivate: [NoAuthGuard],
      //canActivateChild: [NoAuthGuard],
      //component: LayoutComponent,
      loadChildren:() => import('./authchild-routes.module').then(m=> m.AuthChildRoutesModule)
  },
  // {path: 'sign-in', component:AuthSignInComponent },

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

