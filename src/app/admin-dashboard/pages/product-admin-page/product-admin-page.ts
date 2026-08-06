import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-product-admin-page',
  imports: [],
  templateUrl: './product-admin-page.html',
})
export class ProductAdminPage {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productsService = inject(ProductsService);

  productId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['id']))
  );

  productResource = rxResource({
    params: () => ({ id: this.productId() }),
    stream: ({ params }) => 
      this.productsService.getProductById(params.id),
  });

  redirectEffect = effect(() => {
    const resource = this.productResource;
    if (resource.error()) {
      this.router.navigate(['/admin/products']);
    }
  });
}
