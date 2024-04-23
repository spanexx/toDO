import { Component } from '@angular/core';
import { Priority, Todo } from '../Models/Todo';
import { TodoService } from '../Services/todo.service';
import { Observable, map } from 'rxjs';
import { ErrorHandleService } from '../Services/error-handle.service'; // Import ErrorHandleService

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos!: Todo[];
  selectedTodo?: Todo;
  filteredTodos!: Todo[];
  selectedPriority = 'all'; 
  selectedTodoId = ''
  searchTerm = '';
  showModal: boolean = false;
  highPriorityTasks: Todo[] = []; // Define highPriorityTasks here

  constructor(
    private todoService: TodoService,
    private errorHandleService: ErrorHandleService // Inject ErrorHandleService
  ) { }

  ngOnInit() {
    this.loadTodo();
  }

  searchTasks(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.loadTodo();
  }

  loadTodo() {
    let filteredTasks: Observable<Todo[]>; 
  
    if (this.selectedPriority === 'all' && !this.searchTerm) { 
      filteredTasks = this.todoService.getTodos();
    } else {
      if (this.selectedPriority !== 'all') {
        filteredTasks = this.todoService.getTasksByPriority(this.selectedPriority).pipe(
          map(todos => todos.map(task => task.data))
        );
      } else { 
        const lowercaseSearchTerm = this.searchTerm.toLowerCase();  
        filteredTasks = this.todoService.getTodos().pipe(
          map(todos => {
            this.filteredTodos = todos.filter(todo => 
              todo.title.toLowerCase().includes(lowercaseSearchTerm)
            );
            return this.filteredTodos;
          })
        );
      }
    }

    filteredTasks.subscribe(
      todos => {
        this.todos = todos; 
        this.filteredTodos = todos; 
      },
      error => this.errorHandleService.handleError(error) // Call handleError method on error
    );
  }

  onSelect(todo: Todo) {
    this.selectedTodo = todo;
  }

  filterByPriority(priority: string) {
    this.selectedPriority = priority;
    this.loadTodo(); 
  }

  deleteTask(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
      },
      error: (error: any) => {
        console.error("Error deleting task:", error);
        this.errorHandleService.handleError(error); // Call handleError method on error
      },
      complete: () => {
        console.log("Task deleted successfully!");
      }
    });
  }

  editTodo(todoId: string, task: Todo) {
    this.selectedTodo = task;
    this.selectedTodoId = todoId;
    this.showModal = true;
  }

  getTodoPriority(task: Todo): string {
    if (task.priority === Priority.HIGH) {
      return 'task-high';
    } else if (task.priority === Priority.MEDIUM) {
      return 'task-medium';
    } else if (task.priority === Priority.LOW) {
      return 'task-low';
    } else {
      return ''; 
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
