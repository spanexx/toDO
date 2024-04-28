import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Todo, SubTasks } from '../Models/Todo';
import { Observable, from, throwError } from 'rxjs';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ErrorHandleService } from './error-handle.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  getByPriorityAndDate() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private firestore: AngularFirestore,
    private errorHandlerService: ErrorHandleService,
    private authService: AuthService
  ) {}

  // Get all todos (with IDs)
  getTodos(): Observable<Todo[]> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.firestore.collection('todos').snapshotChanges();
      }),
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Todo;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ),
      catchError((error) => {
        this.errorHandlerService.handleError(error);
        return throwError(() => error);
      })
    );
  }

  // Get a Todo with an Id
  getTodo(taskId: string): Observable<Todo | undefined> {
    return this.firestore
      .collection('tasks')
      .doc(taskId)
      .get()
      .pipe(
        map((taskSnapshot) =>
          taskSnapshot.exists ? (taskSnapshot.data() as Todo) : undefined
        ),
        catchError((error) => this.errorHandlerService.handleError(error))
      );
  }

  // Create a new todo
  createTodo(todo: Todo): Observable<string> {
    todo.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    return from(this.firestore.collection('todos').add(todo)).pipe(
      map((action) => action.id), // Return just the ID
      catchError((error) => this.errorHandlerService.handleError(error))
    );
  }

  // Update a todo
  updateTodo(todoId: string, todo: Todo): Observable<void> {
    todo.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return from(
      this.firestore.collection('todos').doc(todoId).update(todo)
    ).pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  // Delete a todo
  deleteTodo(todoId: string): Observable<void> {
    return from(this.firestore.collection('todos').doc(todoId).delete()).pipe(
      catchError((error) => this.errorHandlerService.handleError(error))
    );
  }

  getTasksByPriority(
    priority: string
  ): Observable<{ id: string; data: Todo }[]> {
    return this.firestore
      .collection('todos', (ref) => ref.where('priority', '==', priority))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Todo;
            const id = a.payload.doc.id;
            return { id, data };
          })
        ),
        catchError((error) => this.errorHandlerService.handleError(error))
      );
  }

  //SubTasks

  addSubtask(todoId: string, subtask: SubTasks): Observable<void> {
    return from(
      this.firestore
        .collection('todos')
        .doc(todoId)
        .update({
          subtasks: firebase.firestore.FieldValue.arrayUnion(subtask),
        })
    ).pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  // Update an existing subtask
  updateSubtask(
    todoId: string,
    subtaskId: string,
    subtask: SubTasks
  ): Observable<void> {
    return from(
      this.firestore
        .collection('todos')
        .doc(todoId)
        .collection('subtasks')
        .doc(subtaskId)
        .update(subtask)
    ).pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  // Delete a subtask
  deleteSubtask(todoId: string, subtaskId: string): Observable<void> {
    return from(
      this.firestore
        .collection('todos')
        .doc(todoId)
        .collection('subtasks')
        .doc(subtaskId)
        .delete()
    ).pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  // Fetch subtasks for a specific todo (Optional)
  getSubtasks(todoId: string): Observable<SubTasks[]> {
    return this.firestore
      .collection('todos')
      .doc(todoId)
      .collection<SubTasks>('subtasks')
      .valueChanges()
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }
}

// Let me know which of these improvements interests you the most:

// More specific error handling with better user feedback
// Exploring transactions
// Adjusting data modeling
