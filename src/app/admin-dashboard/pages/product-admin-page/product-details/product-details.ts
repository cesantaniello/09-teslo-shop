import { Component, input } from '@angular/core';
import { Product } from '../../../../products/interfaces/product.interface';
import { ProductCarousel } from "../../../../store-front/components/product-carousel/product-carousel";

@Component({
  selector: 'product-details',
  imports: [ProductCarousel],
  templateUrl: './product-details.html',
})
export class ProductDetails {
  product = input.required<Product>();
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
}
