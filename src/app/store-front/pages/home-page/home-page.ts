import { Component, inject, resource } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from '../../../products/services/products.service';
import { Pagination } from '../../../shared/components/pagination/pagination/pagination';
import { firstValueFrom } from 'rxjs';
import { PaginationService } from '../../../shared/components/pagination/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
/*
  activatedRoute = inject(ActivatedRoute);

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => Number(params.get('page')) || 1),
      map((page) => (Number.isNaN(page) ? 1 : page)),
    ),
    { initialValue: 1 },
  );
*/
  productsResource = resource({
    params: () => ({ page: this.paginationService.currentPage() }),
    loader: ({ params }) =>
      firstValueFrom(
        this.productsService.getProducts({
          offset: (params.page - 1) * 9,
        }),
      ),
  });
}
