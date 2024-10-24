import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListaComponent } from './Pages/producto-lista/producto-lista.component';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { LoginComponent } from './Pages/login/login/login.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';
import { ProveedorListaComponent } from "./Pages/proveedor-lista/proveedor-lista.component";
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { FacturaComponent } from './Pages/factura/factura.component';
import { RegistroListaComponent } from './Pages/registro/registro.component';

//http:localhost:4200/productos
const routes: Routes = [
  {path: '', component : InicioComponent},
  {path: 'productos', component : ProductoListaComponent},
  {path: 'login', component : LoginComponent, runGuardsAndResolvers: 'always'},
  {path: 'users', component : UsersListComponent},
  {path: 'proveedores', component : ProveedorListaComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'facturacion', component: FacturaComponent},
  {path: 'registro', component: RegistroListaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
