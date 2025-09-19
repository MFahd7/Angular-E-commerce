import { Component } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  imports: [NgClass],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css'
})
export class AllOrders implements OnInit {
  private readonly ordersService = inject(AllordersService);
  private readonly authService = inject(AuthService);

  orders: Orders[] = [];

  ngOnInit(): void {
  this.getOrders();
  }
  getOrders():void{
      const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.ordersService.getUserOrders(userId).subscribe({
        next: (res) => {
          console.log(res);
          
          this.orders = res;
        },
        
      });
    }
  }

}