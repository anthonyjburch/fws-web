import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableAllComponent } from './stock/available-all/available-all.component';
import { AvailableColorComponent } from './stock/available-color/available-color.component';
import { StockContainerComponent } from './stock/stock-container/stock-container.component';
import { StockResolver } from './stock/stock.resolver';

const routes: Routes = [
  {
    path: "available",
    component: AvailableAllComponent,
    resolve: { stock: StockResolver }
  },
  {
    path: "color",
    component: AvailableColorComponent,
    resolve: { stock: StockResolver }
  },
  {
    path: "**",
    component: StockContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
