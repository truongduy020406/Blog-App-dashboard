import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategorysComponent } from './categorys/categorys.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'', component:DashboardComponent , canActivate:[AuthGuard]},
  {path:'categorys', component:CategorysComponent},
  {path:'posts', component:AllPostComponent},
  {path:'posts/new', component:NewPostComponent},
  {path:'login', component:LoginComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
