import { Injectable } from '@angular/core';
import {CartService} from "./cart.service";

@Injectable()
export class CartProductService {
  count: number = 0;
  constructor() { } // Можно инжектить сервисы не только в директивы, пайпы и т.д. , но и в другие сервисы. Заинжектим сюда cartService
}

// Создадим сервис для подчета товаров в корзине для каждого продукта (будем инжектить в каждом продукте)



