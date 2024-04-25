import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  @Input() isVisible: boolean = false;
  @Input() ErrorMessage: string = '';
  @Input() SuccessMessage: string = '';

  constructor() { }
}
