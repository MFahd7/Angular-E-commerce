import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProductCard } from "../../shared/components/product-card/product-card"; 
import { Product, Response } from '../../core/interfaces/api.interface';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalLoader } from "../../shared/components/global-loader/global-loader";
import { CartLoader } from "../../shared/components/cart-loader/cart-loader";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.html',
  imports: [CartLoader, TranslatePipe],
})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  isLoading = false

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.isLoading = true;
    this.wishlistService.getWishlist().subscribe(
    (res: Response<Product>) => {
      this.wishlist = res.data;
      this.isLoading = false;
    }
  );
  }

  removeWishlistItem(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe(() => {
      this.wishlist = this.wishlist.filter((item) => item._id !== productId);
    });
  }

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

  goToDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }
}
