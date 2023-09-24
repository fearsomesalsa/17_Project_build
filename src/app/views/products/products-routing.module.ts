import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':id', component: ProductComponent }, // после products/ будет номер продукта и это будет параметр URL, не query-параметр, а именно параметр в секции. Поэтому ставим :id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
