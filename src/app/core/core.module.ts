import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthGuard, // если это класс, как показано в уроке, то импортировать нужно сюда, как и другие сервисы
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, // чтобы добавить по этому ключу Injection Token наш новый AuthInterceptor
      useClass: AuthInterceptor, // новый класс, должен импортироваться
      multi: true, // чтобы не перезаписать по этому ключу интерсепторы, а добавить (если false. то стнадартные http интерсепторы заменятся нашим одним AuthInterceptor)
    },
  ],
})
export class CoreModule {}
