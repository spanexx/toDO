import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() searchTerm = new EventEmitter<string>();

  searchInput = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    this.searchInput.pipe(
      debounceTime(400),  // Optional delay
      distinctUntilChanged(),  
      map(term => term) // Convert to lowercase
    ).subscribe(searchTerm => { // Renamed term to searchTerm 
      this.searchTerm.emit(searchTerm);
    });
  }

  onSearchChange(searchTerm: any) {
    this.searchInput.next(searchTerm.target.value);
  }
}