import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../core/services/product.service';
import { Component } from '@angular/core';
import { Product } from '../../core/interfaces/api.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2250,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
    autoplayHoverPause: true,
  };

  productDetails: Product | null = null;
  isLoading = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
      const id = map.get('id');
      this.getProductDetails(id!);
    });

    // load wishlist from API when details page opens
    this.wishlistService.getWishlist().subscribe((res) => {
      this.wishlist = res.data.map((item: Product) => item._id); 
    });
  }

  getProductDetails(productId: string) {
    this.isLoading = true;

    this.productService.getSpecificProduct(productId).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response.data);
        this.productDetails = response.data;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  addProductCart(pID: string | undefined) {
    if (!pID) {
      this.toastr.error('Invalid product ID');
      return;
    }
    this.cartService.addToCart(pID).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  wishlist: string[] = [];

  toggleWishlist(productId: string) {
    if (this.isInWishlist(productId)) {
      this.wishlistService.removeFromWishlist(productId).subscribe(() => {
        this.wishlist = this.wishlist.filter((id) => id !== productId);
      });
    } else {
      this.wishlistService.addToWishlist(productId).subscribe(() => {
        this.wishlist.push(productId);
      });
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlist.includes(productId);
  }
}