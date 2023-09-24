import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { AuthGuard } from 'src/app/core/auth/auth.guard';

const routes: Routes = [
  { path: '', component: OrderComponent, canActivate: [AuthGuard] }, // запретим показывать пользователю этот URL, если он не авторизован
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
