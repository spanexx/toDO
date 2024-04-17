import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore'; 
import { Todo, SubTasks } from '../Models/Todo';
import { Observable, from, throwError } from 'rxjs'; 
import { catchError, map, } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandleService } from './error-handle.service';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private firestore: AngularFirestore, private errorHandlerService: ErrorHandleService) { 
    
  }


  // Get all todos (with IDs)
  getTodos(): Observable<Todo[]> {
    return this.firestore.collection('todos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
      catchError(error => this.errorHandlerService.handleError(error)) 
    );
  }

  // Get a Todo with an Id
  getTask(taskId: string): Observable<Todo | undefined> {
    return this.firestore.collection('tasks').doc(taskId).get().pipe(
      map(taskSnapshot => taskSnapshot.exists ? taskSnapshot.data() as Todo : undefined),
      catchError(error => this.errorHandlerService.handleError(error)) 
    )
  }

  // Create a new todo
  createTodo(todo: Todo): Observable<Todo> {
    todo.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return from(this.firestore.collection('todos').add(todo)).pipe( 
      map((action) => { 
        const id = action.id;
        return { id, ...todo };
      }),
      catchError(error => this.errorHandlerService.handleError(error)) 
    );
  }

  // Update a todo
  updateTodo(todoId: string, todo: Todo): Observable<void> {
    todo.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return from(this.firestore.collection('todos').doc(todoId).update(todo)).pipe(
      catchError(error => this.errorHandlerService.handleError(error)) 
    );
  }

  // Delete a todo
  deleteTask(todoId: string): Observable<void> {
    return from(this.firestore.collection('todos').doc(todoId).delete()).pipe(
      catchError(error => this.errorHandlerService.handleError(error)) 
    );
  }


  getTasksByStatus(priority: string): Observable<{ id: string, data: Todo }[]> {
    return this.firestore.collection('todos', ref => ref.where('priority', '==', priority))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Todo;
          const id = a.payload.doc.id;
          return { id, data };
        })),
        catchError(error => this.errorHandlerService.handleError(error)) 
      );
  }


  //SubTasks 

addSubtask(todoId: string, subtask: SubTasks): Observable<void> {
  return from(this.firestore.collection('todos').doc(todoId).update({
    subtasks: firebase.firestore.FieldValue.arrayUnion(subtask) 
  })).pipe(
    catchError(error => this.errorHandlerService.handleError(error)) 
  );
}

// Update an existing subtask
updateSubtask(todoId: string, subtaskId: string, subtask: SubTasks): Observable<void> {
  return from(this.firestore.collection('todos').doc(todoId).collection('subtasks').doc(subtaskId).update(subtask))
  .pipe(
    catchError(error => this.errorHandlerService.handleError(error)) 
  );
}

// Delete a subtask
deleteSubtask(todoId: string, subtaskId: string): Observable<void> {
  return from(this.firestore.collection('todos').doc(todoId).collection('subtasks').doc(subtaskId).delete())
  .pipe(
    catchError(error => this.errorHandlerService.handleError(error)) 
  );
}

// Fetch subtasks for a specific todo (Optional)
getSubtasks(todoId: string): Observable<SubTasks[]> {
  return this.firestore.collection('todos').doc(todoId).collection<SubTasks>('subtasks').valueChanges()
  .pipe(
    catchError(error => this.errorHandlerService.handleError(error)) 
  );
}

}


// Let me know which of these improvements interests you the most:

// More specific error handling with better user feedback
// Exploring transactions
// Adjusting data modeling