import { Component, Input } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Priority, Todo } from '../../Models/Todo';
import { TodoService } from '../../Services/todo.service';

@Component({
  selector: 'app-high-priority',
  templateUrl: './high-priority.component.html',
  styleUrls: ['./high-priority.component.css']
})
export class HighPriorityComponent {
  @Input() highPriorityTasks!: Todo[];
  todos: Todo[] = []; // Initialize todos as an empty array
  @Input() flexDirection: string = 'column'; // Default flex direction is 'row'

  constructor(private todoService: TodoService) { 
    this.loadHighPriorityTodos();
  }

  loadHighPriorityTodos() {
    this.todoService.getTodos().pipe(
      map(todos => todos.filter(todo => todo.priority === Priority.HIGH))
    ).subscribe((todos: Todo[]) => {
      this.todos = todos;
    }, (error) => {
      console.error('Error loading high priority todos:', error);
      this.todos = [];
    });
  }
}

