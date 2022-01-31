import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './page/carousel/carousel.component';
import { LoginComponent } from './page/login/login.component';

const routes: Routes = [
  { path: 'registro', loadChildren: () => import('./page/registro/registro.module').then(m => m.RegistroModule) },
  { path: 'cards', loadChildren: () => import('./page/cards/cards.module').then(m => m.CardsModule) },
  { path: 'carrusel', component: CarouselComponent},
  { path: 'productos', loadChildren: () => import('./page/producto/producto.module').then(m => m.ProductoModule) },
  { path: 'producto/:id', loadChildren: () => import('./page/productos/productos.module').then(m => m.ProductosModule) },
  { path: 'categoria', loadChildren: () => import('./page/categoria/categoria.module').then(m => m.CategoriaModule) },
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
