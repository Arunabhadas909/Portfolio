import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

const routes: Routes = [

    {path:'', redirectTo:'/userComp',pathMatch:'full'},
    {path:'userComp', component:UserComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {

    anchorScrolling: 'enabled',
    scrollPositionRestoration : 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
