import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable() // т.к. провайдим их в CoreModule, то провайдинг на уровне корня нужно убрать
export class AuthService {
  // public isLoggedSubject: Subject<boolean> = new Subject<boolean>();
  public isLogged$: Subject<boolean> = new Subject<boolean>();

  private isLogged: boolean = false;
  constructor() {}

  logIn() {
    this.isLogged = true;
    // this.isLoggedSubject.next(this.isLogged);
    this.isLogged$.next(this.isLogged);
  }
  logOut() {
    this.isLogged = false;
    // this.isLoggedSubject.next(this.isLogged);
    this.isLogged$.next(this.isLogged);
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  getToken() {
    return 'test';
  }
}
