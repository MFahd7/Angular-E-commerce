import { Component, OnInit, signal, PLATFORM_ID, inject, REQUEST } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { GlobalLoader } from "./shared/components/global-loader/global-loader";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, GlobalLoader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  protected readonly title = signal('ecommerce');
  currentRoute: string = '';
  private platformId = inject(PLATFORM_ID);

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private cookie: CookieService,
  ) {
    // for the register page
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  private req = inject(REQUEST)

  ngOnInit() {

    // when reloading the page 
    if (isPlatformBrowser(this.platformId)) {
      const dataToken = this.cookie.get('token');
      
      if(dataToken){
        this.authService.decodedToken(dataToken)
      }  
    }
    else{
      const cookies = this.req?.headers.get('cookie')
      const token = this.authService.getCookieValue('token', cookies || "");
      console.log(token, 'from server');

      if(token){
        this.authService.decodedToken(token)
      }
    }

    

    // for the page title in the tab bar
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route?.data ?? []),
      )
      .subscribe((data) => {
        const pageTitle = data['title'] || 'E-commerce';
        this.titleService.setTitle(pageTitle);
      });
  }

  
}
