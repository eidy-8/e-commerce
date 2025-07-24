import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent {

  protected isLoading$: Observable<boolean>;
  currentPage: number = 1;
  hasNext: boolean = false;

  constructor(public loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  onSearch(searchTerm: string) {    
    // this.currentPage = 1; 
    // this.getProducts(searchTerm);
  }

  previousPage() {
    // if (this.currentPage > 1) {
    //   this.currentPage--;
    //   this.getProducts();
    // }

    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
  }

  nextPage() {
    // if (this.hasNext) {
    //   this.currentPage++;
    //   this.getProducts();
    // }

    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth' 
    // });
  }
}
