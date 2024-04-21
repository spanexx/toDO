import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showMenu: boolean = false;
  logoUrl = '../../assets/logo.png';


  name = 'Todo'
  headerItems = [
    { label: 'Tasks', link: 'todo-list' },
    { label: 'Task Management', link: '/' },
    { label: 'Project Planner', link: '/' },
    { label: 'Login', link: '/' },
  ];
  projects: any[] = [ // Declare the 'projects' variable as an array
    { label: 'Create Project', link: '/'},
    { label: 'Manage Projects', link: '/'},
  ];

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
