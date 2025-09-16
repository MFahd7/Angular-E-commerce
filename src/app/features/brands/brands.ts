import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Brand } from '../../core/interfaces/api.interface';


@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.css',
})
export class Brands implements OnInit {
  brands: Brand[] = [];
  private brandService = inject(BrandService);

  selectedBrand !: Brand | null;
  isModalOpen = false;

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openModal(brand: Brand) {
    this.selectedBrand = brand ;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedBrand = null;
  }
}

