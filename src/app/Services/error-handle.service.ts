import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

  constructor(private router: Router, private toastr: ToastrService) {}

  handleError(error: any) {
    console.error('An error occurred:', error); 

    // Show error notification
    this.showErrorNotification(error);

    // Handle different error cases
    if (error.status === 404) {
      this.router.navigate(['/']);
    } else if (error.status === 500) {
      this.router.navigate(['/']);
    } 

    // Return a new error observable
    return throwError(() => new FirestoreNotFoundError(error.message)); 
  }

  private showErrorNotification(error: any) {
    // Check error type and display appropriate message
    if (error instanceof Error) { 
      this.toastr.error('Something went wrong', error.message);
    } else if (error instanceof FirestoreNotFoundError) {
      this.toastr.error(error.message);
    } else if (error.code === 'PERMISSION_DENIED') {
      this.toastr.error('You do not have the permission to perform this action');
    } else {
      this.toastr.error('An unexpected error occurred. Please try again.');
    }
  }
}

// Custom Error Class
export class FirestoreNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirestoreNotFoundError';
  }
}
