import { Component, computed, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '../../../products/interfaces/product.interface';
import { SlicePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

const baseUrl = environment.baseUrl;

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();

  imageUrl = computed(() => {
    const images = this.product().images;
    return images.length > 0
      ? `${baseUrl}/files/product/${images[0]}`
      : './assets/images/no-image.jpg';
  });
}
