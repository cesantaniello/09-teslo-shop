import { Component } from '@angular/core';
import { ProductTable } from "../../../shared/components/product-table/product-table";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {}
