import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '../../../types/product.type';

@Pipe({
  name: 'chickenProducts',
})
export class ChickenProductsPipe implements PipeTransform {
  transform(products: ProductType[]): ProductType[] {
    return products.filter((item) => item.title.toLowerCase().includes('кур'));
  }
}

// этот пайп применяем в директиве *ngFor

// Это сделано пайпом ради примера. В большинстве случаем отфильтровать массив лучше не пайпом, а в коде компонента.
// А пайпы в основном используются для интерполяции, нежели для преобразования значений data binding

// AsyncPipe позволяет получить результат асинхронной операции (встроенный пайп)
// Напр., в свойстве класса находится какой-то промис, который может находиться еще в статусе Pending, но шаблон в этот момент уже отрисовался.
// благодаря такому пайпу на страницу ничего не будет выведено, пока наш промис не завершится. Только после этого значение будет выведено в шаблон.
