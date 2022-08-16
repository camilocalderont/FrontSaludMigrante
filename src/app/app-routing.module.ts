import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './views/confirmation/confirmation.component';
import { HomeComponent } from './Views/home/home.component';
import { InitiationComponent } from './Views/initiation/initiation.component';
import { RegisterComponent } from './Views/register/register.component';
import { RequestComponent } from './Views/request/request.component';

const routes: Routes = [
  {path: '', redirectTo: '/Inicio', pathMatch:'full'},
  {path: 'Home', component:HomeComponent},
  {path: 'Inicio', component:InitiationComponent},
  {path: 'Request', component:RequestComponent},
  {path: 'Registro/:data', component:RegisterComponent},
  {path: 'Confirmacion/:data', component:ConfirmationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
