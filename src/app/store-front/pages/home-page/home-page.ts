import { Component, inject, resource } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from '../../../products/services/products.service';
import { Pagination } from '../../../shared/components/pagination/pagination/pagination';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  productsService = inject(ProductsService);

  activatedRoute = inject(ActivatedRoute);

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => Number(params.get('page')) || 1),
      map((page) => (Number.isNaN(page) ? 1 : page)),
    ),
    { initialValue: 1 },
  );

  productsResource = resource({
    params: () => ({ page: this.currentPage() }),
    loader: ({ params }) =>
      firstValueFrom(
        this.productsService.getProducts({
          offset: (params.page - 1) * 9,
        }),
      ),
  });
}
