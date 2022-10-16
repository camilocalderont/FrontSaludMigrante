import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './Views/confirmation/confirmation.component';
import { RegisterComponent } from './Views/register/register.component';
import { RequestComponent } from './Views/request/request.component';
import { environment } from './../environments/environment';
const routes: Routes = [
  {path: '', redirectTo: '/Request', pathMatch:'full'},
  {path: 'Request', component: RequestComponent,data: { title: environment.title, fecha: environment.fecha }  },
  {path: 'Registro/:data', component: RegisterComponent,data: { title: environment.title, fecha: environment.fecha }},
  {path: 'Confirmacion/:data', component: ConfirmationComponent,data: { title: environment.title, fecha: environment.fecha }}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
