import { Injectable } from '@angular/core';
import { ProductType } from '../../../types/product.type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
}) // сделаем провайдинг на уровне root
export class ProductService {
  private products: ProductType[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductType[]> {
    // return this.http.get<{ data: ProductType[] }>('http://testologia.site/pizzas?extraField=1')
    //   .pipe(
    //     map(result => result.data)
    //   )
    // Почему не подписываемся здесь? Если подпишемся здесь, то не сможем потом присвоить в products.component.ts this.products данные. Этот сервис - это некая общая логика, которую мы можем переиспользовать где-то еще. А если мы переиспользуем это где-то еще, то обрабатывать ответ в каждом консретном случае нужно по-своему.

    // В этом же объекте опций мы можем передать еще и query-параметры. Создадим его отдельно
    // let params = new HttpParams();
    // params = params.set('extraField', 1); // установили новое значение. Нужно перезаписать params т.к. фукнция set() вернет нам этот объект с параметрами

    // Если в ответе от сервера нам нужен не только рез-т (т.е. само тело ответа htpp), но и другая часть запроса для анализа, мы можем использовать передачу второго параметра - объект опций
    // return this.http.get<{ data: ProductType[] }>('https://testologia.site/pizzas', {
    // observe: 'response', // если нужен полностью весь запрос в result, а не только body.
    // responseType: 'text' // По умолчанию HttpClient делает все запросы в формате json. Если сервер возвращает какой-то другой тип данных, то в объекте опций можем это указать
    // headers: new HttpHeaders({ // Если в запросе нужно передать какие-то заголовки, их также можно указать в объекте опций
    //   Authorization: 'auth-token' // чтобы этот токен и авторизационный заголовок работал и CORS политика нам не заблокировала запрос, нужно изменить http на https. См. devtools - network - header - request headers
    // }),
    // params: params
    // })
    //   .pipe(
    //     tap(result => {
    //       console.log(result); // выводит HttpResponse
    //     }),
    //     map(result => result.body ? result.body.data : []) // result.body м.б. null, но не в нашем случае, поэтому используем оператор ненулевого значения result.body!.data. Для бОльшей безопасности можно использовать тернарный оператор
    //     map(result => result.data)
    //   )

    // оставим самый простой вариант
    return this.http.get<ProductType[]>(environment.apiURL + 'pizzas');
  }
  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiURL + `pizzas?id=${id}`);
  }

  // по-хорошему это нужно вытащить в отдельный сервис, но мы сделаем запрос здесь, чтобы не создавать сервис ради одного метода
  createOrder(data: { product: string; address: string; phone: string }) {
    // не будет создавать отдельный тип, опишем его прямо здесь. Это ок, если это больше нигде не используется
    return this.http.post<{ success: boolean; message?: string }>(
      environment.apiURL + `order-pizza`,
      data
    );
  }
}
