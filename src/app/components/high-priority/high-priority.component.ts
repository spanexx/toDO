import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Priority, Todo } from '../../Models/Todo';
import { TodoService } from '../../Services/todo.service';
import { ErrorHandleService } from '../../Services/error-handle.service'; // Import ErrorHandleService

@Component({
  selector: 'app-high-priority',
  templateUrl: './high-priority.component.html',
  styleUrls: ['./high-priority.component.css']
})
export class HighPriorityComponent {
  @Input() highPriorityTasks!: Todo[];
  todos: Todo[] = []; 
  @Input() flexDirection: string = 'column'; 

  constructor(
    private todoService: TodoService,
    private errorHandleService: ErrorHandleService 
  ) { 
    this.loadHighPriorityTodos();
  }

  loadHighPriorityTodos() {
    this.todoService.getTodos().pipe(
      map(todos => todos.filter(todo => todo.priority === Priority.HIGH))
    ).subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos;
      },
      error: (error) => {
        console.error('Error loading high priority todos:', error);
        this.errorHandleService.handleError(error); 
        this.todos = [];
      }
    });
  }
}
