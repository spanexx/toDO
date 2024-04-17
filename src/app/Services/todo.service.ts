import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Todo } from '../Models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private firestore: AngularFirestore) { }

  // Get all todos
  getTodos() {
    return this.firestore.collection('todos').snapshotChanges();
  }

  // Create a new todo
  createTodo(todo: Todo) {
    return this.firestore.collection('todos').add(todo).then(ref => {
      todo.id = ref.id; 
      return todo; 
    });
  }
  

  // Update a todo
  updateTodo(todo: Todo) {
    return this.firestore.doc('todos/' + todo.id).update(todo);
  }

  // Delete a todo
  deleteTodo(todoId: string) {
    return this.firestore.doc('todos/' + todoId).delete();
  }
}