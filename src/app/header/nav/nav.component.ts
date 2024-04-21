import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  menuTrigger: any; 
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
