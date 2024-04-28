import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { NewUser } from '../../Models/User';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit{
  @Input() isVisible: boolean = false;
  @Input() ErrorMessage: string = '';
  @Input() SuccessMessage: string = '';
  message =  ""
  
  constructor(private authService: AuthService) { }
  ngOnInit(): void {

    this.authService.onLogin().subscribe({
      next: () => {this.message = "Login successful"
        this.hideSnackBar()
      }
        }
    )
  }


  hideSnackBar() {
    setTimeout(() => {
      this.message = "";
    }, 3000);
  }


}
