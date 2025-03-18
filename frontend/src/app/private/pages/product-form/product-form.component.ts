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
  protected error: any = false;
  protected errorMessage!: string;
  loading: boolean = false;

  protected confirmName() {
    this.errorMessage = 'Preencha esse dado'
    
    if (!this.productName) {
      this.error = true;
    } else {
      this.error = false;
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        alert('Título confirmado com sucesso!'); 
      }, 2000);
    }
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category'); 
    console.log('Categoria selecionada:', this.category); 
  }
}
