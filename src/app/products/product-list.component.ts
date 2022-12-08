import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  listFilter: string;
  showImage = false;
  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  @ViewChild('filterElement') filterElementRef: ElementRef;
  @ViewChild(NgModel) filterInput: NgModel;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  ngAfterViewInit(): void {
    this.filterInput?.valueChanges?.subscribe(
      () => {
        this.performFilter(this.filterInput.control.value)
      }
    )
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
