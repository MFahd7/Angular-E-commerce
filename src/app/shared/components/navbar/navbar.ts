import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LangService } from '../../../core/services/lang.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  
  isLogin = false;

  constructor(private flowbiteService: FlowbiteService, private authService: AuthService, public langService: LangService) {}

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
    { title: 'navbar.Brands', path: '/brands' },
    { title: 'navbar.Categories', path: '/categories' },
    { title: 'navbar.Products', path: '/product' },
    { title: 'navbar.Cart', path: '/cart' },
    { title: 'navbar.Wishlist', path: '/wishlist' },
  ];

  authPages: { title: string; path: string }[] = [
    { title: 'navbar.Login', path: '/login' },
    { title: 'navbar.Register', path: '/register' },
  ];

  logOut(){
    this.authService.logout()
  }


}
