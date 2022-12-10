import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';

  // Need to handle null to allow for no selected product.
  product: IProduct | null;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.selectedProductChanges$.subscribe({
      next: (data) => this.product = data,
      error: (err) => this.errorMessage = err
    });
  }

}
