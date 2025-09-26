import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LangService {

  currentLang: string;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: string,
    private cookieService: CookieService
  ) {
    this.translate.addLangs(['ar', 'en']);

    // Priority: cookie > localStorage > fallback 'en'
    const lang = this.cookieService.get('lang') || localStorage.getItem('lang') || 'en';

    this.currentLang = lang;
    this.translate.use(this.currentLang);

    if (isPlatformBrowser(this.platformId)) {
      this.changeDir(this.currentLang);
    }
  }

  private changeDir(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelector('html')!.dir = dir;
  }

  changeLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    this.cookieService.set('lang', lang);
    localStorage.setItem('lang', lang);
    this.changeDir(lang);
  }
}
