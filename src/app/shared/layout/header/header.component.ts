import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public loggedState: boolean = false;
  constructor(
    public cartService: CartService, // public, потому что cartService будет использоваться в шаблоне
    private authService: AuthService
  ) {}
  ngOnInit() {
    // this.authService.isLoggedSubject.subscribe((isLoggedIn: boolean) => {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.loggedState = isLoggedIn;
      // other logic
      console.log('State has been changed: ' + isLoggedIn);
    });
  }
  login() {
    this.authService.logIn();
  }
  logout() {
    this.authService.logOut();
  }
}
