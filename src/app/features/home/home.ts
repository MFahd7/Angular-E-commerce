import { CartService } from './../../core/services/cart.service';
import { CategoryService } from './../../core/services/category.service';
import { Product, Category } from './../../core/interfaces/api.interface';
import { Component, OnInit } from '@angular/core';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { ProductService } from '../../core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [ProductCard, CarouselModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3250,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },
    nav: false,
  };

  Products: Product[] = [];
  Categories: Category[] = [];
  isLoading = false;

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService, 
    private cartService: CartService, 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.isLoading = true;
    this.productService.getAllProducts({}).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.Products = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllCategories() {
    this.isLoading = true;
    this.categoryService.getAllCategory({}).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.Categories = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
