import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<string>(); // Emits the selected status

  selectedStatus = 'all'; // Initial value

  onStatusChange(status: any) {
    this.selectedStatus = status.target.value;
    this.filterChange.emit(this.selectedStatus);
  }

  ngOnInit() { }
}
