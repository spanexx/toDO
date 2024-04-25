import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Models/User';

@Component({
  selector: 'signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false; 
  signupForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isError: boolean = false;
  isSuccess: boolean = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'displayName': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      
      const { email, password } = this.signupForm.value;
      const displayName = this.signupForm.value.displayName;
      this.isLoading = true;

      this.authService.signup(email, password).subscribe({
        next: (response) => {

          const newUser: User = {
            email: email,
            displayName: displayName,
            // Add other properties if needed
          };
          // this.userService.createUser(newUser).subscribe(
          //   (userId: string) => {
          //     console.log('User created with ID:', userId);
          //   },
          //   (error) => {
          //     console.error('Error creating user:', error);
          //   }
          // );
          
          this.isLoading = false;
          this.isSuccess = true;
          this.successMessage = "Successfully signed up"
          this.hideSnackBar();
          this.router.navigate(['/']);


        },
        error: (errMsg) => {
          this.errorMessage = "ERROR: " + errMsg;
          this.isLoading = false;
          this.isError = true;
  
          this.hideSnackBar();
        }
      });
    }
    this.signupForm.reset();
  }

  hideSnackBar() {
    setTimeout(() => {
      this.isError = false;
      this.isSuccess = false;
    }, 3000);
  }
  
}
