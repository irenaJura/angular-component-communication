import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  products: IProduct[] = [];
  errorMessage = '';
  selectedProduct: IProduct | null;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub1 = this.productService.getProducts().subscribe({
      next: products => this.products = products,
      error: err => this.errorMessage = err
    });
    this.sub2 = this.productService.selectedProductChanges$.subscribe({
      next: product => this.selectedProduct = product,
      error: err => this.errorMessage = err
    })
  }

  onSelected(product: IProduct) {
    this.productService.changeSelectedProduct(product);
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
