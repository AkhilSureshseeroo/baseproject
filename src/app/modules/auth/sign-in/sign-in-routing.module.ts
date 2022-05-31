import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  {path: '', component: SignInComponent},
  //  {path:'sign-up',component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
