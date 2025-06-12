import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-main',
  templateUrl: './search-bar-main.component.html',
  styleUrl: './search-bar-main.component.css'
})
export class SearchBarMainComponent {
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
