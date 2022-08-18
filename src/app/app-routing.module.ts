import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './Views/confirmation/confirmation.component';
import { RegisterComponent } from './Views/register/register.component';
import { RequestComponent } from './Views/request/request.component';

const routes: Routes = [
  {path: '', redirectTo: '/Request', pathMatch:'full'},
  {path: 'Request', component:RequestComponent},
  {path: 'Registro/:data', component:RegisterComponent},
  {path: 'Confirmacion/:data', component:ConfirmationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
