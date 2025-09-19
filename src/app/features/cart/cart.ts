import { ToastrService } from 'ngx-toastr';
import { CartResponse, ShippingAddress } from '../../core/interfaces/api.interface';
import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { CartLoader } from '../../shared/components/cart-loader/cart-loader';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartLoader, ReactiveFormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  updateLoading = false;
  isLoading = false;
  isFormOpen = false;
  currentIndex = -1;
  cartData: CartResponse | null = null;

  private CartService = inject(CartService);
  private toastr = inject(ToastrService);
  private router = inject(Router)
  // for deciding payment method
  paymentMethod: 'cash' | 'card' | null = null;


  addressForm = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getUserCart();
  }

  updateProductCount(count: number, id: string, index: number) {
    this.updateLoading = true;
    this.currentIndex = index;
    this.CartService.updateProductQTY(id, count).subscribe({
      next: (res) => {
        this.cartData = res;
        this.updateLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.message);
        this.updateLoading = false;
      },
    });
  }

  getUserCart() {
    this.isLoading = true;
    console.log(localStorage.getItem('token'), 'from cart');
    this.CartService.getCart().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.cartData = res;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.message);
      },
    });
  }

  deleteProduct(id: string) {
    this.CartService.deleteProduct(id).subscribe({
      next: (res) => {
        this.cartData = res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  clearCart() {
    this.CartService.deleteCart().subscribe({
      next: (res) => {
        this.cartData = null;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  checkoutCart() {
    if (!this.cartData?.cartId) return;
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched()
      this.toastr.error('Please fill in all required fields.');
      return;
    }

    this.CartService.checkoutSession(this.cartData?.cartId, {
      details: this.addressForm.value.details!,
      phone: this.addressForm.value.phone!,
      city: this.addressForm.value.city!,
    }).subscribe({
      next: (res) => {
        window.location.href = res.session.url;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

checkoutCash() {
  if (!this.cartData?.cartId) return;

  if (this.addressForm.invalid) {
    this.addressForm.markAllAsTouched();
    this.toastr.error('Please fill in all required fields.');
    return;
  }

  this.CartService.checkoutCash(this.cartData.cartId, this.addressForm.value as ShippingAddress)
    .subscribe({
      next: (res) => {
        // res is Response<Orders>
        const order = res.data[0]; // ✅ always from your Response<T> interface

        this.toastr.success('Order placed successfully');
        this.router.navigate(['/allorders']);
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
}

  closeForm(){
    this.isFormOpen = false;
  }
}
