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
  protected productCondition!: boolean;

  protected isNameError: boolean = false;
  protected isPriceError: boolean = false;
  protected isConditionError: boolean = false;
  protected errorMessage: string = 'Preencha esse dado';

  protected loadingFirstStep: boolean = false;
  protected loadingSecondStep: boolean = false;
  protected loadingThirdStep: boolean = false;

  protected isFirstStepCompleted: boolean = false;
  protected isSecondStepCompleted: boolean = false;
  protected isThirdStepCompleted: boolean = false;

  protected showSecondStep: boolean = false;
  protected showThirdStep: boolean = false;

  protected blurFirstStep: boolean = false;
  protected blurSecondStep: boolean = false;
  protected blurThirdStep: boolean = false;

  protected blurFirstButtons: boolean = false;
  protected blurSecondButtons: boolean = false;
  protected blurThirdButtons: boolean = false;

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
            this.blurFirstButtons = true;

            this.blurSecondStep = false;
            this.blurSecondButtons = false;

            this.blurThirdStep = false;
            this.blurThirdButtons = false;
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  protected cancelName() {
    if (this.productName) {
      this.blurFirstButtons = true;

      if (this.isSecondStepCompleted) {
        this.blurSecondStep = false;
        this.blurSecondButtons = true;
      } else {
        this.blurSecondStep = false;
        this.blurSecondButtons = true;
      }

      if (this.isThirdStepCompleted) {
        this.blurThirdStep = false;
        this.blurThirdButtons = true;
      } else {
        this.blurThirdStep = false;
        this.blurThirdButtons = true;
      }
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
            this.blurSecondButtons = true;

            this.blurFirstStep = false;
            this.blurFirstButtons = true;

            this.blurThirdStep = false;
            this.blurThirdButtons = false;
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  protected cancelPrice() {
    if (this.productPrice) {
      this.blurSecondButtons = true;

      this.blurFirstStep = false;
      this.blurFirstButtons = true;

      this.blurThirdStep = false;
      this.blurThirdButtons = false;
    }
  }


  protected confirmCondition() { 
    if (this.productCondition == undefined) {
      this.isPriceError = true;
    } else {
      this.isPriceError = false;
      this.loadingThirdStep = true;

      setTimeout(() => {
        this.loadingThirdStep = false;

        setTimeout(() => {
          // this.showForthStep = true;

          setTimeout(() => {

            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth",
            });

            this.isThirdStepCompleted = true;
            this.blurThirdButtons = true;

            this.blurFirstStep = false;
            this.blurFirstButtons = true;

            this.blurSecondStep = false;
            this.blurSecondButtons = false;
          }, 100);
        }, 100);
      }, 1000);
    }
  }

  protected cancelCondition() {
    if (this.productCondition !== undefined) {
      this.blurThirdButtons = true;

      this.blurFirstStep = false;
      this.blurFirstButtons = true;

      this.blurSecondStep = false;
      this.blurSecondButtons = false;
    }
  }

  onNameChange() {
    if (this.isFirstStepCompleted) {
      this.blurFirstButtons = false;

      this.blurSecondStep = true;
      this.blurSecondButtons = true;

      this.blurThirdStep = true;
      this.blurThirdButtons = true;
    }
  }

  onPriceChange() {
    if (this.isSecondStepCompleted) {
      this.blurSecondButtons = false;

      this.blurFirstStep = true;
      this.blurFirstButtons = true;

      this.blurThirdStep = true;
      this.blurThirdButtons = true;
    }
  }

  onConditionChange() {
    if (this.isThirdStepCompleted) {
      this.blurThirdButtons = false;

      this.blurFirstStep = true;
      this.blurFirstButtons = true;

      this.blurSecondStep = true;
      this.blurSecondButtons = true;
    }
  }
}
