import { Component } from '@angular/core';
import { Priority, Todo } from '../Models/Todo';
import { TodoService } from '../Services/todo.service';
import { Observable, map } from 'rxjs';

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



  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.loadTodo();
  }

  searchTasks(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.loadTodo();
  }

  loadTodo() {
    // Combined logic for search and priority filtering
    let filteredTasks: Observable<Todo[]>; 
  
    if (this.selectedPriority === 'all' && !this.searchTerm) { 
      // Fetch all tasks, when there's no priority filter or a search term
      filteredTasks = this.todoService.getTodos();
    } else {
      // Priority or search term exists, filter accordingly
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
      console.log(this.searchTerm);
    }

      // Subscribe to the observable and update `todos` and `filteredTodos`
  filteredTasks.subscribe(todos => {
    this.todos = todos; 
    this.filteredTodos = todos; 
  });
}

  onSelect(todo: Todo) {
    this.selectedTodo = todo;
  }
  filterByPriority(priority: string) {
    this.selectedPriority = priority;
    this.loadTodo(); 
  }


  deleteTask(todoId: string ) {
    this.todoService.deleteTodo(todoId).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
      },
      error: (error: any) => {
        console.error("Error deleting task:", error);
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
