import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'productoxtienda',
    loadChildren:()=>import('./productoxtienda/productoxtienda.module').then((x)=>x.ProductoxtiendaModule)},
  {path:'producto',
    loadChildren:()=>import('./producto/producto.module').then((x)=>x.ProductoModule)},
  {path:'tienda',
    loadChildren:()=>import('./tienda/tienda.module').then((x)=>x.TiendaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
