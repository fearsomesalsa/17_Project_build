import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  formValues = {
    productTitle: '',
    address: '',
    phone: '',
  };

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {} // в activatedRoute будет находиться наш активный роут, который активен прямо сейчас по время работы этого компонента

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  ngOnInit(): void {
    // через cartService
    // if (this.cartService.product) {
    //   this.formValues.productTitle = this.cartService.product;
    // }

    // через Observable
    // подписываемся на изменение объекта queryParams
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      // используем спец. инжектируемый класс activatedRoute, у которого берем свойство queryParams, который является спец. объектом типа Observable, у которого мы используем метод subscribe. Этот метод мы используем для того, чтобы отслеживать какие-то изменения, которые в любой момент могут произойти, сюда передаем функцию-колбэк, которая может сработать в любой момент. Онасрабатывает сразу же в ngOnInit как инициализация этих параметров. Если наш параметр в какой-то момент изменится, то эта функция снова вызовется.
      // this.activatedRoute.queryParams - это Observable объект, при обращении к которому мы подписываемся на его изменения через функцию subscribe
      if (params['product']) {
        this.formValues.productTitle = params['product'];
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe(); // Хорошей практикой будет в нашем компоненте отписаться от объекта queryParams (Observable), когда мы разрушаем наш компонент (ngOnDestroy)
    this.subscriptionOrder?.unsubscribe();
  }

  test() {
    // у результата подписки this.activatedRoute.queryParams.subscribe нужно вызвать метод unsubscribe. Присвоим в переменную subscription типа Subscription (тип из RxJS) результат подписки и вызовем unsubscribe
    // this.subscription?.unsubscribe(); // в subscription не результат вызова колбэка, а результат подписки. IDE автоматически добавляет знак ?, это означает, что может метод unsubscribe не существовать у объекта this.subscription
  }

  createOrder() {
    if (!this.formValues.productTitle) {
      alert('Заполните пиццу');
      return;
    }
    if (!this.formValues.address) {
      alert('Заполните адрес');
      return;
    }
    if (!this.formValues.phone) {
      alert('Заполните телефон');
      return;
    }

    this.subscriptionOrder = this.productService
      .createOrder({
        // formValues похоже по структуре, но вместо productTitle нам нужен product. Чтобы не изменять логику под сервис (обычно наоборот меняют сервис под логику, которая уже реализована), то просто передадим данные в требуемоом формате
        product: this.formValues.productTitle,
        address: this.formValues.address,
        phone: this.formValues.phone,
      })
      .subscribe((response) => {
        // можно еще сюда добавить error(), чтобы обработать ошибки запроса. сейчас не будем, но по-правильному это нужно делать
        if (response.success && !response.message) {
          alert('Спасибо за заказ!');

          this.formValues = {
            productTitle: '',
            address: '',
            phone: '',
          };
        } else {
          alert('Ошибка');
        }
      });
  }
}

// https://angular.io/guide/router-reference#activated-route - тут можно посмотреть, на что еще можно подписаться
// property		    Details
// queryParams		An Observable that contains the query parameters available to all routes.

// В больших проектах с правильным кодом есть правило - всегда отписываться от Observable-объектов.
// Например хорошей практикой будет в нашем компоненте отписаться от объекта queryParams (Observable), когда мы разрушаем наш компонент (ngOnDestroy)
// ЭТо будет правильное использование ресурсов, и мы будем избегать утечек памяти
// Но это не единственная причина, почему стоит отписываться: на главном main.component у нас происходит setInterval() каждую секунду, и если мы переходим на главную страницу, а затем на какую-то другую страницу, то даже находясь на другой странице наш Observable-объект продолжает генерировать event-ы. А это нам уже не нужно.
// Поэтому если мы хотим правильно использовать наши подписки, то нужно отписыватья в момент разрушения компонента.
