import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProuductParameterService } from './prouduct-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  includeDetail = true;

  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
  parentListFilter: string; // to assign filter value from child component

  get showImage(): boolean {
    return this.parameterService.showImage;
  }
  set showImage(value: boolean) {
    this.parameterService.showImage = value;
  }

  constructor(
    private productService: ProductService,
    private parameterService: ProuductParameterService
    ) { }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.performFilter(this.parentListFilter);
      },
      error: err => this.errorMessage = err
    });
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
    this.performFilter(value);
  }
}
