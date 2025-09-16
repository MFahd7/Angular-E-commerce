import { Component, inject, OnInit } from '@angular/core';
import { GLoaderService } from '../../../core/services/g-loader.service';

@Component({
  selector: 'app-global-loader',
  imports: [],
  templateUrl: './global-loader.html',
  styleUrl: './global-loader.css'
})
export class GlobalLoader implements OnInit {

  public loaderService = inject(GLoaderService)

  ngOnInit(): void {
    this.loaderService.isLoading()
    
  }
}
