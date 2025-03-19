import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  protected category: any;

  protected productName: any;
  protected productPrice: any;

  protected isNameError: boolean = false;
  protected isPriceError: boolean = false;
  protected isUsedError: boolean = false;
  protected errorMessage: string = 'Preencha esse dado';

  protected loadingFirstStep: boolean = false;
  protected loadingSecondStep: boolean = false;

  protected isFirstStepCompleted: boolean = false;
  protected isSecondStepCompleted: boolean = false;

  protected showSecondStep: boolean = false;
  protected showThirdStep: boolean = false;

  protected blurSecond: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category'); 
    console.log('Categoria selecionada:', this.category); 
  }

  protected confirmName() {    
    if (!this.productName) {
      this.isNameError = true;
    } else {
      this.isNameError = false;
      this.loadingFirstStep = true;

      setTimeout(() => {
        this.loadingFirstStep = false;

        setTimeout(() => {
          this.showSecondStep = true;

          setTimeout(() => {

            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth",
            });

            this.isFirstStepCompleted = true;
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  protected cancelName() {
    if (this.productName) {
      this.isFirstStepCompleted = true;
    }
  }

  protected confirmPrice() {
    if (!this.productPrice) {
      this.isPriceError = true;
    } else {
      this.isPriceError = false;
      this.loadingSecondStep = true;

      setTimeout(() => {
        this.loadingSecondStep = false;

        setTimeout(() => {
          this.showThirdStep = true;

          setTimeout(() => {

            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth",
            });

            this.isSecondStepCompleted = true;
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  onNameChange() {
    if (this.isFirstStepCompleted) {
      this.blurSecond = true;
    }
  }

  onPriceChange() {
    this.isSecondStepCompleted = false;
  }
}
