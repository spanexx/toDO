import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../enviroments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TaskUpdateFormComponent } from './task-update-form/task-update-form.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { NavComponent } from './header/nav/nav.component';
import { FilterComponent } from './components/filter/filter.component';
import { HighPriorityComponent } from './components/high-priority/high-priority.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { UserComponent } from './components/user/user.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { UserInterceptor } from './interceptors/user';
import { LoaderComponent } from './utility/loader/loader.component';
import { SnackbarComponent } from './utility/snackbar/snackbar.component';


@NgModule({
  declarations: [
    AppComponent,
    AddTodoFormComponent,
    HomeComponent,
    TodoListComponent,
    FilterComponent,
    TaskUpdateFormComponent,
    HeaderComponent,
    SearchComponent,
    HighPriorityComponent,
    CreateProjectComponent,
    NavComponent,
    UserComponent,
    LogInComponent,
    SignupComponent,
    LoaderComponent,
    SnackbarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot({ 
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    RouterLink,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatMenuModule,
    TooltipModule.forRoot(),
    HttpClientModule

  ],
  providers: [
    provideAnimationsAsync(),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: UserInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
