import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../Services/todo.service';
import { Todo } from '../../Models/Todo';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.css'
})
export class AddTodoFormComponent {
  @Output() todoAdded = new EventEmitter<Todo>(); // Emit an event when a todo is added
  todoForm!: FormGroup;
 


  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''), 
      priority: new FormControl('medium', Validators.required),
      dueDate: new FormControl(''), 
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const newTask: Todo = this.todoForm.value; 
  
      this.todoService.createTodo(newTask).subscribe({

        next: (taskId: string) => { 
          newTask.id = taskId
          this.router.navigate(['/']);
          this.todoForm.reset();
          this.todoForm.get('priority')?.setValue('low'); 
        },
        
        error: (error: any) => { 
          console.error("Error adding task:", error.message);
        },

        complete: () => { 
          console.log("Task added successfully!"); 
        }
      });
    }
  }

}
