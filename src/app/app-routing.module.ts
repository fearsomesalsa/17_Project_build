import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './views/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // массив дочерних роутов для главного роута. В качестве главного роута мы указываем все роуты, потому что это у нас пустая строка
      {
        path: '',
        loadChildren: () =>
          import('./views/home/home.module').then((n) => n.HomeModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./views/order/order.module').then((n) => n.OrderModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./views/products/products.module').then(
            (n) => n.ProductsModule
          ),
      },
    ],
  },

  { path: 'pizzas', redirectTo: 'products' }, // допустим у нас раньше страница называлась pizzas, а теперь products. Но в поисковых системах выдаются старые ссылки на pizzas, тогда мы можем сделать редирект на новую страницн products
  { path: '**', redirectTo: '' }, // если 404 страницы у нас нет, можно использовать редирект на главную
]; // в массив передаем объекты, каждый объект должен содержать path - это тот путь, который будет соответствовать URL, по которому должна отображаться страница или соответствующий компонент. Т.к. на главной странице у нас нет никакого пути (т.е. просто localhost:4200), то мы оставляем пустую строку, но можно так же использовать любую (напр. /home или /main), но обычно делают главную страницу без каких-то доп. слов

@NgModule({
  // декоратор модуля
  imports: [
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled', useHash: true }),
  ], // импорты - это то, что мы импортируем в модуль (т.е. что-топодключаем). Здесь используется встроенный в Angular RouterModule и его спец. метод forRoot(), который позволяет туда передать массив наших роутов и присоединить их к этому модулю
  exports: [RouterModule], // затем этот RouterModule мы экспортируем наружу, чтобы использовать его в другом месте. Далее импользуем его в основном app.module.ts, импортируя AppRoutingModule в секции imports
})
export class AppRoutingModule {}

// RouterModule это некая прослойка уже существующего модуля роутинга в Angular, в который мы добавляем конфигурацию роутов и затем экспортируем, чтобы использовать в основном моудле приложения app.module.ts.

// Чтобы якоря ангуляра fragment заработали (т.е. скроллили к нужному блоку), нужно добавить в RouterModule.forRoot(routes) вторым параметром конфигурационные опции {anchorScrolling: 'enabled'}. Это означает, что мы включаем скроллинг по якорю.
// Теперь все работает, но лучше писать самостоятельно функционал скроллинга, а не использовать якоря. Потому что используя якоря, мы не сможем сделать плавный скроллинг.
