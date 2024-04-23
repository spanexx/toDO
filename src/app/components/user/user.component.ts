import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  currentUser?: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserUid().subscribe(uid => {
      if (uid) {
        this.userService.getUserData(uid).subscribe(user => {
          this.currentUser = user;
        });
      }
    });
  }
}
