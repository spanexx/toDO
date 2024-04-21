import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Priority, Todo } from '../Models/Todo';
import { TodoService } from '../Services/todo.service';

@Component({
  selector: 'task-update-form',
  templateUrl: './task-update-form.component.html',
  styleUrl: './task-update-form.component.css'
})
export class TaskUpdateFormComponent {
  addTaskForm!: FormGroup;
  @Input() selectedTAsk!: Todo;
  @Input()selectedTaskID!: string;
  @Input() showModal: boolean = false; // Initially hidden


  constructor(private taskService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.addTaskForm = new FormGroup({
      title: new FormControl(this.selectedTAsk.title, Validators.required),
      description: new FormControl(this.selectedTAsk.description, Validators.required),
      priority: new FormControl(this.selectedTAsk.priority, Validators.required),
      dueDate: new FormControl(this.selectedTAsk.dueDate, Validators.required),
      completed: new FormControl(this.selectedTAsk.completed, Validators.required)
    });
  }

  @Output() closeModalEvent = new EventEmitter<void>(); // Optionally pass data in the event

  closeModal() {
    this.closeModalEvent.emit(); 
    this.showModal = false;
  }
  
  onUpdate() {
    if (this.addTaskForm.valid && this.selectedTaskID) {
      const updatedTask: Todo = {
        ...this.addTaskForm.value, 
        id: this.selectedTaskID // Ensure we preserve the ID
      };

      this.taskService.updateTodo(this.selectedTaskID, updatedTask).subscribe({
        next: () => {
          console.log("Task updated successfully!");
          // Optionally redirect to the task list page
          // this.router.navigate(['/']); //  Redirect if needed.
          this.closeModal(); // Close the modal
        },
        error: (error) => {
          console.error("Error updating task:", error);
          // Handle the error (e.g., display an error message)
        }
      });
    } else {
      console.error('Form invalid or missing task ID');
      // Handle invalid form or missing task ID
    }
  }
}
