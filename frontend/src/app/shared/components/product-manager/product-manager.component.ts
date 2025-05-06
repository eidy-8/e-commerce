import { Component, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../../private/services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { ToasterService } from '../../services/toaster.service';

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
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.css'
})
export class ProductManagerComponent implements OnDestroy {
  @Input() set products(value: Product[]) {
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

  protected isModalOpen: boolean = false;

  selectedProduct: any = null;

  constructor(public productService: ProductService, private toasterService: ToasterService) {}

  toggleSelectAll() {
    this.allSelected = !this.allSelected;
    this.products.forEach(p => p.selected = this.allSelected);

    const hasSelected = this.products.map(p => p.selected).some(selected => selected === true);

    if (hasSelected) {
      this.blurExcludeButton = false;
      this.blurActivateButton = false;
      this.blurPauseButton = false;
    } else {
      this.blurExcludeButton = true;
      this.blurActivateButton = true;
      this.blurPauseButton = true; 
    }
  }

  unSelectAll() {
    this.allSelected = false;

    this.blurExcludeButton = true;
    this.blurActivateButton = true;
    this.blurPauseButton = true;

    this.products.filter(p => p.selected).forEach(p => p.selected = false);
  }

  onProductSelectionChange() {    
    const hasSelected = this.products.map(p => p.selected).some(selected => selected === true);

    if (hasSelected) {
      this.blurExcludeButton = false;
      this.blurActivateButton = false;
      this.blurPauseButton = false;
    } else {
      this.blurExcludeButton = true;
      this.blurActivateButton = true;
      this.blurPauseButton = true; 
    }
    
    this.allSelected = this.products.every(p => p.selected);
  }

  pauseSelected() {
    const selectedProducts = this.products.filter(p => p.selected);
    this.products.filter(p => p.selected).forEach(p => p.isactive = 'F');

    let productUpdate = {
      isActive: 'F'
    }

    selectedProducts.forEach(async p => {
      p.isactive = 'F';
  
      await this.productService.putProduct(productUpdate, p.id).pipe( takeUntil( this.unsubscribe ) ).subscribe({
        next: res => {
          this.toasterService.show({
            type: 'success',
            title: 'Sucesso',
            message: res.message
          });

          this.unSelectAll();
        },
        error: error => {    
          this.toasterService.show({
            type: 'error',
            title: 'Erro',
            message: error
          });
        }
      });
    });
  }

  activateSelected() {
    const selectedProducts = this.products.filter(p => p.selected);
    
    let productUpdate = {
      isActive: 'T'
    }

    selectedProducts.forEach(async p => {  
      if (p.quantity == 0) {
        this.toasterService.show({
          type: 'warning',
          title: 'Aviso',
          message: `${p.name} não foi ativado devido à falta de estoque.`
        });
      } else {
        p.isactive = 'T'
        await this.productService.putProduct(productUpdate, p.id).pipe( takeUntil( this.unsubscribe ) ).subscribe({
          next: res => {
            this.toasterService.show({
              type: 'success',
              title: 'Sucesso',
              message: res.message
            });
  
            this.unSelectAll();
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
    });
  }

  excludeSelected() {
    const selectedProducts = this.products.filter(p => p.selected);

    selectedProducts.forEach(async p => {
      await this.productService.deleteProduct(p.id).pipe( takeUntil( this.unsubscribe ) ).subscribe({
        next: res => {
          this.toasterService.show({
            type: 'success',
            title: 'Sucesso',
            message: res.message
          });

          this.unSelectAll();

          this.products = this.products.filter(prod => prod.id !== p.id);
        },
        error: error => {    
          this.toasterService.show({
            type: 'error',
            title: 'Erro',
            message: error
          });
        }
      });
    });
  }

  toggleProduct(p: Product) {    
    if (p.isactive == 'T') {
      p.isactive = 'F';

      let productUpdate = {
        isActive: 'F'
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
      p.isactive = 'T'

      let productUpdate = {
        isActive: 'T'
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

  editProduct(p: Product) {
    console.log(p.id);
  }

  viewProduct(p: Product) {
    console.log(p.id);
  }

  deleteProduct(p: Product) {
    this.productService.deleteProduct(p.id).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {
        this.toasterService.show({
          type: 'success',
          title: 'Sucesso',
          message: res.message
        });

        this.unSelectAll();

        this.products = this.products.filter(prod => prod.id !== p.id);

        this.isModalOpen = false;
      },
      error: error => {    
        this.toasterService.show({
          type: 'error',
          title: 'Erro',
          message: error
        });

        this.isModalOpen = false;
      }
    });
  }

  toggleMenu(p: Product) {
    (p as any).showMenu = !(p as any).showMenu;
  }

  confirmMethod(product: any) {    
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  cancelMethod() {        
    this.isModalOpen = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
