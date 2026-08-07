import { Component, inject, resource, signal } from '@angular/core';
import { ProductTable } from "../../../shared/components/product-table/product-table";
import { firstValueFrom } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { PaginationService } from '../../../shared/components/pagination/pagination/pagination.service';
import { Pagination } from "../../../shared/components/pagination/pagination/pagination";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  productsResource = resource({
    params: () => ({
      page: this.paginationService.currentPage(),
      limit: this.productsPerPage() }),
    loader: ({ params }) =>
      firstValueFrom(
        this.productsService.getProducts({
          offset: (params.page - 1) * 9, limit: params.limit
        }),
      ),
  });
}
