import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { Product } from '../../core/interfaces/api.interface'; 
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCard, FormsModule, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];
  isLoading = false;
  searchTerm = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  get filteredProducts(): Product[] {
    if (!this.products || this.products.length === 0) return [];

    if (!this.searchTerm) return this.products;
    return this.products.filter((p) =>
      p.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  getAllProducts() {
    this.isLoading = true;
    this.productService.getAllProducts({}).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.products = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
