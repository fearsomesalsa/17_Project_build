import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import {AuthService} from './auth.service'

@Injectable() // т.к. это будет определенный сервис, который мы можем инжектить, добавим декоратор @Injectable
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // для того, чтобы этот интерсептор работал, он должен содержать хотя бы одну функцию - intercept()
    const authToken = this.authService.getToken();

    // console.log(req); // для проверки, что интерсептор работает. В консоли выдает HttpRequest
    const authReq = req.clone({ // для манипуляции с объектом запроса у req используется метод clone(). Он позволяет изменять свойства объекта, пока создает его копию, и возвращает уже измененный, т.е. уже модифицированный экземпляр. Мы не можем менять сам объект req, потому то он является неизмененемым. Можем лишь создать его копию и вернуть взамен текущего экземпляра.
      headers: req.headers.set('Authorization', authToken) // если хотим добавить заголовок для всех запросов (devtools - network - headers - request headers)
    })
    // return next.handle(authReq); // это стандартное поведение, которое никак не меняет наш запрос

    // чтобы реализовать что-то не только для данных запроса, но и для данных ответа
    return next.handle(authReq).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            console.log(event); // выводит HttpResponse
          }
        }
      })
    )
  }

}

// req - это тот http request, который совершается
// next - это объект, в котором нам нужно будет вызвать функцию handle(), чтобы продолжить далее выполение этого запроса

// AuthInterceptor нужно запровайдить на уровне модуля

// функция intercept() модифицирует исходный запрос и возващает Observable-объект типа HttpEvent
// Т.е. входящий запрос - это параметр req типа HttpRequest. Второй параметр next - это спец объект типа HttpHandler, который имеет один метод handle(), в который мы должны передать уже измененный запрос, и он сформирует для нас Observable

// По умолчанию интерсептор, т.е. метод intercept() будет срабатывать перед отправкой запроса на сервер
