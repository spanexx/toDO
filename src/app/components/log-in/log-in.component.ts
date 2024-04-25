import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {
  isLoading: boolean = false; 
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isError: boolean = false;
  isSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.isLoading = true;

    this.authService.login(email, password).subscribe({
      next: (data)=>{
        this.isLoading = false;
        this.isSuccess = true;
        this.successMessage = "Successfully signed in"
        this.router.navigate(['/']);
      },
      error:(errMsg)=>{
        this.errorMessage = "ERROR: " + errMsg;
          this.isLoading = false;
          this.isError = true;
  
          this.hideSnackBar();

      }
    })
      
  }

  hideSnackBar() {
    setTimeout(() => {
      this.isError = false;
      this.isSuccess = false;
    }, 3000);
  }
}