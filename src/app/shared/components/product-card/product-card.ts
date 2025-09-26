import { Component, Input } from '@angular/core';
import { Product, Response } from '../../../core/interfaces/api.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private wishlistService: WishlistService,
  ) {}

  @Input()
  product!: Product;

  wishlistIds: string[] = [];

  addProductCart(pID: string) {
    this.cartService.addToCart(pID).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe((res: Response<Product>) => {
      this.wishlistIds = res.data.map((item: Product) => item._id);
    });
  }

  toggleWishlist(product: Product) {
    if (this.wishlistIds.includes(product._id)) {
      this.wishlistService.removeFromWishlist(product._id).subscribe(() => {
        this.wishlistIds = this.wishlistIds.filter(id => id !== product._id);
      });
    } else {
      this.wishlistService.addToWishlist(product._id).subscribe(() => {
        this.wishlistIds.push(product._id);
      });
    }
  }
}
