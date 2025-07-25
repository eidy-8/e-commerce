import { Component, Input, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../../private/services/product.service';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isactive: string;
  imageurl: string;
  sale: number;
  selected?: boolean;
  showMenu?: boolean;
}

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrl: './order-manager.component.css'
})
export class OrderManagerComponent {
  @Input() set orders(value: Product[]) {
      this._products = value.map(p => ({ ...p, showMenu: false }));
    }
  
    get products() {
      return this._products;
    }
    private _products: Product[] = [];
  
    allSelected = false;
  
    blurPauseButton = true;
    blurActivateButton = true;
    blurExcludeButton = true;
  
    private unsubscribe = new Subject<void>;
  
    selectedProduct: any = null;
  
    constructor(public productService: ProductService, private toasterService: ToasterService, private router: Router) {}
  
    unSelectAll() {
      this.allSelected = false;
  
      this.blurExcludeButton = true;
      this.blurActivateButton = true;
      this.blurPauseButton = true;
  
      this.products.filter(p => p.selected).forEach(p => p.selected = false);
    }
  
    toggleProduct(p: Product) {    
      if (p.isactive == '1') {
        p.isactive = '0';
  
        let productUpdate = {
          isActive: '0'
        }
  
        this.productService.putProduct(productUpdate, p.id).pipe( takeUntil( this.unsubscribe ) ).subscribe({
          next: res => {
            this.toasterService.show({
              type: 'success',
              title: 'Sucesso',
              message: res.message
            });
          },
          error: error => {    
            this.toasterService.show({
              type: 'error',
              title: 'Erro',
              message: error
            });
          }
        });
      } else {
        p.isactive = '1'
  
        let productUpdate = {
          isActive: '1'
        }
  
        this.productService.putProduct(productUpdate, p.id).pipe( takeUntil( this.unsubscribe ) ).subscribe({
          next: res => {
            this.toasterService.show({
              type: 'success',
              title: 'Sucesso',
              message: res.message
            });
          },
          error: error => {    
            this.toasterService.show({
              type: 'error',
              title: 'Erro',
              message: error
            });
          }
        });
      }
    }
  
    toggleMenu(p: Product) {
      (p as any).showMenu = !(p as any).showMenu;
    }
  
    onSearch(searchTerm: string) {
      console.log('Termo de busca:', searchTerm);
    }
  
    ngOnDestroy(): void {
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }
}
