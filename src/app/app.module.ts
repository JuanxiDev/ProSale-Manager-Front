import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoListaComponent } from './Pages/producto-lista/producto-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Pages/login/login/login.component';
import { NavbarComponent } from './Compartido/navbar/navbar.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    AppComponent,
    ProductoListaComponent,
    InicioComponent,
    LoginComponent,
    NavbarComponent,
    UsersListComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    provideClientHydration(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
