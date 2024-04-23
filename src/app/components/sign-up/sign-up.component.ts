import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/User';

@Component({
  selector: 'signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage: string = '';

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'displayName': new FormControl('', Validators.required) // Added displayName
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      const displayName = this.signupForm.value.displayName;

      // Create user object with displayName
      const newUser: User = {
        email: email,
        displayName: displayName
      };

      // Save user data to database using UserService
      this.userService.createUser(newUser).subscribe({
        next: () => {
          // Navigate to desired route after successful signup
          this.router.navigate(['/']);
          // Reset the form
          this.signupForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}
