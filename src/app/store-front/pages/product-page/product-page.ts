import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../../products/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
})
export class ProductPage {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productIdSlug = signal(this.activatedRoute.snapshot.params['idSlug']);

  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug() }),
    stream: ({ params }) => this.productService.getProductByIdSlug(params.idSlug),
  });
}
