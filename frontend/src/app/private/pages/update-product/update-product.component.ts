import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { ToasterService } from '../../../shared/services/toaster.service';
import { MethodsService } from '../../../shared/services/shared.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit, OnDestroy {

  protected productId: any;

  protected productName: any;
  protected productPrice: any;
  protected productCondition: any;
  protected productQuantity: any;
  protected productPhoto: any;
  protected productDescription: any;

  protected isProductActive: any;
  protected productSale: any;

  protected productNameOriginal: any;
  protected productPriceOriginal: any;
  protected productConditionOriginal: any;
  protected productQuantityOriginal: any;
  protected productPhotoOriginal: any;
  protected productDescriptionOriginal: any;

  protected isNameExpanded: boolean = false;
  protected isPriceExpanded: boolean = false;
  protected isConditionExpanded: boolean = false;
  protected isQuantityExpanded: boolean = false;
  protected isPhotoExpanded: boolean = false;
  protected isDescriptionExpanded: boolean = false;

  protected isFieldError: boolean = false;

  private unsubscribe = new Subject<void>;

  private sellerId!: string;

  constructor(private route: ActivatedRoute, private router: Router, public productService: ProductService, private toasterService: ToasterService, public sharedMethod: MethodsService, private userService: UserService) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId'); 

    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.sellerId = res.data.sellerId;
      
      this.getProducts(this.productId, this.sellerId);
    });
  }

  public reactivateProduct() {
    let updateData = {
      isActive: '1'
    }

    this.productService.putProduct(updateData, this.productId).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {       
        this.toasterService.show({
          type: 'success',
          title: 'Sucesso',
          message: res.message
        });

        this.isProductActive = '1';
      },
      error: error => {    
        this.isFieldError = true;
        
        this.toasterService.show({
          type: 'error',
          title: 'Erro',
          message: error.fullError.error.error
        });
      }
    });
  }

  private getProducts(productId: string, sellerId: string) {    
    this.productService.getProduct('', 1, 10, sellerId, productId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: any) => {     

        this.productName = res.data[0].name;
        this.productNameOriginal = res.data[0].name;

        this.productPrice = res.data[0].price;
        this.productPriceOriginal = res.data[0].price;

        this.productCondition = res.data[0].isused;
        this.productConditionOriginal = res.data[0].isused;

        this.productQuantity = res.data[0].quantity;
        this.productQuantityOriginal = res.data[0].quantity;

        this.productPhoto = res.data[0].imageurl;
        this.productPhotoOriginal = res.data[0].imageurl;

        this.productDescription = res.data[0].description;
        this.productDescriptionOriginal = res.data[0].description;        

        this.isProductActive = res.data[0].isactive;      
        
        this.productSale = res.data[0].sale;
      });
  }

  private putProduct(updateData: any, productId: any) {
    this.productService.putProduct(updateData, productId).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {       
        this.isNameExpanded = false;
        this.isPriceExpanded = false;
        this.isConditionExpanded = false;
        this.isQuantityExpanded = false;
        this.isPhotoExpanded = false;
        this.isDescriptionExpanded = false;
        
        this.productNameOriginal = this.productName;
        this.productPriceOriginal = this.productPrice;
        this.productConditionOriginal = this.productCondition;
        this.productQuantityOriginal = this.productQuantity;
        this.productPhotoOriginal = this.productPhoto;
        this.productDescriptionOriginal = this.productDescription;
        
        this.toasterService.show({
          type: 'success',
          title: 'Sucesso',
          message: res.message
        });
      },
      error: error => {    
        this.isFieldError = true;
        
        this.toasterService.show({
          type: 'error',
          title: 'Erro',
          message: error.fullError.error.error
        });
      }
    });
  }

  onConfirmChange(productSubject: any): void {    
    switch(productSubject) {
      case 0: {
        let newName = {
          name: this.productName
        }
    
        this.putProduct(newName, this.productId);

        break;
      }
      case 1: {
        let newPrice = {
          price: this.productPrice
        }
    
        this.putProduct(newPrice, this.productId);

        break;
      }
      case 2: {
        let newCondition = {
          isUsed: this.productCondition
        }
    
        this.putProduct(newCondition, this.productId);

        break;
      }
      case 3: {
        let newQuantity = {
          quantity: this.productQuantity
        }
    
        this.putProduct(newQuantity, this.productId);

        break;
      }
      case 4: {
        let newPhoto = {
          imageUrl: this.productPhoto
        }
    
        this.putProduct(newPhoto, this.productId);

        break;
      }
      case 5: {
        let newDescription = {
          description: this.productDescription
        }
    
        this.putProduct(newDescription, this.productId);

        break;
      }
    }
  }

  onCancelChange(productSubject: any) {    
    switch(productSubject) {
      case 0: {
        this.isNameExpanded = false;

        break;
      }
      case 1: {
        this.isPriceExpanded = false;

        break;
      }
      case 2: {
        this.isConditionExpanded = false;

        break;
      }
      case 3: {
        this.isQuantityExpanded = false;

        break;
      }
      case 4: {
        this.isPhotoExpanded = false;

        break;
      }
      case 5: {
        this.isDescriptionExpanded = false;

        break;
      }
    }

    this.isFieldError = false;
  }

  onToggleNameExpanded(isExpanded: boolean): void {
    this.isNameExpanded = isExpanded;
    this.isPriceExpanded = false;
    this.isConditionExpanded = false;
    this.isQuantityExpanded = false;
    this.isPhotoExpanded = false;
    this.isDescriptionExpanded = false;

    this.productName = this.productNameOriginal;

    this.isFieldError = false;
  }

  onTogglePriceExpanded(isExpanded: boolean): void {
    this.isNameExpanded = false;
    this.isPriceExpanded = isExpanded;
    this.isConditionExpanded = false;
    this.isQuantityExpanded = false;
    this.isPhotoExpanded = false;
    this.isDescriptionExpanded = false;

    this.productPrice = this.productPriceOriginal;

    this.isFieldError = false;
  }

  onToggleConditionExpanded(isExpanded: boolean): void {
    this.isNameExpanded = false;
    this.isPriceExpanded = false;
    this.isConditionExpanded = isExpanded;
    this.isQuantityExpanded = false;
    this.isPhotoExpanded = false;
    this.isDescriptionExpanded = false;

    this.productCondition = this.productConditionOriginal;

    this.isFieldError = false;
  }

  onToggleQuantityExpanded(isExpanded: boolean): void {
    this.isNameExpanded = false;
    this.isPriceExpanded = false;
    this.isConditionExpanded = false;
    this.isQuantityExpanded = isExpanded;
    this.isPhotoExpanded = false;
    this.isDescriptionExpanded = false;

    this.productQuantity = this.productQuantityOriginal;

    this.isFieldError = false;
  }

  onTogglePhotoExpanded(isExpanded: boolean): void {
    this.isNameExpanded = false;
    this.isPriceExpanded = false;
    this.isConditionExpanded = false;
    this.isQuantityExpanded = false;
    this.isPhotoExpanded = isExpanded;
    this.isDescriptionExpanded = false;

    this.productPhoto = this.productPhotoOriginal;

    this.isFieldError = false;
  }

  onToggleDescriptionExpanded(isExpanded: boolean): void {
    this.isNameExpanded = false;
    this.isPriceExpanded = false;
    this.isConditionExpanded = false;
    this.isQuantityExpanded = false;
    this.isPhotoExpanded = false;
    this.isDescriptionExpanded = isExpanded;

    this.productDescription = this.productDescriptionOriginal;

    this.isFieldError = false;
  }

  protected goBack() {
    this.router.navigate(['/user/my-products']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
