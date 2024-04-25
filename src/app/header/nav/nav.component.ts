import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { NewUser } from '../../Models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  menuTrigger: any; 
  showMenu: boolean = false;
  logoUrl = '../../assets/logo.png';
  isLoggedIn: boolean = false;
  private userSubject!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
   this.userSubject = this.authService.user.subscribe((user: NewUser) => {
      this.isLoggedIn = user ? true: false;
      if(user){
        this.headerItems = this.headerItems.filter(item => item.label !== 'Login');
        this.headerItems.push({ label: 'Logout', link: '/' },
        { label: 'Project Planner', link: '/' },
        { label: 'Task Management', link: '/' },)
      }else{
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubject.unsubscribe();
  }
  name = 'Todo'
  headerItems = [
    { label: 'Tasks', link: 'todo-list' },
    { label: 'Login', link: '/login' }
  ];



  projects: any[] = [ // Declare the 'projects' variable as an array
    { label: 'Create Project', link: '/create-project'},
    { label: 'Manage Projects', link: '/'},
  ];

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu(): void {
    const checkbox = document.getElementById('active') as HTMLInputElement;
    checkbox.checked = false;
  }
}
