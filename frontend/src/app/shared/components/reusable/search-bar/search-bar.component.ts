import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() emitOnInput: boolean = false; 
  @Output() search = new EventEmitter<string>(); 
  searchTerm: string = '';

  onSearch() {
    this.search.emit(this.searchTerm); 
  }

  onSearchInput() {
    if (this.emitOnInput) {
      this.search.emit(this.searchTerm);
    }
  }
}
