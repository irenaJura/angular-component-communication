import { Component, OnDestroy, OnInit } from '@angular/core';
import { startWith, Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  monthCount = 0;
  sub: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
      this.sub = this.productService.selectedProductChanges$.subscribe({
        next: (selectedProduct) => {
         const releaseDate = new Date(selectedProduct?.releaseDate);
         const now = new Date();
         this.monthCount = now.getMonth() - releaseDate.getMonth() + 12 * (now.getFullYear() - releaseDate.getFullYear());
        }
      })
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
}
