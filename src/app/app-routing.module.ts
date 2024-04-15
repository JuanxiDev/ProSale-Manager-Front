import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListaComponent } from './Pages/producto-lista/producto-lista.component';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { LoginComponent } from './Pages/login/login/login.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';


//http:localhost:4200/productos
const routes: Routes = [
  {path: 'inicio', component : InicioComponent},
  {path: 'productos', component : ProductoListaComponent},
  {path: 'login', component : LoginComponent},
  {path: '',redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'users', component : UsersListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
