import { Component, OnInit } from '@angular/core';
import { startWith } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  pageTitle = 'Products';
  monthCount = 0;

    constructor(private productService: ProductService) { }

    ngOnInit() {
      this.productService.selectedProductChanges$.subscribe({
        next: (selectedProduct) => {
         const releaseDate = new Date(selectedProduct.releaseDate);
         const now = new Date();
         this.monthCount = now.getMonth() - releaseDate.getMonth() + 12 * (now.getFullYear() - releaseDate.getFullYear());
        }
      })
    }
}
