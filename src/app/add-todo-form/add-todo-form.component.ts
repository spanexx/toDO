import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../Services/todo.service';
import { Todo } from '../Models/Todo';
import { Router } from '@angular/router';

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
      priority: new FormControl('normal', Validators.required) 
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const newTask = this.todoForm.value; 
  
      this.todoService.createTodo(newTask).subscribe({

        next: (task: Todo) => { 
          console.log("Task added successfully:", task);
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
