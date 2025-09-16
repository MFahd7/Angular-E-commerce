import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  
  isLogin = false;

  constructor(private flowbiteService: FlowbiteService, private authService: AuthService) {}

  ngOnInit(): void {
    // this.flowbiteService.loadFlowbite((flowbite) => {
    //   initFlowbite();
    // });
    
    this.authService.userData.subscribe({
      next: (user) => {
        this.isLogin = user; // user is true or false already
      },
    });
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  pages: { title: string; path: string }[] = [
    { title: 'Brands', path: '/brands' },
    { title: 'Categories', path: '/categories' },
    { title: 'Products', path: '/product' },
    { title: 'Cart', path: '/cart' },
    { title: 'Wishlist', path: '/wishlist' },
  ];

  authPages: { title: string; path: string }[] = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' },
  ];

  logOut(){
    this.authService.logout()
  }

}
