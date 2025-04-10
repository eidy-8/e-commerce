import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MethodsService } from '../../../shared/services/shared.service';
import { ProductService } from '../../services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit, OnDestroy {

  protected category: any;

  protected productName: any;
  protected productPrice: any;
  protected productCondition!: boolean;
  protected productQuantity: any;
  protected productImage: any;
  protected productDescription: any;

  protected previousProductName: any;
  protected previousProductPrice: any;
  protected previousProductCondition!: boolean;
  protected previousProductQuantity: any;
  protected previousProductImage: any
  protected previousProductDescription: any;

  protected isNameError: boolean = false;
  protected isPriceError: boolean = false;
  protected isConditionError: boolean = false;
  protected isQuantityError: boolean = false;
  protected isImageError: boolean = false;
  protected isDescriptionError: boolean = false;
  protected errorMessage: string = 'Informe esse dado';

  protected loadingFirstStep: boolean = false;
  protected loadingSecondStep: boolean = false;
  protected loadingThirdStep: boolean = false;
  protected loadingForthStep: boolean = false;
  protected loadingFifthStep: boolean = false;
  protected loadingSixthStep: boolean = false;

  protected isFirstStepCompleted: boolean = false;
  protected isSecondStepCompleted: boolean = false;
  protected isThirdStepCompleted: boolean = false;
  protected isForthStepCompleted: boolean = false;
  protected isFifthStepCompleted: boolean = false;
  protected isSixthStepCompleted: boolean = false;

  protected showSecondStep: boolean = false;
  protected showThirdStep: boolean = false;
  protected showForthStep: boolean = false;
  protected showFifthStep: boolean = false;
  protected showSixthStep: boolean = false;

  protected blurFirstStep: boolean = false;
  protected blurSecondStep: boolean = false;
  protected blurThirdStep: boolean = false;
  protected blurForthStep: boolean = false;
  protected blurFifthStep: boolean = false;
  protected blurSixthStep: boolean = false;

  protected blurFirstButtons: boolean = false;
  protected blurSecondButtons: boolean = false;
  protected blurThirdButtons: boolean = false;
  protected blurForthButtons: boolean = false;
  protected blurFifthButtons: boolean = false;
  protected blurSixthButtons: boolean = false;

  protected isAllStepsCompleted: boolean = false;

  private unsubscribe = new Subject<void>;

  private currentSeller!: string;

  constructor(private route: ActivatedRoute, public sharedMethod: MethodsService, public productService: ProductService,  private router: Router, public userService: UserService) {}

  async ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category'); 

    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.currentSeller = res.data.sellerId;           
    });
  }

  protected advertiseProduct() {
    let productData = {
      name: this.productName,
      price: this.productPrice,
      isUsed: "0",
      isActive: "1",
      imageUrl: this.productImage,
      description: this.productDescription,
      quantity: this.productQuantity,
      seller_id: this.currentSeller,
      category_id: this.category
    }

    console.log(productData);

    this.productService.postProduct(productData).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {
        console.log(res.message);
        this.router.navigate(['/']);
      },
      error: error => {
        console.log(error);
        this.errorMessage = error.message;
      }
    });
  }

  protected confirmName() {    
    if (!this.productName) {
      this.isNameError = true;
    } else {
      this.isNameError = false;
      this.loadingFirstStep = true;

      this.previousProductName = this.productName; 

      setTimeout(() => {
        this.loadingFirstStep = false;

        setTimeout(() => {
          this.showSecondStep = true;

          setTimeout(() => {

            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth"
            });

            this.isFirstStepCompleted = true;
            this.blurFirstButtons = true;

            if (!this.isSecondStepCompleted) {
              this.blurSecondStep = false;
              this.blurSecondButtons = false;
            } else {
              this.blurSecondStep = false;
            }

            if (!this.isThirdStepCompleted) {
              this.blurThirdStep = false;
              this.blurThirdButtons = false;
            } else {
              this.blurThirdStep = false;
            }

            if (!this.isForthStepCompleted) {
              this.blurForthStep = false;
              this.blurForthButtons = false;
            } else {
              this.blurForthStep = false;
            }

            if (!this.isFifthStepCompleted) {
              this.blurFifthStep = false;
              this.blurFifthButtons = false;
            } else {
              this.blurFifthStep = false;
            }

            if (!this.isSixthStepCompleted) {
              this.blurSixthStep = false;
              this.blurSixthButtons = false;
            } else {
              this.blurSixthStep = false;
            }

            this.checkAllStepsCompleted();
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  protected cancelName() {    
    this.checkAllStepsCompleted(false);

    if (this.productName) {
      this.blurFirstButtons = true;

      this.productName = this.previousProductName; 

      if (!this.isSecondStepCompleted) {
        this.blurSecondStep = false;
        this.blurSecondButtons = false;
      } else {
        this.blurSecondStep = false;
      }

      if (!this.isThirdStepCompleted) {
        this.blurThirdStep = false;
        this.blurThirdButtons = false;
      } else {
        this.blurThirdStep = false;
      }

      if (!this.isForthStepCompleted) {
        this.blurForthStep = false;
        this.blurForthButtons = false;
      } else {
        this.blurForthStep = false;
      }

      if (!this.isFifthStepCompleted) {
        this.blurFifthStep = false;
        this.blurFifthButtons = false;
      } else {
        this.blurFifthStep = false;
      }

      if (!this.isSixthStepCompleted) {
        this.blurSixthStep = false;
        this.blurSixthButtons = false;
      } else {
        this.blurSixthStep = false;
      }

      this.checkAllStepsCompleted();
    }
  }

  protected confirmPrice() {
    if (!this.productPrice) {
      this.isPriceError = true;
    } else {
      this.isPriceError = false;
      this.loadingSecondStep = true;

      this.previousProductPrice = this.productPrice;

      setTimeout(() => {
        this.loadingSecondStep = false;

        setTimeout(() => {
          this.showThirdStep = true;

          setTimeout(() => {

            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth"
            });

            this.isSecondStepCompleted = true;
            this.blurSecondButtons = true;

            if (!this.isFirstStepCompleted) {
              this.blurFirstStep = false;
              this.blurFirstButtons = false;
            } else {
              this.blurFirstStep = false;
            }
           
            if (!this.isThirdStepCompleted) {
              this.blurThirdStep = false;
              this.blurThirdButtons = false;
            } else {
              this.blurThirdStep = false
            }

            if (!this.isForthStepCompleted) {
              this.blurForthStep = false;
              this.blurForthButtons = false;
            } else {
              this.blurForthStep = false
            }

            if (!this.isFifthStepCompleted) {
              this.blurFifthStep = false;
              this.blurFifthButtons = false;
            } else {
              this.blurFifthStep = false
            }

            if (!this.isSixthStepCompleted) {
              this.blurSixthStep = false;
              this.blurSixthButtons = false;
            } else {
              this.blurSixthStep = false;
            }

            this.checkAllStepsCompleted();
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  protected cancelPrice() {
    this.checkAllStepsCompleted(false);

    if (this.productPrice) {
      this.blurSecondButtons = true;

      this.productPrice = this.previousProductPrice;

      if (!this.isFirstStepCompleted) {
        this.blurFirstStep = false;
        this.blurFirstButtons = false;
      } else {
        this.blurFirstStep = false;
      }
     
      if (!this.isThirdStepCompleted) {
        this.blurThirdStep = false;
        this.blurThirdButtons = false;
      } else {
        this.blurThirdStep = false
      }

      if (!this.isForthStepCompleted) {
        this.blurForthStep = false;
        this.blurForthButtons = false;
      } else {
        this.blurForthStep = false
      }

      if (!this.isFifthStepCompleted) {
        this.blurFifthStep = false;
        this.blurFifthButtons = false;
      } else {
        this.blurFifthStep = false
      }

      if (!this.isSixthStepCompleted) {
        this.blurSixthStep = false;
        this.blurSixthButtons = false;
      } else {
        this.blurSixthStep = false;
      }  

      this.checkAllStepsCompleted();
    }
  }


  protected confirmCondition() { 
    if (this.productCondition == undefined) {
      this.isConditionError = true;
    } else {
      this.isConditionError = false;
      this.loadingThirdStep = true;

      this.previousProductCondition = this.productCondition;

      setTimeout(() => {
        this.loadingThirdStep = false;

        setTimeout(() => {
          this.showForthStep = true;

          setTimeout(() => {

            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth"
            });

            this.isThirdStepCompleted = true;
            this.blurThirdButtons = true;

            if (!this.isFirstStepCompleted) {
              this.blurFirstStep = false;
              this.blurFirstButtons = false;
            } else {
              this.blurFirstStep = false;
            }
           
            if (!this.isSecondStepCompleted) {
              this.blurSecondStep = false;
              this.blurSecondButtons = false;
            } else {
              this.blurSecondStep = false
            }

            if (!this.isForthStepCompleted) {
              this.blurForthStep = false;
              this.blurForthButtons = false;
            } else {
              this.blurForthStep = false
            }

            if (!this.isFifthStepCompleted) {
              this.blurFifthStep = false;
              this.blurFifthButtons = false;
            } else {
              this.blurFifthStep = false
            }

            if (!this.isSixthStepCompleted) {
              this.blurSixthStep = false;
              this.blurSixthButtons = false;
            } else {
              this.blurSixthStep = false;
            }

            this.checkAllStepsCompleted();
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  protected cancelCondition() {
    this.checkAllStepsCompleted(false);

    if (this.productCondition !== undefined) {
      this.blurThirdButtons = true;

      this.productCondition = this.previousProductCondition;

      if (!this.isFirstStepCompleted) {
        this.blurFirstStep = false;
        this.blurFirstButtons = false;
      } else {
        this.blurFirstStep = false;
      }
     
      if (!this.isSecondStepCompleted) {
        this.blurSecondStep = false;
        this.blurSecondButtons = false;
      } else {
        this.blurSecondStep = false
      }

      if (!this.isForthStepCompleted) {
        this.blurForthStep = false;
        this.blurForthButtons = false;
      } else {
        this.blurForthStep = false
      }

      if (!this.isFifthStepCompleted) {
        this.blurFifthStep = false;
        this.blurFifthButtons = false;
      } else {
        this.blurFifthStep = false
      }

      if (!this.isSixthStepCompleted) {
        this.blurSixthStep = false;
        this.blurSixthButtons = false;
      } else {
        this.blurSixthStep = false
      }  

      this.checkAllStepsCompleted();
    }
  }

  protected confirmQuantity() {
    if (!this.productQuantity) {
      this.isQuantityError = true;
    } else {
      this.isQuantityError = false;
      this.loadingForthStep = true;

      this.previousProductQuantity = this.productQuantity;

      setTimeout(() => {
        this.loadingForthStep = false;

        setTimeout(() => {
          this.showFifthStep = true;

          setTimeout(() => {

            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth"
            });

            this.isForthStepCompleted = true;
            this.blurForthButtons = true;

            if (!this.isFirstStepCompleted) {
              this.blurFirstStep = false;
              this.blurFirstButtons = false;
            } else {
              this.blurFirstStep = false;
            
            }
            if (!this.isSecondStepCompleted) {
              this.blurSecondStep = false;
              this.blurSecondButtons = false;
            } else {
              this.blurSecondStep = false
            }
           
            if (!this.isThirdStepCompleted) {
              this.blurThirdStep = false;
              this.blurThirdButtons = false;
            } else {
              this.blurThirdStep = false
            }

            if (!this.isFifthStepCompleted) {
              this.blurFifthStep = false;
              this.blurFifthButtons = false;
            } else {
              this.blurFifthStep = false
            }

            if (!this.isSixthStepCompleted) {
              this.blurSixthStep = false;
              this.blurSixthButtons = false;
            } else {
              this.blurSixthStep = false;
            }

            this.checkAllStepsCompleted();
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  protected cancelQuantity() {
    this.checkAllStepsCompleted(false);

    if (this.productQuantity) {
      this.blurForthButtons = true;

      this.productQuantity = this.previousProductQuantity;

      if (!this.isFirstStepCompleted) {
        this.blurFirstStep = false;
        this.blurFirstButtons = false;
      } else {
        this.blurFirstStep = false;
      }
     
      if (!this.isSecondStepCompleted) {
        this.blurSecondStep = false;
        this.blurSecondButtons = false;
      } else {
        this.blurSecondStep = false
      }

      if (!this.isThirdStepCompleted) {
        this.blurThirdStep = false;
        this.blurThirdButtons = false;
      } else {
        this.blurThirdStep = false
      }

      if (!this.isFifthStepCompleted) {
        this.blurFifthStep = false;
        this.blurFifthButtons = false;
      } else {
        this.blurFifthStep = false;
      }

      if (!this.isSixthStepCompleted) {
        this.blurSixthStep = false;
        this.blurSixthButtons = false;
      } else {
        this.blurSixthStep = false;
      }

      this.checkAllStepsCompleted();
    }
  }

  protected confirmImage() {
    if (!this.productImage) {
      this.isImageError = true;
    } else {
      this.isImageError = false;
      this.loadingFifthStep = true;

      this.previousProductImage = this.productImage;

      setTimeout(() => {
        this.loadingFifthStep = false;

        setTimeout(() => {
          this.showSixthStep = true;

          setTimeout(() => {

            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth"
            });

            this.isFifthStepCompleted = true;
            this.blurFifthButtons = true;

            if (!this.isFirstStepCompleted) {
              this.blurFirstStep = false;
              this.blurFirstButtons = false;
            } else {
              this.blurFirstStep = false;
            }
           
            if (!this.isSecondStepCompleted) {
              this.blurSecondStep = false;
              this.blurSecondButtons = false;
            } else {
              this.blurSecondStep = false
            }

            if (!this.isThirdStepCompleted) {
              this.blurThirdStep = false;
              this.blurThirdButtons = false;
            } else {
              this.blurThirdStep = false
            }

            if (!this.isForthStepCompleted) {
              this.blurForthStep = false;
              this.blurForthButtons = false;
            } else {
              this.blurForthStep = false
            }

            if (!this.isSixthStepCompleted) {
              this.blurSixthStep = false;
              this.blurSixthButtons = false;
            } else {
              this.blurSixthStep = false
            }

            this.checkAllStepsCompleted();
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  protected cancelImage() {
    this.checkAllStepsCompleted(false);

    if (this.productImage) {
      this.blurFifthButtons = true;

      this.productImage = this.previousProductImage;

      if (!this.isFirstStepCompleted) {
        this.blurFirstStep = false;
        this.blurFirstButtons = false;
      } else {
        this.blurFirstStep = false;
      }
     
      if (!this.isSecondStepCompleted) {
        this.blurSecondStep = false;
        this.blurSecondButtons = false;
      } else {
        this.blurSecondStep = false
      }

      if (!this.isThirdStepCompleted) {
        this.blurThirdStep = false;
        this.blurThirdButtons = false;
      } else {
        this.blurThirdStep = false
      }

      if (!this.isForthStepCompleted) {
        this.blurForthStep = false;
        this.blurForthButtons = false;
      } else {
        this.blurForthStep = false
      }

      if (!this.isSixthStepCompleted) {
        this.blurSixthStep = false;
        this.blurSixthButtons = false;
      } else {
        this.blurSixthStep = false
      }

      this.checkAllStepsCompleted();
    }
  }

  protected confirmDescription() {    
    if (!this.productDescription) {
      this.isDescriptionError = true;
    } else {
      this.isDescriptionError = false;
      this.loadingSixthStep = true;

      this.previousProductDescription = this.productDescription;

      setTimeout(() => {
        this.loadingSixthStep = false;

          setTimeout(() => {

            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth"
            });

            this.isSixthStepCompleted = true;
            this.blurSixthButtons = true;

            if (!this.isFirstStepCompleted) {
              this.blurFirstStep = false;
              this.blurFirstButtons = false;
            } else {
              this.blurFirstStep = false;
            }
           
            if (!this.isSecondStepCompleted) {
              this.blurSecondStep = false;
              this.blurSecondButtons = false;
            } else {
              this.blurSecondStep = false
            }

            if (!this.isThirdStepCompleted) {
              this.blurThirdStep = false;
              this.blurThirdButtons = false;
            } else {
              this.blurThirdStep = false
            }

            if (!this.isForthStepCompleted) {
              this.blurForthStep = false;
              this.blurForthButtons = false;
            } else {
              this.blurForthStep = false
            }

            if (!this.isFifthStepCompleted) {
              this.blurFifthStep = false;
              this.blurFifthButtons = false;
            } else {
              this.blurFifthStep = false
            }

            this.checkAllStepsCompleted();
          }, 100);
      }, 1000);
    }
  }

  protected cancelDescription() {
    this.checkAllStepsCompleted(false);

    if (this.productDescription) {      
      this.blurSixthButtons = true;

      this.productDescription = this.previousProductDescription;

      if (!this.isFirstStepCompleted) {
        this.blurFirstStep = false;
        this.blurFirstButtons = false;
      } else {
        this.blurFirstStep = false;
      }
     
      if (!this.isSecondStepCompleted) {
        this.blurSecondStep = false;
        this.blurSecondButtons = false;
      } else {
        this.blurSecondStep = false
      }

      if (!this.isThirdStepCompleted) {
        this.blurThirdStep = false;
        this.blurThirdButtons = false;
      } else {
        this.blurThirdStep = false
      }

      if (!this.isForthStepCompleted) {
        this.blurForthStep = false;
        this.blurForthButtons = false;
      } else {
        this.blurForthStep = false
      }

      if (!this.isFifthStepCompleted) {
        this.blurFifthStep = false;
        this.blurFifthButtons = false;
      } else {
        this.blurFifthStep = false
      }

      this.checkAllStepsCompleted();
    }
  }

  protected onNameChange() {
    this.checkAllStepsCompleted(true);

    if (this.productName) {
      this.blurFirstStep = false;
      this.blurFirstButtons = false;
  
      this.blurSecondStep = true;
      this.blurSecondButtons = true;
  
      this.blurThirdStep = true;
      this.blurThirdButtons = true;

      this.blurForthStep = true;
      this.blurForthButtons = true;

      this.blurFifthStep = true;
      this.blurFifthButtons = true;

      this.blurSixthStep = true;
      this.blurSixthButtons = true;
    } else {
      this.blurFirstButtons = true;
    }
  }

  protected onPriceChange() {
    this.checkAllStepsCompleted(true);

    if (this.productPrice) {
      this.blurSecondStep = false;
      this.blurSecondButtons = false;
  
      this.blurFirstStep = true;
      this.blurFirstButtons = true;
  
      this.blurThirdStep = true;
      this.blurThirdButtons = true;

      this.blurForthStep = true;
      this.blurForthButtons = true;

      this.blurFifthStep = true;
      this.blurFifthButtons = true;

      this.blurSixthStep = true;
      this.blurSixthButtons = true;
    } else {
      this.blurSecondButtons = true;
    }
  }

  protected onConditionChange() {
    this.checkAllStepsCompleted(true);

    if (this.productCondition !== undefined) {
      this.blurThirdStep = false;
      this.blurThirdButtons = false;
  
      this.blurFirstStep = true;
      this.blurFirstButtons = true;
  
      this.blurSecondStep = true;
      this.blurSecondButtons = true;

      this.blurForthStep = true;
      this.blurForthButtons = true;

      this.blurFifthStep = true;
      this.blurFifthButtons = true;

      this.blurSixthStep = true;
      this.blurSixthButtons = true;
    } else {
      this.blurThirdButtons = true
    }
  }

  protected onQuantityChange() {
    this.checkAllStepsCompleted(true);

    if (this.productQuantity) {
      this.blurForthStep = false;
      this.blurForthButtons = false;
  
      this.blurFirstStep = true;
      this.blurFirstButtons = true;
  
      this.blurSecondStep = true;
      this.blurSecondButtons = true;
  
      this.blurThirdStep = true;
      this.blurThirdButtons = true;

      this.blurFifthStep = true;
      this.blurFifthButtons = true;

      this.blurSixthStep = true;
      this.blurSixthButtons = true;
    } else {
      this.blurForthButtons = true;
    }
  }

  protected onImageChange() {
    this.checkAllStepsCompleted(true);

    if (this.productImage) {
      this.blurFifthStep = false;
      this.blurFifthButtons = false;
  
      this.blurFirstStep = true;
      this.blurFirstButtons = true;
  
      this.blurSecondStep = true;
      this.blurSecondButtons = true;
  
      this.blurThirdStep = true;
      this.blurThirdButtons = true;
  
      this.blurForthStep = true;
      this.blurForthButtons = true;

      this.blurSixthStep = true;
      this.blurSixthButtons = true;
    } else {
      this.blurFifthButtons = true;
    }
  }

  protected onDescriptionChange() {
    this.checkAllStepsCompleted(true);

    if (this.productDescription) {
      this.blurSixthStep = false;
      this.blurSixthButtons = false;
  
      this.blurFirstStep = true;
      this.blurFirstButtons = true;
  
      this.blurSecondStep = true;
      this.blurSecondButtons = true;
  
      this.blurThirdStep = true;
      this.blurThirdButtons = true;
  
      this.blurForthStep = true;
      this.blurForthButtons = true;
  
      this.blurFifthStep = true;
      this.blurFifthButtons = true;
    } else {
      this.blurSixthButtons = true;
    }
  }

  protected checkAllStepsCompleted(isChanging?: boolean): void {
    this.isAllStepsCompleted =
      !!this.productName && 
      !!this.productPrice && 
      this.productCondition !== undefined && 
      !!this.productQuantity &&
      !!this.productImage &&
      !!this.productDescription;

    if (isChanging) {
      this.isAllStepsCompleted = false;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
