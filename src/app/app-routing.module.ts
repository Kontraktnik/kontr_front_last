import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserGuard} from "./shared/guards/user.guard";
import {AdminGuard} from "./shared/guards/admin.guard";
import {AuthGuard} from "./shared/guards/auth.guard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ServerErrorComponent} from "./server-error/server-error.component";
import {GuestGuard} from "./shared/guards/guest.guard";
import {KnbGuard} from "./shared/guards/knb.guard";
import {MedGuard} from "./shared/guards/med.guard";
import {DirectorGuard} from "./shared/guards/director.guard";
import {ExecutorGuard} from "./shared/guards/executor.guard";
import {TestComponent} from "./test/test.component";

const routes: Routes = [
  {
    path:"",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path:"",
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path:"",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canActivate: [GuestGuard]
  },
  {
    path:"",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:"",
    loadChildren: () => import('./knb/knb.module').then(m => m.KnbModule),
    canActivate: [AuthGuard, KnbGuard]
  },
  {
    path:"",
    loadChildren: () => import('./med/med.module').then(m => m.MedModule),
    canActivate: [AuthGuard, MedGuard]
  },
  {
    path:"",
    loadChildren: () => import('./executor/executor.module').then(m => m.ExecutorModule),
    canActivate: [AuthGuard,ExecutorGuard]
  },{
    path:"",
    loadChildren: () => import('./director/director.module').then(m => m.DirectorModule),
    canActivate: [AuthGuard,DirectorGuard]
  },
  {
    path:"test",
    component:TestComponent,
    },
  {
    path: "not-found",
    component: NotFoundComponent
  },
  {
    path: "server-error",
    component: ServerErrorComponent
  },
  {
    path: "**",
    redirectTo: 'not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserGuard, AdminGuard, AuthGuard, GuestGuard, DirectorGuard, ExecutorGuard, KnbGuard, MedGuard]
})
export class AppRoutingModule { }
