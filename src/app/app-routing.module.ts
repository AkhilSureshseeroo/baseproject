import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';

const routes: Routes = [
  //Redirect empty path to dashboard
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  //After sign-in ,the user is directed to sign-in redirected path
  { path: "signed-in-redirect", pathMatch: "full", redirectTo: "dashboard" },
  {path:"signed-up-redirect",pathMatch:"full",redirectTo:"profile"},
  {
    path: "sign-in",
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    loadChildren: () =>
      import("./modules/auth/sign-in/sign-in.module").then(
        (m) => m.SignInModule
      ),
  },
  {
    path: "sign-out",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import("src/app/modules/auth/sign-out/sign-out.module").then(
        (m) => m.SignOutModule
      ),
  },
  {
    path: "sign-up",
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    loadChildren: () =>
      import("src/app/modules/auth/sign-up/sign-up.module").then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: "profile",
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    loadChildren: () =>
      import("src/app/modules/auth/profile/profile.module").then(
        (m) => m.ProfileModule
      ),
  },

  {
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: "",
    loadChildren: () =>
      import("./modules/inner/inner.module").then((m) => m.InnerModule),
  },
  { path: "**", redirectTo: "dashboard" },



  // {
  //   path:"sign-up",
  //   canActivate: [NoAuthGuard],
  //   canActivateChild: [NoAuthGuard],
  //   loadChildren: () =>
  //     import("./modules/inner/inner.module").then((m) => m.InnerModule),


  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
