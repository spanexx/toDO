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
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FilterComponent } from './filter/filter.component';
import { TaskUpdateFormComponent } from './task-update-form/task-update-form.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HighPriorityComponent } from './high-priority/high-priority.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CreateProjectComponent } from './create-project/create-project.component';
import { NavComponent } from './header/nav/nav.component';


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
    NavComponent

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
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    RouterLink,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatMenuModule,
    TooltipModule.forRoot()

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
