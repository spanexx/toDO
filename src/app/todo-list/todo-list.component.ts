import { Component } from '@angular/core';
import { Priority, Todo } from '../Models/Todo';
import { TodoService } from '../Services/todo.service';

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
  showModal: boolean = false;


  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.loadTodo();
  }

  loadTodo() {
    if (this.selectedPriority === 'all') {
      // Fetch all tasks (you might already have a method for this)
      this.todoService.getTodos().subscribe(todo => { 
        this.todos = todo
        this.filteredTodos = todo
      });
    } else {
      this.todoService.getTasksByPriority(this.selectedPriority).subscribe(todos => {
        this.todos = todos.map(task => task.data); 
        this.filteredTodos = todos.map(todo => todo.data);
      });
    }
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
    this.todoService.getTodo(todoId).subscribe(task => {
      this.selectedTodo = task;
      this.selectedTodoId = todoId;
      this.showModal = true;

    })
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
