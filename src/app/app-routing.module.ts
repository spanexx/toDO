import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignupComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: 'todo-list', component: TodoListComponent},
  {path: 'create-project', component: CreateProjectComponent},
  {path: 'login', component: LogInComponent},
  {path: 'signup', component: SignupComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
