import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  category: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category'); 
    console.log('Categoria selecionada:', this.category); 
  }
}
