
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guards/auth-guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path : 'user',component : UserComponent,canActivate: [AuthGuard]},
    { path: 'login', component: SignInComponent },
    { path: 'register', component: SignUpComponent } ,
    {path:'my/profile',component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

