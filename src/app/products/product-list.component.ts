import { Component, OnInit, ViewChild } from '@angular/core';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  includeDetail = true;
  sub: Subscription;

  @ViewChild(CriteriaComponent) filterComponent?: CriteriaComponent;

  get showImage(): boolean {
    return this.parameterService.showImage;
  }
  set showImage(value: boolean) {
    this.parameterService.showImage = value;
  }

  constructor(
    private productService: ProductService,
    private parameterService: ProductParameterService
    ) { }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.performFilter(this.parameterService.filterBy);
      },
      error: err => this.errorMessage = err
    });
  }

  ngAfterViewInit(): void {
    this.filterComponent.listFilter = this.parameterService.filterBy;
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

  onValueChange(value: string): void {
    this.parameterService.filterBy = value;
    this.performFilter(value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
