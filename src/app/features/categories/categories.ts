import { Component, inject } from '@angular/core';
import { Category } from '../../core/interfaces/api.interface';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories: Category[] = [];
  private catService = inject(CategoryService);

  selectedcat!: Category | null;
  isModalOpen = false;

  ngOnInit(): void {
    this.catService.getAllCategory({ limit: 40, page: 1 }).subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openModal(cat: Category) {
    this.selectedcat = cat;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedcat = null;
  }
}
